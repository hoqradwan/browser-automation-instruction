"use client"
import { useState } from "react";
import styles from "./Home.module.css";
import InstructionManager from "@/components/instructions/InstructionManager";
import JsonOutput from "@/components/json-output/JsonOutput";

// Define the structure of an instruction
interface Instruction {
  type: string;
  selector?: string;
  text?: string;
  delay?: number;
}

const Home = () => {
  // Define the type for the instructions state
  const [instructions, setInstructions] = useState<Instruction[] | null>(null);

  return (
    <>
      <div className={styles.layout}>
        {/* Pass the correctly typed props to InstructionManager and JsonOutput */}
        <InstructionManager instructions={instructions} setInstructions={setInstructions} />
        <JsonOutput instructions={instructions} setInstructions={setInstructions} />
      </div>
    </>
  );
};

export default Home;
