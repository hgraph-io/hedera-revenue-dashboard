export default `
query Deposits($limit: Int) {
  node: ecosystem_metric_aggregate(
    limit: $limit
    order_by: {start_date: desc}
    where: {name: {_like: "node_%_deposits"}, period: {_eq: "hour"}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma_node: ecosystem_metric_aggregate(
    limit: $limit
    order_by: {start_date: desc}
    where: {name: {_like: "atma_node_%_deposits"}, period: {_eq: "hour"}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  staking: ecosystem_metric_aggregate(
    limit: $limit
    order_by: {start_date: desc}
    where: {name: {_eq: "staking_account_deposits"}, period: {_eq: "hour"}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma_staking: ecosystem_metric_aggregate(
    limit: $limit
    order_by: {start_date: desc}
    where: {name: {_eq: "atma_staking_account_deposits"}, period: {_eq: "hour"}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  treasury: ecosystem_metric_aggregate(
    limit: $limit
    order_by: {start_date: desc}
    where: {name: {_eq: "treasury_account_deposits"}, period: {_eq: "hour"}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma_treasury: ecosystem_metric_aggregate(
    limit: $limit
    order_by: {start_date: desc}
    where: {name: {_eq: "atma_treasury_account_deposits"}, period: {_eq: "hour"}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
}
`
