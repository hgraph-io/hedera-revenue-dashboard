/*
 * For more robust client, see https://github.com/hgraph-io/sdk
 */

import TransactionFees from './queries/TransactionFees.js'

async function query(query) {
  console.log('query', query)
  const response = await fetch('https://mainnet.hedera.api.hgraph.dev/v1/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  })

  const json = await response.json()
  return json.data
}

export default {
  query,
  TransactionFees,
}
