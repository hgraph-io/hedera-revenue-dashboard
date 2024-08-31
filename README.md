# Hgraph's Hedera Revenue Dashboard

A lightweight application and public website that allows anyone to view revenue generated by the Hedera network in the form of transaction fees earned on the mainnet. Its features allow for easy analysis of the network's health. The dashboard incorporates the Hedera network through a GraphQL API built on top of Hedera mirror node infrastructure hosted by Hgraph.

**View Live Website → [hederarevenue.com](https://hederarevenue.com)**

This is Hgraph's submission for the 2024 [Hello Future Hackathon](https://hellofuturehackathon.dev/).

## About

Hgraph's Hedera Revenue Dashboard was created to expose a core, new KPI required to measure the health of the Hedera network. This "revenue" KPI in this context is considered to be the fees earned by Hedera through transactions submitted to the Hedera network.

A core consideration is that Hedera payer account `0.0.1459478` (attributed to Atma) currently contributes to over 98% of transaction volume and over 78% of the network's revenue earned via transaction fees. Because of this, a "filter" has been added to the UI of the revenue dashboard to remove these transactions from calculations to get a more granular view of Hedera's revenue data.

This revenue dashboard is a demonstration of Hgraph's expertise in building on Hedera’s technology, as well as a powerful public tool for the Hedera community. It utilizes the "read" side of the Hedera network through mirror nodes and Hgraph's infrastructure. Mirror nodes are crucial for queries, analytics, audit support and monitoring. Without mirror nodes data stored on the network stored on the network would not be easily accessible.

An important aspect of this tool is simplicity. Rather than overwhelm users with an influx of complicated information, we present the ecosystem with a simple yet powerful tool so we can all have better visibility into the health and growth of the Hedera network.

We are running a cron job every hour that runs the sql procedures in [./sql](./sql). We display revenue information up to last full hour.

## Features (user guide)

- **Time dropdown:** Update the time period for the displayed information. These time periods are relative to the current date and time. For example, "Last Year" refers to the 365 days leading up to the current date.
- **Percentage:** Display the percentage change between the selected time period and the previous one, relative to today's date. For example, if "Last Month" is selected, show the percentage difference between the most recent 30 days and the 30 days preceding that.
- **Date:** The current date and time in UTC format, which is important for providing context when users share screenshots of this website on social media.
- **Filter switch:** This feature excludes all Hedera transactions paid by account 0.0.1459478 from the revenue calculations.
- **Income:** Transaction fees collected by Hedera, categorized by key network services: HTS, HCS, HSCS, and "other."
- **Deposits:** The total revenue generated by Hedera through transaction fees is divided into three key areas: nodes, treasury and staking.
- **Caching:** Mirror node queries are cached so front-end data loads immediately for users.

## Resources

- [Public website (demo)](https://hederarevenue.com)
- [Video walkthrough](https://youtu.be/jY3w2cACv8k)
- [Presentation deck](https://docs.google.com/presentation/d/1tmjeGSnlCF1-alqbqRLI95QxOzW3er4lJgOUy_02Ohk/edit?usp=sharing)
- [Mirror nodes blog article](https://www.hgraph.com/blog/hedera-mirror-node)
- [Hgraph official website](https://www.hgraph.com/)

## Methodology

The information displayed on Hgraph's Hedera Revenue Dashboard is explained below.

### Revenue (HBAR)

Hedera's revenue is calculated as follows:

- Transactions are submitted to the Hedera mainnet
- Each transaction has fees associated with it:
  - HBAR sent to consensus nodes ([link](https://hashscan.io/mainnet/nodes))
  - HBAR sent to staking account `0.0.800`
  - HBAR sent to Hedera treasury account `0.0.98`
- Different transaction types, belonging to different network services, have different fee amounts
- Hgraph calculates transaction fees collected by Hedera since genesis
- Hgraph breaks apart revenue earned by each service
  - HTS (Hedera Token Service)
  - HSCS (Hedera Smart Contract Service)
  - HCS (Hedera Consensus Service)
  - Other (all other services, including HFS and Hbar account transactions)

![image](https://raw.githubusercontent.com/hgraph-io/hedera-revenue-dashboard/main/public/info/hashscan.png)

_Image above: An example from a transaction as viewed on HashScan ([link](https://hashscan.io/mainnet/transaction/1723915342.599510003))_

### Revenue (USD)

- The amount of revenue (in HBAR) shown is converted in real-time to USD.
- All USD conversions are done at the current market rate.
- As fees are collected in HBAR on the Hedera network, all calculations are done using HBAR. The displayed USD amount is strictly to provide context regarding network revenue for a given timeframe.

### Date dropdown

- The user can select a variety of timeframes: last hour, day, week, month, quarter, year, and all time.
- When the date range is changed, the revenue KPIs update in real-time for easy comparative analysis.
- Update the time period for the displayed information. These time periods are relative to the current date and time. For example, "Last Year" refers to the 365 days leading up to the current date.

### Percentage indicator

- Under the main revenue numbers, a percentage indicator can be seen.
- This signifies the increase or decrease in revenue over the previous window of time.
  - Example: If a user selects `1 month` from the date dropdown, the percentage indicator will compare the revenue generated from the last month against the revenue generated the month prior.

### Filter for `0.0.1459478`

- Over 78% of Hedera revenue is generated by this account, associated with Atma (a use case by Avery Dennison).
- To get a more nuanced understanding of Hedera network revenue, a filter "switch" has been added to the dashboard.
- This filter removes all transactions paid for by account `0.0.1459478` in our revenue calculations.

## Data retrieval and computation

Want to show this revenue data on your own application or website? We make it possible by publishing the GraphQL API queries we use to query the data directly from our hosted Hedera mirror nodes. Below you will find these queries. You can sign up for an [Hgraph API Key](https://hgraph.com) to retrieve data from our mirror nodes.

### View GraphQL Queries

You can see the queries used on Hgraph's Hedera Revenue Dashboard in the repository located [in the following folder](https://github.com/hgraph-io/hedera-revenue-dashboard/tree/main/public/hgraph/queries): `public/hgraph/queries`

You can also view SQL computations [in the following folder](https://github.com/hgraph-io/hedera-revenue-dashboard/tree/main/sql).

### Example query

This is an Hgraph advanced GraphQL query for all time Hedera revenue generated by transaction fees. Using this query, you can pull the computed data from our mirror node.

```
query AllTimeTransactionFees {
  all: ecosystem_metric_aggregate(
    where: {name: {_eq: "transaction_fees"}, period: {_eq: "hour"}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
  atma: ecosystem_metric_aggregate(
    where: {name: {_eq: "atma_transaction_fees"}, period: {_eq: "hour"}}
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
}
```

## Developing

### Serve the frontend

```bash
npx serve public
```

- This command uses `npx` to run the `serve` package, which serves the `public` directory as a static website.
- Once the server is running, open your browser and go to the URL provided (usually [http://localhost:3000](http://localhost:3000)).

### Serve the backend

```bash
node api/server.mjs
```

- This starts a backend process that periodically gets new data from the api and caches it.
- `curl localhost:3001/data.json`

## Contributing

This repository is Hgraph's submission for the 2024 [Hello Future Hackathon](https://hellofuturehackathon.dev/) and we welcome all contributions, suggestions and feature requests. Bug reports should be made via issues. There is a simple process for contributing:

- Please fork this repository
- Submit a PR with your features

_or_

- Submit an issue with your ideas

Tip: To run prettier on applicable files run: `npx prettier './**/*.(html|js|mjs|css|md)' --write --config .prettierrc`

## Roadmap

This is a simple overview of what's next for Hgraph's Hedera Revenue Dashboard, what's currently live now and beyond:

### Completed

- Backend revenue calculations (done)
- Frontend framework (done)
- Filtering system (done)
- Time selection (done)
- Creation of GraphQL queries (done)
- Implementation of KPIs (done)
- Testing and QA (done)

### Coming soon

- Additional KPIs
- Advanced filtering
- Data augmentation
- API access
- Visualizations/charts
- Paid features
- Ad-hoc analytics
- Integrations

## Tools Used

- [Hedera mirror node](https://docs.hedera.com/hedera/core-concepts/mirror-nodes/hedera-mirror-node)
- [Hgraph](https://github.com/hgraph-io/sdk)
- [Flexstack](https://github.com/flexstack)
- [PL/pgSQL](https://www.postgresql.org/docs/current/plpgsql.html)
- [GraphQL](https://graphql.org/)
- [Marked](https://github.com/markedjs/marked)

**Why did we use vanilla Javascript, HTML and CSS?** A core goal was to make the application as broadly accessible and require as few dependencies as possible.

## Acknowledgements

**Tyler McDonald** - Backend development ([GitHub](https://github.com/tmctl))

**Brandon Davenport** - Frondend development ([GitHub](https://github.com/itsbrandondev))

---

This is Hgraph's submission for the 2024 [Hello Future Hackathon](https://hellofuturehackathon.dev/). This tool will be updated based on new features, bug reports and questions.
