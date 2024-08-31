export default `
query TransactionFees($start_date: timestamp!, $end_date: timestamp!) {
  all: ecosystem_metric_aggregate(
    where: {
      name: {_eq: "transaction_fees"},
      period: {_eq: "hour"},
      start_date: {_gte: $start_date},
      end_date: {_lte: $end_date}
    }
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma: ecosystem_metric_aggregate(
    where: {
      name: {_eq: "atma_transaction_fees"},
      period: {_eq: "hour"},
      start_date: {_gte: $start_date},
      end_date: {_lte: $end_date}
    }
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
}
`
