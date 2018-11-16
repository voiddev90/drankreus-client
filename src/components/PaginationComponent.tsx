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
                {/* {props.currentPage >= 2 ?
              <button type='link' onClick={() => props.onClick(props.currentPage - 2)}>
                {page - 1}
              </button>: null} 
                {props.currentPage >= 1 ?
              <button type='link' onClick={() => props.onClick(props.currentPage - 1)}>
                {page}
              </button> : null } */}
              <button type='link' onClick={() => props.onClick(page)}>
                {page + 1}
              </button>
              {/* <button type='link' onClick={() => props.onClick(props.currentPage + 1)}>
                {page + 2}
              </button>
              <button type='link' onClick={() => props.onClick(props.currentPage + 2)}>
                {page + 3}
              </button>
              
              <button type='link' onClick={() => props.onClick(props.totalPages)}>
                {props.totalPages}
              </button> */}
              

            </li>
          ) : null
        })}
      </ul>
    </div>
  )
}
