export default class Color {
  constructor(hex) {
    if (!Color.isValidHex(hex)) {
      throw new Error('Hex value or color format is not valid');
    }

    const curated_hex = hex.replace('#', '');

    const split_regex = curated_hex.length == 3 ? /.{1}/g : /.{1,2}/g
    const array_colors = curated_hex.match(split_regex);

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
    if (!/\d+/.test(dec)) {
      return NaN;
    }
    let hex = dec.toString(16);
    if (hex.length <= 1) {
      hex = "0" + hex;
    }
    return hex;
  };
}
