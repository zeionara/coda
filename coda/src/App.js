import './styles/app.sass';

import { Command } from './components/command'
import { Argument } from './components/argument'

function App() {
  return (
    <div className="app">
        <h1>Here are your commands</h1>
        <Command name="coda">
            <Argument name="describe" description="describe command features" theme="blue" value="val"/>
            <Argument name="bar" description="describe command features" theme="red"/>
            <Argument name="fox" description="describe command features" theme="red"/>
        </Command>
    </div>
  );
}

export default App;
