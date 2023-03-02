import Tippy from '@tippyjs/react'

import 'tippy.js/dist/tippy.css'
import '../styles/tooltip.sass'

export const Tooltip = ({ content, children }) => {
    return (
        <Tippy placement='top' className='tooltip' content={content}>
            {children}
        </Tippy>
    )
}
