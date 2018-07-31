module.exports = {
  //non-whitespace character 6-30 characters
  fieldIsValidLength: (str) => {
    return /^\S{6,30}$/.test(str);
  },

  fieldIsValidPhone: (str) => {
    return /^\d{3}-\d{3}-{4}$/.test(str);
  },

  passwordIsValid: (str) => {
    return str && str.length <= 8
  },

  phoneNumberIsValid: (str) => {
    return /^\d{3}-\d{3}-\d{4}$/.test(str)
  },

  allFieldsPresent: (fieldsArr) => {
    return fieldsArr.reduce((acc, cur) => {
      if(!cur) acc = false;
      return acc
    }, true)
  },

  passwordsMatch: (a, b) => {
    return a === b;
  }
}