interface OscillatorProps {
    context: AudioContext;
    type: OscillatorType;
    frequency: number;
    gain: number;
}

export class Oscillator {
    private oscillatorNode: OscillatorNode;
    private gainNode: GainNode;

    constructor(props: OscillatorProps) {
        this.oscillatorNode = props.context.createOscillator();
        this.gainNode = props.context.createGain();

        this.oscillatorNode.type = props.type;
        this.oscillatorNode.frequency.value = props.frequency;
        this.gainNode.gain.value = props.gain;

        this.oscillatorNode.connect(this.gainNode);
        this.gainNode.connect(props.context.destination);
    }

    public initiateStart() {
        this.oscillatorNode.start();
    }

    public connect() {
        this.oscillatorNode.connect(this.gainNode)
    }

    public stop() {
        this.oscillatorNode.disconnect();
    }

    public setType(type: OscillatorType) {
        this.oscillatorNode.type = type;
    }

    public setFrequency(frequency: number) {
        this.oscillatorNode.frequency.value = frequency;
    }

    public setGain(gain: number) {
        this.gainNode.gain.value = gain
    }
}

export default Oscillator