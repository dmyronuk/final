export default {
  dateFromUnix: (timestamp) => {
    let MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    let d = new Date(parseInt(timestamp));
    let month = MONTHS[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();
    return `${month} ${day} ${year}`;
  },

  timeFromUnix: (timestamp) => {
    console.log(timestamp)
    let d = new Date(parseInt(timestamp));
    return `${d.getHours()}:${d.getMinutes()}`
  }
}