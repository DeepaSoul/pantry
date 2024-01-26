import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import meatData from "../data/meatData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TYPE_MeatData } from "../utils/types";

export const useStore = create(
  persist(
    (set) => ({
      meatList: meatData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: TYPE_MeatData) =>
        set(
          produce((state) => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == cartItem.id) {
                found = true;
                state.CartList[i].quantity++;
                break;
              }
            }
            if (found == false) {
              state.CartList.push(cartItem);
            }
          })
        ),
      calculateCartPrice: () =>
        set(
          produce((state) => {
            let totalprice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let price =
                parseFloat(state.CartList[i].price) *
                  state.CartList[i].quantity || 1;
              state.CartList[i].ItemPrice = price.toFixed(2).toString();
              totalprice = totalprice + price;
            }
            state.CartPrice = totalprice.toFixed(2).toString();
          })
        ),
      addToFavoriteList: (id: string) =>
        set(
          produce((state) => {
            for (let i = 0; i < state.meatList.length; i++) {
              if (state.meatList[i].id == id) {
                if (state.meatList[i].favourite == false) {
                  state.meatList[i].favourite = true;
                  state.FavoritesList.unshift(state.meatList[i]);
                } else {
                  state.meatList[i].favourite = false;
                }
                break;
              }
            }
          })
        ),
      deleteFromFavoriteList: (type: string, id: string) =>
        set(
          produce((state) => {
            for (let i = 0; i < state.meatList.length; i++) {
              if (state.meatList[i].id == id) {
                if (state.meatList[i].favourite == true) {
                  state.meatList[i].favourite = false;
                } else {
                  state.meatList[i].favourite = true;
                }
                break;
              }
            }

            let spliceIndex = -1;
            for (let i = 0; i < state.FavoritesList.length; i++) {
              if (state.FavoritesList[i].id == id) {
                spliceIndex = i;
                break;
              }
            }
            state.FavoritesList.splice(spliceIndex, 1);
          })
        ),
      incrementCartItemQuantity: (id: string) =>
        set(
          produce((state) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                state.CartList[i].quantity++;
                break;
              }
            }
          })
        ),
      decrementCartItemQuantity: (id: string) =>
        set(
          produce((state) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                if (state.CartList[i].quantity > 1) {
                  state.CartList[i].quantity--;
                } else {
                  state.CartList.splice(i, 1);
                }
                break;
              }
            }
          })
        ),
      checkOutFromCart: () =>
        set(
          produce((state) => {
            state.CartList = [];
          })
        ),
      removeCartItem: (id: string) =>
        set(
          produce((state) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                  state.CartList.splice(i, 1);
                  break;
              }
            }
          })
        ),
    }),
    {
      name: "meat-app",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
