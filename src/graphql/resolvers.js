import { gql } from 'apollo-boost';

import { addItemToCart, getCartItemCount, 
         getTotalPayment, removeItemFromCart,
         clearItemsFromCart } from './cart.utils';

export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }

    extend type Mutation {
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]!
        RemoveItemFromCart(item: Item!): [Item]!
        ClearItemFromCart(item: Item!): [Item]!
    }
`;

export const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }  
`;

export const GET_CART_ITEM = gql`
    {
        cartItems @client
    }
`;

export const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`;

export const GET_TOTAL_PAYMENT = gql`
    {
        total @client
    }
`;

export const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;


export const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: Item!) {
        addItemToCart(item: $item) @client
    }
`;

export const REMOVE_ITEM_FROM_CART = gql`
    mutation RemoveItemFromCart($item: Item!) {
        removeItemFromCart(item: $item) @client
    }
`;

export const CLEAR_ITEM_FROM_CART = gql`
    mutation ClearItemFromCart($item: Item!) {
        clearItemFromCart(item: $item) @client
    }
`;

const itemProcess = (type, cartItems, item, cache) => {
    let newCartItems;

    if (type === "add") {
        newCartItems = addItemToCart(cartItems, item);
    }
    else if (type === "remove") {
        newCartItems = removeItemFromCart(cartItems, item);
    }
    else if (type === "clear") {
        newCartItems = clearItemsFromCart(cartItems, item)
    }

    cache.writeQuery({
        query: GET_TOTAL_PAYMENT,
        data: { total: getTotalPayment(newCartItems) }
    })

    cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) }
    })
    
    cache.writeQuery({
        query: GET_CART_ITEM,
        data: { cartItems: newCartItems }
    });

    return newCartItems;
}

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, { cache }) => {
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN,
            });

            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden }
            });

            return !cartHidden;
        },

        addItemToCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEM
            });

            itemProcess("add", cartItems, item, cache)
        },

        removeItemFromCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEM
            });

            itemProcess("remove", cartItems, item, cache)
        },

        clearItemFromCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEM
            });

            itemProcess("clear", cartItems, item, cache)
        }
    }
}