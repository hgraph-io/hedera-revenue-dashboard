export default {
  all: Number.MAX_SAFE_INTEGER,
  year: 365 * 24,
  month: (365 / 12) * 24,
  week: 7 * 24,
  day: 1 * 24,
  hour: 1,
}
// quarter: {
//   startDate: new Date(date.getFullYear(), previousQuarter * 3 - 3, 1)
//     .toISOString()
//     .split('T')[0],
//   previousStartDate: new Date(date.getFullYear(), previousQuarter * 3 - 6, 1)
//     .toISOString()
//     .split('T')[0],
// },
