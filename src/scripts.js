document.addEventListener("DOMContentLoaded", function() {
    displayDate();
    updateUSDConversion();
    // setInterval(updateUSDConversion, 10000); // Update the conversion every 10 seconds
});

function displayDate() {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(',', '');
    document.getElementById('date').innerText = formattedDate;
}

// Function to fetch the current HBAR to USD conversion rate
async function fetchHBARConversionRate() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=usd');
        const data = await response.json();
        console.log(data); // Log the response data
        return data['hedera-hashgraph'].usd;
    } catch (error) {
        console.error('Error fetching HBAR conversion rate:', error);
        return null;
    }
}

// Function to update the USD conversion on the page
async function updateUSDConversion() {
    const totalHBAR = document.getElementById('total-hbar').textContent;
    const conversionRate = await fetchHBARConversionRate();

    if (conversionRate !== null) {
        const totalUSD = (totalHBAR * conversionRate).toFixed(2);
        document.getElementById('usd-convert').textContent = `$${totalUSD} USD`;
    } else {
        document.getElementById('usd-convert').textContent = 'Error loading conversion rate';
    }
}
