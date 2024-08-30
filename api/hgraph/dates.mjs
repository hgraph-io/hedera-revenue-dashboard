export default {
  // year: 365 * 24,
  // month: (365 / 12) * 24,
  // week: 7 * 24,
  // day: 1 * 24,
  // hour: 1,
  get hour() {
    return {
      start_date: new Date(this.lastFullHour() - 1 * 60 * 60 * 1000),
      end_date: this.lastFullHour(),
    }
  },

  lastFullHour() {
    const date = new Date()
    date.setMinutes(-1) // offset by an hour to give time for calculations
    date.setMinutes(0, 0, 0) // set to bottom of last hour
    return date
  },
}
// quarter: {
//   startDate: new Date(date.getFullYear(), previousQuarter * 3 - 3, 1)
//     .toISOString()
//     .split('T')[0],
//   previousStartDate: new Date(date.getFullYear(), previousQuarter * 3 - 6, 1)
//     .toISOString()
//     .split('T')[0],
// },
