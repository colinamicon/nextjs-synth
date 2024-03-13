import React from 'react';

interface Osc1Props {
    changeFrequency: (e: React.ChangeEvent<HTMLInputElement>) => void;
    changeGainAmp: (value: number) => void;
}

const Osc1: React.FC<Osc1Props> = ({ changeFrequency, changeGainAmp }) => {
    const handleGainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newGainValue = parseFloat(event.target.value);
        changeGainAmp(newGainValue);
    };

    return (
        <div>
            <label>Change Frequency</label>
            <input
                onChange={changeFrequency}
                type='range'
                id='frequency'
                max="5000"
            />
            <br />
            <label>Change Volume</label>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                onChange={handleGainChange}
            />
        </div>
    );
};

export default Osc1;