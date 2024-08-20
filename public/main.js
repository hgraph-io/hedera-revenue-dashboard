import hgraph from './hgraph/client.js'
import dates from './hgraph/dates.js'

// shared object to store the data
let state = {
  period: 'hour',
  filter: false,
  deposits: {},
  income: {},
}

window.state = state
// event to trigger an update to the UI, to be called when receiving data asynchronously
const updateUIEvent = new Event('updateUI')

function updateUI() {
  const {period} = state
  if (state[period]) {
    const hbarElement = document.getElementById('total-hbar')
    const changeElement = document.getElementById('change')
    const currentValue = state[period][state.filter ? 'not_atma' : 'all']
    const previousValue = state[period].last[state.filter ? 'not_atma' : 'all']
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

  const prefix = state.filter ? 'not_atma_' : ''
  if (
    [
      'node',
      'staking',
      'treasury',
      'not_atma_node',
      'not_atma_staking',
      'not_atma_treasury',
    ].every((property) => state.deposits[period]?.hasOwnProperty(property))
  ) {
    console.log(state.deposits[period])
    const totalDeposits =
      state.deposits[period][prefix + 'node'] +
      state.deposits[period][prefix + 'staking'] +
      state.deposits[period][prefix + 'treasury']

    // deposits ui
    const nodeDepositsElement = document.getElementById('node-deposits')
    nodeDepositsElement.innerText =
      state.deposits[period][prefix + 'node'].toLocaleString() + ' ℏ'
    nodeDepositsElement.previousElementSibling.innerText =
      Math.round((state.deposits[period][prefix + 'node'] / totalDeposits) * 100) + '%'

    // staking ui
    const stakingDepositsElement = document.getElementById('staking-deposits')
    stakingDepositsElement.innerText =
      state.deposits[period][prefix + 'staking'].toLocaleString() + ' ℏ'
    stakingDepositsElement.previousElementSibling.innerText =
      Math.round((state.deposits[period][prefix + 'staking'] / totalDeposits) * 100) + '%'

    // treasury ui
    const treasuryDepositsElement = document.getElementById('treasury-deposits')
    treasuryDepositsElement.innerText =
      state.deposits[period][prefix + 'treasury'].toLocaleString() + ' ℏ'
    treasuryDepositsElement.previousElementSibling.innerText =
      Math.round((state.deposits[period][prefix + 'treasury'] / totalDeposits) * 100) + '%'
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
    ].every((property) => state.income?.[period]?.hasOwnProperty(property))
  ) {
    const totalIncome = state.income[period][prefix + 'total']
    console.log(totalIncome)

    const hts = document.getElementById('hts-income')
    hts.innerText = state.income[period][prefix + 'hts'].toLocaleString() + ' ℏ'
    hts.previousElementSibling.innerText =
      Math.round((state.income[period][prefix + 'hts'] / totalIncome) * 100) + '%'

    const hscs = document.getElementById('hscs-income')
    hscs.innerText = state.income[period][prefix + 'hscs'].toLocaleString() + ' ℏ'
    hscs.previousElementSibling.innerText =
      Math.round((state.income[period][prefix + 'hscs'] / totalIncome) * 100) + '%'

    const hcs = document.getElementById('hcs-income')
    hcs.innerText = state.income[period][prefix + 'hcs'].toLocaleString() + ' ℏ'
    hcs.previousElementSibling.innerText =
      Math.round((state.income[period][prefix + 'hcs'] / totalIncome) * 100) + '%'

    const other = document.getElementById('other-income')
    other.innerText = state.income[period][prefix + 'other'].toLocaleString() + ' ℏ'
    other.previousElementSibling.innerText =
      Math.round((state.income[period][prefix + 'other'] / totalIncome) * 100) + '%'
  }
}

/*
 * Fetch data from Hgraph's API and set UI elements
 */
function main() {
  for (const period of ['hour', 'day', 'week', 'month', 'quarter', 'year', 'all']) {
    /*
     * Transaction fees
     */
    if (period === 'hour') {
      // Transaction fees in the last hour
      hgraph.query(hgraph.TransactionFeesLastHour).then((data) => {
        state.hour = {
          all: Math.floor(data.all[0].total / 1e8),
          not_atma: Math.floor((data.all[0].total - data.atma[0].total) / 1e8),
          last: {
            all: Math.floor(data.last_all[0].total / 1e8),
            not_atma: Math.floor((data.last_all[0].total - data.last_atma[0].total) / 1e8),
          },
        }
        document.dispatchEvent(updateUIEvent)
      })
    } else if (period === 'all') {
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
        document.dispatchEvent(updateUIEvent)
      })
    } else {
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
        document.dispatchEvent(updateUIEvent)
      })
    }

    /*
     * Node deposits
     */
    hgraph.query(hgraph.Deposits, {startDate: dates[period].startDate}).then((data) => {
      state.deposits[period] = {
        node: Math.floor(data.node.aggregate.sum.total / 1e8),
        staking: Math.floor(data.staking.aggregate.sum.total / 1e8),
        treasury: Math.floor(data.treasury.aggregate.sum.total / 1e8),
        not_atma_node: Math.floor(
          (data.node.aggregate.sum.total - data.atma_node.aggregate.sum.total) / 1e8
        ),
        not_atma_staking: Math.floor(
          (data.staking.aggregate.sum.total - data.atma_staking.aggregate.sum.total) / 1e8
        ),
        not_atma_treasury: Math.floor(
          (data.treasury.aggregate.sum.total - data.atma_treasury.aggregate.sum.total) / 1e8
        ),
      }
    })

    /*
     * Income
     */
    hgraph
      .query(hgraph.TransactionFeesByService, {startDate: dates[period].startDate})
      .then((data) => {
        state.income[period] = {
          total: Math.floor(data.total.aggregate.sum.total / 1e8),
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
          not_atma_total: Math.floor(
            (data.total.aggregate.sum.total - data.atma_total.aggregate.sum.total) / 1e8
          ),
          not_atma_hts: Math.floor(
            (data.hts.aggregate.sum.total - data.atma_hts.aggregate.sum.total) / 1e8
          ),
          not_atma_hscs: Math.floor(
            (data.hscs.aggregate.sum.total - data.atma_hscs.aggregate.sum.total) / 1e8
          ),
          not_atma_hcs: Math.floor(
            (data.hcs.aggregate.sum.total - data.atma_hcs.aggregate.sum.total) / 1e8
          ),
          not_atma_other: Math.floor(
            // other
            (data.total.aggregate.sum.total -
              data.hts.aggregate.sum.total -
              data.hscs.aggregate.sum.total -
              data.hcs.aggregate.sum.total -
              // atma other
              (data.atma_total.aggregate.sum.total -
                data.atma_hts.aggregate.sum.total -
                data.atma_hscs.aggregate.sum.total -
                data.atma_hcs.aggregate.sum.total)) /
              1e8
          ),
        }
        document.dispatchEvent(updateUIEvent)
      })
  }
}

// set event listener to change the UI when data is received asynchronously
document.addEventListener('updateUI', updateUI)
// set event listener for state of selected period
document.getElementById('timeframe').onchange = function (e) {
  state.period = e.target.value
  updateUI()
}
// set event listener for atma filter
document.getElementById('filter').onchange = function (e) {
  state.filter = e.target.checked
  updateUI()
}

main()
