import * as React from 'react'

type State = {}
type Props = {
    type: 'checkbox' | 'radio'
    id: string
    name: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    checked?: boolean
    children: React.ReactNode
}

export const CheckboxRadioElement: React.SFC<Props> = (props: Props) => {
    return (
        <div className='checkbox-radio form-field'>
            <input type={props.type} onChange={props.onChange} checked={props.checked} id={`${props.type}-${props.id}`} name={props.name} value={props.value} />
            <label className='checkbox-radio-label' htmlFor={`${props.type}-${props.id}`}>
                {props.children}
            </label>
        </div>
    )
}