import './App.css';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <ParameterGenerator/>
    </div>
  );
}

function ParameterGenerator() {
  const [parametersSelected, setParametersSelected] = useState([]);

  const parameterList = [
    {"caption": "Physical Dmg. Reduction", "points": 50, "index": 0},
    {"caption": "Special Dmg. Reduction", "points": 50, "index": 1},
    {"caption":  "Max Sync Countdown -1", "points": 50, "index": 2},
    {"caption": "Attack & Sp. Atk +1", "points": 50, "index": 3},
    {"caption": "Defense & Sp. Def +1", "points": 50, "index": 4},
    {"caption": "No Status Conditions", "points": 50, "index": 5},
    {"caption": "Strength +1", "points": 100, "index": 6},
    {"caption": "Sync Buff +5", "points": 100, "index": 7},
    {"caption": "Attack & Sp. Atk +3", "points": 100, "index": 8},
    {"caption": "Defense & Sp. Def +3", "points": 100, "index": 9},
    {"caption": "Max HP +2", "points": 100, "index": 10},
    {"caption": "No Stat Reduction", "points": 100, "index": 11},
    {"caption": "Ally Healing -5", "points": 100, "index": 12},
    {"caption": "Half Ally MP", "points": 100, "index": 13},
    {"caption": "Power on Hit 1", "points": 100, "index": 14},
    {"caption": "Gradual Healing", "points": 150, "index": 15},
    {"caption": "Critical-Hit Defense", "points": 150, "index": 16},
    {"caption": "Attack & Sp. Atk +5", "points": 150, "index": 17},
    {"caption": "Defense & Sp. Def +5", "points": 150, "index": 18},
    {"caption": "Strength +2", "points": 200, "index": 19},
    {"caption": "Max Sync Countdown -2", "points": 200, "index": 20},
    {"caption": "Ally HP -5", "points": 200, "index": 21},
    {"caption": "Max HP +4", "points": 200, "index": 22},
    {"caption": "Power on Hit 2", "points": 200, "index": 23},
    {"caption": "Strength +3", "points": 300, "index": 24},
    {"caption": "Ally Move Gauge -2", "points": 300, "index": 25},
    {"caption": "Max HP +6", "points": 300, "index": 26},
    {"caption": "Strength +6", "points": 600, "index": 27}
  ];

  const addParameter = function(index) {
    const searchIndex = parametersSelected.indexOf(index);
    if (searchIndex >= 0) {
      // remove the parameter index
      let currentParams = [...parametersSelected];
      currentParams.splice(searchIndex, 1);
      setParametersSelected(currentParams);  
    } else {
      // add the parameter index
      let currentParams = [...parametersSelected];
      currentParams.push(index);
      currentParams = currentParams.sort(function(a, b) { return a - b});
      setParametersSelected(currentParams);  
    }
  };

  const copyToClipboard = function(str) {
    const el = document.createElement("textarea");
    el.value = htmlDecode(str);
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const htmlDecode = function(input){
    var e = document.createElement('textarea');
    e.innerHTML = input;
    // handle case of empty input
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  return (
    <div id="parameterGenerator">
      <div id="left">
        <ul className="noselect" id="parameterList">{parameterList.map(function(p) {
          return <Parameter key={p.index} parameter={p} addParameter={addParameter} isSelected={parametersSelected.indexOf(p.index) >= 0}/>;})}
        </ul>
      </div>
      <div id="right">
        <OutputContainer parameterList={parameterList} selectedIndices={parametersSelected}/>
        <div id="vert-space"></div>
        <div id="controls">
          <button onClick={function() { copyToClipboard(document.getElementById("textOutput").innerHTML); alert("Copied text to clipboard!"); }}>Copy to Clipboard</button>
          <button onClick={function() { setParametersSelected([]); }}>Reset</button>
        </div>
      </div>
    </div>
  );
}

function Parameter({parameter, addParameter, isSelected}) {
  return (
    <li className={isSelected ? "selected" : ""} onClick={function() { addParameter(parameter.index); }}>{parameter.caption + " (" + parameter.points + ")"}</li>
  );
}

function OutputContainer({parameterList, selectedIndices}) {
  const parameterOutput = selectedIndices.map(function(index) {
    let parameter = parameterList[index];
    return parameter.caption + " (" + parameter.points + ")";
  });

  const parameterPoints = selectedIndices.reduce(function(accumulation, nextIndex) {
    let parameter = parameterList[nextIndex];
    return parameter.points + accumulation;
  }, 0);

  return (
    <div id="outputContainer">
      <div id="pointsOutput">Total Points: {parameterPoints}</div>
      <div id="textOutput">{parameterOutput.join(", ")}</div>
    </div>
  );
}

export default App;
