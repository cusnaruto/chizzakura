import React, { createContext, useContext, useReducer, useEffect } from "react";

// Tạo Context
const CartContext = createContext();

// Reducer để quản lý trạng thái giỏ hàng
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

// Provider cho Context
export const CartProvider = ({ children }) => {
  // Tải trạng thái từ localStorage khi ứng dụng khởi động
  const storedCart = JSON.parse(localStorage.getItem("cart")) || { items: [] };

  const [state, dispatch] = useReducer(cartReducer, storedCart);

  // Lưu trạng thái vào localStorage mỗi khi `state` thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook để sử dụng Context
export const useCart = () => useContext(CartContext);
