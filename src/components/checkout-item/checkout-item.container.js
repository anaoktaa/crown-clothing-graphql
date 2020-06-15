import React from 'react';
import { flowRight } from 'lodash';
import { graphql } from 'react-apollo';

import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_ITEM_FROM_CART } from '../../graphql/resolvers';

import CheckoutItem from './checkout-item.component';

const CheckoutItemContainer = (props) => {
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = props
    return (
        <CheckoutItem
            {...props}
            addItem={item => addItemToCart({variables: {item}})}
            removeItem={item => removeItemFromCart({variables: {item}})}
            clearItem={item => clearItemFromCart({variables: {item}})}
        />
    );
}
export default flowRight(
    graphql(ADD_ITEM_TO_CART, { name : 'addItemToCart'}),
    graphql(REMOVE_ITEM_FROM_CART,{ name: 'removeItemFromCart' }),
    graphql(CLEAR_ITEM_FROM_CART, {name: 'clearItemFromCart'})
)(CheckoutItemContainer);