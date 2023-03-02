import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';

export const Tooltip = ({ small = false, dark = false, className, children, ...props }) => {
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
