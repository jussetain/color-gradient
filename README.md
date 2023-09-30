
smooth-gradient.js
![Test](https://github.com/jussetain/color-gradient/actions/workflows/build_and_test.yml/badge.svg)
========================

Calculate a gradient and get one of its colors at a given point, from an array of colors.

Install the smooth-gradient module
---------------------------------

```bash
npm install smooth-gradient
```

Add it to your source.

```javascript
import { Gradient } from "smooth-gradient"
```

Usage
--------------------

A single class is exposed, `Gradient`, which takes as much color elements as you want as parameters, and the amount of steps to use.

```javascript
// Colors can be given as an unlimited number of parameters
const gradient = new Gradient("#FF0000", "#00FF00", "#00FFFF", "#123456");
```

You can now retreive the color corresponding to your input in the gradiant spectrum.
Only values between 0 and 100 are effective. Negatives will be considered as 0 and values above 100 as 100.

```javascript
const color = gradient.getColorFromValue(50, 'rgb');
const colorHex = gradient.getColorFromValue(50);
console.log(color); // output => rgb(0, 255, 180)
console.log(colorHex); // output => #00ffb4
```

This package could be a great fit for gradients in progress bars, for example.
