import hgraph from './hgraph/client.js'

console.log(hgraph)

async function main() {
  const data = await hgraph.query(hgraph.TransactionFees)
  console.log(data)
  const totalHbar = data.total_transaction_fees.aggregate.sum.total / 1e8

  document.getElementById('total-hbar').innerText = totalHbar.toLocaleString('en-us')
  console.log(totalHbar)
}

main()
