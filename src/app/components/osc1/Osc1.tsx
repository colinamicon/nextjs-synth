import React from 'react';

interface Osc1Props {
    changeWaveType: (e: string) => void
    changeGainAmp: (value: number) => void;
    changeFrequency: (e: number) => void;
}

const Osc1: React.FC<Osc1Props> = ({ changeFrequency, changeGainAmp, changeWaveType }) => {
    const handleWaveChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newWaveType = event.target.value
        changeWaveType(newWaveType)
    }
    const handleGainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newGainValue = parseFloat(event.target.value);
        changeGainAmp(newGainValue);
    };
    const handleFreqChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFreqValue = parseFloat(e.target.value)
        changeFrequency(newFreqValue)
    }

    return (
        <div>
            <label>Waveform: </label>
            <select onChange={handleWaveChange}>
                <option value={'sine'}>sine</option>
                <option value={'square'}>square</option>
                <option value={'triangle'}>triangle</option>
                <option value={'sawtooth'}>sawtooth</option>
            </select>
            <br />
            <label>Frequency: </label>
            <input
                onChange={handleFreqChange}
                type='range'
                id='frequency'
                min="55"
                max="880"
            />
            <br />
            <label>Volume: </label>
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