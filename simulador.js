var ROM_TOTAL_POSITIONS = parseInt(ConvertBase.hex2dec("0400"));
var BINARY_ARG_SIZE = 14;
var BINARY_INST_SIZE = 2;
var BINARY_SIZE = 16;	
var HEX_SIZE = 4;

(function(){
	var textareaCode = document.getElementById('code');
	var btnPasso = document.getElementById('btn-passo');
	var btnCarrega = document.getElementById('btn-carrega');

	var displayP = document.getElementById('RP');
	var displayT = document.getElementById('RT');
	var displayC = document.getElementById('RC');
	
	var loadROM = function(){

		CES.load(ConvertBase.dec2bin(0, BINARY_ARG_SIZE),"0000");
		CES.load(ConvertBase.dec2bin(1, BINARY_ARG_SIZE),"0001");
		CES.load(ConvertBase.dec2bin(2, BINARY_ARG_SIZE),"0002");
		CES.load(ConvertBase.dec2bin(3, BINARY_ARG_SIZE),"0003");

	};

	btnCarrega.addEventListener("click", function(ev){
		loadROM();

		CES.P = ConvertBase.dec2bin(ROM_TOTAL_POSITIONS,BINARY_ARG_SIZE);
		
		var lines = textareaCode.value.split("\n");
		
		for(var i=0; i<lines.length; i++){
			CES.load(ConvertBase.dec2bin(ROM_TOTAL_POSITIONS + i, BINARY_ARG_SIZE), lines[i]);
		}
		
		console.log(CES.memory);
		display();
	});

	btnPasso.addEventListener("click", function(ev){
		CES.step();
		display();
	});

	var display = function(){

		displayC.textContent = CES.C.toString();
		displayP.textContent = CES.P.toString();
		displayT.textContent = CES.T.toString();

	}	

})()