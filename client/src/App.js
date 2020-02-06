import React, { useState, useEffect } from 'react';

// Styles
import './App.css';

const App = () => {
  const [post, setPost] = useState('')
  const [elections, setElections] = useState([])

  // Get API
  useEffect(() => {
    (async () => {
      // Load the response
      const response = await fetch('/api/turbovote').catch(err => console.log(err))
      const body = await response.json();
      console.log(body);
      // Error handler
      if (response.status !== 200) throw Error('Error');

    })();
  }, [])
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch('/api/turbovote', {
  //     method: "GET",
  //   });
  //     const body = await response.json();
  //     const json = JSON.parse(body.data);
  //     console.log(json)
  //     // Error handler
  //     if (response.status !== 200) throw Error('Error');

  //     setElections(json)
  // };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Democracy Works!</h1>
      </header>
      <h2>Find Elections Near You</h2>
      <form
        // onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={post}
          onChange={e => setPost(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {/* <h5>{elections}</h5> */}
    </div>
  );
}

export default App;