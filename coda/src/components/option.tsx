// import * as React from 'react'

// import { Tooltip } from './tooltip'
// import { Component } from './command'
import { State as ParameterState, Props as ParameterProps, Parameter } from './parameter'

interface Props extends ParameterProps {
    shortName?: string
}

class State extends ParameterState {
    displayShortName: boolean

    constructor(params: {isEditable?: boolean, value: string, inputWidth?: number, displayShortName?: boolean}) {
        super(params)

        let {displayShortName = false} = params

        this.displayShortName = displayShortName
    }

    clone(params: {isEditable?: boolean, value?: string, inputWidth?: number, displayShortName?: boolean}) {
        // console.log('Cloning state...')
        let cloned = new State({...this, ...{inputWidth: undefined}, ...params})
        // console.log(cloned)
        return cloned
    }
}


export class Option extends Parameter<Props, State> {
    getState() {
        return new State(this.state)
    }

    decorateValue(value: string) {
        return this.state.displayShortName && this.props.shortName ? `-${this.props.shortName} ${value}` : `--${this.props.name} ${value}`
    }

    getTypeLabel() {
        return 'option'
    }
}
