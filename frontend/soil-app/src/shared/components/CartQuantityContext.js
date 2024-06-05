import {createContext, useContext, useState} from "react";
import { getFromLocalStorage } from "../util/localStorage.util";

const cartQuantityContext = createContext();
const cartQuantityUpdateContext = createContext();

export function useCartQuantity() {
    return useContext(cartQuantityContext);
}

export function useCartQuantityUpdate() {
    return useContext(cartQuantityUpdateContext);
}

export function CartQuantityProvider({children}) {
    const userId = getFromLocalStorage('USER_ID_' + getFromLocalStorage('logStatus'));
    const initialCartQuantity = userId ? Object.values(getFromLocalStorage('USER_ID_' + getFromLocalStorage('logStatus'))?.cart).length || 0 : 0;

    const [cartQuantity, setCartQuantity] = useState(initialCartQuantity);

    return (
        <cartQuantityContext.Provider value={cartQuantity}>
            <cartQuantityUpdateContext.Provider value={setCartQuantity}>
                {children}
            </cartQuantityUpdateContext.Provider>
        </cartQuantityContext.Provider>
    )
}