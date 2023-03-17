import {createContext, useReducer} from "react";

export const StoreContext = createContext();

export const ACTION_TYPES = {
    SET_LAT_LONG: "SET_LAT_LONG",
    SET_COFFEE_STORES: "SET_COFFEE_STORES",
}

const storeReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_LAT_LONG:
            return {
                ...state,
                latLong: action.payload
            }
        case ACTION_TYPES.SET_COFFEE_STORES:
            return {
                ...state,
                coffeeStores: action.payload
            }
        default:
            return state;
    }
}

const StoreProvider = ({children}) => {
    const initialState = {
        latLong: '43.653833032607096,-79.37896808855945',
        coffeeStores: [],
    }

    const[state, dispatch] = useReducer(storeReducer, initialState);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;
