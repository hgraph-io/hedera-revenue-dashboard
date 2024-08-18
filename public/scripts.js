document.addEventListener('DOMContentLoaded', function () {
  displayDate()
  initHbarUsdConversion()
})

// /*
//  * When filter button is toggled, update the total HBAR value displayed to include or exclude ATMA fees
//  */
// document.querySelector('#atma-filter').onchange = function (e) {
//   document.getElementById('total-hbar').innerText = e.target.checked
//     ? (window.hgraph.hour.all - window.hgraph.hour.atma).toLocaleString('en-us')
//     : window.hgraph.hour.atma.toLocaleString('en-us').toLocaleString('en-us')
// }
// /*
//  * Period dropdown
//  */
// document.querySelector('#timeframe').onchange = function (e) {
//   alert(e.target.value)
// }

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

  // Function to fetch the current HBAR to USD conversion rate from Hedera Mirror Node
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
