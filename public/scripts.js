document.addEventListener('DOMContentLoaded', function () {
  displayDate()
  updateTime() // Call the function to start updating the time
})

function displayDate() {
  const currentDate = new Date()
  const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = currentDate.getUTCDate().toString().padStart(2, '0')
  const year = currentDate.getUTCFullYear().toString().slice(-2) // Get last two digits of the year
  const formattedDate = `${month}/${day}/${year}`
  document.getElementById('date').innerText = formattedDate
}

function updateTime() {
  const timeElement = document.getElementById('current-time')

  function displayTime() {
    const now = new Date()
    const hours = now.getUTCHours().toString().padStart(2, '0')
    const minutes = now.getUTCMinutes().toString().padStart(2, '0')
    const formattedTime = `${hours}:${minutes}`
    timeElement.textContent = formattedTime
  }

  displayTime() // Initial call to display the time immediately
  setInterval(displayTime, 60000) // Update the time every minute
}
