import * as React from 'react'

import '../styles/command.sass';

import { Argument } from './argument'

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
        let foundOptionalArgument = false

        this.children = props.children.map(child => {
                if (child.type === Argument) {
                    if (!foundOptionalArgument) {
                         if (child.props.optional) {
                            foundOptionalArgument = true
                         }
                    } else if (!child.props.optional) {
                        throw new Error(`Found non trailing optional arguments`)
                    }
                }

                return React.cloneElement(
                    child, {
                        index: index,
                        key: index++,  // each child should have a unique key
                        setValue: this.setPiece,
                    }
                )
            }
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

        let pieces = this.pieces
        let emptyParameters: string[] = []

        let skippedOptionalArgumentsLocal: string[] = []
        let skippedOptionalArgumentsGlobal: string[] = []

        this.children.forEach((parameter, i) => {
                let piece = pieces[i + 1]

                if (!parameter.props.optional && !piece) {
                    emptyParameters.push(parameter.props.name)
                }

                if (parameter.type === Argument && parameter.props.optional) {
                    if (!piece) {
                        skippedOptionalArgumentsLocal.push(parameter.props.name)
                    } else if (skippedOptionalArgumentsLocal.length > 0) {
                        skippedOptionalArgumentsGlobal.push(...skippedOptionalArgumentsLocal)
                        skippedOptionalArgumentsLocal = []
                    }
                }
            }
        )

        if (emptyParameters.length > 0) {
            alert(`The following required parameters are missing: ${emptyParameters.join(', ')}`)
            return
        }

        if (skippedOptionalArgumentsGlobal.length > 0) {
            alert(
                "The following optional arguments should be assigned a value because they are located " +
                `between the optional arguments which are filled: ${skippedOptionalArgumentsGlobal.join(', ')}`
            )
            return
        }

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
