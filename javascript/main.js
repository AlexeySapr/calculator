$(document).ready(function () {
	// VARIABLES
	var calc = $('.calculator');
	var calcDisplay_1 = calc.find('.calculator__display_1');
	var calcDisplay_2 = calc.find('.calculator__display_2');
	var calcDisplay_3 = calc.find('.calculator__display_3');
	var calcKeys = calc.find('.calculator__key');
	var calcButton = calc.find('.calculator__button');
	var calcClear = calc.find('.calculator__clear');
	var calcSpace = calc.find('.calculator__backspace');
	var calcPercent = calc.find('.calculator__percent');
	var calcDivide = calc.find('.calculator__divide');
	var calcMult = calc.find('.calculator__mult');
	var calcMinus = calc.find('.calculator__minus');
	var calcPlus = calc.find('.calculator__plus');
	var calcPoint = calc.find('.calculator__point');
	var calcPlusMin = calc.find('.calculator__plmin');
	var calcEqual = calc.find('.calculator__key__equal');
	var calcMemClear = calc.find('.calculator__memclear');
	var calcMemRecovery = calc.find('.calculator__memrecovery');
	var calcMemPlus = calc.find('.calculator__memplus');
	var calcMemMinus = calc.find('.calculator__memminus');
	var isEqual = false;
	var isPercent = false;
	var memory;
	var key;

	var eventСlick = new Event('click'); //создаем свое событие

	// КОДЫ КЛАВИШ
	var keyActions = {
		97: 1,
		98: 2,
		99: 3,
		100: 4,
		101: 5,
		102: 6,
		103: 7,
		104: 8,
		105: 9,
		96: 0,
		107: '+',
		109: '-',
		106: '*',
		111: '/',
		13: 'enter',
		8: 'backspace',
		46: 'clear',
		110: '.',
	};

	// ВЫЗЫВАЕТСЯ СОБЫТИЕ ПО НАЖАНИЮ КЛАВИШ
	$('body').keydown(function (event) {
		key = keyActions[event.keyCode];
		switch (key) {
			case 1:
				one.dispatchEvent(eventСlick);
				break;
			case 2:
				two.dispatchEvent(eventСlick);
				break;
			case 3:
				three.dispatchEvent(eventСlick);
				break;
			case 4:
				four.dispatchEvent(eventСlick);
				break;
			case 5:
				five.dispatchEvent(eventСlick);
				break;
			case 6:
				six.dispatchEvent(eventСlick);
				break;
			case 7:
				seven.dispatchEvent(eventСlick);
				break;
			case 8:
				eight.dispatchEvent(eventСlick);
				break;
			case 9:
				nine.dispatchEvent(eventСlick);
				break;
			case 0:
				zero.dispatchEvent(eventСlick);
				break;
			case '+':
				plus.dispatchEvent(eventСlick);
				break;
			case '-':
				minus.dispatchEvent(eventСlick);
				break;
			case '*':
				mult.dispatchEvent(eventСlick);
				break;
			case '/':
				divide.dispatchEvent(eventСlick);
				break;
			case 'enter':
				keyequal.dispatchEvent(eventСlick);
				break;
			case 'backspace':
				backspace.dispatchEvent(eventСlick);
				break;
			case 'clear':
				clear.dispatchEvent(eventСlick);
				break;
			case '.':
				point.dispatchEvent(eventСlick);
				break;
			default:
				break;
		}
	});

	//FUNCTIONS
	// Округление дробных чисел
	function round(value, decimals) {
		return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	}

	// Промежуточное вычисление текущего значения в Display_1
	function disp_1_value() {
		var strValue = calcDisplay_1.val();
		if (strValue[strValue.length - 1] === '+') {
			let ind_1 = parseFloat(calcDisplay_1.val());
			let ind_2 = parseFloat(calcDisplay_2.val());
			let sum = ind_1 + ind_2;

			if (sum.toString().indexOf('e') == -1) {
				calcDisplay_1.val(round(sum, 10));
			} else {
				calcDisplay_1.val(sum);
			}
		} else if (strValue[strValue.length - 1] === '-') {
			let ind_1 = parseFloat(calcDisplay_1.val());
			let ind_2 = parseFloat(calcDisplay_2.val());
			let razn = ind_1 - ind_2;

			if (razn.toString().indexOf('e') == -1) {
				calcDisplay_1.val(round(razn, 10));
			} else {
				calcDisplay_1.val(razn);
			}
		} else if (strValue[strValue.length - 1] === '*') {
			let ind_1 = parseFloat(calcDisplay_1.val());
			let ind_2 = parseFloat(calcDisplay_2.val());
			let proisved = ind_1 * ind_2;
			calcDisplay_1.val(proisved);
		} else if (strValue[strValue.length - 1] === '/') {
			let ind_1 = parseFloat(calcDisplay_1.val());
			let ind_2 = parseFloat(calcDisplay_2.val());
			let chastnoe = ind_1 / ind_2;
			calcDisplay_1.val(chastnoe);
		}
	}

	// Вычисление результата
	function equal() {
		if (!isEqual) {
			disp_1_value();
			calcDisplay_2.val('');

			if (calcDisplay_1.val().length > 11) {
				let ind_1 = parseFloat(calcDisplay_1.val());
				calcDisplay_2.val(ind_1.toPrecision(6));
				calcDisplay_1.val('');
			} else {
				calcDisplay_2.val(calcDisplay_1.val());
				calcDisplay_1.val('');
			}

			isEqual = true;
		}
	}

	// INIT CALC KEYS	+++++++++++++++++++++++++++++++++
	calcKeys.each(function () {
		var current = $(this).attr('value');
		$(this).text(current);
	});

	// ADD NUMBERS TO INPUT	+++++++++++++++++++++++++++++++
	calcButton.on('click', function () {
		if (calcDisplay_2.val().length < 11) {
			if (isEqual) {
				isEqual = false;
				calcDisplay_2.val('' + $(this).attr('value'));
			} else {
				isEqual = false;
				calcDisplay_2.val(calcDisplay_2.val() + $(this).attr('value'));
			}
		}
	});

	// CLEAR INPUT ++++++++++++++++++++++++++++++++++++
	calcClear.on('click', function () {
		calcDisplay_1.val('');
		calcDisplay_2.val('');
		isPercent = false;
	});

	// MEMORY CLEAR ++++++++++++++++++++++++++++++++++++
	calcMemClear.on('click', function () {
		memory = '';
		calcDisplay_3.val(memory);
	});

	// MEMORY RECOVERY
	calcMemRecovery.on('click', function () {
		if (memory.length > 0) {
			calcDisplay_2.val(memory);
		}
	});

	// MEMORY PLUS
	calcMemPlus.on('click', function () {
		if (calcDisplay_3.val().length === 0 || calcDisplay_3.val() === '0') {
			if (calcDisplay_1.val().length === 0 && calcDisplay_2.val().length > 0) {
				memory = calcDisplay_2.val();
				calcDisplay_3.val(memory);
				calcDisplay_2.val('');
			} else if (calcDisplay_2.val().length === 0 && calcDisplay_1.val().length > 0) {
				let tempInd_1 = calcDisplay_1.val().slice(0, calcDisplay_1.val().length - 1);
				memory = tempInd_1;
				calcDisplay_3.val(memory);
			} else if (calcDisplay_2.val().length > 0 && calcDisplay_1.val().length > 0) {
				equal();
				memory = calcDisplay_2.val();
				calcDisplay_3.val(memory);
				calcDisplay_2.val('');
			}
		} else {
			if (calcDisplay_1.val().length === 0 && calcDisplay_2.val().length > 0) {
				calcDisplay_1.val(calcDisplay_3.val() + '+');
				disp_1_value();
				memory = calcDisplay_1.val();
				calcDisplay_1.val('');
				calcDisplay_2.val('');
				calcDisplay_3.val(memory);
			} else if (calcDisplay_2.val().length === 0 && calcDisplay_1.val().length > 0) {
				let tempInd_1 = calcDisplay_1.val().slice(0, calcDisplay_1.val().length - 1);
				calcDisplay_1.val(tempInd_1 + '+');
				calcDisplay_2.val(calcDisplay_3.val());
				disp_1_value();
				memory = calcDisplay_1.val();
				calcDisplay_1.val('');
				calcDisplay_2.val('');
				calcDisplay_3.val(memory);
			} else if (calcDisplay_2.val().length > 0 && calcDisplay_1.val().length > 0) {
				equal();
				calcDisplay_1.val(calcDisplay_3.val() + '+');
				disp_1_value();
				memory = calcDisplay_1.val();
				calcDisplay_1.val('');
				calcDisplay_2.val('');
				calcDisplay_3.val(memory);
			}
		}
	});

	// MEMORY MINUS
	calcMemMinus.on('click', function () {
		if (calcDisplay_3.val().length === 0 || calcDisplay_3.val() === '0') {
			if (calcDisplay_1.val().length === 0 && calcDisplay_2.val().length > 0) {
				if (calcDisplay_2.val()[0] !== '-') {
					memory = calcDisplay_2.val();
					calcDisplay_3.val('-' + memory);
					calcDisplay_2.val('');
				} else {
					memory = calcDisplay_2.val().slice(1);
					calcDisplay_3.val(memory);
					calcDisplay_2.val('');
				}
			} else if (calcDisplay_2.val().length === 0 && calcDisplay_1.val().length > 0) {
				let tempInd_1 = calcDisplay_1.val().slice(0, calcDisplay_1.val().length - 1);
				memory = tempInd_1;
				calcDisplay_3.val('-' + memory);
			} else if (calcDisplay_2.val().length > 0 && calcDisplay_1.val().length > 0) {
				equal();
				memory = calcDisplay_2.val();
				calcDisplay_3.val('-' + memory);
				calcDisplay_2.val('');
			}
		} else {
			if (calcDisplay_1.val().length === 0 && calcDisplay_2.val().length > 0) {
				calcDisplay_1.val(calcDisplay_3.val() + '-');
				disp_1_value();
				memory = calcDisplay_1.val();
				calcDisplay_1.val('');
				calcDisplay_2.val('');
				calcDisplay_3.val(memory);
			} else if (calcDisplay_2.val().length === 0 && calcDisplay_1.val().length > 0) {
				let tempInd_1 = calcDisplay_1.val().slice(0, calcDisplay_1.val().length - 1);
				calcDisplay_1.val(tempInd_1 + '-');
				calcDisplay_2.val(calcDisplay_3.val());
				disp_1_value();
				memory = calcDisplay_1.val();
				calcDisplay_1.val('');
				calcDisplay_2.val('');
				calcDisplay_3.val(memory);
			} else if (calcDisplay_2.val().length > 0 && calcDisplay_1.val().length > 0) {
				equal();
				calcDisplay_1.val(calcDisplay_3.val() + '-');
				disp_1_value();
				memory = calcDisplay_1.val();
				calcDisplay_1.val('');
				calcDisplay_2.val('');
				calcDisplay_3.val(memory);
			}
		}
	});

	// PLUS BUTTON
	calcPlus.on('click', function () {
		if (calcDisplay_1.val().length !== 0 || calcDisplay_2.val().length !== 0) {
			isPercent = false;
			if (calcDisplay_1.val().length === 0) {
				calcDisplay_1.val(calcDisplay_2.val() + $(this).attr('value'));
				calcDisplay_2.val('');
			} else if (calcDisplay_2.val().length === 0) {
				let tempInd_1 = calcDisplay_1.val().slice(0, calcDisplay_1.val().length - 1);
				calcDisplay_1.val(tempInd_1 + $(this).attr('value'));
			} else {
				disp_1_value();
				calcDisplay_1.val(calcDisplay_1.val() + $(this).attr('value'));
				calcDisplay_2.val('');
			}
		}
	});

	// MINUS BUTTON
	calcMinus.on('click', function () {
		if (calcDisplay_1.val().length !== 0 || calcDisplay_2.val().length !== 0) {
			isPercent = false;
			if (calcDisplay_1.val().length === 0) {
				calcDisplay_1.val(calcDisplay_2.val() + $(this).attr('value'));
				calcDisplay_2.val('');
			} else if (calcDisplay_2.val().length === 0) {
				let tempInd_1 = calcDisplay_1.val().slice(0, calcDisplay_1.val().length - 1);
				calcDisplay_1.val(tempInd_1 + $(this).attr('value'));
			} else {
				disp_1_value();
				calcDisplay_1.val(calcDisplay_1.val() + $(this).attr('value'));
				calcDisplay_2.val('');
			}
		}
	});

	// MULT BUTTON
	calcMult.on('click', function () {
		if (calcDisplay_1.val().length !== 0 || calcDisplay_2.val().length !== 0) {
			isPercent = false;

			if (calcDisplay_1.val().length === 0) {
				calcDisplay_1.val(calcDisplay_2.val() + $(this).attr('value'));
				calcDisplay_2.val('');
			} else if (calcDisplay_2.val().length === 0) {
				let tempInd_1 = calcDisplay_1.val().slice(0, calcDisplay_1.val().length - 1);
				calcDisplay_1.val(tempInd_1 + $(this).attr('value'));
			} else {
				disp_1_value();
				calcDisplay_1.val(calcDisplay_1.val() + $(this).attr('value'));
				calcDisplay_2.val('');
			}
		}
	});

	// DIVIDE BUTTON
	calcDivide.on('click', function () {
		if (calcDisplay_1.val().length !== 0 || calcDisplay_2.val().length !== 0) {
			isPercent = false;
			if (calcDisplay_1.val().length === 0) {
				calcDisplay_1.val(calcDisplay_2.val() + $(this).attr('value'));
				calcDisplay_2.val('');
			} else if (calcDisplay_2.val().length === 0) {
				let tempInd_1 = calcDisplay_1.val().slice(0, calcDisplay_1.val().length - 1);
				calcDisplay_1.val(tempInd_1 + $(this).attr('value'));
			} else {
				disp_1_value();
				calcDisplay_1.val(calcDisplay_1.val() + $(this).attr('value'));
				calcDisplay_2.val('');
			}
		}
	});

	// PERCENT BUTTON
	calcPercent.on('click', function () {
		if (calcDisplay_1.val().length !== 0 && calcDisplay_2.val().length !== 0) {
			if (!isPercent) {
				let ind_1 = parseFloat(calcDisplay_1.val());
				let ind_2 = parseFloat(calcDisplay_2.val());
				let percentValue = ind_1 * (ind_2 / 100);
				calcDisplay_2.val(percentValue);
				isPercent = true;
			}
		}
	});

	// BACKSPACE BUTTON ++++++++++++++++++++++++++++++++++++++
	calcSpace.on('click', function () {
		calcDisplay_2.val(calcDisplay_2.val().substring(0, calcDisplay_2.val().length - 1));
	});

	//PLUS MINUS BUTTON ++++++++++++++++++++++++++++++++++++++
	calcPlusMin.on('click', function () {
		var strValue = calcDisplay_2.val();
		if (strValue[0] !== '-') {
			calcDisplay_2.val('-' + calcDisplay_2.val());
		} else {
			calcDisplay_2.val(calcDisplay_2.val().substring(1));
		}
	});

	//POINT BUTTON ++++++++++++++++++++++++++++++++++++++
	calcPoint.on('click', function () {
		var strValue = calcDisplay_2.val();
		if (strValue.length === 0) {
			calcDisplay_2.val('0' + $(this).attr('value'));
		} else if (strValue.indexOf('.') == -1) {
			calcDisplay_2.val(calcDisplay_2.val() + $(this).attr('value'));
		}
	});

	// SHOW RESULT	++++++++++++++++++++++++++++++++++++++
	calcEqual.on('click', function () {
		isPercent = false;
		if (calcDisplay_2.val().length === 0) {
			let tempInd_1 = calcDisplay_1.val().slice(0, calcDisplay_1.val().length - 1);
			calcDisplay_2.val(tempInd_1);
			calcDisplay_1.val('');
		} else if (calcDisplay_1.val().length === 0) {
			calcDisplay_2.val(calcDisplay_2.val());
		} else {
			equal();
		}
	});
});
