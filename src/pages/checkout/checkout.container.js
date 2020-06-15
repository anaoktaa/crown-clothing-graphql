import React from 'react';
import { flowRight } from 'lodash';
import { Query, graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

import CheckoutPage from './checkout.component';

const GET_TOTAL_PAYMENT = gql`
    {
        total @client
    }
`;

const GET_CART_ITEM = gql`
    {
        cartItems @client
    }
`;

const CheckoutContainer = () => (
    <Query query={GET_TOTAL_PAYMENT}>
        {
            ({data: { total }}) => (
                <Query query={GET_CART_ITEM}>
                    {
                        ({data: { cartItems }}) => (
                            <CheckoutPage
                                cartItems={cartItems}
                                total={total}
                            />
                        )
                    }
                </Query>
            )
        } 
    </Query>
);
export default CheckoutContainer;