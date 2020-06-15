import React from 'react';
import { useQuery, useMutation  } from '@apollo/react-hooks';

import { TOGGLE_CART_HIDDEN, GET_ITEM_COUNT  } from '../../graphql/resolvers';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const { data : {itemCount}} = useQuery(GET_ITEM_COUNT);
  const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN);

  return (
    <div className='cart-icon' onClick={toggleCartHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div>
  );
}

export default CartIcon;
