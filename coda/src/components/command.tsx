import * as React from 'react'

import '../styles/command.sass';

import { Argument } from './argument'
import { Header } from './header'
import { Flag } from './flag'
import { Option } from './option'

export const Component = 'span';
const Root = 'p';


interface Props {
    name: string

    children: JSX.Element[]
}


interface State {
    enabled: boolean
}


export class Command extends React.Component<Props, State> {
    pieces: [string | null]
    children: JSX.Element[]
    refs_: React.RefObject<React.Component>[]

    // props: Props

    constructor(props: Props) {
        super(props)

        // this.props = props

        // Bind instance methods

        this.state = {enabled: false}
        this.copy = this.copy.bind(this)
        this.setPiece = this.setPiece.bind(this)
        this.toggleDisplayShortName = this.toggleDisplayShortName.bind(this)

        // Init state

        // let pieces = Array(props.children.length + 1).fill(null) as [string | null]
        let pieces = Array(props.children.length).fill(null) as [string | null]
        // pieces[0] = props.name

        this.pieces = pieces

        // Update children

        let index = 0
        let foundOptionalArgument = false
        let refs: React.RefObject<React.Component>[] = []

        this.children = [<Header name={this.props.name}/>, ...props.children].map(child => {
                if (child.type === Argument) {
                    if (!foundOptionalArgument) {
                         if (child.props.optional) {
                            foundOptionalArgument = true
                         }
                    } else if (!child.props.optional) {
                        throw new Error(`Found non trailing optional arguments`)
                    }
                }

                // let props = {
                //     ...{
                //         index: index,
                //         key: index++,  // each child should have a unique key
                //         setValue: this.setPiece,
                //     },
                //     ...(
                //         child.type === Flag ? {displayShortName: this.state.enabled} : {}
                //     )
                // }

                // return React.cloneElement(
                //     child, props
                // )

                let ref: React.RefObject<React.Component> = React.createRef()
                refs.push(ref)

                return React.cloneElement(
                    child, {
                        index: index,
                        key: index++,  // each child should have a unique key
                        setValue: this.setPiece,
                        ref: ref
                    }
                )
            }
        )
        this.refs_ = refs

        // console.log(refs)
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
                let piece = pieces[i]

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

    toggleDisplayShortName(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({enabled: !this.state.enabled})
        const enable = event.target.checked

        this.children.forEach((child, i) => {
            if (child.type === Flag) {
                // console.log(child.props)
                (this.refs_[i].current as Flag).setDisplayShortName(enable)
                // child.props.displayShortName = enable
            }
            if (child.type === Option) {
                (this.refs_[i].current as Option).setDisplayShortName(enable)
            }
        })
    }

    render() {
        return (
            <Root>
                {this.children}
                <span onClick={this.copy} className='button'>
                    📋
                </span>
                <input type="checkbox" id="display-short-name-checkbox" name="display short name" onChange={this.toggleDisplayShortName}/>
                <label htmlFor="display-short-name-checkbox">Short</label>
            </Root>
        )
    }
}
