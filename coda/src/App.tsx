import './styles/app.sass';

import { Command } from './components/command'
import { Argument } from './components/argument'
import { Option } from './components/option'
import { Flag } from './components/flag'
import { Fragment } from './components/fragment'
import { Operator, OperatorValue } from './components/operator'
import { Header } from './components/header'

function App() {
  return (
    <div className="app">
        <h1>Here are your commands</h1>
        <Command name="coda">
            <Argument name="describe" description="describe command features" theme="blue" value="val"/>
            <Argument name="bar" description="describe command features" theme="red" optional/>
            <Argument name="fox" description="describe command features" theme="red" optional/>
            <Option name="quux" description="describe command features" theme="violet" optional/>
            <Flag name="corge" description="my first flag" theme="blue" optional enabled/>
            <Fragment name="grault" description="my first fragment" theme="blue" optional/>
            <Operator value={OperatorValue.Pipe} theme="blue"/>
            <Header name="bash"/>
        </Command>
    </div>
  );
}

export default App;
