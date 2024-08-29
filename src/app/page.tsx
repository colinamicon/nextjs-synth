'use client'

import React from 'react';
import Synth from './modules/synth/Synth';

const HomePage: React.FC = () => {
  return (
    <div className="synth-shell">
      <h1>Synthesizer.v1</h1>
      <div className="synth">
        <Synth />
      </div>
    </div>
  );
};

export default HomePage;