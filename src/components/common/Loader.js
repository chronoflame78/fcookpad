import React from 'react';
import logo from '../../LavaLamp.svg';
function Loader() {
  return (
    <div className="spinner">
       <img src={logo} className="App-logo" alt="logo" />
      </div>
  );
}

export default Loader;