import React from 'react'

import '../styles/command.sass';

export const Component = 'span';
const Root = 'p';

export class Command extends React.Component {
    constructor(props) {
        super(props)

        this.name = props.name
        // this.children = props.children

        this.copy = this.copy.bind(this)
        this.setPiece = this.setPiece.bind(this)

        let pieces = Array(props.children.length + 1).fill(null)
        pieces[0] = props.name

        console.log(pieces)

        this.pieces = pieces

        let index = 1

        this.children = props.children.map(child =>
            React.cloneElement(
                child, {
                    index: index,
                    key: index++,  // each child should have a unique key
                    setValue: this.setPiece,
                }
            )
        )

        // console.log(props.children)
        // console.log(children)
        // console.log(this.props)
    }

    setPiece(i, value) {
        console.log(this.pieces)
        this.pieces[i] = value
    }

    copy() {
        // console.log(this.name)
        console.log(this.pieces)
        // this.children.forEach(item => console.log(item.props.states))
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
