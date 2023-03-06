import * as React from 'react'

import { Component } from './command'
import { Tooltip } from './tooltip'

export class State {
    isEditable: boolean = false
    value: string
    inputWidth: number

    constructor({isEditable = false, value, inputWidth = undefined}: {isEditable?: boolean, value: string, inputWidth?: number}) {
        this.isEditable = isEditable
        this.value = value
        this.inputWidth = inputWidth === undefined ? value.length : inputWidth
    }

    clone(params: {isEditable?: boolean, value?: string, inputWidth?: number}) {
        // console.log('Cloning state...')
        let cloned = new State({...this, ...{inputWidth: undefined}, ...params})
        // console.log(cloned)
        return cloned
    }
}

export interface Props {
    name: string
    description: string

    theme: string

    optional?: boolean

    value?: string

    index?: number

    setValue?(index: number, value: string): void
}

export abstract class Parameter<T extends Props, S extends State> extends React.Component<T, S> {
    inputId: string
    inputElement: React.RefObject<HTMLInputElement>

    constructor(props: T) {
        super(props)

        this.toggleIsEditable = this.toggleIsEditable.bind(this)
        this.updateValue = this.updateValue.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.decorateValue = this.decorateValue.bind(this)
        this.getCssClass = this.getCssClass.bind(this)

        this.state = {value: props.value ? props.value : ''} as S
        this.inputId = `parameter-input-${props.index}`

        this.inputElement = React.createRef()
        
        if (props.value !== undefined) {
            this.liftValue(props.value)
        }
    }

    abstract getState(): S
    abstract getCssClass(): string

    componentDidUpdate() {
        if (this.state.isEditable) {
            this.inputElement.current!.focus()
        }
    }

    abstract decorateValue(value: string): string

    liftValue(value: string) {
        this.props.setValue!(this.props.index as number, this.decorateValue(value))
    }

    toggleIsEditable() {
        this.setState(
            this.getState().clone(
                {
                    isEditable: !this.state.isEditable
                }
            )
        )
    }

    updateValue(event: React.ChangeEvent<HTMLInputElement>) {
        this.liftValue(event.target.value)
        this.setState(
            this.getState().clone(
                {
                    value: event.target.value
                }
            )
        )
    }

    handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter' || event.key === 'Escape') {
            this.toggleIsEditable()
        }
    }

    render() {
        const tooltip = (
            <>
                <strong>{this.props.name}:</strong> {this.props.description}
            </>
        )

        return (
            <Tooltip content={tooltip}>
                <Component className={`command ${this.getCssClass()} ${this.props.theme} ${this.props.optional ? 'optional' : ''}`} onClick={this.toggleIsEditable}>
                    <span className={this.state.isEditable ? 'hidden' : 'visible'}>{this.state.value ? this.decorateValue(this.state.value) : this.props.name}</span>
                    <input
                        type='text'
                        id={this.inputId}
                        className={this.state.isEditable ? 'visible' : 'hidden'}
                        onChange={this.updateValue}
                        onKeyDown={this.handleKeyDown}
                        ref={this.inputElement}
                        style={{width: this.state.inputWidth + 'ch'}}
                        value={this.state.value}
                    />
                </Component>
            </Tooltip>
        )
    }
}
