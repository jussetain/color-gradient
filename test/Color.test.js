import Color from "../src/Color.js";

const mockColor6 = new Color('#FF0000');
const mockColor3 = new Color('#123');

test('should 6-hex color be instanciated', () => {
  const testColor = new Color('#FF0000');
  expect(mockColor6).toStrictEqual(testColor);
});

test('should 3-hex color be instanciated', () => {
  const testColor = new Color('#123');
  expect(mockColor3).toStrictEqual(testColor);
});

test('should throw error on hex color format', () => {
  try {
    new Color('#1234');
    fail('it should not reach here');
  } catch (e) {
    expect(e.message).toBe("Hex value or color format is not valid");
  }
});

test('should throw error on hex value', () => {
  try {
    new Color('#AGA');
    fail('it should not reach here');
  } catch (e) {
    expect(e.message).toBe("Hex value or color format is not valid");
  }
});

describe('should isValidHex work', () => {
  test('right color 6-hex format with #', () => {
    const result = Color.isValidHex('#FF0000');
    expect(result).toBeTruthy();
  });

  test('right color 6-hex format with no #', () => {
    const result = Color.isValidHex('FF0000');
    expect(result).toBeTruthy();
  });

  test('right color 3-hex format with #', () => {
    const result = Color.isValidHex('#FF0');
    expect(result).toBeTruthy();
  });

  test('right color 3-hex format with no #', () => {
    const result = Color.isValidHex('FF0');
    expect(result).toBeTruthy();
  });

  test('wrong format', () => {
    const result = Color.isValidHex('azerty');
    expect(result).toBeFalsy();
  });

  test('wrong format with #', () => {
    const result = Color.isValidHex('#azerty');
    expect(result).toBeFalsy();
  });

  test('empty value', () => {
    const result = Color.isValidHex();
    expect(result).toBeFalsy();
  });
});

describe('should hexToDec', () => {
  test('convert FF to 255', () => expect(Color.hexToDec('FF')).toBe(255));
  test('convert 00 to 0', () => expect(Color.hexToDec('00')).toBe(0));
  test('convert GRGR to NaN', () => expect(Color.hexToDec('GRGR')).toBe(NaN));

});

describe('should decToHex', () => {
  test('convert 255 to ff', () => expect(Color.decToHex(255)).toBe('ff'));
  test('convert 0 to 00', () => expect(Color.decToHex(0)).toBe('00'));
  test('convert FF to NaN', () => expect(Color.decToHex('FF')).toBe(NaN));
});



