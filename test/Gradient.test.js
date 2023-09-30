import Gradient from "../src/Gradient.js";
import Color from "../src/Color.js";

const colors_3 = ['#FF0000', '#0000FF', '#FFFFFF'];
const colors_5 = ['#FF0000', '#0000FF', '#FFFFFF', '#00FF00', '#FFFF00'];
const colors_3_wrong = ['#FF0000', '#0000FF', '#FFFFFF', '#FGEAMP'];

test('should gradient be properly instanciated', () => {
  const gradient = new Gradient(...colors_3);
  expect(gradient.colors).toStrictEqual(colors_3.map(c => new Color(c)));
});

test('should gradient be properly instanciated even with faulty values', () => {
  const gradient = new Gradient(...colors_3_wrong);
  expect(gradient.colors).toStrictEqual(colors_3.map(c => new Color(c)));
});

test('should getColorsScale work', () => {
  const gradient = new Gradient(...colors_3);
  const gradient2 = new Gradient(...colors_5);
  expect(gradient.getColorsScale()).toStrictEqual([0, 50, 100]);
  expect(gradient2.getColorsScale()).toStrictEqual([0, 25, 50, 75, 100]);
});

describe('should getSubGradient work', () => {
  test('with value = 0', () => {
    const gradient = new Gradient(...colors_3);
    const subgradient = gradient.getSubGradient(0);
    expect(subgradient).toStrictEqual({
      from: {
        color: new Color(colors_3[0]),
        value: 0
      },
      to: {
        color: new Color(colors_3[1]),
        value: 50
      }
    });
  });
  test('with value = 100', () => {
    const gradient = new Gradient(...colors_3);
    const subgradient = gradient.getSubGradient(100);
    expect(subgradient).toStrictEqual({
      from: {
        color: new Color(colors_3[1]),
        value: 50
      },
      to: {
        color: new Color(colors_3[2]),
        value: 100
      }
    });
  });
  test('with value = 50', () => {
    const gradient = new Gradient(...colors_3);
    const subgradient = gradient.getSubGradient(50);
    expect(subgradient).toStrictEqual({
      from: {
        color: new Color(colors_3[1]),
        value: 50
      },
      to: {
        color: new Color(colors_3[2]),
        value: 100
      }
    });
  });
  test('with value = -100', () => {
    const gradient = new Gradient(...colors_3);
    const subgradient = gradient.getSubGradient(-100);
    expect(subgradient).toStrictEqual({
      from: {
        color: new Color(colors_3[0]),
        value: 0
      },
      to: {
        color: new Color(colors_3[1]),
        value: 50
      }
    });
  });
  test('with value = 1000', () => {
    const gradient = new Gradient(...colors_3);
    const subgradient = gradient.getSubGradient(1000);
    expect(subgradient).toStrictEqual({
      from: {
        color: new Color(colors_3[1]),
        value: 50
      },
      to: {
        color: new Color(colors_3[2]),
        value: 100
      }
    });
  });
  test('with value = NaN', () => {
    const gradient = new Gradient(...colors_3);
    const subgradient = gradient.getSubGradient('caca');
    expect(subgradient).toStrictEqual({
      from: {
        color: new Color(colors_3[0]),
        value: 0
      },
      to: {
        color: new Color(colors_3[1]),
        value: 50
      }
    });
  });
});

describe('should getWeightedAverage work', () => {
  test('with values 1 1 1 1', () => {
    const gradient = new Gradient(...colors_3);
    expect(gradient.getWeightedAverage(1, 1, 1, 1)).toBe(1);
  });
  test('with values 1 9 1 1', () => {
    const gradient = new Gradient(...colors_3);
    const value = Math.round(gradient.getWeightedAverage(9, 1, 1, 1) * 1000) / 1000
    expect(value).toBe(6.403);
  });
  test('with values 1 2 3 4', () => {
    const gradient = new Gradient(...colors_3);
    const value = Math.round(gradient.getWeightedAverage(1, 2, 3, 4) * 1000) / 1000
    expect(value).toBe(2.517);
  });
  test('with values 255 34 121 66', () => {
    const gradient = new Gradient(...colors_3);
    const value = Math.round(gradient.getWeightedAverage(255, 34, 121, 66) * 1000) / 1000
    expect(value).toBe(178.246);
  });
});

describe('should getColorFromValue work', () => {
  test('for value 0', () => {
    const gradient = new Gradient(...colors_3);
    const colorHex = gradient.getColorFromValue(0);
    const colorRgb = gradient.getColorFromValue(0, 'rgb');
    const colorComposite = gradient.getColorFromValue(0, null);
    expect(colorHex).toBe('#ff0000');
    expect(colorRgb).toBe('rgb(255, 0, 0)');
    expect(colorComposite).toStrictEqual([255, 0, 0]);
  });
  test('for value 25', () => {
    const gradient = new Gradient(...colors_3);
    const colorHex = gradient.getColorFromValue(25);
    const colorRgb = gradient.getColorFromValue(25, 'rgb');
    const colorComposite = gradient.getColorFromValue(25, null);
    expect(colorHex).toBe('#b400b4');
    expect(colorRgb).toBe('rgb(180, 0, 180)');
    expect(colorComposite).toStrictEqual([180, 0, 180]);
  });
  test('for value 50', () => {
    const gradient = new Gradient(...colors_3);
    const colorHex = gradient.getColorFromValue(50);
    const colorRgb = gradient.getColorFromValue(50, 'rgb');
    const colorComposite = gradient.getColorFromValue(50, null);
    expect(colorHex).toBe('#0000ff');
    expect(colorRgb).toBe('rgb(0, 0, 255)');
    expect(colorComposite).toStrictEqual([0, 0, 255]);
  });
  test('for value 75', () => {
    const gradient = new Gradient(...colors_3);
    const colorHex = gradient.getColorFromValue(75);
    const colorRgb = gradient.getColorFromValue(75, 'rgb');
    const colorComposite = gradient.getColorFromValue(75, null);
    expect(colorHex).toBe('#b4b4ff');
    expect(colorRgb).toBe('rgb(180, 180, 255)');
    expect(colorComposite).toStrictEqual([180, 180, 255]);
  });
  test('for value 100', () => {
    const gradient = new Gradient(...colors_3);
    const colorHex = gradient.getColorFromValue(100);
    const colorRgb = gradient.getColorFromValue(100, 'rgb');
    const colorComposite = gradient.getColorFromValue(100, null);
    expect(colorHex).toBe('#ffffff');
    expect(colorRgb).toBe('rgb(255, 255, 255)');
    expect(colorComposite).toStrictEqual([255, 255, 255]);
  });
})



