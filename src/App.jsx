import { useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import UploadImage from './UploadImage';

/** Component for entire page.
 *
 * Props: none
 * State: none
 *
*/

function App() {

  return (
    <div className="App">
      <UploadImage />
    </div>
  );
};

export default App;
