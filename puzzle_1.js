function findCalibrationValuesSum(groupMatcher, valueMapper) {
  return input.split('\n')
      .map((line) => [...line.match(new RegExp(`(?=(${groupMatcher})).*(${groupMatcher})`))])
      .map(([_, first, last]) => valueMapper
          ? [valueMapper(first), valueMapper(last)]
          : [first, last])
      .map(([first, last]) => +(first + (last ?? first)))
      .reduce((sum, curr) => sum + curr)
}

/* Part 1 */
console.log(findCalibrationValuesSum('\\d'));

/* Part 2 */
const lettersSpelledOut = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'
};
const spelledOutGroupMatch = `${Object.keys(lettersSpelledOut).join('|')}|\\d`;
const valueMapper = (value) => lettersSpelledOut[value] ?? value;
console.log(findCalibrationValuesSum(spelledOutGroupMatch, valueMapper));
