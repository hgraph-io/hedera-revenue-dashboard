export default `
query QuarterTransactionFees($start_date: timestamp!) {
  all: ecosystem_metric_aggregate(
    where: {name: {_eq: "transaction_fees"}, period: {_eq: "hour"}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma: ecosystem_metric_aggregate(
    where: {name: {_eq: "atma_transaction_fees"}, period: {_eq: "hour"}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
}`
