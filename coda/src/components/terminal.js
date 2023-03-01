// import React, { useState, useRef } from'' 'react'
// import classNames from 'classnames'
// 
// import { Pre, InlineCode } from './code'
// import { Tooltip } from './typography'
// import Icon from './icon'
// import { isString, isTrue, getStringChildren, isClient } from '../util'
// 
// import * as classes from '../styles/terminal.module.sass'
// import recipeArgs from '../../recipe-args.json'
// 
// function getRecipeArgs(name) {
//     const entry = recipeArgs[name] || {}
//     if (entry.alias) {
//         return recipeArgs[entry.alias] || {}
//     }
//     return entry
// }
// 
// function commandToString(children) {
//     return children
//         .map(c => {
//             if (isString(c)) return c === '\n' ? ' ' : c
//             if (c && c.props && c.props.children && c.props.children.length) {
//                 return c.props.children[0]
//             }
//             return ''
//         })
//         .join('')
//         .trim()
// }
// 
// export const TerminalWrapper = ({ title, buttons = true, className, children }) => (
//     <Pre className={classNames(classes.root, className, { [classes.buttons]: buttons })}>
//         {title && <h4 className={classes.title}>{title}</h4>}
//         {children}
//     </Pre>
// )

// export const Terminal = ({
//     title,
//     buttons = true,
//     prompt = true,
//     copy = false,
//     className,
//     children,
// }) => {
//     const supportsCopy = isClient && document.queryCommandSupported('copy')
//     const textareaRef = useRef()
//     const [copySuccess, setCopySuccess] = useState(false)
// 
//     function copyToClipboard() {
//         if (textareaRef.current && isClient) {
//             textareaRef.current.select()
//             document.execCommand('copy')
//             setCopySuccess(true)
//             setTimeout(() => setCopySuccess(false), 1000)
//         }
//     }
//     return (
//         <TerminalWrapper title={title} className={className} buttons={isTrue(buttons)}>
//             {supportsCopy && copy && (
//                 <Tooltip small content="Copy to clipboard">
//                     <button
//                         aria-label="Copy to clipboard"
//                         onClick={copyToClipboard}
//                         className={classes.copy}
//                     >
//                         <Icon name={copySuccess ? 'accept' : 'copy'} />
//                     </button>
//                 </Tooltip>
//             )}
//             <InlineCode className={classNames(classes.code, { [classes.prompt]: isTrue(prompt) })}>
//                 {children}
//             </InlineCode>
//             {copy && (
//                 <textarea
//                     ref={textareaRef}
//                     className={classes.dummyTextarea}
//                     defaultValue={commandToString(children)}
//                     aria-hidden="true"
//                 />
//             )}
//         </TerminalWrapper>
//     )
// }

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';

export const Tooltip = ({ small = false, dark = false, className, children, ...props }) => {
    // const tooltipClassNames = classNames(classes.tooltip, className, {
    //     [classes.tooltipSmall]: !!small,
    //     [classes.tooltipDark]: !!dark,
    // })
    return (
        <Tippy
            // animateFill={false}
            distance={small ? 5 : 15}
            placement="top"
            // className={tooltipClassNames}
            {...props}
        >
            {children}
        </Tippy>
    )
}

export const Command = ({ children, name, prompt = false, spaced = true, ...props }) => {
    const Component = name ? 'abbr' : 'span'
    // const recipeArgs = getRecipeArgs(name)
    const title = props.title || 'recipeArgs.title'
    const color = props.color || 'default'
    // const commandClassNames = classNames(classes.command, {
    //     [classes[color]]: color,
    //     [classes.commandTitle]: name,
    //     [classes.commandSpaced]: isTrue(spaced),
    // })
    const tooltip = title ? (
        <>
            <strong>{name}:</strong> {title}
        </>
    ) : (
        name
    )

    const className=`command ${color}`
    // const content = <Component className={commandClassNames}>{children}</Component>
    const content = <Component className={className}>{children}</Component>
    return name ? <Tooltip content={tooltip}>{content}</Tooltip> : content
    // return content
}

// export const Block = ({ msg, spaced = false, children, className }) => {
//     const blockClassNames = classNames(classes.command, classes.commandBlock, className, {
//         [classes.commandGreen]: msg === 'good',
//         [classes.commandRed]: msg === 'fail',
//         [classes.commandYellow]: msg === 'warn',
//         [classes.commandBlue]: msg === 'info',
//         [classes.commandBlockSpaced]: isTrue(spaced),
//     })
//     const icons = { good: '✔', fail: '✘', warn: '⚠', info: 'ℹ' }
//     return (
//         <span className={blockClassNames}>
//             {icons[msg] && `${icons[msg]} `}
//             {children}
//         </span>
//     )
// }
// 
// export const Color = ({ value, children }) => {
//     const colorClassNames = classNames({
//         [classes.commandGreen]: value === 'green',
//         [classes.commandRed]: value === 'red',
//         [classes.commandYellow]: value === 'yellow',
//         [classes.commandBlue]: value === 'blue',
//         [classes.commandGrey]: value === 'grey',
//     })
//     return <span className={colorClassNames}>{children}</span>
// }
// 
// export const Divider = ({ char = '=', width = 80, children }) => {
//     const text = ` ${getStringChildren(children)} `
//     const deco = char.repeat(Math.round(width - text.length) / 2 - 2)
//     const content = `${deco}${text}${deco}`
//     return (
//         <Block spaced className={classes.divider}>
//             {content}
//         </Block>
//     )
// }
// 
// export const Server = ({ children }) => {
//     const defaultContent = (
//         <>
//             ✨ Starting the web server at http://localhost:8080 ...
//             <br />
//             Open the app in your browser and start annotating!
//         </>
//     )
//     const content = children || defaultContent
//     return <Block className={classes.commandServer}>{content}</Block>
// }
