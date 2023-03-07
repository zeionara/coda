import * as React from 'react'

// import { Component } from './command'
// import { Tooltip } from './tooltip'
import { Props as SettingProps, Setting } from './setting'

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

export interface Props extends SettingProps {
    value?: string
}

export abstract class Parameter<T extends Props, S extends State> extends Setting<T, S> {
    inputId: string
    inputElement: React.RefObject<HTMLInputElement>

    constructor(props: T) {
        super(props)

        // this.toggleIsEditable = this.toggleIsEditable.bind(this)
        this.updateValue = this.updateValue.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.decorateValue = this.decorateValue.bind(this)

        this.state = {value: props.value ? props.value : ''} as S
        this.inputId = `${this.getTypeLabel()}-input-${props.index}`

        this.inputElement = React.createRef()
        
        if (props.value !== undefined) {
            this.liftValue(props.value)
        }
    }

    componentDidUpdate() {
        if (this.state.isEditable) {
            this.inputElement.current!.focus()
        }
    }

    decorateValue(value: string) {
        return value
    }

    liftValue(value: string) {
        this.props.setValue!(this.props.index as number, value ? this.decorateValue(value) : null)
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

    handleClick(event: React.MouseEvent) {
        this.toggleIsEditable()
    }

    getChildren() {
        return <>
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
            <span className={`mark ${this.state.isEditable ? 'hidden' : 'visible'}`}>{this.getTypeLabel()}</span>
        </>
    }
}
