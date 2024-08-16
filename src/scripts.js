document.addEventListener('DOMContentLoaded', function () {
  displayDate()
  initHbarUsdConversion()
})

/*
 * When filter button is toggled, update the total HBAR value displayed to include or exclude ATMA fees
 */
document.querySelector('#atma-filter').onchange = function (e) {
  document.getElementById('total-hbar').innerText = e.target.checked
    ? (
        (window.hgraph.TransactionFees.total_transaction_fees.aggregate.sum.total -
          window.hgraph.TransactionFees.atma_transaction_fees.aggregate.sum.total) /
        1e8
      ).toLocaleString('en-us')
    : (
        window.hgraph.TransactionFees.total_transaction_fees.aggregate.sum.total / 1e8
      ).toLocaleString('en-us')
}

function displayDate() {
  const currentDate = new Date()
  const options = {year: 'numeric', month: 'long', day: 'numeric'}
  const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(',', '')
  document.getElementById('date').innerText = formattedDate
}

// Function to initialize the HBAR to USD conversion
function initHbarUsdConversion() {
  const hbarElement = document.getElementById('total-hbar')
  const usdConvertElement = document.getElementById('usd-convert')

  async function fetchHbarToUsdRate() {
    const response = await fetch(
      'https://mainnet-public.mirrornode.hedera.com/api/v1/network/exchangerate',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      }
    )
    const json = await response.json()

    return json.current_rate.cent_equivalent / json.current_rate.hbar_equivalent / 100
  }
  // Function to fetch the current HBAR to USD conversion rate
  async function fetchHbarToUsdRateFromCoinGecko() {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=usd'
      )
      const data = await response.json()
      return data['hedera-hashgraph'].usd
    } catch (error) {
      console.error('Error fetching HBAR to USD conversion rate:', error)
      return null
    }
  }

  // Function to format numbers with commas
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  // Function to update the USD conversion
  async function updateUsdConversion() {
    const hbarTotalText = hbarElement.textContent
    const hbarTotal = parseFloat(hbarTotalText.replace(/,/g, ''))

    if (isNaN(hbarTotal)) {
      console.error('Invalid HBAR total:', hbarTotalText)
      return
    }

    const usdRate = await fetchHbarToUsdRate()
    if (usdRate !== null) {
      const totalUsd = hbarTotal * usdRate
      usdConvertElement.textContent = `$${formatNumber(totalUsd.toFixed(2))}`
    }
  }

  // MutationObserver to watch for changes in #total-hbar
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList') {
        updateUsdConversion()
      }
    })
  })

  observer.observe(hbarElement, {childList: true})

  // Initial call to set the USD value if the HBAR value is already present
  if (hbarElement.textContent !== 'Loading...') {
    updateUsdConversion()
  }
}
