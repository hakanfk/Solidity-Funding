# FundMe Contract

A decentralized fundraising platform developed with Solidity.

## Description

This Ethereum smart contract enables users to send ETH to a contract and the contract owner can withdraw all the funds.

## Contract Features

- Fund: Any user can send ETH to the contract.
- Withdraw: Only the owner of the contract can withdraw all the funds.

## Prerequisites

- Solidity ^0.8.8
- Ethereum compatible wallet
- Chainlink contract (for fetching price feeds)

## Setup & Deployment

1. Clone the repo.
2. Install dependencies.

## Contract Functions

fund(): Accepts an amount of ETH from a user and records it in addressToAmountFunded. The amount must be equivalent to at least $50.
withdraw(): Clears all funded amounts, empties the funders array, and sends all contract balance to the owner. Only the owner can call this function.
