import React from 'react';
import { flowRight }  from 'lodash'
import { graphql } from 'react-apollo';

import { TOGGLE_CART_HIDDEN, GET_ITEM_COUNT  } from '../../graphql/resolvers';

import CartIcon from './cart-icon.component';

const CartIconContainer = ({ data: {itemCount}, toggleCartHidden }) => (
    <CartIcon 
        toggleCartHidden={toggleCartHidden}
        itemCount={itemCount}
    />
);

export default flowRight(
    graphql(GET_ITEM_COUNT),
    graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' })
)(CartIconContainer);