import * as React from 'react'

import { Tooltip } from './tooltip'
import { Component } from './command'

export enum OperatorValue {
    Pipe = '|',
    Append = '>>',
    Write = '>',
    Read = '<',
    DiscardOutput = '>/dev/null',
    RedirectStdErrToStdOut = '2>&1'
}

interface Props {
    value: OperatorValue
    theme: string

    index?: number
    setValue?(index: number, value: string | null): void

    // constructor(
    //     {value, theme, index = undefined, setValue = undefined}: {value: OperatorValue, theme: string, index?: number, setValue?(index: number, value: string | null): void}
    // ) {
    //     this.value = value
    //     this.theme = theme
    //     this.index = index
    //     this.setValue = setValue
    // }

    // getName() {
    //     return "foo"
    // }

    // getDescription() {
    //     return "bar"
    // }
}

export class Operator extends React.Component<Props> {
    constructor(props: Props) {
        super(props)

        props.setValue!(props.index!, props.value)
    }

    getName() {
        const operator = this.props.value

        switch(operator) {
            case OperatorValue.Pipe:
                return 'pipe'
            default:
                throw Error(`Unknown name for operator ${operator}`)
        }
    }

    getDescription() {
        const operator = this.props.value

        switch(operator) {
            case OperatorValue.Pipe:
                return <>
                    pass <i>stdout</i> of one command to <i>stdin</i> of another
                </>
            default:
                throw Error(`Unknown description for operator ${operator}`)
        }
    }

    render() {
        const tooltip = (
            <>
                <strong>{this.getName()}</strong>: {this.getDescription()}
            </>
        )

        return  <Tooltip content={tooltip}>
            <Component className={`command operator ${this.props.theme}`}>
                {this.props.value}
            </Component>
        </Tooltip>
    }
}
