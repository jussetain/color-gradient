class Color {
  constructor(hex) {
    const curated_hex = hex.replace('#', '');
    if (curated_hex.length !== 3 && curated_hex.length !== 6) {
      throw new Error('Hex color is not valid');
    }

    const split_regex = curated_hex.length == 3 ? /.{1}/g : /.{1,2}/g
    const array_colors = curated_hex.match(split_regex);
    if (array_colors.length !== 3) {
      throw new Error('Could not get RGB parameters');
    }

    this.r = Color.hexToDec(array_colors[0]);
    this.g = Color.hexToDec(array_colors[1]);
    this.b = Color.hexToDec(array_colors[2]);
  }

  static isValidHex = (hex) => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(hex);
  static hexToDec = (hex) => {
    if (hex.length === 1) hex = hex + hex;
    return parseInt(hex, 16);
  };
  static decToHex = (dec) => {
    let hex = dec.toString(16);
    if (hex.length <= 1) {
      hex = "0" + hex;
    }
    return hex;
  };
}

module.exports = Color;

