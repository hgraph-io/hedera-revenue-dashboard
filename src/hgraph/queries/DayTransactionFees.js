export default `
query DayTransactionFees {
  hour_all: ecosystem_metric(
    where: {name: {_eq: "transaction_fees"}, period: {_eq: "hour"}}
    limit: 1
    order_by: {end_date: desc}
    offset: 1
  ) {
    total
  }
  hour_atma: ecosystem_metric(
    where: {name: {_eq: "atma_transaction_fees"}, period: {_eq: "hour"}}
    limit: 1
    order_by: {end_date: desc}
    offset: 1
  ) {
    total
  }
  last_hour_all: ecosystem_metric(
    where: {name: {_eq: "transaction_fees"}, period: {_eq: "hour"}}
    limit: 1
    order_by: {end_date: desc}
    offset: 2
  ) {
    total
  }
  last_hour_atma: ecosystem_metric(
    where: {name: {_eq: "atma_transaction_fees"}, period: {_eq: "hour"}}
    limit: 1
    order_by: {end_date: desc}
    offset: 2
  ) {
    total
  }
}`
