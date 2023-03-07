import * as React from 'react'

import { Tooltip } from './tooltip'
import { Component } from './command'


export interface Props {
    name: string
    description: string

    theme: string

    optional?: boolean

    index?: number

    setValue?(index: number, value: string | null): void
}


export abstract class Setting<T extends Props, S> extends React.Component<T, S> {

    constructor(props: T) {
        super(props)

        // this.getCssClass = this.getCssClass.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    abstract getState(): S
    abstract getCssClass(): string
    abstract getTypeLabel(): string

    abstract liftValue(value: string): void

    abstract handleClick(event: React.MouseEvent): void
    abstract getChildren(): JSX.Element

    render() {
        const tooltip = (
            <>
                <strong>{this.props.name}:</strong> {this.props.description}
            </>
        )

        return (
            <Tooltip content={tooltip}>
                <Component className={`command ${this.getCssClass()} ${this.props.theme} ${this.props.optional ? 'optional' : ''}`} onClick={this.handleClick}>
                    {this.getChildren()}
                </Component>
            </Tooltip>
        )
    }
}
