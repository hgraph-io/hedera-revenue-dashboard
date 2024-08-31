// shared object to store the data
let state = {
  period: 'hour',
  filter: false,
  deposits: {},
  income: {},
}

function updateUI() {
  // console.log(state)
  const period = state.period
  const prefix = state.filter ? 'not_atma_' : ''

  const hbarElement = document.getElementById('total-hbar')
  const changeElement = document.getElementById('change')
  const currentValue = state[period][state.filter ? 'not_atma' : 'all']
  const previousValue = state[period].previous[state.filter ? 'not_atma' : 'all']
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

  /*
   * Deposits
   */
  const totalDeposits =
    state.deposits[period][prefix + 'node'] +
    state.deposits[period][prefix + 'staking'] +
    state.deposits[period][prefix + 'treasury']
  // node ui
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

  /*
   * Income
   */
  const totalIncome = state.income[period][prefix + 'total']

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

async function main() {
  const response = await fetch(
    location.hostname === 'localhost'
      ? 'http://localhost:3001/data.json'
      : 'https://hrd.hgra.ph/data.json'
  )
  const json = await response.json()
  state = {...state, ...json}
  updateUI()
}

main()
