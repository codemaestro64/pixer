import React, { useCallback } from 'react';
import { cartReducer, State, initialState } from './cart.reducer';
import {
  Item,
  getItem,
  inStock,
  VerifiedResponse,
  Optional,
} from '@/components/cart/lib/cart.utils';
import { useLocalStorage } from '@/lib/hooks/use-local-storage';
import { CART_KEY } from '@/lib/constants';
import { isEmpty } from 'lodash';

interface CartProviderState extends State {
  addItemToCart: (item: Optional<Item, 'quantity'>, quantity: number) => void;
  removeItemFromCart: (id: Item['id'], slug: Item['slug']) => void;
  clearItemFromCart: (id: Item['id'], slug: Item['slug']) => void;
  getItemFromCart: (id: Item['id'], slug: Item['slug']) => any | undefined;
  isInCart: (id: Item['id'], slug: Item['slug']) => boolean;
  isInStock: (id: Item['id'], slug: Item['slug']) => boolean;
  resetCart: () => void;
  setVerifiedResponse: (response: VerifiedResponse) => void;
  updateCartLanguage: (language: string) => void;
}
export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined
);

cartContext.displayName = 'CartContext';

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

export const CartProvider: React.FC = (props) => {
  const [savedCart, saveCart] = useLocalStorage(
    CART_KEY,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = React.useReducer(
    cartReducer,
    JSON.parse(savedCart!)
  );

  React.useEffect(() => {
    if (state.isEmpty) {
      resetCart();
    }
  }, [state.isEmpty]);
  React.useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  const addItemToCart = (item: Optional<Item, 'quantity'>, quantity: number) =>
    dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity });
  const removeItemFromCart = (id: Item['id'], slug: Item['slug']) =>
    dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', id, slug });
  const clearItemFromCart = (id: Item['id'], slug: Item['slug']) =>
    dispatch({ type: 'REMOVE_ITEM', id, slug });
  const setVerifiedResponse = (response: any) =>
    dispatch({ type: 'SET_VERIFIED_RESPONSE', response });
  const isInCart = useCallback(
    (id: Item['id'], slug: Item['slug']) => !!getItem(state.items, id, slug),
    [state.items]
  );
  const getItemFromCart = useCallback(
    (id: Item['id'], slug: Item['slug']) => getItem(state.items, id, slug),
    [state.items]
  );
  const isInStock = useCallback(
    (id: Item['id'], slug: Item['slug']) => inStock(state.items, id, slug),
    [state.items]
  );
  const resetCart = () => dispatch({ type: 'RESET_CART' });
  const updateCartLanguage = (language: string) =>
    dispatch({ type: 'UPDATE_CART_LANGUAGE', language });
  const value = React.useMemo(
    () => ({
      ...state,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      setVerifiedResponse,
      isInCart,
      isInStock,
      resetCart,
      updateCartLanguage,
    }),
    [getItemFromCart, isInCart, isInStock, state]
  );
  return <cartContext.Provider value={value} {...props} />;
};
