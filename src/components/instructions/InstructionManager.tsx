"use client";
import React, { useState, useEffect } from 'react';
import AddInstricationModal from './AddInstricationModal';
import { TiDelete } from 'react-icons/ti';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaRedo, FaUndo } from 'react-icons/fa';
import { Instruction } from '@/types/instruction';



interface InstructionManagerProps {
    instructions: Instruction[];
    setInstructions: React.Dispatch<React.SetStateAction<Instruction[]>>;
}


const InstructionManager: React.FC<InstructionManagerProps> = ({ instructions, setInstructions }) => {
    const [pastStates, setPastStates] = useState<Instruction[][]>([]); // Stack of past states
    const [futureStates, setFutureStates] = useState<Instruction[][]>([]); // Stack of future states
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const savedInstructions = localStorage.getItem('instructions');
        setInstructions(savedInstructions ? JSON.parse(savedInstructions) : []);
    }, [setInstructions]); // Load from localStorage after mount

    useEffect(() => {
        if (instructions !== null) {
            localStorage.setItem('instructions', JSON.stringify(instructions));
        }
    }, [instructions]); // Persist to localStorage whenever instructions change

    const handleAddInstruction = (instruction: Instruction) => {
        saveState();
        setInstructions((prev) => [...prev, instruction]);
        setFutureStates([]); // Clear redo stack
    };

    const handleUpdateInstruction = (index: number, updatedInstruction: Instruction) => {
        saveState();
        setInstructions((prev) => {
            const newInstructions = [...prev];
            newInstructions[index] = updatedInstruction;
            return newInstructions;
        });
        setFutureStates([]); // Clear redo stack
    };

    const handleRemoveInstruction = (index: number) => {
        saveState();
        setInstructions((prev) => prev.filter((_, i) => i !== index));
        setFutureStates([]); // Clear redo stack
    };

    const handleClearAll = () => {
        saveState();
        setInstructions([]);
        setFutureStates([]); // Clear redo stack
    };

    const saveState = () => {
        setPastStates((prev) => [...prev, instructions]);
    };

    const undo = () => {
        if (pastStates.length > 0) {
            const previousState = pastStates[pastStates.length - 1];
            setPastStates((prev) => prev.slice(0, -1));
            setFutureStates((prev) => [instructions, ...prev]);
            setInstructions(previousState);
        }
    };

    const redo = () => {
        if (futureStates.length > 0) {
            const nextState = futureStates[0];
            setFutureStates((prev) => prev.slice(1));
            setPastStates((prev) => [...prev, instructions]);
            setInstructions(nextState);
        }
    };
    const handleClone = (index: number) => {

        saveState(); // Save current state for undo
        setInstructions((prev) => {
            const clonedInstruction = { ...prev[index] }; // Clone the selected instruction
            return [...prev.slice(0, index + 1), clonedInstruction, ...prev.slice(index + 1)];
        });
        setFutureStates([]); // Clear redo stack

    }

    const renderFields = (instruction: Instruction, index: number) => {
        switch (instruction.type) {
            case 'Wait':
                return (
                    <label>
                        <input
                            type="text"
                            value={instruction.selector || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleUpdateInstruction(index, {
                                    ...instruction,
                                    selector: e.target.value,
                                })
                            }
                        />

                    </label>
                );
            case 'Fill':
                return (
                    <>
                        <label>
                            <input
                                type="text"
                                value={instruction.selector || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleUpdateInstruction(index, {
                                        ...instruction,
                                        selector: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <br />
                        <label>
                            <input
                                type="text"
                                value={instruction.text || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleUpdateInstruction(index, {
                                        ...instruction,
                                        text: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <br />
                        <label>
                            <input
                                type="number"
                                value={instruction.delay || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleUpdateInstruction(index, {
                                        ...instruction,
                                        delay: Number(e.target.value),
                                    })
                                }
                            />
                        </label>
                    </>
                );
            case 'Click':
                return (
                    <label>
                        <input
                            type="text"
                            value={instruction.selector || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleUpdateInstruction(index, {
                                    ...instruction,
                                    selector: e.target.value,
                                })
                            }
                        />
                    </label>
                );
            case 'Delay':
                return (
                    <label>
                        <input
                            type="number"
                            value={instruction.delay || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleUpdateInstruction(index, {
                                    ...instruction,
                                    delay: Number(e.target.value),
                                })
                            }
                        />
                    </label>
                );
            default:
                return null;
        }
    };

    if (instructions === null) {
        return <p>Loading...</p>; // Avoid hydration mismatch by showing loading state initially
    }

    return (
        <div>
            <h2>Browser Instruction List</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <IoMdAddCircleOutline style={{ cursor: "pointer" }} onClick={() => setIsModalOpen(true)} />
                <button style={{ cursor: "pointer" }} onClick={handleClearAll}>
                    Clear All
                </button>
                <br />
                <button onClick={undo} style={{ cursor: "pointer" }}>  <FaUndo /></button>
                <button onClick={redo} style={{ cursor: "pointer" }}>   <FaRedo /></button>
                {/* disabled={pastStates.length === 0} */}
                {isModalOpen && (
                    <AddInstricationModal
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleAddInstruction}
                    />
                )}
            </div>
            <ul>
                {instructions.map((instruction, index) => (
                    <li key={index} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <label>
                            <select
                                value={instruction.type}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                    handleUpdateInstruction(index, {
                                        ...instruction,
                                        type: e.target.value as Instruction['type'],
                                        selector: '',
                                        text: '',
                                        delay: undefined,
                                    })
                                }
                            >
                                <option value="Wait">Wait</option>
                                <option value="Fill">Fill</option>
                                <option value="Click">Click</option>
                                <option value="Delay">Delay</option>
                            </select>
                        </label>
                        <br />
                        {renderFields(instruction, index)}
                        <br />
                        <button onClick={() => handleClone(index)}>Clone</button>

                        <TiDelete style={{ cursor: "pointer" }} onClick={() => handleRemoveInstruction(index)} />

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InstructionManager;
