import * as React from 'react'

type Props = {
  route: string
  totalPages: number
  currentPage: number
  onClick: (page: number) => void
}

export const PaginationComponent: React.SFC<Props> = (props: Props) => {
  const numberArray = Array.apply(null, { length: props.totalPages }).map(
    Function.call,
    Number
  )
  return (
    <div className='pagination-container'>
      <ul>
        {numberArray.map((page: number) => {
            const liClass = ["number"]
            if (page == props.currentPage) liClass.push("current")
          return page == 0 || page == props.totalPages - 1 || (page <= props.currentPage + 2 && page >= props.currentPage -2)  ? (
            <li className={liClass.join(' ')}>
              <button type='link' onClick={() => props.onClick(page)}>
                {page + 1}
            </li>
          ) : null
        })}
      </ul>
    </div>
  )
}
