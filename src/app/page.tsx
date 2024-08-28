'use client'

import React, { useEffect, useState } from 'react';
import Osc1 from './components/osc1/Osc1';

const HomePage: React.FC = () => {
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [gainValue, setGainValue] = useState<number>(0.3); // Initial gain value

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

  const changeOscFreq = (newFreq: number) => {
    if (oscillator) {
      oscillator.frequency.value = newFreq;
    }
  };

  const handleGainChange = (value: number) => {
    setGainValue(value);
  };

  const changeWaveType = (newWaveType: string) => {
    if (oscillator) {
      oscillator.type = newWaveType as OscillatorType
    }
  }

  // setState dispatch 
  // graphQL -> toneJS -> redis?

  return (
    /**
     * <SynthShell props={buttons, freq?, gain?}/>
     * -- contains: <Osc1, Osc2, Sub, Filters>
     * <Keyboard props={inputKey, velocity, bend?, keyFrame}>
     * -- contains <Key>
     */
    <div className="synth-shell">
      <h1>Synthesizer.v1</h1>
      <div className="synth">
        <section className="buttons">
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Stop</button>
          <Osc1 changeFrequency={changeOscFreq} changeGainAmp={handleGainChange} changeWaveType={changeWaveType} />
        </section>
      </div>
    </div>
  );
};

// TODO: cma
/**
 * Build a reusable, modular synth 
 * Goal is to create polyphonic synth with Filters
 * 
 * Follow react atomic design
 * 
 * Implement: 
 * - backend component
 * - login? 
 * - save user settings
 * - keyboard for the synth
 */

export default HomePage;