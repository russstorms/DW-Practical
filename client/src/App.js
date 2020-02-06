import React, { useState } from 'react';
import states from './us_states';

// Styles
import './App.css';

const App = () => {
  // Form fields tied to state
  const [streetField, setStreetField] = useState('');
  const [streetFieldTwo, setStreetFieldTwo] = useState('');
  const [cityField, setCityField] = useState('');
  const [stateField, setStateField] = useState('AL');
  const [zipField, setZipField] = useState('');

  // Elections state
  const [elections, setElections] = useState([]);

  // Map out state abbreviations to form select options
  const stateOptionMapper = () => {
    return states.map((stateAbbr, idx) => {
      return <option key={idx}>{stateAbbr}</option>
    });
  };

  // Map elections
  const electionMapper = () => {
    return elections.map((election, idx) => {
      const date = (new Date(election.date).toString().slice(0, 15))
      const votingMethods = election['district-divisions'][0]['voting-methods']

      const testMethods = votingMethods.map((method) => {
        return method.primary ? 
        <p>Type: {method.type}</p>
        : 
        null
      })

      return (
        <div className="election">
          <h4 key={idx}>{election.description}</h4>
          <p>{date}</p>
          <div>
            {testMethods}
          </div>
        </div>
      )
    });
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Manipulate string state to proper OCD-ID format
    const state = stateField.toLowerCase();
    const city = cityField.toLowerCase().replace(/ /g,"_");

    const cityCheck = city && city!=="" ? `&place=${city}` : '';
    const proxyUrl = `/api/turbovote?state=${state}${cityCheck}`;

    // Fetch to backend
    const response = await fetch(proxyUrl);
    const body = await response.json();

    setElections(body)

    // Error handler
    if (response.status !== 200) throw Error('Error');
    // Check if response is empty
    if (body.length === 0) {
      alert('No elections near your address')
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Democracy Works!</h1>
      </header>
      <h2>Find Elections Near You</h2>
      <p>Enter the address where you are registered to vote</p>
      <form
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="street-field">Street:</label>
          <input
            name="street"
            id="street-field"
            type="text"
            value={streetField}
            onChange={e => setStreetField(e.target.value)}
          />

          <label htmlFor="street-field-two">Street 2:</label>
          <input
            name="street-2"
            id="street-field-two"
            type="text"
            value={streetFieldTwo}
            onChange={e => setStreetFieldTwo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city-field">City:</label>
          <input
            name="city"
            id="city-field"
            type="text"
            value={cityField}
            onChange={e => setCityField(e.target.value)}
          />
          <label htmlFor="state-field">State:</label>
          <select
            name="state"
            id="state-field"
            value={stateField}
            onChange={e => setStateField(e.target.value)}
          >
            {stateOptionMapper()}
          </select>

          <label htmlFor="zip-field">Zip:</label>
          <input
            name="zip"
            id="zip-field"
            type="text"
            pattern="[0-9]*"
            value={zipField}
            onChange={e => setZipField(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="Elections">
        {electionMapper()}
      </div>
    </div>
  );
}

export default App;

