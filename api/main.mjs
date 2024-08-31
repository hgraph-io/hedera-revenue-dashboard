import hgraph from './hgraph/client.mjs'
import dates from './hgraph/dates.mjs'

/*
 * Fetch data from Hgraph's API
 * we are not using async/await here because we want to run the queries in parallel
 */
export default function main(state) {
  console.log(new Date(), 'Refreshing data...')
  const current = dates()
  const previous = dates(2)
  // console.log({...current})
  // console.log({...previous})
  for (const period of ['hour', 'day', 'week', 'month', 'quarter', 'year', 'all']) {
    // Transaction fees
    hgraph.query(hgraph.TransactionFees, current[period]).then((data) => {
      state[period] = {
        ...state[period], // previous period might be already set
        all: Math.floor(data.all.aggregate.sum.total / 1e8),
        not_atma: Math.floor(
          (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8
        ),
      }
    })
    // Last period transaction fees
    hgraph.query(hgraph.TransactionFees, previous[period]).then((data) => {
      state[period].previous = {
        all: Math.floor(data.all.aggregate.sum.total / 1e8),
        not_atma: Math.floor(
          (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8
        ),
      }
    })
    //  Node deposits
    hgraph.query(hgraph.Deposits, current[period]).then((data) => {
      state.deposits[period] = {
        node: Math.floor(data.node.aggregate.sum.total / 1e8),
        staking: Math.floor(data.staking.aggregate.sum.total / 1e8),
        treasury: Math.floor(data.treasury.aggregate.sum.total / 1e8),
        not_atma_node: Math.floor(
          (data.node.aggregate.sum.total - data.atma_node.aggregate.sum.total) / 1e8
        ),
        not_atma_staking: Math.floor(
          (data.staking.aggregate.sum.total - data.atma_staking.aggregate.sum.total) / 1e8
        ),
        not_atma_treasury: Math.floor(
          (data.treasury.aggregate.sum.total - data.atma_treasury.aggregate.sum.total) / 1e8
        ),
      }
    })
    // Income
    hgraph.query(hgraph.TransactionFeesByService, current[period]).then((data) => {
      state.income[period] = {
        total: Math.floor(data.total.aggregate.sum.total / 1e8),
        hts: Math.floor(data.hts.aggregate.sum.total / 1e8),
        hscs: Math.floor(data.hscs.aggregate.sum.total / 1e8),
        hcs: Math.floor(data.hcs.aggregate.sum.total / 1e8),
        other: Math.floor(
          (data.total.aggregate.sum.total -
            data.hts.aggregate.sum.total -
            data.hscs.aggregate.sum.total -
            data.hcs.aggregate.sum.total) /
            1e8
        ),
        not_atma_total: Math.floor(
          (data.total.aggregate.sum.total - data.atma_total.aggregate.sum.total) / 1e8
        ),
        not_atma_hts: Math.floor(
          (data.hts.aggregate.sum.total - data.atma_hts.aggregate.sum.total) / 1e8
        ),
        not_atma_hscs: Math.floor(
          (data.hscs.aggregate.sum.total - data.atma_hscs.aggregate.sum.total) / 1e8
        ),
        not_atma_hcs: Math.floor(
          (data.hcs.aggregate.sum.total - data.atma_hcs.aggregate.sum.total) / 1e8
        ),
        not_atma_other: Math.floor(
          // other
          (data.total.aggregate.sum.total -
            data.hts.aggregate.sum.total -
            data.hscs.aggregate.sum.total -
            data.hcs.aggregate.sum.total -
            // atma other
            (data.atma_total.aggregate.sum.total -
              data.atma_hts.aggregate.sum.total -
              data.atma_hscs.aggregate.sum.total -
              data.atma_hcs.aggregate.sum.total)) /
            1e8
        ),
      }
    })
  }
}
