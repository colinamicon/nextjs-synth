import Osc1 from "@/app/components/osc1/Osc1"
import Oscillator from "../oscillator/Oscillator";
import { useState } from "react";

const Synth: React.FC = () => {
    // Unused, somehow causing playback issues when set within 
    // oscillator handlers
    const [isPowerOn, setPowerOn] = useState(false);

    const audioContext = new AudioContext();
    const oscillatorTest = new Oscillator({
        context: audioContext,
        type: 'sine',
        frequency: 440,
        gain: 0.5
    });


    const handleInitiate = () => {
        if (oscillatorTest) {
            oscillatorTest.initiateStart();
        }
    }

    const handleStart = () => {
        if (oscillatorTest) {
            oscillatorTest.connect()
        }
    };

    const handleStop = () => {
        if (oscillatorTest) {
            oscillatorTest.stop();
        }
    };

    const changeOscFreq = (newFreq: number) => {
        if (oscillatorTest) {
            oscillatorTest.setFrequency(newFreq)
        }
    };

    const handleGainChange = (value: number) => {
        if (oscillatorTest) {
            oscillatorTest.setGain(value)
        }
    };

    const changeWaveType = (newWaveType: string) => {
        if (oscillatorTest) {
            oscillatorTest.setType(newWaveType as OscillatorType)
        }
    }

    return <div className="synth-body">
        <button className={`powerButton`} onClick={handleInitiate}>i_o</button>
        <Osc1 changeFrequency={changeOscFreq} changeGainAmp={handleGainChange} changeWaveType={changeWaveType} />
        <section className="buttons">
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </section>

    </div>
}

/**
 * <SynthShell props={buttons, freq?, gain?}/>
 * -- contains: <Osc1, Osc2, Sub, Filters>
 * <Keyboard props={inputKey, velocity, bend?, keyFrame}>
 * -- contains <Key, Note>
 */

export default Synth;