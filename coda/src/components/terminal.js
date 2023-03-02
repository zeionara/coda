import React from 'react'

import '../styles/command.sass';

export const Component = 'span';
const Root = 'p';

export class Command extends React.Component {
    constructor(props) {
        super(props)

        this.name = props.name
        this.children = props.children

        this.copy = this.copy.bind(this)
    }

    copy() {
        console.log(this.name)
        this.children.forEach(item => console.log(item.props.states))
        navigator.clipboard.writeText(`${this.name} command`)
    }

    render() {
        return (
            <Root>
                <Component className='command'>{this.name}</Component>
                {this.children}
                <span onClick={this.copy} className='button'>
                    📋
                </span>
            </Root>
        )
    }
}
