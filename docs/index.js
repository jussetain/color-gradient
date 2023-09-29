const NB_COLORS = 4;
let colors = [];

const randomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const decToHex = (dec) => {
  let hex = dec.toString(16);
  if (hex.length <= 1) {
    hex = "0" + hex;
  }
  return hex;
};


for (let i = 0; i < NB_COLORS; i++) {
  const r = randomValue(0, 255),
    g = randomValue(0, 255),
    b = randomValue(0, 255);
  colors.push(`#${decToHex(r)}${decToHex(g)}${decToHex(b)}`)
}


const gradient = new Gradient(...colors);

const addColorGradient = (color1, color2) => {
  let div = document.createElement('div');
  div.className = "gradient";
  div.style.background = `linear-gradient(90deg, ${toRGB(color1)} 0%, ${toRGB(color2)} 100%)`
  document.getElementById('gradients').append(div);
}

const toRGB = (color) => {
  return `rgb(${color.r}, ${color.g}, ${color.b})`
}

for (let i = 0; i < gradient.colors.length - 1; i++) {
  //addColorGradient(gradient.colors[i], gradient.colors[i + 1]);
}

const gradientColor = gradient.colors;
const gradientScale = gradient.getColorsScale();
let backgroundColor = `linear-gradient(90deg, `;

for (let i = 0; i < gradientScale.length; i++) {
  backgroundColor += `${toRGB(gradientColor[i])} ${gradientScale[i]}%${i !== gradientScale.length - 1 ? ',' : ''} `
}
backgroundColor += ')';


document.getElementById('gradients').style.background = backgroundColor;

const color = gradient.getColorFromValue(50, 'rgb');
document.getElementById('selector').style.backgroundColor = color;


/**
 * HOVER
 */

const updateFrame = (value) => {
  document.getElementById('selector').style.left = `${value - 1}%`;
  const color = gradient.getColorFromValue(value, 'rgb');
  const colorHex = gradient.getColorFromValue(value, 'hex');
  const colorComposite = gradient.getColorFromValue(value, null);
  document.getElementById('hex').innerHTML = colorHex.toUpperCase();
  document.getElementById('r').innerHTML = colorComposite[0];
  document.getElementById('g').innerHTML = colorComposite[1];
  document.getElementById('b').innerHTML = colorComposite[2];
  document.getElementById('val').innerHTML = value + "%";

  document.getElementById('selector').style.backgroundColor = color;
  //document.getElementById('selector').style.border = `4px solid ${color}`;
  //document.getElementById('gradients').style.border = `4px solid ${color}`;
}

updateFrame(randomValue(20, 80));

document.getElementById('gradients').addEventListener("mousemove", (event) => {
  const { x } = event;
  const { width } = document.getElementById('gradients').getBoundingClientRect();
  const position = x - document.getElementById('gradients').getBoundingClientRect().x;
  const value = Math.floor(position * 100 / width);

  if (value < 0) value = 0;
  if (value > 100) value = 100;

  updateFrame(value);

});
