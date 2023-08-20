import { CartType } from "../types/CartType";

export const saveCartStateToLocalStorage = (state: CartType) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch (error) {}
};

export const loadCartStateFromLocalStorage = (): CartType | undefined => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};
