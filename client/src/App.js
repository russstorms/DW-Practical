import React, { useState, useEffect } from 'react';

// Styles
import logo from './logo.svg';
import './App.css';

const App = () => {
  // const [response, setResponse] = useState('')
  const [post, setPost] = useState('')
  const [responseToPost, setResponseToPost] = useState('')

  // Get API
  useEffect(() => {
    async function getApi() {
      // Load the response
      const response = await fetch('/api/turbovote', {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response)
      // Error handler
      // if (response.status !== 200) throw Error(body.message);

      // setResponse(body.message)
    }
    getApi()
  }, [])
  
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/api/hello', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const body = await response.json();

  //   setResponseToPost(body.message)
  // };
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <form
        // onSubmit={handleSubmit}
      >
        <p>
          <strong>Post to Server:</strong>
        </p>
        <input
          type="text"
          value={post}
          onChange={e => setPost(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{responseToPost}</p>
    </div>
  );
}

export default App;