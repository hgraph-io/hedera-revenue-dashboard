export default `
query Deposits($limit: Int) {
  node: ecosystem_metric_aggregate(
    where: {name: {_like: "node_%_deposits"}, period: {_eq: "hour"}}
    order_by: {start_date: desc}
    limit: $limit
    offset: 1
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma_node: ecosystem_metric_aggregate(
    where: {name: {_like: "atma_node_%_deposits"}, period: {_eq: "hour"}}
    order_by: {start_date: desc}
    limit: $limit
    offset: 1
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  staking: ecosystem_metric_aggregate(
    where: {name: {_eq: "staking_account_deposits"}, period: {_eq: "hour"}}
    order_by: {start_date: desc}
    limit: $limit
    offset: 1
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma_staking: ecosystem_metric_aggregate(
    where: {name: {_eq: "atma_staking_account_deposits"}, period: {_eq: "hour"}}
    order_by: {start_date: desc}
    limit: $limit
    offset: 1
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  treasury: ecosystem_metric_aggregate(
    where: {name: {_eq: "treasury_account_deposits"}, period: {_eq: "hour"}}
    order_by: {start_date: desc}
    limit: $limit
    offset: 1
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma_treasury: ecosystem_metric_aggregate(
    where: {name: {_eq: "atma_treasury_account_deposits"}, period: {_eq: "hour"}}
    order_by: {start_date: desc}
    limit: $limit
    offset: 1
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
}
`
