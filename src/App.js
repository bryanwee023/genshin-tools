import TitleCard from './components/TitleCard'
import RollInput from './components/RollInput'
import Graph from './components/Graph'
import Calculate from './utilities/calculator';

import sideBanner from './assets/images/hutao_side_banner.png'

import { createRef, useState, useEffect } from 'react';

function App() {
  
  const [rollRates, setRollRates] = useState([]);
  const graphInstance = createRef();
  /*
  useEffect(() => {
    console.log("roll rates updated");
    if (graphInstance.current !== undefined)
      graphInstance.current.update();
  });
  */
  return (
    <div className="App">
      <TitleCard />
      <RollInput id="input" Calculate={Calculate} SetRates={setRollRates} />
      <Graph id="chart" data={rollRates} ref={graphInstance} />
    
      <img id="sidebanner" src={sideBanner} alt="Banner" />
    </div>
  );
}

export default App;
