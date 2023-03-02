import Tippy from '@tippyjs/react'

import 'tippy.js/dist/tippy.css'
import '../styles/tooltip.sass'

export const Tooltip = ({ children, content }) => {
    return (
        <Tippy placement='top' className='tooltip' content={content}>
            {children}
        </Tippy>
    )
}
