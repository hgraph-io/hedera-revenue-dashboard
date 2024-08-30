export default `
query TransactionFees($limit: Int, $end_date: timestamp!) {
  all: ecosystem_metric_aggregate(
    where: {name: {_eq: "transaction_fees"}, period: {_eq: "hour"}, end_date: {_lte: $end_date}}
    order_by: {start_date: desc}
    limit: $limit
  ) {
    aggregate {
      sum {
        total
      }
      max {
        start_date
        end_date
      }
      min {
        start_date
        end_date
      }
    }
  }
  atma: ecosystem_metric_aggregate(
    where: {name: {_eq: "atma_transaction_fees"}, period: {_eq: "hour"}, end_date: {_lte: $end_date}}
    order_by: {start_date: desc}
    limit: $limit
  ) {
    aggregate {
      sum {
        total
      }
      max {
        start_date
        end_date
      }
      min {
        start_date
        end_date
      }
    }
  }
  last_all: ecosystem_metric_aggregate(
    where: {name: {_eq: "transaction_fees"}, period: {_eq: "hour"}, end_date: {_lte: $end_date}}
    order_by: {start_date: desc}
    limit: $limit
    offset: $limit
  ) {
    aggregate {
      sum {
        total
      }
      max {
        start_date
        end_date
      }
      min {
        start_date
        end_date
      }
    }
  }
  last_atma: ecosystem_metric_aggregate(
    where: {name: {_eq: "atma_transaction_fees"}, period: {_eq: "hour"}, end_date: {_lte: $end_date}}
    order_by: {start_date: desc}
    limit: $limit
    offset: $limit
  ) {
    aggregate {
      sum {
        total
      }
      max {
        start_date
        end_date
      }
      min {
        start_date
        end_date
      }
    }
  }
}
`
