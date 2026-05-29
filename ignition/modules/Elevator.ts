import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ELEVATOR_ADDRESS = "0x091eD74FCf09843d66Eef7Dd5c5BBC12a19E266C";


export default buildModule("ElevatorModule", (m) => {
  const reentrancy = m.contract("Elevator", [ELEVATOR_ADDRESS]);

  // Use script elevator.ts to execute the attack for debugging purposes
  //m.call(reentrancy, "goTo", [100]);

 return { reentrancy };
});

