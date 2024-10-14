import React, { createContext, useContext, useReducer } from 'react';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
export const MINUS_ITEM = 'MINUS_ITEM';

interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

interface CartState {
    cartItems: CartItem[];
    getTotalItems: () => number;
}

export type CartAction =
  | { type: typeof ADD_ITEM; item: { id: string; name: string; price: number; quantity?: number } }
  | { type: typeof REMOVE_ITEM; id: string }
  | { type: typeof CLEAR_CART }
  | { type: typeof MINUS_ITEM; id: string };

const initialState: CartState = {
    cartItems: [],
    getTotalItems: () => 0,
};

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
}>({ state: initialState, dispatch: () => null });

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer((state: CartState, action: CartAction) => {
        switch (action.type) {
            case 'ADD_ITEM': {
                const existingItem = state.cartItems.find(item => item.id === action.item.id);
                if (existingItem) {
                    return {
                        ...state,
                        cartItems: state.cartItems.map(item =>
                            item.id === action.item.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    };
                }
                return { ...state, cartItems: [...state.cartItems, { ...action.item, quantity: 1 }] };
            }
            
            case 'REMOVE_ITEM':
                return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.id) };
        
            case 'MINUS_ITEM': {
                const existingItem = state.cartItems.find(item => item.id === action.id);
                if (existingItem) {
                    const newQuantity = existingItem.quantity - 1;
                    if (newQuantity > 0) {
                        return {
                            ...state,
                            cartItems: state.cartItems.map(item =>
                                item.id === action.id
                                    ? { ...item, quantity: newQuantity }
                                    : item
                            ),
                        };
                    } else {
                        return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.id) };
                    }
                }
                return state;
            }
        
            case 'CLEAR_CART':
                return { ...state, cartItems: [] };
        
            default:
                return state;
        }        
    }, initialState);

    // Method to calculate the total quantity of items in the cart
    const getTotalItems = () => {
        let total = 0;
        state.cartItems.forEach(item => {
            total += item.quantity;
        });
        return total;
    };

    // Update state to include getTotalItems method
    const updatedState = {
        ...state,
        getTotalItems, // Assign the direct method
    };

    return (
        <CartContext.Provider value={{ state: updatedState, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
