import React, { useState } from "react";

const App = () => {
  const message = "Home, sweet home!";
  const teams = ["Liverpool", "Chelsea", "Manchester United", "Arsenal"];
  let number = 0;

  // reactive state
  const [newNumber, setNewNumber] = useState(0);

  const addNum = () => {
    number += 1;
  };

  const showNum = () => {
    alert(number);
  };

  return (
    <div>
      <h1>{message}</h1>
      <ul>
        {teams.map((team) => (
          <li key={team}>{team}</li>
        ))}
      </ul>
      <p>{number}</p>
      <button onClick={addNum}>addNum</button>
      <button onClick={showNum}>showNum</button>
      <p>{newNumber}</p>
      <button onClick={() => setNewNumber(newNumber + 1)}>addNum</button>
    </div>
  );
};

export default App;