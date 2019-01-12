import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
      <nav className='pagination-nav'>
        <ul className='pagination'>
          <li className='page-item'>
            <button type='link' className='page-link' onClick={() => props.onClick(props.currentPage - 1)} disabled={props.currentPage == 0}>
              <FontAwesomeIcon icon={faArrowLeft} size='lg' />
            </button>
          </li>
          {numberArray.map((page: number) => {
            const liClass = ["page-item"]
            if (page == props.currentPage) liClass.push("current")
            return page == 0 || page == props.totalPages - 1 || (page <= props.currentPage + 2 && page >= props.currentPage - 2) ? (
              <li className={liClass.join(' ')}>
                <button type='link' className='page-link' onClick={() => props.onClick(page)}>
                  {page + 1}
                </button>
              </li>
            ) : null
          })}
          <li className='page-item'>
            <button type='link' className='page-link' onClick={() => props.onClick(props.currentPage + 1)} disabled={props.currentPage == props.totalPages - 1}>
              <FontAwesomeIcon icon={faArrowRight} size='lg' />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
