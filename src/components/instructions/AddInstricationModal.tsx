import React, { useState } from 'react';
import Input from '../shared/Input';

interface AddInstructionModalProps {
    onClose: () => void;
    onSave: (instruction: Instruction) => void;
}

interface Instruction {
    type: string;
    selector?: string;
    text?: string;
    delay?: number;
}

const AddInstructionModal: React.FC<AddInstructionModalProps> = ({ onClose, onSave }) => {
    const [instructionType, setInstructionType] = useState<string>('');
    const [selector, setSelector] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [delay, setDelay] = useState<string>('');

    const handleSave = () => {
        const instruction: Instruction = {
            type: instructionType,
            selector: instructionType === 'Wait' || instructionType === 'Fill' || instructionType === 'Click' ? selector : undefined,
            text: instructionType === 'Fill' ? text : undefined,
            delay: (instructionType === 'Fill' || instructionType === 'Delay') ? parseInt(delay, 10) : undefined,
        };
        onSave(instruction); // Call onSave with the instruction object
        onClose();
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#fff',
                padding: '20px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                width: '300px',
            }}
        >
            <h3>Add Instruction</h3>
            <select
                onChange={(e) => setInstructionType(e.target.value)}
                value={instructionType}
            >
                <option value="" disabled>
                    Select instruction type
                </option>
                <option value="Wait">Wait</option>
                <option value="Fill">Fill</option>
                <option value="Click">Click</option>
                <option value="Delay">Delay</option>
            </select>

            {['Wait', 'Fill', 'Click'].includes(instructionType) && (
                <Input
                    type="text"
                    placeholder="Enter selector"
                    value={selector}
                    onChange={(e) => setSelector(e.target.value)}
                />
            )}
            {instructionType === 'Fill' && (
                <>
                    <Input
                        type="text"
                        placeholder="Enter text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Enter delay (ms)"
                        value={delay}
                        onChange={(e) => setDelay(e.target.value)}
                    />
                </>
            )}
            {instructionType === 'Delay' && (
                <Input
                    type="number"
                    placeholder="Enter delay (ms)"
                    value={delay}
                    onChange={(e) => setDelay(e.target.value)}
                />
            )}

            <div
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default AddInstructionModal;
