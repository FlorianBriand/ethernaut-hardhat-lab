# Copilot Instructions for Hardhat Lab

## Quick Commands

### Testing
- **Run all tests:** `npx hardhat test`
- **Run only Solidity tests:** `npx hardhat test solidity`
- **Run only Mocha/TypeScript tests:** `npx hardhat test mocha`
- **Run tests matching a pattern:** `npx hardhat test --grep "pattern"`

### Building & Compilation
- **Build/compile contracts:** `npx hardhat compile` or `npx hardhat build`
- **Clean artifacts and cache:** `npx hardhat clean`

### Deployment
- **Deploy to local chain:** `npx hardhat ignition deploy ignition/modules/Counter.ts`
- **Deploy to Sepolia (testnet):** `npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts`
- **View deployment status:** `npx hardhat ignition status <deployment-id>`
- **Visualize deployment module:** `npx hardhat ignition visualize ignition/modules/Counter.ts`

### Development
- **Start a local Hardhat node:** `npx hardhat node`
- **Open Hardhat console:** `npx hardhat console`
- **Run a script:** `npx hardhat run scripts/script-name.ts`

## Project Architecture

### Directory Structure
- **`contracts/`** - Solidity smart contracts
  - `*.sol` - Smart contract source files
  - `*.t.sol` - Foundry-style Solidity unit tests
- **`test/`** - TypeScript Mocha integration tests (`*.ts` files)
- **`ignition/modules/`** - Hardhat Ignition deployment modules (define how contracts are deployed)
- **`ignition/deployments/`** - Stores deployment records and transaction history
- **`scripts/`** - Utility scripts for various tasks
- **`artifacts/`** - Compiled contract ABIs and bytecode (generated)
- **`cache/`** - Compiler cache (generated)

### Technology Stack
- **Smart Contracts:** Solidity 0.8.28
- **Testing Framework:** Mocha + Chai (for TypeScript) and Foundry (for Solidity)
- **Ethereum Library:** ethers.js v6
- **Deployment Tool:** Hardhat Ignition
- **Language:** TypeScript 5.8 (ES modules)
- **Networks:** Local (mainnet & OP simulation), Sepolia testnet

### Testing Architecture
- **Solidity tests** (`*.t.sol`) are written in Foundry style and run natively
- **TypeScript tests** (`test/*.ts`) use Mocha with Chai assertions and ethers.js
- Tests use dynamic network creation: `const { ethers } = await network.create()` to get isolated ethers instances
- Use `ethers.deployContract()` to deploy contracts in tests
- Events are queried with `contract.queryFilter()` method

## Key Conventions

### Solidity Contracts
- Use Solidity 0.8.28+ (specified in `hardhat.config.ts`)
- Emit events for state-changing operations (e.g., `event Increment(uint by)`)
- Use `require()` for input validation with descriptive error messages
- State variables are typically public for easy access

### TypeScript Code
- Strict TypeScript mode is enabled
- Use ES modules (configured with `"type": "module"` in package.json)
- Test files use top-level await for Hardhat network context
- Import from `"hardhat"` for network, ethers, and plugin access
- Use `BigInt` notation for large numbers (e.g., `1n`, `5n`)

### Deployment Modules (Ignition)
- Modules are defined in `ignition/modules/` using `buildModule()`
- Use `m.contract()` to reference contracts
- Use `m.call()` to execute contract functions post-deployment
- Return an object containing deployed contract references
- Modules support conditional execution and dependencies

### Network Configuration
- Multiple network profiles available: `hardhatMainnet`, `hardhatOp`, `sepolia`
- `hardhatMainnet` and `hardhatOp` use EDR (Ethereum Development Runtime) for simulation
- Sepolia requires `SEPOLIA_RPC_URL` and `PRIVATE_KEY` config variables
- Use hardhat-keystore plugin to manage private keys securely

## Development Workflow

1. **Write contracts** in `contracts/` with corresponding tests
2. **Test locally** with `npx hardhat test`
3. **Deploy test** on local chain: `npx hardhat ignition deploy ignition/modules/Counter.ts`
4. **Deploy to testnet** after verification: `npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts`
5. **Use Hardhat console** for interactive debugging: `npx hardhat console`

## Configuration Variables

Hardhat uses config variables for sensitive data:
- `SEPOLIA_RPC_URL` - RPC endpoint for Sepolia testnet
- `PRIVATE_KEY` - Account private key for deployments
- Set via environment variables or `hardhat-keystore` plugin

Avoid committing private keys; always use secure configuration methods.
