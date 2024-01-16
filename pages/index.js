import React, { useState } from 'react';
import getJoke from '../api/jokeData';

// State initialization
function Home() {
  const [buttonText, setButtonText] = useState('get a joke');
  const [jokeSetup, setJokeSetup] = useState('');
  const [jokeDelivery, setJokeDelivery] = useState('');
  const [joke, setJoke] = useState(null);

  // Function to handle joke retrieval and display
  const handleJoke = async () => {
    try {
      // Check the button text to determine the action
      if (buttonText === 'get a joke') {
        // Fetch a new joke from the API
        const newJoke = await getJoke();
        // Set the retrieved joke in the state
        setJoke(newJoke);
        // Display the setup part of the joke
        setJokeSetup(newJoke.setup);
      } else if (buttonText === 'get punchline' && joke) {
        // If the button text is 'get punchline', display the punchline
        setJokeDelivery(joke.delivery);
      }
    } catch (error) {
      // Log any errors that occur during the joke retrieval
      console.warn(error);
    }
  };

  // Function to handle button click
  const handleClick = () => {
    // Update the button text based on its current value
    if (buttonText === 'get a joke') {
      setButtonText('get punchline');
    } else if (buttonText === 'get punchline') {
      setButtonText('get another joke');
    } else {
      // If the button text is 'get another joke', reload the page
      window.location.reload();
    }
  };

  // Render the component UI
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>BRING ON THE JOKES:</h1>
      {/* Button triggers both handleClick and handleJoke functions */}
      <button type="button" onClick={() => { handleClick(); handleJoke(); }}>{buttonText}</button>
      <h2 id="setup">{jokeSetup}</h2>
      <h2 id="punchline">{jokeDelivery}</h2>
    </div>
  );
}

export default Home;
