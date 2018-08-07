
// converts a number to a string consisting of comma thousands separators
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const metresToKm = (metres) => {
  return (metres / 1000).toFixed(2);
}

export {
  numberWithCommas,
  metresToKm,
}