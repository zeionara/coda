import React from 'react'
import { Tooltip } from './tooltip'
import { Component } from './command'

export class Argument extends React.Component {
    constructor(props) {
        super(props)

        this.state = {foo: 'bar'}

        this.name = props.name
        this.description = props.description
        this.value = props.value
        this.theme = props.theme

        // console.log(this.onlyonce)

        this.id = undefined

        // this.isEditable = false

        this.toggleIsEditable = this.toggleIsEditable.bind(this)
        this.updateValue = this.updateValue.bind(this)
        this.state = {
            isEditable: false,
            value: props.value
        }

        // console.log('ok')
    }

    toggleIsEditable() {
        // console.log(this.state)
        this.setState({ isEditable: !this.state.isEditable, value: this.state.value })
        // this.isEditable = !this.isEditable
        // this.render()
    }

    updateValue(event) {
        this.props.setValue(this.props.index, event.target.value)
        this.setState({ isEditable: this.state.isEditable, value: event.target.value })
        this.props.states[this.id].value = event.target.value
    }

    render() {
        if (this.id === undefined) {
            this.id = this.props.states.length
            this.props.states.push(this.state)
        }

        const tooltip = (
            <>
                <strong>{this.name}:</strong> {this.description}
            </>
        )

        return (
            <Tooltip content={tooltip}>
                <Component className={`command argument ${this.theme}`} onClick={this.toggleIsEditable}>
                    <span className={this.state.isEditable ? 'hidden' : 'visible'}>{this.state.value === undefined ? this.name : this.state.value}</span>
                    <input type='text' id='value' className={this.state.isEditable ? 'visible' : 'hidden'} onChange={this.updateValue}/>
                </Component>
            </Tooltip>
        )
    }
}

// Argument.defaultProps = {'state': {'value': 'bar'}}
Argument.defaultProps = {'states': []}
