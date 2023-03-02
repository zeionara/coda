// import logo from './logo.svg';
// import './App.css';

import './styles/app.sass';

import { Command, Argument } from './components/terminal'

function App() {
  return (
    <div className="app">
        <h1>Here are your commands</h1>
        <Command name="coda">
            <Argument name="describe" description="describe command features" theme="blue"/>
            <Argument name="bar" description="describe command features" theme="red"/>
            <Argument name="fox" description="describe command features" theme="red"/>
        </Command>
    </div>
  );
}

export default App;
