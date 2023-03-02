import logo from './logo.svg';
import './App.css';

import './styles/command.sass';

import {Command} from './components/terminal'

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
            <Command title="describe command features">
                coda
            </Command>
            <Command name="describe" title="describe command features" color="blue">
                describe
            </Command>
            <Command name="foo" title="describe command features" color="red">
                bar
            </Command>
        </p>
      </header>
    </div>
  );
}

export default App;
