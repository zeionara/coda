import React from 'react'
import { Tooltip } from './tooltip'
import { Component } from './command'

export class Argument extends React.Component {
    constructor(props) {
        super(props)

        this.toggleIsEditable = this.toggleIsEditable.bind(this)
        this.updateValue = this.updateValue.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)

        let initialInputValue = props.value ? props.value : ''
        this.state = {
            isEditable: false,
            value: initialInputValue,
            inputWidth: initialInputValue.length
        }
        this.input_id = `piece-input-${props.index}`

        this.inputElement = React.createRef()
        
        if (props.value !== undefined) {
            this.liftValue(props.value)
        }
    }

    componentDidUpdate() {
        if (this.state.isEditable) {
            this.inputElement.current.focus()
        }
    }

    liftValue(value) {
        this.props.setValue(this.props.index, value)
    }

    toggleIsEditable() {
        this.setState(
            {
                isEditable: !this.state.isEditable,
                value: this.state.value,
                inputWidth: this.state.inputWidth
            }
        )
    }

    updateValue(event) {
        this.liftValue(event.target.value)
        this.setState(
            {
                isEditable: this.state.isEditable,
                value: event.target.value,
                inputWidth: event.target.value.length
            }
        )
    }

    handleKeyDown(event) {
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
                <Component className={`command argument ${this.props.theme}`} onClick={this.toggleIsEditable}>
                    <span className={this.state.isEditable ? 'hidden' : 'visible'}>{this.state.value ? this.state.value : this.props.name}</span>
                    <input
                        type='text'
                        id={this.input_id}
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
