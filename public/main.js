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

  // Round the change to 1 decimal place
  const roundedChange = change.toFixed(1)

  // set initial value
  hbarElement.innerText = currentValue.toLocaleString()

  // update change text
  if (change) {
    changeElement.innerText = `${roundedChange}% ${change >= 0 ? '↑' : '↓'}`

    // remove existing classes
    changeElement.classList.remove('up', 'down')

    // add the appropriate class
    if (change >= 0) {
      changeElement.classList.add('up')
    } else {
      changeElement.classList.add('down')
    }
  } else {
    changeElement.innerText = ''
    // remove any existing up or down classes if there's no change
    changeElement.classList.remove('up', 'down')
  }
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
    // Initialize first value
    setStatsUI()
  })
  // Day
  hgraph.query(hgraph.DayTransactionFees).then((data) => {
    fees.day = {
      all: data.all.aggregate.sum.total / 1e8,
      not_atma: (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8,
      last: {
        all: data.last_all.aggregate.sum.total / 1e8,
        not_atma:
          (data.last_all.aggregate.sum.total - data.last_atma.aggregate.sum.total) / 1e8,
      },
    }
  })
  // Week
  hgraph.query(hgraph.WeekTransactionFees).then((data) => {
    fees.week = {
      all: data.all.aggregate.sum.total / 1e8,
      not_atma: (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8,
      last: {
        all: data.last_all.aggregate.sum.total / 1e8,
        not_atma:
          (data.last_all.aggregate.sum.total - data.last_atma.aggregate.sum.total) / 1e8,
      },
    }
  })
  // Month
  hgraph.query(hgraph.MonthTransactionFees).then((data) => {
    fees.month = {
      all: data.all.aggregate.sum.total / 1e8,
      not_atma: (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8,
      last: {
        all: data.last_all.aggregate.sum.total / 1e8,
        not_atma:
          (data.last_all.aggregate.sum.total - data.last_atma.aggregate.sum.total) / 1e8,
      },
    }
  })
  // Quarter
  hgraph.query(hgraph.QuarterTransactionFees).then((data) => {
    fees.quarter = {
      all: data.all.aggregate.sum.total / 1e8,
      not_atma: (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8,
      last: {
        all: data.last_all.aggregate.sum.total / 1e8,
        not_atma:
          (data.last_all.aggregate.sum.total - data.last_atma.aggregate.sum.total) / 1e8,
      },
    }
  })
  // Year
  hgraph.query(hgraph.YearTransactionFees).then((data) => {
    fees.year = {
      all: data.all.aggregate.sum.total / 1e8,
      not_atma: (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8,
      last: {
        all: data.last_all.aggregate.sum.total / 1e8,
        not_atma:
          (data.last_all.aggregate.sum.total - data.last_atma.aggregate.sum.total) / 1e8,
      },
    }
  })
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

  // Node deposits
  hgraph.query(hgraph.Deposits).then((data) => {
    fees.deposits = {
      node: data.node.aggregate.sum.total / 1e8,
      staking: data.staking.aggregate.sum.total / 1e8,
      treasury: data.treasury.aggregate.sum.total / 1e8,
    }
    const totalDeposits = fees.deposits.node + fees.deposits.staking + fees.deposits.treasury

    // deposits ui
    const nodeDepositsElement = document.getElementById('node-deposits')
    nodeDepositsElement.innerText = fees.deposits.node.toLocaleString() + ' ℏ'
    nodeDepositsElement.previousElementSibling.innerText =
      ((fees.deposits.node / totalDeposits) * 100).toFixed(1) + ' %'

    // staking ui
    const stakingDepositsElement = document.getElementById('staking-deposits')
    stakingDepositsElement.innerText = fees.deposits.staking.toLocaleString() + ' ℏ'
    stakingDepositsElement.previousElementSibling.innerText =
      ((fees.deposits.staking / totalDeposits) * 100).toFixed(1) + ' %'

    // treasury ui
    const treasuryDepositsElement = document.getElementById('treasury-deposits')
    treasuryDepositsElement.innerText = fees.deposits.treasury.toLocaleString() + ' ℏ'
    treasuryDepositsElement.previousElementSibling.innerText =
      ((fees.deposits.treasury / totalDeposits) * 100).toFixed(1) + ' %'
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
