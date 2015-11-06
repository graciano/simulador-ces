var textareaCode = document.getElementById('code');
var btnPasso = document.getElementById('btn-passo');
var btnCarrega = document.getElementById('btn-carrega');

var displayP = document.getElementById('RP');
var displayT = document.getElementById('RT');
var displayC = document.getElementById('RC');


var loadROM = function(){
	CES.memory[ConvertBase.dec2bin(0, BINARY_ARG_SIZE)] = "0000";
	CES.memory[ConvertBase.dec2bin(1, BINARY_ARG_SIZE)] = "0001";
	CES.memory[ConvertBase.dec2bin(2, BINARY_ARG_SIZE)] = "0002";
	CES.memory[ConvertBase.dec2bin(3, BINARY_ARG_SIZE)] = "0003";
};

btnCarrega.addEventListener("click", function(ev){
	loadROM();

	CES.P = ConvertBase.dec2bin(ROM_TOTAL_POSITIONS,BINARY_ARG_SIZE);
	
	code = textareaCode.value;

	var lines = code.split("\n");
	
	for(var i=0; i<lines.length; i++){
		var line = lines[i];
		CES.memory[ConvertBase.dec2bin(ROM_TOTAL_POSITIONS + i, BINARY_ARG_SIZE)] = line;
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