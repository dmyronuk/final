module.exports = {
  prettyFormatDate: (dateStr) => {
    let MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    let d = new Date(dateStr);
    let month = MONTHS[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();
    return `${month} ${day} ${year}`;
  },

  urlFormatDate: (dateStr) => {
    let d = new Date(dateStr);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  }
}