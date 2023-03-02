import { Tooltip } from './tooltip'

const Component = 'span';

export const Command = ({ name }) => {
    return <Component className='command'>{name}</Component>
}

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
