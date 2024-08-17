# Hgraph's Hedera Revenue Dashboard

A lightweight application and public website that allows anyone to view revenue generated by the Hedera network in the form of transaction fees earned. Its features allow for easy analysis of the network's health. The dashboard incorporates the Hedera network through a GraphQL API built on top of Hedera mirror node infrastructure hosted by Hgraph.

This is Hgraph's submission for the 2024 [Hello Future Hackathon](https://hellofuturehackathon.dev/).

*Disclaimer: This revenue dashboard is not officially endorsed by Hedera and may contain inaccuracies.*

## About

Hgraph's Hedera Revenue Dashboard was created to expose a core, new KPI required to measure the health of the Hedera network. This "revenue" KPI has been highly requested by developers, leaders, and the broader community. Revenue in this context is considered to be the fees earned by Hedera through transactions submitted to the Hedera network.

A core consideration is that Hedera payer account `0.0.1459478` (attributed to Atma) contributes to over 75% of the network's revenue. Because of this, a "filter" has been added to the UI of the revenue dashboard to remove these transactions from calculations to get a more granular view of Hedera's revenue data.

This revenue dashboard is a demonstration of Hgraph's data science work and analytics capabilities, as well as a powerful public tool for the Hedera community. It utilizes the "read" side of the Hedera network through mirror nodes.

A most important aspect of this tool is simplicity. Rather than overwhelm users with an influx of complicated information, we present the ecosystem with a simple yet powerful tool so we can all have better visibility into the health and growth of the Hedera network. Many concessions were made to achieve this level of simplicity and clarity in a quick timeframe.

## Features

* **Time dropdown:** Change the time period for information displayed.
* **Percentage:** Show the change between the selected time period and the last.
* **Date:** The current date.
* **Filter:** Remove transactions by `0.0.1459478` from calculations.
* **Income:** A breakdown of key services generating revenue on Hedera.
* **Deposits:** A breakdown of accounts where transaction fees are sent.

## Demo

* [Public website](https://hederarevenue.com)
* Video walkthrough
* Presentation deck

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
  - Other (all other services, including HFS)

![image](https://raw.githubusercontent.com/hgraph-io/hedera-revenue-dashboard/main/src/info/hashscan.png)

*Image above: An example from a transaction as viewed on HashScan ([link](https://hashscan.io/mainnet/transaction/1723915342.599510003))*

### Revenue (USD)

- The amount of revenue (in HBAR) shown is converted in real-time to USD.
- The conversion rate is averaged over the time span selected by the user.
- USD amounts do not factor into calculations. The displayed USD amount is strictly to provide context regarding network revenue for a given timeframe.

### Date dropdown

- The user can select a variety of timeframes: last hour, day, week, month, quarter, year, and all time.
- When the date range is changed, the revenue KPIs update in real-time for easy comparative analysis.

### Percentage indicator

- Under the main revenue numbers, a percentage indicator can be seen.
- This signifies the increase or decrease in revenue over the previous window of time.
  - Example: If a user selects `1 month` from the date dropdown, the percentage indicator will compare the revenue generated from the last month against the revenue generated the month prior.

### Filter for `0.0.1459478`

- Over 75% of Hedera revenue is generated by this account, associated with Atma (a use case by Avery Dennison).
- To get a more nuanced understanding of Hedera network revenue, a filter "switch" has been added to the dashboard.
- This filter removes all transactions paid for by account `0.0.1459478` in our revenue calculations.

## Queries

Want to show this revenue data on your own application or website? We make it possible by publishing the GraphQL queries we use to query the data directly from our hosted Hedera mirror nodes. Below you will find these queries.

You will need access to Hgraph's GraphQL API:
- [INSTRUCTIONS HERE TO SIGN UP]

### Income

Explainer goes here.

`test`

### Dropdown

Explainer goes here.

`test`

### "Atma" Filter

Explainer goes here.

`test`

### Deposits

Explainer goes here.

`test`

## Run Application Locally

### Prerequisites:
1. **Visual Studio Code**: Make sure you have VS Code installed. You can download it from [here](https://code.visualstudio.com/).
2. **Node.js**: Install Node.js and npm (Node Package Manager) if you haven't already. You can download it from [here](https://nodejs.org/).

### Steps to Run the Website:

1. **Clone the Repository**:
   - Open a terminal in VS Code by pressing `Ctrl + ` (backtick) or go to `View > Terminal`.
   - Run the following command to clone the repository:
     ```bash
     git clone https://github.com/hgraph-io/hedera-revenue-dashboard.git
     ```
   - Navigate into the project directory:
     ```bash
     cd hedera-revenue-dashboard
     ```

2. **Run the Website Using `npx serve`**:
   - If the project is a static site and you just want to serve the `src` directory, you can use the following command:
     ```bash
     npx serve src
     ```
   - This command uses `npx` to run the `serve` package, which serves the `src` directory as a static website.
   - Once the server is running, open your browser and go to the URL provided (usually [http://localhost:5000](http://localhost:5000)) to view the website.

3. **Alternative Method: Using the Live Server Extension**:
   - If you prefer to use the `Live Server` extension for serving static websites, follow these steps:
     1. Install the `Live Server` extension from the VS Code marketplace.
     2. Open the `hedera-revenue-dashboard` project folder in VS Code.
     3. Navigate to the `src` directory in the Explorer pane.
     4. Right-click on the `index.html` file and select `Open with Live Server`.
   - This will launch the website in your default browser, and any changes you make to the code will automatically refresh in the browser.

4. **Editing the Code**:
   - You can now edit the website's code in the `src` directory using VS Code.
   - Both `npx serve` and the `Live Server` extension will automatically reload the website whenever you save changes to the files.

### Optional: Building the Website for Production
- If you need to build the website for production, use the following command:
  ```bash
  npm run build
  ```
- This will create an optimized production build in the `build` directory, which you can deploy to your preferred web hosting service.

## Contributing

This repository is Hgraph's submission for the 2024 [Hello Future Hackathon](https://hellofuturehackathon.dev/) and we welcome all contributions, suggestions and feature requests. Bug reports should be made via issues. There is a simple process for contributing:
- Please fork this repository
- Submit a PR with your features

*or*

- Submit an issue with your ideas

Tip: To run prettier on html and js files run: `npx prettier 'src/**/*.(html|js)' --write --config .prettierrc`

## Roadmap

- Backend revenue calculations (done)
- Frontend framework (done)
- Filtering system (done)
- Time selection (done)
- Creation of GraphQL queries (done)
- Implimentation of KPIs (done)
- Testing and QA (done)
- Microservice API (in progress)
- Historical data (in progress)
- Visualizations (in progress)
- Advanced filtering (in progress)
- 

## Tools Used

- Hedera mirror node
- Hgraph infrastructure
- Flexstack
- CoinGecko
- etc...

## License

Info here

## FAQ

Info here

## Acknowledgments

Info here