# Revenue calculations

For the purposes of assisting with data efforts.

**1. Income**: From the fees taken from each transaction.

- HTS:
    - all HTS related transactions (crypto create, transfer etc) based on user filters and time range
    - a question is how are HTS transfer fees calculated when done within a contract? here's an example: https://hashscan.io/mainnet/transaction/1723150013.221642009
- HSCS: 
    - all smart contract related service transactions (create, update etc) based on user filters and time range
- HCS:
    - all HCS related transactions (topic create, update, submit etc) based on user filters and time range
- Other:
    - all other transactions (not included above) based on user filters and time range

**2. Deposits**: this area is a summary of all fees taken from transactions that are fed into the network

- Nodes:
    - this is the fee portion from every transaction that is sent to the consensus node: https://hashscan.io/mainnet/nodes
- Staking:
    - this is the portion of each transaction fee sent to account 0.0.800
- Treasury:
    - the portion sent to 0.0.98

**3. Additional paramiters:**
- Time period selection: 1hr, 24hrs, week, month, quarter, year, all time
- Entity filters: the user can enter up to X entities to filter

**Note:** "Concil" was removed as these could add to much complexity

# Notes on Filtering screen

- The toggle is a checkbox
- `checked` means to "only show" and `unchecked` means to filter out
- We should validate that the entities entered are formatted properly (comma spaced, and show an error message if not)
- Maybe set a maximum of 10?

# Managing the repository

*Notes by Brandon*

**Moving stuff into the repo using VS Code:**
1. Go to source control tab
2. Stage files for changes
3. Click the 3 dots menu and make a branch
4. Verify the branch in bottom left of VS Code
5. Make message and commit to the branch
6. Look at incoming/outgoing under commit button
7. Push into the branch via PR (3 dots menu)
8. Let git hub create the branch if not made
9. Fill out PR
10. Request approval
11. When merging: switch email address to Hgraph

**To move stuff from the repo:**
1. Switch back to main branch (little dialog at bottom left)
2. Do a pull from the main branch
3. Get back to work
