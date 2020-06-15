import React from 'react';
import { useQuery, useMutation  } from '@apollo/react-hooks';

import { TOGGLE_CART_HIDDEN, GET_CART_ITEM } from '../../graphql/resolvers';

import CartDropdown from './cart-dropdown.component';

const CartDropdownContainer = () => {
    const { data } = useQuery(GET_CART_ITEM);
    const { cartItems } = data
    const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN);
    return (
        <CartDropdown
            cartItems = {cartItems}
            toggleCartHidden={toggleCartHidden}
        />
    );
}

export default CartDropdownContainer;

