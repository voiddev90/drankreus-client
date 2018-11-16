import * as React from 'react'

type Props = {
    route: string
    totalPages: number
    onClick: (page: number) => void
}

export const PaginationComponent: React.SFC<Props> = (props: Props) => {
    const numberArray = Array.apply(null, {length: props.totalPages}).map(Function.call, Number);
    return <div className="pagination-container">
        <ul>
            {numberArray.map((page: number) => {
                return <li className="number" key={page}><button type='link' onClick={() =>  props.onClick(page +1)}>{page + 1}</button></li>
            })}
        </ul>
    </div>
}

