const dateFromTimestamp = (timestamp) => {
  let MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
  let d = new Date(timestamp);
  let month = MONTHS[d.getMonth()];
  let day = d.getDate();
  let year = d.getFullYear();
  return `${month} ${day}, ${year}`;
}

export default dateFromTimestamp

