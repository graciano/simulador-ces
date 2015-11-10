const HTML_LINE_NUMBER = "<li class='js-line-number'>@:</li>",
		REPLACE_NUMBER_CHAR = "@",
		LINE_NUMBER_START = 1024; //400h
(function(){
	var textareaCode = document.getElementById('code');
	var lineNumbersDiv = document.getElementById('line-numbers');
	var lineHeight = textareaCode.style.height;
	var getLineCount = function() { return textareaCode.value.split("\n").length; };

	var setStyleLineNumbers = function(){
		var allLineNumbers = document.getElementsByClassName('js-line-number');
		for(var i=0; i<allLineNumbers.length; i++){
			allLineNumbers[i].style.height = lineHeight;
		}
	};

	var getHtmlLineNumber = function(number){
		// o bug está na chamada da função ConverterBase.dec2hex(number, 4); sei lá porque
		var result = HTML_LINE_NUMBER;
		return result.replace(REPLACE_NUMBER_CHAR, ConvertBase.dec2hex(number+LINE_NUMBER_START)).toUpperCase();
	};

	var lastLineNumber = function(){
		var allLineNumbers = document.getElementsByClassName('js-line-number');
		return allLineNumbers[allLineNumbers.length - 1];
	};

	var atualizaLineNumber = function(){
		var innerHTML = "";
		console.log(getHtmlLineNumber(0));
		for(var i=0; i<getLineCount(); i++){
			innerHTML = innerHTML + "\n" + getHtmlLineNumber(i);
		}
		lineNumbersDiv.innerHTML = innerHTML;
		setStyleLineNumbers();
	};

	textareaCode.addEventListener('keyup', function(ev){
		if(ev.keyCode == 13 || ev.keyCode == 8){ 
			atualizaLineNumber();
		}
	});
})();