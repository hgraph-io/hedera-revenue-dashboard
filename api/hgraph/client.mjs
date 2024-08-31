/*
 * For more robust client, see https://github.com/hgraph-io/sdk
 */

import Deposits from './queries/Deposits.mjs'
import TransactionFees from './queries/TransactionFees.mjs'
import TransactionFeesByService from './queries/TransactionFeesByService.mjs'

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

  /*
   * javascript rounds bigints if not handled correctly, for this application losing precision
   * for tiny hbar is acceptable as we display information in hbar
   * for other use cases, for example verifying consensus timestamps, a library such as json-bigint
   * can be used
   *
   * for an example see:
   * https://github.com/hgraph-io/sdk/blob/90b2759b5aaaf7a05d3daa1601569279344ab2d6/src/client/index.ts#L20
   */
  const json = await response.json()
  if (!json.data) console.error(JSON.stringify(json, null, 2))
  return json.data
}

export default {
  query,
  Deposits,
  TransactionFees,
  TransactionFeesByService,
}
