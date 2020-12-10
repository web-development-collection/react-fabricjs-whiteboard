import React from 'react';
import Whiteboard from "./components/Whiteboard";


const App = () => {

  return <Whiteboard onAction={(action) => {
    console.log(action);
  }} />;
}

export default App;
