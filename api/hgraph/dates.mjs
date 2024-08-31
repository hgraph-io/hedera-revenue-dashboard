// set to 2 to get previous period
export default (offset = 1) => ({
  offset,
  getDates: function (multiplier) {
    const end_date = this.latestHour
    return {
      start_date: new Date(end_date - this.offset * multiplier).toISOString(),
      end_date: new Date(end_date - (this.offset - 1) * multiplier).toISOString(),
    }
  },
  get all() {
    const end_date = this.latestHour
    return {
      start_date: new Date(0).toISOString(),
      end_date: end_date.toISOString(),
    }
  },
  get year() {
    return this.getDates(365.25 * 24 * 60 * 60 * 1000) // 365.25 days to account for leap years
  },
  get quarter() {
    const latestHour = this.latestHour
    const previousQuarter = Math.floor((latestHour.getMonth() + 3) / 3)
    const start_date = new Date(
      latestHour.getFullYear(),
      previousQuarter * 3 - (3 * this.offset + 3),
      1
    )
    const end_date = new Date(
      latestHour.getFullYear(),
      previousQuarter * 3 - 3 * this.offset,
      1
    )

    return {
      start_date: start_date.toISOString().split('T')[0],
      end_date: end_date.toISOString().split('T')[0],
    }
  },
  get month() {
    return this.getDates(30 * 24 * 60 * 60 * 1000)
  },
  get week() {
    return this.getDates(7 * 24 * 60 * 60 * 1000)
  },
  get day() {
    return this.getDates(24 * 60 * 60 * 1000)
  },
  get hour() {
    return this.getDates(60 * 60 * 1000)
  },

  get latestHour() {
    // offset by 10 minutes to give time for calculations on the backend, in the future we may run calculations more frequently
    const date = new Date(new Date() - 10 * 60 * 1000)
    date.setMinutes(0, 0, 0) // set to bottom of the hour
    return date
  },
})
