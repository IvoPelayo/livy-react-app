export function round(value, direction = 'floor') {
  if(direction === 'top'){
    return Math.ceil(value);
  }

  return Math.floor(value);
}

export function trim(value, decimalPlaces) {
  return parseFloat(value.toFixed(decimalPlaces));
}


