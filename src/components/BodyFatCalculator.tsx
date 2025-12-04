import { useState } from 'react';
import type { BodyFatEntry } from '../services/storage';

interface BodyFatCalculatorProps {
    onSave: (entry: BodyFatEntry) => void;
}

const BodyFatCalculator: React.FC<BodyFatCalculatorProps> = ({ onSave }) => {
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [height, setHeight] = useState<string>('');
    const [neck, setNeck] = useState<string>('');
    const [waist, setWaist] = useState<string>('');
    const [hip, setHip] = useState<string>('');
    const [bodyFat, setBodyFat] = useState<number | null>(null);

    const calculateBodyFat = () => {
        const h = parseFloat(height);
        const n = parseFloat(neck);
        const w = parseFloat(waist);
        const hi = parseFloat(hip);

        if (!h || !n || !w || (gender === 'female' && !hi)) {
            setBodyFat(null);
            return;
        }

        let bf = 0;

        if (gender === 'male') {
            // US Navy Formula for Men
            // 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
            bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
        } else {
            // US Navy Formula for Women
            // 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
            bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hi - n) + 0.22100 * Math.log10(h)) - 450;
        }

        setBodyFat(parseFloat(bf.toFixed(1)));
    };

    const handleSave = () => {
        if (bodyFat !== null) {
            const entry: BodyFatEntry = {
                date: new Date().toISOString().split('T')[0],
                percentage: bodyFat
            };
            onSave(entry);
            // Optional: Show success feedback
            alert('Body fat percentage saved!');
        }
    };

    return (
        <div className="calculator-container">
            <h3>Body Fat Calculator (US Navy Method)</h3>

            <div className="input-group">
                <label>Gender</label>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            value="male"
                            checked={gender === 'male'}
                            onChange={() => setGender('male')}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="female"
                            checked={gender === 'female'}
                            onChange={() => setGender('female')}
                        />
                        Female
                    </label>
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="height">Height (cm)</label>
                <input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g., 175"
                />
            </div>

            <div className="input-group">
                <label htmlFor="neck">Neck (cm)</label>
                <input
                    id="neck"
                    type="number"
                    value={neck}
                    onChange={(e) => setNeck(e.target.value)}
                    placeholder="e.g., 38"
                />
            </div>

            <div className="input-group">
                <label htmlFor="waist">Waist (cm)</label>
                <input
                    id="waist"
                    type="number"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    placeholder="e.g., 85"
                />
            </div>

            {gender === 'female' && (
                <div className="input-group">
                    <label htmlFor="hip">Hip (cm)</label>
                    <input
                        id="hip"
                        type="number"
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        placeholder="e.g., 95"
                    />
                </div>
            )}

            <div className="button-group">
                <button className="primary-button" onClick={calculateBodyFat}>
                    Calculate
                </button>
                {bodyFat !== null && !isNaN(bodyFat) && (
                    <button className="secondary-button" onClick={handleSave} style={{ marginLeft: '10px' }}>
                        Save Result
                    </button>
                )}
            </div>

            {bodyFat !== null && !isNaN(bodyFat) && (
                <div className="result-display">
                    <h4>Estimated Body Fat:</h4>
                    <span className="highlight-value">{bodyFat}%</span>
                </div>
            )}
        </div>
    );
};

export default BodyFatCalculator;
