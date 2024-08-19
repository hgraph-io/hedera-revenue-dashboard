export default `
query Deposits($startDate: timestamp) {
  node: ecosystem_metric_aggregate(
    where: {name: {_like: "node_%_deposits"}, period: {_eq: "hour"}, start_date: {_gte: $startDate}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma_node: ecosystem_metric_aggregate(
    where: {name: {_like: "atma_node_%_deposits"}, period: {_eq: "hour"}, start_date: {_gte: $startDate}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  staking: ecosystem_metric_aggregate(
    where: {name: {_eq: "staking_account_deposits"}, period: {_eq: "hour"}, start_date: {_gte: $startDate}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma_staking: ecosystem_metric_aggregate(
    where: {name: {_eq: "atma_staking_account_deposits"}, period: {_eq: "hour"}, start_date: {_gte: $startDate}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  treasury: ecosystem_metric_aggregate(
    where: {name: {_eq: "treasury_account_deposits"}, period: {_eq: "hour"}, start_date: {_gte: $startDate}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma_treasury: ecosystem_metric_aggregate(
    where: {name: {_eq: "atma_treasury_account_deposits"}, period: {_eq: "hour"}, start_date: {_gte: $startDate}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
}`
