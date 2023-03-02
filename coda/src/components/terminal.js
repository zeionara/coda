import { Tooltip } from './tooltip'
import React from 'react'

import '../styles/command.sass';

const Component = 'span';
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

// export const Command = ({ name, children }) => {
//     return (
//         <Root>
//             <Component className='command'>{name}</Component>
//             {children}
//         </Root>
//     )
// }

export const Argument = ({ name, description, theme }) => {
    const tooltip = (
        <>
            <strong>{name}:</strong> {description}
        </>
    )

    return (
        <Tooltip content={tooltip}>
            <Component className={`command argument ${theme}`}>{name}</Component>
        </Tooltip>
    )
}
