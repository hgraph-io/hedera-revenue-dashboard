export default `
query Deposits {
  node: ecosystem_metric_aggregate(where: {name: {_like: "node_%_deposits"}}) {
    aggregate {
      sum {
        total
      }
    }
  }
  staking: ecosystem_metric_aggregate(where: {name: {_eq: "staking_deposits"}}) {
    aggregate {
      sum {
        total
      }
    }
  }
  treasury: ecosystem_metric_aggregate(where: {name: {_eq: "treasury_deposits"}}) {
    aggregate {
      sum {
        total
      }
    }
  }
}`
