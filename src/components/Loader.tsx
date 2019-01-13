import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type Props = {}

export const Loader: React.SFC<Props> = (props: Props) => {
    return (
        <section className='loader'>
            <p className='loader-inner'>
                <FontAwesomeIcon icon={faSpinner} spin />
            </p>
        </section>
    )
}