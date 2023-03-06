import * as React from 'react'

import '../styles/command.sass';

export const Component = 'span';
const Root = 'p';


interface Props {
    name: string

    children: JSX.Element[]
}


export class Command extends React.Component<Props> {
    pieces: [string | null]
    children: JSX.Element[]

    // props: Props

    constructor(props: Props) {
        super(props)

        // this.props = props

        // Bind instance methods

        this.copy = this.copy.bind(this)
        this.setPiece = this.setPiece.bind(this)

        // Init state

        let pieces = Array(props.children.length + 1).fill(null) as [string | null]
        pieces[0] = props.name

        this.pieces = pieces

        // Update children

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
    }

    setPiece(i: number, value: string) {
        this.pieces[i] = value
    }

    mergePieces() {
        return this.pieces.filter(value => value).join(' ')
        // let command = this.pieces[0]

        // this.pieces.forEach(piece =>
        //     if (piece !== null) {
        //         command += ' ' + piece
        //     }
        // )
    }

    copy() {
        console.log(this.pieces)
        navigator.clipboard.writeText(this.mergePieces())
    }

    render() {
        return (
            <Root>
                <Component className='command'>{this.props.name}</Component>
                {this.children}
                <span onClick={this.copy} className='button'>
                    📋
                </span>
            </Root>
        )
    }
}
