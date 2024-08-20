import hgraph from './hgraph'
/*
 * Fetch data from Hgraph's API and set UI elements
 */
export default function main() {
  for (const period of ['hour', 'day', 'week', 'month', 'quarter', 'year', 'all']) {
    /*
     * Transaction fees
     */
    if (period === 'hour') {
      // Transaction fees in the last hour
      hgraph.query(hgraph.TransactionFeesLastHour).then((data) => {
        state.hour = {
          all: Math.floor(data.all[0].total / 1e8),
          not_atma: Math.floor((data.all[0].total - data.atma[0].total) / 1e8),
          last: {
            all: Math.floor(data.last_all[0].total / 1e8),
            not_atma: Math.floor((data.last_all[0].total - data.last_atma[0].total) / 1e8),
          },
        }
        document.dispatchEvent(updateUIEvent)
      })
    } else if (period === 'all') {
      hgraph.query(hgraph.TransactionFeesAllTime).then((data) => {
        state.all = {
          all: Math.floor(data.all.aggregate.sum.total / 1e8),
          not_atma: Math.floor(
            (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8
          ),
          // set to the same value for change calculations
          last: {
            all: Math.floor(data.all.aggregate.sum.total / 1e8),
            not_atma: Math.floor(
              (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8
            ),
          },
        }
        document.dispatchEvent(updateUIEvent)
      })
    } else {
      hgraph.query(hgraph.TransactionFees, dates[period]).then((data) => {
        state[period] = {
          all: Math.floor(data.all.aggregate.sum.total / 1e8),
          not_atma: Math.floor(
            (data.all.aggregate.sum.total - data.atma.aggregate.sum.total) / 1e8
          ),
          last: {
            all: Math.floor(data.last_all.aggregate.sum.total / 1e8),
            not_atma: Math.floor(
              (data.last_all.aggregate.sum.total - data.last_atma.aggregate.sum.total) / 1e8
            ),
          },
        }
        document.dispatchEvent(updateUIEvent)
      })
    }

    /*
     * Node deposits
     */
    hgraph.query(hgraph.Deposits, {startDate: dates[period].startDate}).then((data) => {
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

    /*
     * Income
     */
    hgraph
      .query(hgraph.TransactionFeesByService, {startDate: dates[period].startDate})
      .then((data) => {
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
        document.dispatchEvent(updateUIEvent)
      })
  }
}
