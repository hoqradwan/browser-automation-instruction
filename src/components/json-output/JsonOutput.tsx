import { Instruction } from '@/types/instruction';
import React, { useEffect, useState } from 'react';



interface InstructionManagerProps {
    instructions: Instruction[];
    setInstructions: React.Dispatch<React.SetStateAction<Instruction[]>>;
}


const JsonOutput: React.FC<InstructionManagerProps> = ({ instructions, setInstructions }) => {
    const [jsonData, setJsonData] = useState<string>(JSON.stringify(instructions, null, 2));
    const [error, setError] = useState<string | null>(null);

    // Sync instructions to jsonData whenever instructions change
    useEffect(() => {
        setJsonData(JSON.stringify(instructions, null, 2));
    }, [instructions]);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setJsonData(value);

        try {
            const parsed: Instruction[] = JSON.parse(value);
            validateInstructions(parsed);
            setInstructions(parsed);
            setError(null);
        } catch (err) {
            setError((err as Error).message || 'Invalid JSON format');
        }
    };

    const validateInstructions = (data: Instruction[]) => {
        if (!Array.isArray(data)) {
            throw new Error('JSON must be an array.');
        }

        data.forEach((item, index) => {
            if (typeof item !== 'object' || Array.isArray(item)) {
                throw new Error(`Instruction at index ${index} must be an object.`);
            }

            const [key, value] = Object.entries(item)[0];

            switch (key) {
                case 'wait':
                case 'click':
                    if (typeof value !== 'string') {
                        throw new Error(`Instruction at index ${index} must have a string selector for '${key}'.`);
                    }
                    break;

                case 'fill':
                    if (
                        typeof value !== 'object' ||
                        typeof value.selector !== 'string' ||
                        typeof value.text !== 'string' ||
                        typeof value.delay !== 'number'
                    ) {
                        throw new Error(`Instruction at index ${index} for 'fill' must include 'selector', 'text', and 'delay' fields.`);
                    }
                    break;

                case 'delay':
                    if (typeof value !== 'number') {
                        throw new Error(`Instruction at index ${index} must have a numeric delay.`);
                    }
                    break;

                default:
                    throw new Error(`Invalid instruction type '${key}' at index ${index}. Allowed types: wait, fill, click, delay.`);
            }
        });
    };

    return (
        <div>
            <h2>JSON Output</h2>
            <textarea
                rows={20}
                cols={50}
                value={jsonData}
                onChange={handleTextareaChange}
                style={{ width: '100%', height: '300px', fontFamily: 'monospace' }}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default JsonOutput;
