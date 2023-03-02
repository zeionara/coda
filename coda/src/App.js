import logo from './logo.svg';
import './App.css';

import './styles/command.sass';

import { Command, Argument } from './components/terminal'

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>
}

function App() {
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
        <Welcome name="zeio"/>
        <p>
            <Command name="coda"/>
            <Argument name="describe" description="describe command features" theme="blue"/>
            <Argument name="bar" description="describe command features" theme="red"/>
            <Argument name="fox" description="describe command features" theme="red"/>
        </p>
      </header>
    </div>
  );
}

export default App;
