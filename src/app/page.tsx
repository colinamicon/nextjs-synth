'use client'

import React, { useEffect, useState } from 'react';
import Osc1 from './components/Osc1';

const HomePage: React.FC = () => {
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [gainValue, setGainValue] = useState<number>(0.5); // Initial gain value

  useEffect(() => {
    const actx = new (window.AudioContext)();
    const out = actx.destination;
    const osc = actx.createOscillator();
    const gain = actx.createGain();

    osc.connect(gain);
    gain.connect(out);

    setOscillator(osc);

    return () => {
      // Clean up resources on component unmount
      osc.disconnect();
      gain.disconnect();
    };
  }, []);

  useEffect(() => {
    // Update gain value when it changes
    if (oscillator) {
      const gainNode = oscillator.context.createGain();
      gainNode.gain.value = gainValue;
      oscillator.disconnect();
      oscillator.connect(gainNode);
      gainNode.connect(oscillator.context.destination);
    }
  }, [oscillator, gainValue]);

  const handleStart = () => {
    if (oscillator) {
      oscillator.start();
    }
  };

  const handleStop = () => {
    if (oscillator) {
      oscillator.stop();
    }
  };

  const changeOscFreq = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (oscillator) {
      oscillator.frequency.value = parseFloat(value);
    }
  };

  const handleGainChange = (value: number) => {
    setGainValue(value);
  };

  return (
    <div className="synth-shell">
      <h1>Synthesizer</h1>
      <div className="synth">
        <section className="buttons">
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Stop</button>
          <Osc1 changeFrequency={changeOscFreq} changeGainAmp={handleGainChange} />
        </section>
      </div>
    </div>
  );
};

export default HomePage;