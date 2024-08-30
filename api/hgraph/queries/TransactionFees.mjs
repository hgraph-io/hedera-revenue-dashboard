export default `
query TransactionFees($limit: Int) {
  all: ecosystem_metric_aggregate(
    limit: $limit
    where: {name: {_eq: "transaction_fees"}, period: {_eq: "hour"}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma: ecosystem_metric_aggregate(
    limit: $limit
    where: {name: {_eq: "atma_transaction_fees"}, period: {_eq: "hour"}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  last_all: ecosystem_metric_aggregate(
    limit: $limit
    offset: $limit
    where: {name: {_eq: "transaction_fees"}, period: {_eq: "hour"}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  last_atma: ecosystem_metric_aggregate(
    limit: $limit
    offset: $limit
    where: {name: {_eq: "atma_transaction_fees"}, period: {_eq: "hour"}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
}
`
