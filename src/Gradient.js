import Color from './Color.js';

export default class Gradient {
  constructor(...hexs) {
    this.colors = [];
    for (const hex of hexs) {
      if (Color.isValidHex(hex)) {
        this.colors.push(new Color(hex));
      }
    }
  }

  /**
   * 
   * @param {number} value The numeric value on the 0-100 scale
   * @returns The subgradient composed of two colors
   */
  getSubGradient = (value) => {
    if (isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    const subgradientIndex = Math.min(
      Math.trunc(
        value * (this.colors.length - 1) / 100
      ),
      this.colors.length - 2
    );
    const scale = this.getColorsScale();
    return {
      from: {
        color: this.colors[subgradientIndex],
        value: scale[subgradientIndex]
      },
      to: {
        color: this.colors[subgradientIndex + 1],
        value: scale[subgradientIndex + 1]
      }
    };
  }

  /**
   * 
   * @returns The numeric scale of the gradient
   */
  getColorsScale = () => this.colors.map((_, index) => index * 100 / (this.colors.length - 1));

  /**
   * 
   * @param {number} value1 The value of the first number
   * @param {number} weight1 The weight of the first number
   * @param {number} value2 The value of the second number
   * @param {number} weight2 The weight of the second number
   * @returns the weighted average for a color composite
   */
  getWeightedAverage = (value1, weight1, value2, weight2) => {
    const a = Math.pow(value1, 2) * weight1;
    const b = Math.pow(value2, 2) * weight2;
    return Math.sqrt((a + b) / (weight1 + weight2));
  }

  /**
   * 
   * @param {number} value The numeric value on the 0-100 scale 
   * @param {string} format the output format
   * @returns the color on the gradient
   */
  getColorFromValue = (value, format = 'hex') => {
    const subGradient = this.getSubGradient(value);

    const totalWeight = Math.round(subGradient.to.value - subGradient.from.value)

    const leftWeight = Math.round(totalWeight - Math.abs(subGradient.from.value - value));
    const rightWeight = Math.round(totalWeight - leftWeight);

    const red = Math.round(this.getWeightedAverage(subGradient.from.color.r, leftWeight, subGradient.to.color.r, rightWeight));
    const green = Math.round(this.getWeightedAverage(subGradient.from.color.g, leftWeight, subGradient.to.color.g, rightWeight));
    const blue = Math.round(this.getWeightedAverage(subGradient.from.color.b, leftWeight, subGradient.to.color.b, rightWeight));

    if (format === 'hex') {
      return `#${Color.decToHex(red)}${Color.decToHex(green)}${Color.decToHex(blue)}`
    } else if (format === 'rgb') {
      return `rgb(${red}, ${green}, ${blue})`
    }

    return [red, green, blue];
  }
}
