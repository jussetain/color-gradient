const Gradient = require('./Gradient.js')

const gradient = new Gradient("#FF0000", "#00FF00", "#00FFFF", "#123456");

console.log(gradient.getColorFromValue(50));
