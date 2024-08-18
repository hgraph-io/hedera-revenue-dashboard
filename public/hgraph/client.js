/*
 * For more robust client, see https://github.com/hgraph-io/sdk
 */

import Deposits from './queries/Deposits.js'
import TransactionFees from './queries/TransactionFees.js'
import TransactionFeesLastHour from './queries/TransactionFeesLastHour.js'
import TransactionFeesByService from './queries/TransactionFeesByService.js'

// TODO: add json bigint
async function query(query, variables) {
  const response = await fetch('https://mainnet.hedera.api.hgraph.dev/v1/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await response.json()
  return json.data
}

export default {
  query,
  Deposits,
  TransactionFees,
  TransactionFeesLastHour,
  TransactionFeesByService,
}
