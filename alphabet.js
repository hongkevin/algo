'use strict';

const readline = require('readline');

let input = [];

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.prompt();

rl.on('line', function (cmd) {
	input.push(cmd);
});

const calculateDistance = function(inputArray) {
	let tempArray = [];
	inputArray.forEach((value, index, array) => {
		let difference = alphabetArray.indexOf(array[index + 1]) - alphabetArray.indexOf(value);
		difference = difference < 0 ? difference + 26 : difference;
		tempArray.push(difference);

	});
	tempArray.pop();
	return tempArray;
};

const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
const sentenceArray = input[0].split(""); // ["s", "r", "b", ...]
const sentenceDiff = calculateDistance(sentenceArray); // [17,25,10,20,5,5,0,25,1,25,24,23,5,17,5,11,9,3,24]


rl.on('close', function(cmd) {

	for (let i = 2, length = 2 + parseInt(input[1]); i < length; i++) {
		let hintArray = input[i].split(""); // ["b", "a", "k", "e"]
		let hintDiff = calculateDistance(hintArray); // [25, 10, 20]

		if (sentenceDiff.join(",").indexOf(hintDiff.join(",")) > -1) {

			let startIndex = 0;
			for (let j = 0, length2 = sentenceDiff.length - hintDiff.length; j < length2; j++) {
				let sliceArray = sentenceDiff.slice(j, j + hintDiff.length);
				if (JSON.stringify(sliceArray) == JSON.stringify(hintDiff)) {
					startIndex = j;
				}
			}

			let diff = alphabetArray.indexOf(sentenceArray[startIndex]) - alphabetArray.indexOf(hintArray[0]); // 18 - 1 = 17
			let result = sentenceArray.map(function(value) {
				let target = alphabetArray.indexOf(value) - diff;
				target = target < 0 ? target + 26 : target;
				return alphabetArray[target];
			});

			console.log(result.join(""));
			return;
		}
	}

	process.exit(0);
});