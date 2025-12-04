import React, { useState } from 'react';
import { saveWeight, type WeightEntry } from '../services/storage';

interface WeightInputProps {
    onWeightAdded: (newWeights: WeightEntry[]) => void;
}

const WeightInput: React.FC<WeightInputProps> = ({ onWeightAdded }) => {
    const [weight, setWeight] = useState<string>('');
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!weight || !date) return;

        const newEntry: WeightEntry = {
            date,
            weight: parseFloat(weight),
        };

        const updatedWeights = saveWeight(newEntry);
        onWeightAdded(updatedWeights);
        setWeight('');
    };

    return (
        <form onSubmit={handleSubmit} className="weight-input-form">
            <div className="input-group">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                    type="number"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    step="0.1"
                    placeholder="e.g. 75.5"
                    required
                />
            </div>
            <button type="submit" className="add-btn">Add Entry</button>
        </form>
    );
};

export default WeightInput;
