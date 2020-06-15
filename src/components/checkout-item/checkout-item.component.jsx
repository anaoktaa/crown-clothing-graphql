import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_ITEM_FROM_CART } from '../../graphql/resolvers';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);
  const [removeItemFromCart] = useMutation(REMOVE_ITEM_FROM_CART);
  const [clearItemFromCart] = useMutation(CLEAR_ITEM_FROM_CART);

  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={() => removeItemFromCart({variables: {item: cartItem}})}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => addItemToCart({variables : {item: cartItem}})}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={() => clearItemFromCart({variables: {item: cartItem}})}>
        &#10005;
      </div>
    </div>
  );
};


export default CheckoutItem;
