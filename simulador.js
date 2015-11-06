(function(){
	var textareaCode = document.getElementById('code');
	var btnPasso = document.getElementById('btn-passo');
	var btnCarrega = document.getElementById('btn-carrega');
	var ROM_TOTAL_POSITIONS = parseInt(ConvertBase.hex2dec("0400"));
	//var P_DID_NOT_STARTED = "xx";
	
	var ces = {
		P:"0001",
		C:0,
		T:0
	};

	var binMaisUm = function(bin,length){
		var dec = ConvertBase.bin2dec(bin);
		dec++;
		return ConvertBase.dec2bin(dec,length);
	};

	var somaBin = function(a, b){
		var aDec = ConvertBase.bin2dec(a);
		var bDec = ConvertBase.bin2dec(a);
		var result = aDec + bDec;
		return ConvertBase.dec2bin(result);
	}
	var subBin = function(a, b, length){
		var aDec = ConvertBase.bin2dec(a);
		var bDec = ConvertBase.bin2dec(a);
		var result = aDec - bDec;
		return ConvertBase.dec2bin(result, length);
	}

	//TODO ler a ROM do ces no ~cp
	var memoria = [];

	//assumindo que P vem como hexadecimal
	var instrucao = function(line){
		var num = ConvertBase.hex2bin(line, 16);
		return parseInt(ConvertBase.bin2dec(num.substr(0,2)));
	};

	//TODO fazer funcionar sem usar substring
	var argumento = function(line){
		var num = ConvertBase.hex2bin(line, 16);
		console.log(num);
		return num.substr(2,14);
	};

	var hexSub = function(a, b, length){
		var result = ConvertBase.hex2dec(a) - ConvertBase.hex2dec(b);
		if(result < 0){
			result = ConvertBase.hex2dec("FFFF") + result;
		}
		return ConvertBase.dec2hex(result, length);
	};

	var passo = function(){
		var line = memoria[ces.P]; // THIS IS STILL BINARY BUT JAVASCRIPT THINK IT IS INT
		console.log(line);
		var inst = instrucao(line);
		var arg = argumento(line);
		console.log(inst);
		console.log(arg);

		switch(inst){
			case 0:
				ces.T = memoria[arg];
				ces.P = binMaisUm(ces.P,14);
				break;
			case 1:
				memoria[arg] = ces.T;
				ces.P = binMaisUm(ces.P,14);
				break;
			case 2:
				if(ces.T < memoria[arg])
					ces.C = 1;
				else
					ces.C = 0;

				ces.T = hexSub(ces.T, memoria[arg], 4);
				ces.P = binMaisUm(ces.P,14);
				break;
			case 3:
				if(!ces.C){
					ces.P = subBin(ConvertBase.hexSub(line), ConvertBase.hex2bin("C000"), 16);
				}
				else{
					ces.P = binMaisUm(ces.P,14);
				}
				break;
			default:
				console.log("you are fucked");
		}
		console.log(ces);
		console.log(memoria);
	};

	var carregaROM = function(){
		memoria[ConvertBase.dec2bin(0, 14)] = "0000";
		memoria[ConvertBase.dec2bin(1, 14)] = "0001";
		memoria[ConvertBase.dec2bin(2, 14)] = "0002";
		memoria[ConvertBase.dec2bin(3, 14)] = "0003";
	};

	btnCarrega.addEventListener("click", function(ev){
		carregaROM();
		ces.P = ConvertBase.dec2bin(ROM_TOTAL_POSITIONS,14);
		code = textareaCode.value;
		var lines = code.split("\n");
		
		for(var i=0; i<lines.length; i++){
			var line = lines[i];
			memoria[ConvertBase.dec2bin(ROM_TOTAL_POSITIONS+i, 14)] = line;
		}
		console.log(memoria);
	});
	btnPasso.addEventListener("click", function(ev){
		passo();
	});
})();