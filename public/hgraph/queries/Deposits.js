export default `
query Deposits {
  node: ecosystem_metric_aggregate(where: {name: {_like: "node_%_deposits"}}) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma_node: ecosystem_metric_aggregate(where: {name: {_like: "atma_node_%_deposits"}}) {
    aggregate {
      sum {
        total
      }
    }
  }
  staking: ecosystem_metric_aggregate(where: {name: {_eq: "staking_account_deposits"}}) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma_staking: ecosystem_metric_aggregate(where: {name: {_eq: "atma_staking_account_deposits"}}) {
    aggregate {
      sum {
        total
      }
    }
  }
  treasury: ecosystem_metric_aggregate(where: {name: {_eq: "treasury_account_deposits"}}) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma_treasury: ecosystem_metric_aggregate(where: {name: {_eq: "atma_treasury_account_deposits"}}) {
    aggregate {
      sum {
        total
      }
    }
  }
}`
