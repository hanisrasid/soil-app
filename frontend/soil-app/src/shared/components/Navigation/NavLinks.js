//used for page routing
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./NavLinks.css";
import "../Forms/forms.css";

import {useCartQuantity, useCartQuantityUpdate} from "../CartQuantityContext"

import SHOPPING_CART_API from '../../../api/services/ShoppingCart';
import CART_ITEM_API from '../../../api/services/CartItem';

import { useLogStatus } from "../../../shared/components/LogStatusContext";

function NavLinks(props) {
    const cartQuantity = useCartQuantity();
    const setCartQuantity = useCartQuantityUpdate();

    const logStatus = useLogStatus();

    useEffect(() => {
        SHOPPING_CART_API.getCart(logStatus)
        .then(
            (result) => {
                CART_ITEM_API.getAllItemsFromCart(result.data.id)
                        .then((newResult) => {
                            const totalQuantity = newResult.data.reduce((sum, item) => sum + item.quantity, 0);
                            setCartQuantity(totalQuantity);
                        }
                    ) 
            }
        )
        .catch(error => console.error("Error: ", error))
    }, [logStatus, setCartQuantity]);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/special-deals">Special Deals</NavLink>
            </li>
            <li>
                <NavLink to="/reviews">Reviews</NavLink>
            </li>
            <li>
                <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
                <NavLink to="/sign-up">Sign Up</NavLink>
            </li>
            <li>
                <NavLink to="/sign-in">Sign In</NavLink>
            </li>
            <li>
                <div style={{position: "relative"}}>
                    <NavLink to="/cart">Shopping Cart 
                    <span className="bubble">{cartQuantity}</span>
                    </NavLink>
                </div>
            </li>
            <li>
                <NavLink to="/goal-setting">Goal Setting</NavLink>
            </li>
        </ul>
    );
}

export default NavLinks;