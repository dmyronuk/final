function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
  }

function toSingular(str, quantity) {
  if (quantity === 1) {
    return str.slice(0, str.length - 1);
  }
  return str;
}

export {
  toTitleCase,
  toSingular,
}