import * as React from 'react'
import { NavLink } from 'react-router-dom';

type Props = {}


export const OrderCompleteComponent: React.SFC<Props> = props => {
    return (
        <div>
            <h2>Gelukt!</h2>
            <p>Je bestelling is voltooid. Druk op de onderstaande knoppen om terug te gaan naar de homepagina of naar de productpagina.</p>
            <NavLink to='/'>
            <button>Home</button>
            </NavLink>
            <NavLink to='/products'>
            <button>Producten</button>
            </NavLink>
        </div>
    )
}