import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className="synth-shell">
          <h1>Synthesizer</h1>
          {/* <Synth></Synth> */}
          <div className="synth">
            <p>Add synthesizer here</p>
            <p>knobs and the like</p>
          </div>
        </div>
      </div>
    </main>
  );
}
