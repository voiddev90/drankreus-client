import * as React from 'react'

type Props = {
    type: 'blank' | 'background-image'
    size: number
    children: React.ReactNode
    extraClasses?: string[]
}

export const SideBar: React.SFC<Props> = (props: Props) => {
    return (
        <aside className={`sidebar col-${props.size} ${props.type}${props.extraClasses ? ` ${props.extraClasses.join(' ')}` : ''}`}>
            <div className='sidebar-inner'>
                {props.children}
            </div>
        </aside>
    )
}