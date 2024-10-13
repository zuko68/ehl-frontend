import React, { createContext, useContext, useReducer } from 'react';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
export const MINUS_ITEM = 'MINUS_ITEM'; // Add this line

// Update CartItem interface to include price
interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number; // New field for price
}

interface CartState {
    cartItems: CartItem[];
}

export type CartAction =
  | { type: typeof ADD_ITEM; item: { id: number; name: string; price: number; quantity?: number } }
  | { type: typeof REMOVE_ITEM; id: number }
  | { type: typeof CLEAR_CART }
  | { type: typeof MINUS_ITEM; id: number }; // Include MINUS_ITEM here

const initialState: CartState = {
    cartItems: []
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
                    // Increase quantity by 1 if the item already exists
                    return {
                        ...state,
                        cartItems: state.cartItems.map(item =>
                            item.id === action.item.id
                                ? { ...item, quantity: item.quantity + 1 } // Always increase by 1
                                : item
                        ),
                    };
                }
                // If the item does not exist, add it to the cart with a quantity of 1
                return { ...state, cartItems: [...state.cartItems, { ...action.item, quantity: 1 }] };
            }
            
            case 'REMOVE_ITEM':
                return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.id) };
        
            case 'MINUS_ITEM': {
                const existingItem = state.cartItems.find(item => item.id === action.id);
                if (existingItem) {
                    // Decrease quantity by 1
                    const newQuantity = existingItem.quantity - 1;
                    if (newQuantity > 0) {
                        // If quantity is still greater than 0, update the quantity
                        return {
                            ...state,
                            cartItems: state.cartItems.map(item =>
                                item.id === action.id
                                    ? { ...item, quantity: newQuantity } // Update quantity
                                    : item
                            ),
                        };
                    } else {
                        // If quantity is 0, remove the item from the cart
                        return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.id) };
                    }
                }
                return state; // Return the current state if item doesn't exist
            }
        
            case 'CLEAR_CART':
                return { ...state, cartItems: [] };
        
            default:
                return state;
        }        
    }, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
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
