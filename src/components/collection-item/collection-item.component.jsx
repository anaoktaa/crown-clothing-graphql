import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { ADD_ITEM_TO_CART } from '../../graphql/resolvers';

import CustomButton from '../custom-button/custom-button.component';

import './collection-item.styles.scss';

const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);
  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>${price}</span>
      </div>
      <CustomButton onClick={() => addItemToCart({variables: {item}})} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

export default CollectionItem;
