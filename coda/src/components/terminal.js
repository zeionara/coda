import { Tooltip } from './tooltip'

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

export const Argument = ({ name, description, theme }) => {
    const Component = 'span'

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
