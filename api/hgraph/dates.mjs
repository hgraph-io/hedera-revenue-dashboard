// Need to be careful to create new date object for calculations that utilize set methods
const date = new Date()
const previousQuarter = Math.floor(date.getMonth() / 3)

export default {
  all: {
    startDate: '2019-09-13',
    previousStartDate: '2019-09-13',
  },
  year: {
    startDate: new Date(new Date(date).setFullYear(date.getFullYear() - 1))
      .toISOString()
      .split('T')[0],
    previousStartDate: new Date(new Date(date).setFullYear(date.getFullYear() - 2))
      .toISOString()
      .split('T')[0],
  },
  quarter: {
    startDate: new Date(date.getFullYear(), previousQuarter * 3 - 3, 1)
      .toISOString()
      .split('T')[0],
    previousStartDate: new Date(date.getFullYear(), previousQuarter * 3 - 6, 1)
      .toISOString()
      .split('T')[0],
  },
  get month() {
    const _date = new Date(date)
    _date.setDate(0)
    _date.setDate(1)
    const startDate = _date.toISOString().split('T')[0]
    _date.setDate(0)
    _date.setDate(1)
    const previousStartDate = _date.toISOString().split('T')[0]
    return {
      startDate,
      previousStartDate,
    }
  },
  week: {
    startDate: new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    previousStartDate: new Date(date.getTime() - 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
  },
  day: {
    startDate: new Date(date.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    previousStartDate: new Date(date.getTime() - 48 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
  },
  hour: {
    startDate: new Date(date.getTime() - 60 * 60 * 1000).toISOString().split(':')[0] + ':00:00',
    previousStartDate:
      new Date(date.getTime() - 60 * 2 * 60 * 1000).toISOString().split(':')[0] + ':00:00',
  },
}
