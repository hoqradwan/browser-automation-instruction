"use client"
import { useState } from "react";
import styles from "./Home.module.css";
import InstructionManager from "@/components/instructions/InstructionManager";
import JsonOutput from "@/components/json-output/JsonOutput";
import { Instruction } from "@/types/instruction";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface InstructionManagerProps {
  instructions: Instruction[];
  setInstructions: React.Dispatch<React.SetStateAction<Instruction[]>>;
}


const Home = () => {
  // Default instructions to an empty array instead of null
  const [instructions, setInstructions] = useState<Instruction[]>([]);

  return (
    <>
      <div className={styles.layout}>
        {/* Now instructions is always an array, so no null check needed */}
        <InstructionManager instructions={instructions} setInstructions={setInstructions} />
        <JsonOutput instructions={instructions} setInstructions={setInstructions} />
      </div>
    </>
  );
};

export default Home;
