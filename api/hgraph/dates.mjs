export default {
  get all() {
    const end_date = this.latestHour
    return {
      start_date: new Date().toISOString(),
      end_date: end_date.toISOString(),
    }
  },
  get year() {
    const end_date = this.latestHour
    return {
      start_date: new Date(end_date - 365 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: end_date.toISOString(),
    }
  },
  get quarter() {
    const latestHour = this.latestHour
    const previousQuarter = Math.floor((latestHour.getMonth() + 3) / 3)
    const end_date = new Date(date.getFullYear(), previousQuarter * 3 - 3, 1)
    const start_date = new Date(date.getFullYear(), previousQuarter * 3 - 6, 1)
    return {
      start_date: start_date.toISOString(),
      end_date: end_date.toISOString(),
    }
  },
  get month() {
    const end_date = this.latestHour
    return {
      start_date: new Date(end_date - 30 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: end_date.toISOString(),
    }
  },
  get week() {
    const end_date = this.latestHour
    return {
      start_date: new Date(end_date - 7 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: end_date.toISOString(),
    }
  },
  get day() {
    const end_date = this.latestHour
    return {
      start_date: new Date(end_date - 24 * 60 * 60 * 1000).toISOString(),
      end_date: end_date.toISOString(),
    }
  },
  get hour() {
    const end_date = this.latestHour
    return {
      start_date: new Date(end_date - 60 * 60 * 1000).toISOString(),
      end_date: end_date.toISOString(),
    }
  },

  get latestHour() {
    const date = new Date()
    date.setMinutes(-1) // offset by an hour to give time for calculations
    date.setMinutes(0, 0, 0) // set to bottom of last hour
    return date
  },
}
