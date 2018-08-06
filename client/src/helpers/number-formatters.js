
// converts a number to a string consisting of comma thousands separators
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default numberWithCommas;