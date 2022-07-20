/***
 * @author Pankaj Saha
 * @date 20-07-2022
 * This code is written in plain javascript for HEX to RGB and RGB to HEX colour code conversion
 */

/**
 * @method #hexToRgb
 * @param {string} hex - Hex colour code
 * @returns {string} r, g, b numbers [0-255]
 */
function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return r + ", " + g + ", " + b;
}

/***
 * @event onkeyup #hex_val
 * @call processHR
 */
document.getElementById("hex_val").onkeyup = function () {
  let hex_val_id = document.getElementById("hex_val");
  let hexValue = hex_val_id.value;
  if (hexValue.length == 6) {
    processHR(hexValue);
  } else {
    document.body.style.backgroundColor = "white";
    document.getElementById("h2r").value = "";
  }
};

/**
 * @method #processHR - Processing hex value to rgb colour code
 * @param {string} hexValue - hexvalue for validation
 * @returns false
 */
function processHR(hexValue) {
  // validation
  const reg = /[0-9a-fA-F]{6}/i;
  if (!reg.test(hexValue)) {
    document.getElementById("show_error").innerHTML = "Error input";
    return false;
  }
  let result_rgb = hexToRgb(hexValue); // call 
  document.getElementById("show_error").innerHTML = "";
  document.getElementById("h2r").value = "rgb(" + result_rgb + ")";
  document.body.style.backgroundColor = "rgb(" + result_rgb + ")";
}


/**************** RGB to HEX ****************/

/***
 * @event onkeyup #r_val, #g_val, #b_val
 * @call processRH
 */
document.getElementById("r_val").onkeyup = function () {
    processRH();
};
document.getElementById("g_val").onkeyup = function () {
    processRH();
};
document.getElementById("b_val").onkeyup = function () {
    processRH();
};

/**
 * @method #processRH - Process Rgb to Hex colour code
 * @returns false for validation
 * @call rgbToHex
 */
function processRH() {
  let rval = document.getElementById("r_val").value;
  let gval = document.getElementById("g_val").value;
  let bval = document.getElementById("b_val").value;

  // validation
  const regex = /\b(?:1\d{2}|2[0-4]\d|[1-9]?\d|25[0-5])\b/;
  if (!regex.test(+rval) || !regex.test(+gval) || !regex.test(+bval)) {
    document.getElementById("show_error").innerHTML = "Error input";
    return false;
  }

  if (rval.length >= 1 && gval.length >= 1 && bval.length >= 1) {
    let result_hex = rgbToHex(rval, gval, bval); // call
    document.getElementById("show_error").innerHTML = "";
    document.body.style.backgroundColor = result_hex;
    document.getElementById("r2h").value = result_hex;
  } else {
    document.body.style.backgroundColor = "white";
    document.getElementById("r2h").innerHTML = "";
  }
}

/**
 * @method #rgbToHex - RGB to Hex code converter
 * @param {number} r - RED
 * @param {number} g - GREEN
 * @param {number} b - BLUE
 * @returns hexcode after conversion
 * @call componentToHex
 */
function rgbToHex(r, g, b) {
  let res = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  return res;
}

/**
 * @method #componentToHex - Converting (0-255) value to hex value
 * @param {number} c - colour code in r/g/b
 * @returns hex value each unit
 */
function componentToHex(c) {
    let hex = (+c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

/**************** Other methods ****************/

/**
 * @method #clearText - clearing all inpput value, error message and result
 */
function clearText() {
  document.getElementById("hex_val").value = "";
  document.getElementById("r_val").value = "";
  document.getElementById("g_val").value = "";
  document.getElementById("b_val").value = "";
  document.getElementById("r2h").value = "";
  document.getElementById("h2r").value = "";
  document.body.style.backgroundColor = "white";
  document.getElementById("show_error").innerHTML = "";
  document.getElementById("show_msg").innerHTML = "";
}

/***
 * @event onclick #h2r
 * @call copyR2HCode
 */
document.getElementById("h2r").onclick = function () {
  let copy_h2r = document.getElementById("h2r");
  copyR2HCode(copy_h2r);
};

/***
 * @event onclick #r2h
 * @call copyR2HCode
 */
document.getElementById("r2h").onclick = function () {
  let copy_r2h = document.getElementById("r2h");
  copyR2HCode(copy_r2h);
};

/**
 * @method #copyR2HCode - copy the converted result to clipboard
 * @param {element} copy_cd - element to copy as colour code result
 * @returns false for validation
 */
function copyR2HCode(copy_cd) {
  if (!copy_cd.value.length) {
    return false;
  }
  copy_cd.select();
  copy_cd.setSelectionRange(0, 99999); /* For mobile devices */
  navigator.clipboard.writeText(copy_cd.value);
  document.getElementById("show_msg").innerHTML = "Copied to clipboard!";
}
