import hgraph from './hgraph/client.js'

// global object to store the data
var hg

async function fetchStats() {
  const data = await hgraph.query(hgraph.TransactionFees)
  hg = {
    selectedPeriod: 'hour',
    hour: {
      all: data.hour_all[0].total / 1e8,
      not_atma: (data.hour_all[0].total - data.hour_atma[0].total) / 1e8,
    },
    day: {
      atma: 0,
      all: 0,
    },
    week: {
      atma: 0,
      all: 0,
    },
    month: {
      atma: 0,
      all: 0,
    },
    quarter: {
      atma: 0,
      all: 0,
    },
    year: {
      atma: 0,
      all: 0,
    },
    allTime: {
      all: data.allTime_all.aggregate.sum.total / 1e8,
      not_atma:
        (data.allTime_all.aggregate.sum.total - data.allTime_atma.aggregate.sum.total) / 1e8,
    },
  }

  const hbarElement = document.getElementById('total-hbar')

  // set initial value
  hbarElement.innerText = hg.hour.all.toLocaleString('en-us')
  // set event listener for state of selected period
  document.getElementById('timeframe').onchange = function (e) {
    hbarElement.innerText = hg[e.target.value].all.toLocaleString('en-us')
  }
  // set event listener for atma filter
  document.getElementById('filter').onchange = function (e) {
    hbarElement.innerText = hg[e.target.value].all.toLocaleString('en-us')
  }
}

fetchStats()
