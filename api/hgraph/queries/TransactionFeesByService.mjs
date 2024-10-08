//
// https://github.com/hashgraph/hedera-mirror-node/blob/21c89d5d09b650e7d554afb72f4031b179d54cb1/hedera-mirror-rest/model/transactionType.js
const protoToName = {
  7: 'CONTRACTCALL',
  8: 'CONTRACTCREATEINSTANCE',
  9: 'CONTRACTUPDATEINSTANCE',
  10: 'CRYPTOADDLIVEHASH',
  11: 'CRYPTOCREATEACCOUNT',
  12: 'CRYPTODELETE',
  13: 'CRYPTODELETELIVEHASH',
  14: 'CRYPTOTRANSFER',
  15: 'CRYPTOUPDATEACCOUNT',
  16: 'FILEAPPEND',
  17: 'FILECREATE',
  18: 'FILEDELETE',
  19: 'FILEUPDATE',
  20: 'SYSTEMDELETE',
  21: 'SYSTEMUNDELETE',
  22: 'CONTRACTDELETEINSTANCE',
  23: 'FREEZE',
  24: 'CONSENSUSCREATETOPIC',
  25: 'CONSENSUSUPDATETOPIC',
  26: 'CONSENSUSDELETETOPIC',
  27: 'CONSENSUSSUBMITMESSAGE',
  28: 'UNCHECKEDSUBMIT',
  29: 'TOKENCREATION',
  31: 'TOKENFREEZE',
  32: 'TOKENUNFREEZE',
  33: 'TOKENGRANTKYC',
  34: 'TOKENREVOKEKYC',
  35: 'TOKENDELETION',
  36: 'TOKENUPDATE',
  37: 'TOKENMINT',
  38: 'TOKENBURN',
  39: 'TOKENWIPE',
  40: 'TOKENASSOCIATE',
  41: 'TOKENDISSOCIATE',
  42: 'SCHEDULECREATE',
  43: 'SCHEDULEDELETE',
  44: 'SCHEDULESIGN',
  45: 'TOKENFEESCHEDULEUPDATE',
  46: 'TOKENPAUSE',
  47: 'TOKENUNPAUSE',
  48: 'CRYPTOAPPROVEALLOWANCE',
  49: 'CRYPTODELETEALLOWANCE',
  50: 'ETHEREUMTRANSACTION',
  51: 'NODESTAKEUPDATE',
  52: 'PRNG',
}

// Flip the keys and values
const nameToProto = Object.keys(protoToName).reduce((acc, key) => {
  acc[protoToName[key]] = +key
  return acc
}, {})

const all = Object.keys(nameToProto)
  .map((name) => nameToProto[name])
  .join('|')

// Create a regex string for each transaction type
const hts = [
  'TOKENCREATION',
  'TOKENFREEZE',
  'TOKENUNFREEZE',
  'TOKENGRANTKYC',
  'TOKENREVOKEKYC',
  'TOKENDELETION',
  'TOKENUPDATE',
  'TOKENMINT',
  'TOKENBURN',
  'TOKENWIPE',
  'TOKENASSOCIATE',
  'TOKENDISSOCIATE',
  'TOKENFEESCHEDULEUPDATE',
  'TOKENPAUSE',
  'TOKENUNPAUSE',
]
  .map((name) => nameToProto[name])
  .join('|')

const hscs = [
  'CONTRACTCALL',
  'CONTRACTCREATEINSTANCE',
  'CONTRACTUPDATEINSTANCE',
  'CONTRACTDELETEINSTANCE',
]
  .map((name) => nameToProto[name])
  .join('|')

const hcs = [
  'CONSENSUSCREATETOPIC',
  'CONSENSUSUPDATETOPIC',
  'CONSENSUSDELETETOPIC',
  'CONSENSUSSUBMITMESSAGE',
]
  .map((name) => nameToProto[name])
  .join('|')

// The similar operator is a sql regex match, to use a POSIX regex match we would use _regex instead
// The like operator is much faster, use when possible
export default `
query TransactionFeesByService($start_date: timestamp!, $end_date: timestamp!) {
  total: ecosystem_metric_aggregate(
    where: {
      name: {_like: "transaction_type_%_fees"},
      period: {_eq: "hour"},
      start_date: {_gte: $start_date},
      end_date: {_lte: $end_date}
    }
  ) {
    aggregate {
      sum {
        total
      }
      max {
        start_date
        end_date
      }
      min {
        start_date
        end_date
      }
    }
  }
  atma_total: ecosystem_metric_aggregate(
    where: {
      name: {_like: "atma_transaction_type_%_fees"},
      period: {_eq: "hour"},
      start_date: {_gte: $start_date},
      end_date: {_lte: $end_date}
    }
  ) {
    aggregate {
      sum {
        total
      }
      max {
        start_date
        end_date
      }
      min {
        start_date
        end_date
      }
    }
  }
  hts: ecosystem_metric_aggregate(
    where: {
      name: {_regex: "^transaction_type_(?:${hts})_fees$"},
      period: {_eq: "hour"},
      start_date: {_gte: $start_date},
      end_date: {_lte: $end_date}
    }
  ) {
    aggregate {
      sum {
        total
      }
      max {
        start_date
        end_date
      }
      min {
        start_date
        end_date
      }
    }
  }
  atma_hts: ecosystem_metric_aggregate(
    where: {
      name: {_regex: "^atma_transaction_type_(?:${hts})_fees$"},
      period: {_eq: "hour"},
      start_date: {_gte: $start_date},
      end_date: {_lte: $end_date}
    }
  ) {
    aggregate {
      sum {
        total
      }
      max {
        start_date
        end_date
      }
      min {
        start_date
        end_date
      }
    }
  }
  hscs: ecosystem_metric_aggregate(
    where: {
      name: {_regex: "^transaction_type_(?:${hscs})_fees$"},
      period: {_eq: "hour"},
      start_date: {_gte: $start_date},
      end_date: {_lte: $end_date}
    }
  ) {
    aggregate {
      sum {
        total
      }
      max {
        start_date
        end_date
      }
      min {
        start_date
        end_date
      }
    }
  }
  atma_hscs: ecosystem_metric_aggregate(
    where: {
      name: {_regex: "^atma_transaction_type_(?:${hscs})_fees$"},
      period: {_eq: "hour"},
      start_date: {_gte: $start_date},
      end_date: {_lte: $end_date}
    }
  ) {
    aggregate {
      sum {
        total
      }
      max {
        start_date
        end_date
      }
      min {
        start_date
        end_date
      }
    }
  }
  hcs: ecosystem_metric_aggregate(
    where: {
      name: {_regex: "^transaction_type_(?:${hcs})_fees$"},
      period: {_eq: "hour"},
      start_date: {_gte: $start_date},
      end_date: {_lte: $end_date}
    }
  ) {
    aggregate {
      sum {
        total
      }
      max {
        start_date
        end_date
      }
      min {
        start_date
        end_date
      }
    }
  }
  atma_hcs: ecosystem_metric_aggregate(
    where: {
      name: {_regex: "^atma_transaction_type_(?:${hcs})_fees$"},
      period: {_eq: "hour"},
      start_date: {_gte: $start_date},
      end_date: {_lte: $end_date}
    }
  ) {
    aggregate {
      sum {
        total
      }
      max {
        start_date
        end_date
      }
      min {
        start_date
        end_date
      }
    }
  }
}
`
