import * as React from 'react'
import { Component } from './command'

interface Props {
    name: string

    index?: number
    setValue?(index: number, value: string | null): void
}

export class Header extends React.Component<Props> {
    constructor(props: Props) {
        super(props)

        props.setValue!(props.index!, props.name!)
    }

    render() {
        return <Component className='command'>
            {this.props.name}
        </Component>
    }
}
