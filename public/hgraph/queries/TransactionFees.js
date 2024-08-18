export default `
query TransactionFees(
	$startDate: timestamp,
	$previousStartDate: timestamp
	) {
  all: ecosystem_metric_aggregate(
    where: {name: {_eq: "transaction_fees"}, period: {_eq: "hour"}, start_date: {_gte: $startDate}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma: ecosystem_metric_aggregate(
    where: {name: {_eq: "atma_transaction_fees"}, period: {_eq: "hour"}, start_date: {_gte: $startDate}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  last_all: ecosystem_metric_aggregate(
    where: {name: {_eq: "transaction_fees"}, period: {_eq: "hour"}, start_date: {_gte: $previousStartDate}, end_date: {_lt: $startDate}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  last_atma: ecosystem_metric_aggregate(
    where: {name: {_eq: "atma_transaction_fees"}, period: {_eq: "hour"}, start_date: {_gte: $previousStartDate}, end_date: {_lt: $startDate}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
}`
