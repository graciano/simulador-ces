var ROM_TOTAL_POSITIONS = parseInt(ConvertBase.hex2dec("0400"));
var BINARY_ARG_SIZE = 14;
var BINARY_INST_SIZE = 2;
var BINARY_SIZE = 16;	
var HEX_SIZE = 4;

var CES = {

	P:0, //Registrador P

	C:0, //Registrador C
	
	T:0, //Registrador T

	//TODO ler a ROM do ces no ~cp
	memory : [],

	//assumindo que P vem como hexadecimal
	instruction : function(line){

		var num = ConvertBase.hex2bin(line, BINARY_SIZE);

		return parseInt(ConvertBase.bin2dec(num.substr(0,BINARY_INST_SIZE)));

	},

	//TODO fazer funcionar sem usar substring
	argument : function(line){

		var num = ConvertBase.hex2bin(line, BINARY_SIZE);

		return num.substr(2,BINARY_ARG_SIZE);

	},

	step : function(){
		
		var line = this.memory[this.P]; // THIS IS STILL BINARY BUT JAVASCRIPT THINK IT IS INT
		
		console.log(line);
		
		var inst = this.instruction(line);
		var arg = this.argument(line);
		
		console.log(inst);
		console.log(arg);

		switch(inst){
			
			case 0:
				this.T = this.memory[arg];
				this.P = Helper.binaryPlusPlus(this.P,BINARY_ARG_SIZE);
				break;
			
			case 1:
				this.load(arg,this.T);
				this.P = Helper.binaryPlusPlus(this.P,BINARY_ARG_SIZE);
				break;
			
			case 2:
				if(this.T < this.memory[arg])
					this.C = 1;
				else
					this.C = 0;

				this.T = Helper.hexSub(this.T, this.memory[arg], HEX_SIZE);
				this.P = Helper.binaryPlusPlus(this.P, BINARY_ARG_SIZE);
				break;
			
			case 3:
				if(!this.C){
					this.P = arg;
				}
				else{
					this.P = Helper.binaryPlusPlus(this.P,BINARY_ARG_SIZE);
				}
				break;
			default:
				console.log("you are fucked");
		}

		console.log("P = "+this.P);
		console.log("T = "+this.T);
		console.log("C = "+this.C);
		console.log(CES.memory);
	},
	//address = 14bits binary / value = 16bits hexadecimal
	load:function(address,value){
		this.memory[address] = value;
	}

};

	