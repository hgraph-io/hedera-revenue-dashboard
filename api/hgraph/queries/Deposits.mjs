// cannot use offset here because there will be multiple entries for the same hour because we are using a "like" operator
export default `
query Deposits($limit: Int, $end_date: timestamp!) {
  node: ecosystem_metric_aggregate(
    where: {name: {_like: "node_%_deposits"}, period: {_eq: "hour"}, end_date: {_lte: $end_date}}
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
  atma_node: ecosystem_metric_aggregate(
    where: {name: {_like: "atma_node_%_deposits"}, period: {_eq: "hour"}, end_date: {_lte: $end_date}}
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
  staking: ecosystem_metric_aggregate(
    where: {name: {_eq: "staking_account_deposits"}, period: {_eq: "hour"}, end_date: {_lte: $end_date}}
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
  atma_staking: ecosystem_metric_aggregate(
    where: {name: {_eq: "atma_staking_account_deposits"}, period: {_eq: "hour"}, end_date: {_lte: $end_date}}
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
  treasury: ecosystem_metric_aggregate(
    where: {name: {_eq: "treasury_account_deposits"}, period: {_eq: "hour"}, end_date: {_lte: $end_date}}
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
  atma_treasury: ecosystem_metric_aggregate(
    where: {name: {_eq: "atma_treasury_account_deposits"}, period: {_eq: "hour"}, end_date: {_lte: $end_date}}
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
}
`
