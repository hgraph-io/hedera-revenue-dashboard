/*
 * For more robust client, see https://github.com/hgraph-io/sdk
 */

import HourTransactionFees from './queries/HourTransactionFees.js'
import DayTransactionFees from './queries/DayTransactionFees.js'
import WeekTransactionFees from './queries/WeekTransactionFees.js'
import MonthTransactionFees from './queries/MonthTransactionFees.js'
import QuarterTransactionFees from './queries/QuarterTransactionFees.js'
import YearTransactionFees from './queries/YearTransactionFees.js'
import AllTimeTransactionFees from './queries/AllTimeTransactionFees.js'
import Deposits from './queries/Deposits.js'
import FeesByTransactionType from './queries/FeesByTransactionType.js'

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
  HourTransactionFees,
  DayTransactionFees,
  WeekTransactionFees,
  MonthTransactionFees,
  QuarterTransactionFees,
  YearTransactionFees,
  AllTimeTransactionFees,
  Deposits,
  FeesByTransactionType,
}
