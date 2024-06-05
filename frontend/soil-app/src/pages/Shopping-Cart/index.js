import React, {useState} from "react";
import ItemList from "./components/ItemList";
import { getFromLocalStorage } from "../../shared/util/localStorage.util";
import '../../shared/components/Forms/forms.css';

function ShoppingCart() {
    return(<>
        <h1 className="margin-left">Shopping Cart</h1>
        <ItemList/>
    </>)
}

export default ShoppingCart