const date = new Date()
const startDate = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
const previousStartDate = new Date(date.getTime() - 14 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split('T')[0]

export default `
query WeekTransactionFees(
	$startDate: timestamp = "${startDate}",
	$previousStartDate: timestamp = "${previousStartDate}"
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
