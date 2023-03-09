import React from 'react';
// import '@zeionara/coda/build/styles/app.sass';
// import '@zeionara/coda/build/styles/index.sass';

import { Command, Argument, Option, Flag, Operator, OperatorValue, Header, Fragment } from '@zeionara/coda'

function App() {
  return (
    <div className="app">
      <Command name="coda">
        <Argument name="describe" description="describe command features" theme="blue" value="val"/>
        <Argument name="bar" description="describe command features" theme="red" optional/>
        <Argument name="fox" description="describe command features" theme="red" optional/>
        <Option name="quux" shortName="q" description="describe command features" theme="violet" optional/>
        <Flag name="corge" shortName="c" description="my first flag" theme="blue" optional enabled/>
        <Fragment name="grault" description="my first fragment" theme="blue" optional/>
        <Operator value={OperatorValue.Pipe} theme="blue"/>
        <Header name="bash"/>
      </Command>
    </div>
  );
}

export default App;
