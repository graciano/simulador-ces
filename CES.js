var CES = {

	P:0, //Registrador P

	C:0, //Registrador C
	
	T:0, //Registrador T

	//TODO ler a ROM do ces no ~cp
	memory : [],

	// line é hexadecimal
	instruction : function(line){

		var num = ConvertBase.hex2bin(line, BINARY_SIZE);

		return num.substr(0,BINARY_INST_SIZE);

	},

	// line é hexadecimal
	argument : function(line){

		var num = ConvertBase.hex2bin(line, BINARY_SIZE);

		return num.substr(BINARY_INST_SIZE,BINARY_ARG_SIZE);

	},

	step : function(){
		
		var line = this.memory[this.P];
		
		var inst = this.instruction(line);
		var arg = this.argument(line);

		switch(inst){
			
			case "00":
				this.T = this.memory[arg];
				this.P = Helper.binaryPlusPlus(this.P,BINARY_ARG_SIZE);
				break;
			
			case "01":
				this.load(arg,this.T);
				this.P = Helper.binaryPlusPlus(this.P,BINARY_ARG_SIZE);
				break;
			
			case "10":
				if(this.T < this.memory[arg])
					this.C = 1;
				else
					this.C = 0;

				this.T = Helper.hexSub(this.T, this.memory[arg], HEX_SIZE);
				this.P = Helper.binaryPlusPlus(this.P, BINARY_ARG_SIZE);
				break;
			
			case "11":
				if(!this.C){
					this.P = arg;
				}
				else{
					this.P = Helper.binaryPlusPlus(this.P,BINARY_ARG_SIZE);
				}
				break;
			default:
				alert("DEU COCÔ, MEU QUERIDO");
		}

	},
	//address = 14bits binary / value = 16bits hexadecimal
	load:function(address,value){
		this.memory[address] = value;
	}

};

	