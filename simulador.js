(function(){
	var textareaCode = document.getElementById('code');
	var btnPasso = document.getElementById('btn-passo');
	var btnCarrega = document.getElementById('btn-carrega');
	
	var ROM_TOTAL_POSITIONS = parseInt(ConvertBase.hex2dec("0400"));
	var BINARY_ARG_SIZE = 14;
	var BINARY_INST_SIZE = 2;
	var BINARY_SIZE = 16;	
	var HEX_SIZE = 4;
	
	var CES = {

		P:"0001",
	
		C:0,
	
		T:0
	
	};

	var binaryPlusPlus = function(bin,length){
		
		var dec = ConvertBase.bin2dec(bin);
		
		dec++;
		
		return ConvertBase.dec2bin(dec,length);

	};

	var binarySum = function(a, b){
		
		var aDec = ConvertBase.bin2dec(a);
		var bDec = ConvertBase.bin2dec(a);

		var result = aDec + bDec;
		
		return ConvertBase.dec2bin(result);

	}
	var binarySub = function(a, b, length){

		var aDec = ConvertBase.bin2dec(a);
		var bDec = ConvertBase.bin2dec(a);
		
		var result = aDec - bDec;

		return ConvertBase.dec2bin(result, length);

	}

	//TODO ler a ROM do ces no ~cp
	var memory = [];

	//assumindo que P vem como hexadecimal
	var instruction = function(line){

		var num = ConvertBase.hex2bin(line, BINARY_SIZE);

		return parseInt(ConvertBase.bin2dec(num.substr(0,BINARY_INST_SIZE)));

	};

	//TODO fazer funcionar sem usar substring
	var argument = function(line){

		var num = ConvertBase.hex2bin(line, BINARY_SIZE);

		return num.substr(2,BINARY_ARG_SIZE);

	};

	var hexSub = function(a, b, length){
		
		var result = ConvertBase.hex2dec(a) - ConvertBase.hex2dec(b);

		if(result < 0){
			result = ConvertBase.hex2dec("FFFF") + result;
		}

		return ConvertBase.dec2hex(result, length);

	};

	var step = function(){
		
		var line = memory[CES.P]; // THIS IS STILL BINARY BUT JAVASCRIPT THINK IT IS INT
		
		console.log(line);
		
		var inst = instruction(line);
		var arg = argument(line);
		
		console.log(inst);
		console.log(arg);

		switch(inst){
			
			case 0:
				CES.T = memory[arg];
				CES.P = binaryPlusPlus(CES.P,BINARY_ARG_SIZE);
				break;
			
			case 1:
				memory	[arg] = CES.T;
				CES.P = binaryPlusPlus(CES.P,BINARY_ARG_SIZE);
				break;
			
			case 2:
				if(CES.T < memory[arg])
					CES.C = 1;
				else
					CES.C = 0;

				CES.T = hexSub(CES.T, memory[arg], HEX_SIZE);
				CES.P = binaryPlusPlus(CES.P, BINARY_ARG_SIZE);
				break;
			
			case 3:
				if(!CES.C){
					CES.P = arg;
				}
				else{
					CES.P = binaryPlusPlus(CES.P,BINARY_ARG_SIZE);
				}
				break;
			default:
				console.log("you are fucked");
		}

		console.log(CES);
		console.log(memory);
	};

	var loadROM = function(){
		memory[ConvertBase.dec2bin(0, BINARY_ARG_SIZE)] = "0000";
		memory[ConvertBase.dec2bin(1, BINARY_ARG_SIZE)] = "0001";
		memory[ConvertBase.dec2bin(2, BINARY_ARG_SIZE)] = "0002";
		memory[ConvertBase.dec2bin(3, BINARY_ARG_SIZE)] = "0003";
	};

	btnCarrega.addEventListener("click", function(ev){
		loadROM();

		CES.P = ConvertBase.dec2bin(ROM_TOTAL_POSITIONS,BINARY_ARG_SIZE);
		
		code = textareaCode.value;

		var lines = code.split("\n");
		
		for(var i=0; i<lines.length; i++){
			var line = lines[i];
			memory[ConvertBase.dec2bin(ROM_TOTAL_POSITIONS + i, BINARY_ARG_SIZE)] = line;
		}
		
		console.log(memory);
	});
	
	btnPasso.addEventListener("click", function(ev){
		step();
	});
})();