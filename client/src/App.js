import React, { useState, useEffect } from 'react';

import states from './us_states';

// Styles
import './App.css';

const App = () => {
  // Form fields tied to state
  const [streetField, setStreetField] = useState('')
  const [streetFieldTwo, setStreetFieldTwo] = useState('')
  const [cityField, setCityField] = useState('')
  const [stateField, setStateField] = useState('')
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

  const stateMapper = () => {
    let options = []
    states.map((state, idx) => {
      options.push(<option key={idx}>{state}</option>)
    })
    return options
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/turbovote', {
      method: "GET",
    });
      const body = await response.json();
      const json = JSON.parse(body.data);
      console.log(json)
      // Error handler
      if (response.status !== 200) throw Error('Error');

      setElections(json)
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Democracy Works!</h1>
      </header>
      <h2>Find Elections Near You</h2>
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
            {stateMapper()}
          </select>

          <label htmlFor="zip-field">Zip:</label>
          <input
            name="zip"
            id="zip-field"
            type="text"
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

{/* <p>Enter the address where you are registered to vote</p>
<div>
  <label for="street-field">Street:</label>
  <input id="street-field" name="street" type="text">
</div>
<div>
  <label for="street-2-field">Street 2:</label>
  <input id="street-2-field" name="street-2" type="text">
</div>
<div>
  <label for="city-field">City:</label>
  <input id="city-field" name="city" type="text">

  <label for="state-field">State:</label>
  <select id="state-field" name="state">
    <option></option>
    {{#each states}}
      <option value="{{this}}">{{this}}</option>
    {{/each}}
  </select>
  <label for="zip-field">ZIP:</label>
  <input id="zip-field" name="zip" size="10" type="text"> */}