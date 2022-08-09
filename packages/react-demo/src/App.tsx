import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CsdemoTemperature } from '@ionic-enterprise/cs-demo-weather-widgets-react';
// Issue: Expectation is that CsdemoTemperatureCustomEvent, TemperatureChangeEventDetail should be available on @ionic-enterprise/cs-demo-weather-widgets-react
// import {CsdemoTemperatureCustomEvent, TemperatureChangeEventDetail} from '@ionic-enterprise/cs-demo-weather-widgets-react'
// Because consumers should be using only '@ionic-enterprise/cs-demo-weather-widgets-react' package in React app.
import { CsdemoTemperatureCustomEvent } from '@ionic-enterprise/cs-demo-weather-widgets';
import { TemperatureChangeEventDetail } from '@ionic-enterprise/cs-demo-weather-widgets/dist/types/components/csdemo-temperature/csdemo-temperature-interface';

function App() {
  const onTemperatureChange = (event: CsdemoTemperatureCustomEvent<TemperatureChangeEventDetail>) => {
    console.log(`New Temperature => ${event.detail.value}`);
  };

  // const onTemperatureChange = (event: any) => {
  //   console.log(`New Temperature => ${event.detail.value}`);
  // };
  return (
    <div className="App">
      <CsdemoTemperature temperature={273.15} scale="C" onCsdemoChange={onTemperatureChange}></CsdemoTemperature>
    </div>
  );
}

export default App;
