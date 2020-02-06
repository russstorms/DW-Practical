import React, { useState, useEffect } from 'react';

import states from './us_states';

// Styles
import './App.css';

const App = () => {
  // Form fields tied to state
  const [streetField, setStreetField] = useState('')
  const [streetFieldTwo, setStreetFieldTwo] = useState('')
  const [cityField, setCityField] = useState('')
  const [stateField, setStateField] = useState('AL')
  const [zipField, setZipField] = useState('')

  const [elections, setElections] = useState([])

  // Get API
  // useEffect(() => {
  //   (async () => {
  //     // Load the response
  //     const response = await fetch('/api/turbovote').catch(err => console.log(err))
  //     const body = await response.json();
  //     console.log(body);
  //     // Error handler
  //     if (response.status !== 200) throw Error('Error');

  //   })();
  // }, [])

  // const response = await fetch('/api/turbovote', {
    //   method: "GET",
    // });
    // console.log(response, odcID)
    //   const body = await response.json();
    //   const json = JSON.parse(body.data);
      // console.log(json)
      // Error handler
      // if (response.status !== 200) throw Error('Error');

      // setElections(json)

  const stateOptionMapper = () => {
    return states.map((stateAbbr, idx) => {
      return <option key={idx}>{stateAbbr}</option>
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const proxyUrl = `./api/turbovote/state/${stateField.toLowerCase()}/place/${cityField}`;
    // console.log(odcID)
    fetch(proxyUrl)
      .then(response => {
        console.log(response)
      })
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
      {/* <h5>{elections}</h5> */}
    </div>
  );
}

export default App;

