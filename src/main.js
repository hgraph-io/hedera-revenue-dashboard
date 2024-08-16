import hgraph from './hgraph/client.js'

// global object to store the data
var fees = {
  selectedPeriod: 'hour',
  filter: false,
}

function setStatsUI() {
  const hbarElement = document.getElementById('total-hbar')
  const changeElement = document.getElementById('change')
  const currentValue = fees[fees.selectedPeriod][fees.filter ? 'not_atma' : 'all']
  const previousValue = fees[fees.selectedPeriod].last[fees.filter ? 'not_atma' : 'all']
  const change = (currentValue / previousValue - 1) * 100
  // set initial value
  hbarElement.innerText = currentValue.toLocaleString()
  changeElement.innerText = !change
    ? ''
    : `${change.toLocaleString()}% ${change >= 0 ? '↑' : '↓'}`
}

function fetchStats() {
  // Hour
  hgraph.query(hgraph.HourTransactionFees).then((data) => {
    fees.hour = {
      all: data.all[0].total / 1e8,
      not_atma: (data.all[0].total - data.atma[0].total) / 1e8,
      last: {
        all: data.last_all[0].total / 1e8,
        not_atma: (data.last_all[0].total - data.last_atma[0].total) / 1e8,
      },
    }
    setStatsUI()
  })
  // // Day
  // hgraph.query(hgraph.DayTransactionFees).then((data) => {
  //   fees.day = {
  //     all: data.all.aggregate.sum.total / 1e8,
  //     not_atma: (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8,
  //   }
  // })
  // // Week
  // hgraph.query(hgraph.WeekTransactionFees, {startDate: 0, endDate: 0}).then((data) => {
  //   fees.week = {
  //     all: data.all.aggregate.sum.total / 1e8,
  //     not_atma: (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8,
  //   }
  // })
  // // Month
  // hgraph.query(hgraph.MonthTransactionFees, {startDate: 0, endDate: 0}).then((data) => {
  //   fees.month = {
  //     all: data.all.aggregate.sum.total / 1e8,
  //     not_atma: (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8,
  //   }
  // })
  // // Quarter
  // hgraph.query(hgraph.QuarterTransactionFees, {startDate: 0, endDate: 0}).then((data) => {
  //   fees.quarter = {
  //     all: data.all.aggregate.sum.total / 1e8,
  //     not_atma: (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8,
  //   }
  // })
  // // Year
  // hgraph.query(hgraph.YearTransactionFees, {startDate: 0, endDate: 0}).then((data) => {
  //   fees.year = {
  //     all: data.all.aggregate.sum.total / 1e8,
  //     not_atma: (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8,
  //   }
  // })
  // All Time
  hgraph.query(hgraph.AllTimeTransactionFees).then((data) => {
    fees.all = {
      all: data.all.aggregate.sum.total / 1e8,
      not_atma: (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8,
      last: {
        all: data.all.aggregate.sum.total / 1e8,
        not_atma: (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8,
      },
    }
  })
}

// set event listener for state of selected period
document.getElementById('timeframe').onchange = function (e) {
  fees.selectedPeriod = e.target.value
  setStatsUI()
}
// set event listener for atma filter
document.getElementById('filter').onchange = function (e) {
  fees.filter = e.target.checked
  setStatsUI()
}

fetchStats()
