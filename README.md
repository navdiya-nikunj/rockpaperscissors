# Rock-Paper-Scissors Game on Aptos Blockchain

This project is a decentralized Rock-Paper-Scissors game built on the Aptos blockchain using the Move programming language. The game allows users to play against each other or against a computer, with all game states stored on the blockchain. The user interface is developed with Vite and React, and the project integrates with Aptos wallets using the Aptos Wallet Adapter.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Smart Contract Overview](#smart-contract-overview)
- [Installation](#installation)
- [Usage](#usage)
- [How to Play](#how-to-play)
- [Acknowledgement](#acknowledgement)

## Features

- Play Rock-Paper-Scissors against another player or the computer.
- All game moves and results are stored securely on the Aptos blockchain.
- Randomized computer moves for a fair and unpredictable experience.
- Simple and intuitive user interface built with React.
- Wallet integration using Aptos Wallet Adapter for seamless user experience.

## Technology Stack

- **Blockchain**: Aptos
- **Smart Contract Language**: Move
- **Frontend Framework**: Vite + React
- **Wallet Integration**: Aptos Wallet Adapter

## Smart Contract Overview

The smart contract handles the logic of the Rock-Paper-Scissors game, including:

- Initializing player states
- Starting a new game against a player or the computer
- Setting moves for both players
- Randomly generating moves for the computer
- Finalizing game results and determining the winner
- Retrieving game details and player states

### Key Components

- **Constants**: Define moves (Rock, Paper, Scissors) and game types (Player vs. Player, Player vs. Computer).
- **Game Structure**: Stores game details like player addresses, moves, and results.
- **PlayerState Structure**: Manages the player's game history and count.
- **Functions**: Handle game initialization, move setting, computer move generation, and result finalization.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/rock-paper-scissors-aptos.git
   cd rock-paper-scissors-aptos
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Compile and deploy the smart contract**:
   - Ensure you have the Aptos CLI installed and configured.
   - Compile and deploy the Move contract to the Aptos blockchain.

4. **Run the frontend**:

   ```bash
   npm run dev
   ```

   This will start the Vite development server, and the app will be available at `http://localhost:3000`.

## Usage

1. **Connect your wallet**: Use the wallet adapter to connect your Aptos wallet.
2. **Initialize your player profile**: If this is your first time playing, initialize your player profile on the blockchain.
3. **Start a new game**: Choose to play against another player or the computer.
4. **Make your move**: Select Rock, Paper, or Scissors.
5. **View results**: After both players have made their moves, the results will be calculated and displayed.

## How to Play

1. **Player vs. Player**:
   - Start a new game by entering your opponent's address.
   - Both players set their moves.
   - Finalize the game to see the result.

2. **Player vs. Computer**:
   - Start a new game against the computer.
   - Set your move.
   - The computer’s move will be randomly generated, and the result will be displayed.

## Acknowledgement

Thanks to Stackup for posting this bounty and give me opportunity to build and learn something
