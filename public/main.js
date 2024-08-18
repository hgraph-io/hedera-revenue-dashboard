import hgraph from './hgraph/client.js'
import dates from './hgraph/dates.js'

// shared object to store the data
let state = {
  selectedPeriod: 'hour',
  filter: false,
}
window.state = state
// event to trigger an update to the UI, to be called when receiving data asynchronously
const updateUIEvent = new Event('updateUI')

function updateUI() {
  if (state[state.selectedPeriod]) {
    const hbarElement = document.getElementById('total-hbar')
    const changeElement = document.getElementById('change')
    const currentValue = state[state.selectedPeriod][state.filter ? 'not_atma' : 'all']
    const previousValue = state[state.selectedPeriod].last[state.filter ? 'not_atma' : 'all']
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

  if (
    ['node', 'atma_node', 'staking', 'atma_staking', 'treasury', 'atma_treasury'].every(
      (property) => state.deposits?.hasOwnProperty(property)
    )
  ) {
    const prefix = state.filter ? 'atma_' : ''
    console.log(state)
    const totalDeposits =
      state.deposits[`${prefix}node`] +
      state.deposits[`${prefix}staking`] +
      state.deposits[`${prefix}treasury`]

    // deposits ui
    const nodeDepositsElement = document.getElementById('node-deposits')
    nodeDepositsElement.innerText = state.deposits[`${prefix}node`].toLocaleString() + ' ℏ'
    nodeDepositsElement.previousElementSibling.innerText =
      Math.round((state.deposits[`${prefix}node`] / totalDeposits) * 100) + '%'

    // staking ui
    const stakingDepositsElement = document.getElementById('staking-deposits')
    stakingDepositsElement.innerText =
      state.deposits[`${prefix}staking`].toLocaleString() + ' ℏ'
    stakingDepositsElement.previousElementSibling.innerText =
      Math.round((state.deposits[`${prefix}staking`] / totalDeposits) * 100) + '%'

    // treasury ui
    const treasuryDepositsElement = document.getElementById('treasury-deposits')
    treasuryDepositsElement.innerText =
      state.deposits[`${prefix}treasury`].toLocaleString() + ' ℏ'
    treasuryDepositsElement.previousElementSibling.innerText =
      Math.round((state.deposits[`${prefix}treasury`] / totalDeposits) * 100) + '%'
  }
  // only load income data if it's available
  if (
    [
      'hts',
      'hscs',
      'hcs',
      'other',
      'not_atma_hts',
      'not_atma_hcs',
      'not_atma_hscs',
      'not_atma_other',
    ].every((property) => state.income?.hasOwnProperty(property))
  ) {
    const hts = document.getElementById('hts-income')
    hts.innerText = state.income[state.filter ? 'not_atma_hts' : 'hts'].toLocaleString() + ' ℏ'
    const hscs = document.getElementById('hscs-income')
    hscs.innerText =
      state.income[state.filter ? 'not_atma_hscs' : 'hscs'].toLocaleString() + ' ℏ'
    const hcs = document.getElementById('hcs-income')
    hcs.innerText = state.income[state.filter ? 'not_atma_hcs' : 'hcs'].toLocaleString() + ' ℏ'
    const other = document.getElementById('other-income')
    other.innerText =
      state.income[state.filter ? 'not_atma_other' : 'other'].toLocaleString() + ' ℏ'
  }
}

/*
 * Fetch data from Hgraph's API and set UI elements
 */
function main() {
  // Hour
  hgraph.query(hgraph.TransactionFeesLastHour).then((data) => {
    state.hour = {
      all: Math.floor(data.all[0].total / 1e8),
      not_atma: Math.floor((data.all[0].total - data.atma[0].total) / 1e8),
      last: {
        all: Math.floor(data.last_all[0].total / 1e8),
        not_atma: Math.floor((data.last_all[0].total - data.last_atma[0].total) / 1e8),
      },
    }
    // Initialize first value
    document.dispatchEvent(updateUIEvent)
  })
  // All time
  hgraph.query(hgraph.TransactionFeesAllTime).then((data) => {
    state.all = {
      all: Math.floor(data.all.aggregate.sum.total / 1e8),
      not_atma: Math.floor(
        (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8
      ),
      // set to the same value for change calculations
      last: {
        all: Math.floor(data.all.aggregate.sum.total / 1e8),
        not_atma: Math.floor(
          (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8
        ),
      },
    }

    // Initialize first value
    document.dispatchEvent(updateUIEvent)
  })

  // Get all other periods
  for (const period of ['day', 'week', 'month', 'quarter', 'year']) {
    hgraph.query(hgraph.TransactionFees, dates[period]).then((data) => {
      state[period] = {
        all: Math.floor(data.all.aggregate.sum.total / 1e8),
        not_atma: Math.floor(
          (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8
        ),
        last: {
          all: Math.floor(data.last_all.aggregate.sum.total / 1e8),
          not_atma: Math.floor(
            (data.last_all.aggregate.sum.total - data.last_atma.aggregate.sum.total) / 1e8
          ),
        },
      }
    })
    document.dispatchEvent(updateUIEvent)
  }

  /*
   * Node deposits
   */
  hgraph.query(hgraph.Deposits).then((data) => {
    state.deposits = {
      node: Math.floor(data.node.aggregate.sum.total / 1e8),
      staking: Math.floor(data.staking.aggregate.sum.total / 1e8),
      treasury: Math.floor(data.treasury.aggregate.sum.total / 1e8),
    }
    state.deposits = {
      ...state.deposits,
      atma_node: Math.floor(data.atma_node.aggregate.sum.total / 1e8),
      atma_staking: Math.floor(data.atma_staking.aggregate.sum.total / 1e8),
      atma_treasury: Math.floor(data.atma_treasury.aggregate.sum.total / 1e8),
    }
    document.dispatchEvent(updateUIEvent)
  })

  /*
   * Income
   */
  hgraph.query(hgraph.TransactionFeesByService).then((data) => {
    state.income = {
      hts: Math.floor(data.hts.aggregate.sum.total / 1e8),
      hscs: Math.floor(data.hscs.aggregate.sum.total / 1e8),
      hcs: Math.floor(data.hcs.aggregate.sum.total / 1e8),
      other: Math.floor(
        (data.total.aggregate.sum.total -
          data.hts.aggregate.sum.total -
          data.hscs.aggregate.sum.total -
          data.hcs.aggregate.sum.total) /
          1e8
      ),
    }
    state.income = {
      ...state.income,
      not_atma_hts: state.income.hts - Math.floor(data.atma_hts.aggregate.sum.total / 1e8),
      not_atma_hscs: state.income.hscs - Math.floor(data.atma_hscs.aggregate.sum.total / 1e8),
      not_atma_hcs: state.income.hcs - Math.floor(data.atma_hcs.aggregate.sum.total / 1e8),
      not_atma_other:
        state.income.other -
        Math.floor(
          (data.atma_total.aggregate.sum.total -
            data.atma_hts.aggregate.sum.total -
            data.atma_hscs.aggregate.sum.total -
            data.atma_hcs.aggregate.sum.total) /
            1e8
        ),
    }
    document.dispatchEvent(updateUIEvent)
  })
}

// set event listener to change the UI when data is received asynchronously
document.addEventListener('updateUI', updateUI)
// set event listener for state of selected period
document.getElementById('timeframe').onchange = function (e) {
  state.selectedPeriod = e.target.value
  updateUI()
}
// set event listener for atma filter
document.getElementById('filter').onchange = function (e) {
  state.filter = e.target.checked
  updateUI()
}

main()
