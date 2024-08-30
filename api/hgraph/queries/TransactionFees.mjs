export default `
query TransactionFees($limit: Int, $offset: Int) {
  all: ecosystem_metric_aggregate(
    where: {name: {_eq: "transaction_fees"}, period: {_eq: "hour"}}
    order_by: {start_date: desc}
    limit: $limit
    # Do not count most recent hour as it is not a full hour yet
    offset: 1
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma: ecosystem_metric_aggregate(
    where: {name: {_eq: "atma_transaction_fees"}, period: {_eq: "hour"}}
    order_by: {start_date: desc}
    limit: $limit
    # Do not count most recent hour as it is not a full hour yet
    offset: 1
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  last_all: ecosystem_metric_aggregate(
    where: {name: {_eq: "transaction_fees"}, period: {_eq: "hour"}}
    order_by: {start_date: desc}
    limit: $limit
    offset: $offset
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  last_atma: ecosystem_metric_aggregate(
    where: {name: {_eq: "atma_transaction_fees"}, period: {_eq: "hour"}}
    order_by: {start_date: desc}
    limit: $limit
    offset: $offset
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
}
`
