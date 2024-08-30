const DeprecatedSynth: React.FC = () => {

    // functional synth - original implementation 

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

}