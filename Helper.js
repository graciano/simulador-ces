var Helper = {

	binaryPlusPlus : function(bin,length){
		
		var dec = ConvertBase.bin2dec(bin);
		
		dec++;
		
		return ConvertBase.dec2bin(dec,length);

	},

	binarySum : function(a, b){
		
		var aDec = ConvertBase.bin2dec(a);
		var bDec = ConvertBase.bin2dec(a);

		var result = aDec + bDec;
		
		return ConvertBase.dec2bin(result);

	},

	binarySub : function(a, b, length){

		var aDec = ConvertBase.bin2dec(a);
		var bDec = ConvertBase.bin2dec(a);
		
		var result = aDec - bDec;

		return ConvertBase.dec2bin(result, length);

	},

	hexSub : function(a, b, length){
		
		var result = ConvertBase.hex2dec(a) - ConvertBase.hex2dec(b);

		//TODO colocar isso pra fora???
		if(result < 0){
			result = ConvertBase.hex2dec("FFFF") + result;
		}

		return ConvertBase.dec2hex(result, length);

	}

}