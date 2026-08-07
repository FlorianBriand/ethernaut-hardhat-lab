# Hardhat Lab - Ethernaut Solutions

A comprehensive solution set for [Ethernaut](https://ethernaut.openzeppelin.com/) challenges built with **Hardhat 3 Beta**, featuring smart contracts, complete test suites, and deployment modules.

This project demonstrates advanced Solidity patterns and security concepts through practical solutions to real Ethernaut challenges.

## 🎯 Overview

Hardhat Lab provides:

- ✅ **Solution contracts** for Ethernaut challenges
- ✅ **Deployment modules** using Hardhat Ignition
- ✅ **Interaction scripts** to verify solutions on live networks
- ✅ **Multi-network support** (local simulation, Sepolia testnet)

## 📚 Solution Set

This project contains solutions for multiple Ethernaut challenges covering key Solidity patterns and security concepts. Solutions are provided as smart contracts, test suites, and deployment modules.

## 🔐 Rappel sécurité — vulnérabilités vues dans ce projet

Voici les principales vulnérabilités illustrées par les challenges implémentés :

- **Réentrance (Re-entrancy)** : appels externes avant mise à jour d’état, permettant de retirer des fonds en boucle.
- **Aléa prédictible on-chain (CoinFlip)** : utilisation de données de bloc (`blockhash`) comme source de hasard exploitable.
- **Mauvaise authentification avec `tx.origin` (Telephone / GatekeeperOne)** : contournement via appel intermédiaire depuis un contrat.
- **`delegatecall` dangereux en fallback (Delegation script)** : exécution de code externe dans le contexte de stockage du contrat appelant.
- **Ether forcé via `selfdestruct` (Force)** : un contrat peut recevoir de l’ETH même sans `receive`/`fallback`.
- **Données "privées" lisibles on-chain (Privacy)** : les variables de stockage restent extractibles malgré des noms/types trompeurs.
- **Déni de service par refus de réception (King)** : blocage logique quand le remboursement du roi précédent échoue.
- **Contrôle d’accès insuffisant (CallToken)** : fonction publique permettant des transferts de tokens sans restriction métier.

Bonnes pratiques associées : modèle **checks-effects-interactions**, `ReentrancyGuard`, éviter `tx.origin` pour l’authentification, limiter/encadrer `delegatecall`, adopter le modèle **pull payments**, et appliquer un contrôle d’accès explicite sur chaque action sensible.

## 🏗️ Project Structure

```
hardhat-lab/
├── contracts/           # Solidity solution contracts
│   ├── *.sol            # Challenge solutions
│   └── *.t.sol          # Foundry unit tests
├── test/                # TypeScript integration tests (Mocha)
│   └── *.ts             # Integration test suites
├── ignition/modules/    # Hardhat Ignition deployment modules
│   └── *.ts             # Deployment configurations
├── scripts/             # Utility scripts for interaction
│   └── *.ts             # Challenge interaction scripts
└── hardhat.config.ts    # Hardhat configuration (Solidity 0.8.28)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ with npm/yarn
- Basic understanding of Solidity and Ethernaut

### Installation

```bash
npm install
```

### Compiling Contracts

```bash
npx hardhat compile
```

## 🎮 Deploying Solutions

### Deploy to Local Chain

Deploy and execute a challenge solution locally:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts
```

### Deploy to Sepolia Testnet

First, set your private key:

```bash
npx hardhat keystore set PRIVATE_KEY
```

Then deploy:

```bash
npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
```

### View Deployment Status

```bash
npx hardhat ignition status <deployment-id>
```

## 💻 Interacting with Challenges

Use utility scripts to interact with external Ethernaut contracts:

```bash
# Query King challenge state
npx hardhat run scripts/king.ts

# Simulate CoinFlip challenge
npx hardhat run scripts/coinflip-play.ts

# Interact with Telephone challenge
npx hardhat run scripts/telephone.ts

# Exploit Force challenge
npx hardhat run scripts/vault.ts
```

## ⚙️ Network Configuration

The project supports multiple networks:

| Network          | Type          | Purpose                           |
| ---------------- | ------------- | --------------------------------- |
| `hardhatMainnet` | EDR-simulated | Local Ethereum mainnet simulation |
| `hardhatOp`      | EDR-simulated | Local Optimism mainnet simulation |
| `sepolia`        | HTTP RPC      | Ethereum Sepolia testnet          |

Configure in `hardhat.config.ts`:

```typescript
networks: {
  sepolia: {
    url: configVariable("SEPOLIA_RPC_URL"),
    accounts: [configVariable("PRIVATE_KEY")],
  },
}
```

## 🧪 Testing Architecture

### Foundry Tests (Solidity)

Located in `contracts/*.t.sol`:

- Unit tests written in Solidity
- Fuzzing support (e.g., `testFuzz_Inc()`)
- Revert expectations with `vm.expectRevert()`

### Integration Tests (TypeScript)

Located in `test/*.ts`:

- Deploy and test contracts dynamically
- Use ethers.js v6 for interactions
- Query events with `contract.queryFilter()`
- Chai assertions for validation

## 📝 Testing Architecture

This project includes comprehensive tests at two levels:

- **Unit tests** in Solidity for granular contract validation
- **Integration tests** in TypeScript for end-to-end scenarios

## 🛠️ Tech Stack

- **Hardhat**: 3.4.5 (latest beta)
- **Solidity**: 0.8.28
- **ethers.js**: v6
- **Testing**: Foundry + Mocha + Chai
- **Deployment**: Hardhat Ignition
- **TypeScript**: 5.8 (strict mode)
- **OpenZeppelin**: Contracts 5.6.1

## 📚 Learning Resources

- [Ethernaut Challenges](https://ethernaut.openzeppelin.com/)
- [Hardhat Documentation](https://hardhat.org/)
- [Solidity by Example](https://solidity-by-example.org/)
- [ethers.js Documentation](https://docs.ethers.org/v6/)

## 📄 License

UNLICENSED - Educational purposes only

## 🤝 Contributing

This project is educational. Feel free to extend with more Ethernaut challenges or improve existing solutions.

---

**Happy solving! 🎯**
