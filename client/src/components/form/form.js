import React, { useState } from 'react';
import states from '../../us_states';

// Styles
import './styles/form.css'

const Form = ({setElections}) => {
  // Form fields tied to state
  const [streetField, setStreetField] = useState('');
  const [streetFieldTwo, setStreetFieldTwo] = useState('');
  const [cityField, setCityField] = useState('');
  const [stateField, setStateField] = useState('AL');
  const [zipField, setZipField] = useState('');

  // Map out state abbreviations to form select options
  const stateOptionMapper = () => {
    return states.map((stateAbbr, idx) => {
      return <option key={idx}>{stateAbbr}</option>
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
    const arrayOfElections = await response.json();

    setElections(arrayOfElections)

    // Error handler
    if (response.status !== 200) throw Error('Error');
    // Check if response is empty
    if (arrayOfElections.length === 0) {
      alert('No elections near your address')
    }
  };

  return (
    <div className="Form">
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
    </div>
  );
}

export default Form;

