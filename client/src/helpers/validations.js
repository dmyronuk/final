export default {
  //non-whitespace character 6-30 characters
  fieldIsValidLength: (str) => {
    return /^\S{6,30}$/.test(str)
  },

  fieldIsValidPhone: (str) => {
    return /^\d{3}-\d{3}-{4}$/.test(str)
  }
}