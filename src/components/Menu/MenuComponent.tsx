import * as React from 'react'

type Props = {
  classes: string
  children: React.ReactNode
}
type State = {}

export const MenuComponent: React.SFC<Props> = (props: Props) => {
  return (
    <nav className={props.classes}>
      <ul className='menu nav'>{props.children}</ul>
    </nav>
  )
}
