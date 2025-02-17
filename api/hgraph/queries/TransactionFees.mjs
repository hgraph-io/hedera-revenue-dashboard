export default `
query TransactionFees($start_date: timestamp!, $end_date: timestamp!) {
  all: ecosystem_metric(
    where: {
      name: {_eq: "transaction_fees"},
      period: {_eq: "hour"},
      start_date: {_gte: $start_date},
      end_date: {_lte: $end_date}
    }
  ) {
    start_date
    end_date
    total
  }
  atma: ecosystem_metric(
    where: {
      name: {_eq: "atma_transaction_fees"},
      period: {_eq: "hour"},
      start_date: {_gte: $start_date},
      end_date: {_lte: $end_date}
    }
  ) {
    start_date
    end_date
    total
  }
  conversion_rates: ecosystem_metric(
    where: {
      name: {_eq: "avg_usd_conversion"},
      period: {_eq: "hour"},
      start_date: {_gte: $start_date},
      end_date: {_lte: $end_date}
    }
  ) {
    start_date
    end_date
    total
  }
}
`
