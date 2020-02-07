import React, { useState } from 'react';
import Form from '../form/form';
import Elections from '../elections/elections';

// Styles
import './App.css';

const App = () => {
  // Elections state
  const [elections, setElections] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Democracy <span>Works</span></h1>
      </header>
      <Form 
        setElections={setElections}
      />
      <Elections
        elections={elections}
      />
    </div>
  );
}

export default App;

