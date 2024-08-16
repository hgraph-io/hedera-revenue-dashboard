import hgraph from './hgraph/client.js'

window.hgraph = window.hgraph || {}

async function main() {
  window.hgraph.TransactionFees = await hgraph.query(hgraph.TransactionFees)
  const totalHbar =
    window.hgraph.TransactionFees.total_transaction_fees.aggregate.sum.total / 1e8

  document.getElementById('total-hbar').innerText = totalHbar.toLocaleString('en-us')
  console.log(window.hgraph.TransactionFees)
}

main()
