export default `
query HourTransactionFees {
  all: ecosystem_metric(
    where: {name: {_eq: "transaction_fees"}, period: {_eq: "hour"}}
    limit: 1
    order_by: {end_date: desc}
    offset: 1
  ) {
    total
  }
  atma: ecosystem_metric(
    where: {name: {_eq: "atma_transaction_fees"}, period: {_eq: "hour"}}
    limit: 1
    order_by: {end_date: desc}
    offset: 1
  ) {
    total
  }
  last_all: ecosystem_metric(
    where: {name: {_eq: "transaction_fees"}, period: {_eq: "hour"}}
    limit: 1
    order_by: {end_date: desc}
    offset: 2
  ) {
    total
  }
  last_atma: ecosystem_metric(
    where: {name: {_eq: "atma_transaction_fees"}, period: {_eq: "hour"}}
    limit: 1
    order_by: {end_date: desc}
    offset: 2
  ) {
    total
  }
}`
