import React, { useEffect, useState } from "react";
import "./ItemList.css";
import Item from "./Item"
import { useCartQuantity, useCartQuantityUpdate } from "../../../shared/components/CartQuantityContext";

import { useLogStatus } from "../../../shared/components/LogStatusContext";

import SHOPPING_CART_API from '../../../api/services/ShoppingCart';
import CART_ITEM_API from '../../../api/services/CartItem';
import ITEM_API from '../../../api/services/Item';


function ItemList() {
    const cartQuanity = useCartQuantity();
    const setCartQuantity = useCartQuantityUpdate();

    const logStatus = useLogStatus();

    const [itemsToDisplay, setItemsToDisplay] = useState([]);
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const getShoppingCartItems = async () => {
            try {
                if (logStatus) {
                    const cartID = await SHOPPING_CART_API.getCart(logStatus);
                    const shoppingCart = await CART_ITEM_API.getAllItemsFromCart(cartID.data.id);
                    const items = await ITEM_API.getAllItems();

                    setItems(items.data)
                    setCartItems(shoppingCart.data)
                    setLoading(false);
                }

            }
            catch (e) {
                setLoading(false);
                console.error("Error while getting cart items", e)
            }
        }

        if (cartItems.length === 0) {
            getShoppingCartItems();
        }

    }, []);

    useEffect(() => {
        const matchingElements = items.filter(obj1 => {
            return cartItems.some(obj2 => obj2.itemID === obj1.id);
        });

        matchingElements.forEach((element, index) => {
            if (index < cartItems.length) {
                element.quantity = cartItems[index].quantity;
            }
        })
        setItemsToDisplay(matchingElements)
    }, [cartItems, items])


    async function removeItem(itemID) {
        //set cart quantity
        setCartQuantity(cartQuanity - 1);
        //remove item in db
        await CART_ITEM_API.removeItem({ itemID: itemID, cartID: logStatus })

        const updateItem = itemsToDisplay.filter((item) => item.id === itemID)

        //update item stockCount
        await ITEM_API.incrementStock({ quantity: updateItem[0].quantity, itemID: itemID })

        setItemsToDisplay(itemsToDisplay.filter(item => itemID !== item.id))
    }

    const changeQuantity = async (itemId, newQuantity) => {
        //update the quantity for cart item
        const updateItem = itemsToDisplay.filter((item) => item.id === itemId)
        const quantity = newQuantity - updateItem[0].quantity;
        if (newQuantity !== updateItem[0].quantity) {

            await CART_ITEM_API.incrementStock({ quantity: quantity, itemID: itemId, cartID: logStatus })
            const newCartItems = [...cartItems]
            const cartIndex = newCartItems.findIndex(item => item.itemID === itemId)
            newCartItems[cartIndex] = {
                ...newCartItems[cartIndex], 
                quantity: (newCartItems[cartIndex].quantity += quantity)
            };

            setCartItems(newCartItems);


            //update the stock count of item
            await ITEM_API.incrementStock({ quantity: quantity, itemID: itemId })
            const updatedItems = [...items]
            const index = updatedItems.findIndex(item => item.id === itemId)

            updatedItems[index] = {
                ...updatedItems[index],
                stockCount: (updatedItems[index].stockCount += -quantity) 
            };
 
            setItems(updatedItems);

        }


        console.log("CART ITEMS UPDATED")
        //update shoppingCart
        //update price
    };

    useEffect(() => {
        let totalPrice = 0;

        itemsToDisplay.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        setTotalPrice(totalPrice.toFixed(2));
    }, [itemsToDisplay]);

    const checkout = () => {
        setCartItems([]);
        setCartQuantity(0)
    }
    if (cartItems?.length === 0) {
        return (
            <p>There is no items available</p>
        )
    }
    else {
        if (loading) {
            return <p>Items are loading...</p>
        }
        return (
            <>
                <ul className="container justify-content-center box">
                    <div className="row align-items-center">
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-6">
                            <h5>Name:</h5>
                        </div>
                        <div className="col-md-1">
                            <h5>Unit Price:</h5>
                        </div>
                        <div className="col-md-1">
                            <h5>Quantity:</h5>
                        </div>
                        <div className="col-md-2">
                            <h5>Total Price:</h5>
                        </div>
                    </div>

                    {itemsToDisplay.map((item) => {
                        return (
                            <div key={item.id} className="row g-4">
                                <div>
                                    <Item
                                        id={item.id}
                                        name={item.name}
                                        image={item.img}
                                        desc={item.description}
                                        quantity={item.quantity}
                                        price={item.price}
                                        setItems={setCartItems}
                                        items={cartItems}
                                        removeItem={removeItem}
                                        changeQuantity={changeQuantity}
                                    />
                                </div>
                            </div>
                        );
                    })}
                    <div className="row align-items-center">
                        <div className="col-md-8"></div>
                        <div className="col-md-1">
                            <p>Sub total:</p>
                            <p>GST (10%):</p>
                            <p>Shipping:</p>
                            <p>Grand Total:</p>
                        </div>
                        <div className="col-md-1">
                            <h6><p>${totalPrice}</p></h6>
                            <h6><p>${(totalPrice * 0.1).toFixed(2)}</p></h6>
                            <h6><p>${10}</p></h6>
                            <h4><p>${(parseFloat(totalPrice) + parseFloat((totalPrice * 0.1).toFixed(2)) + 10).toFixed(2)}</p></h4>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-8"></div>
                        <div className="col-md-4">
                            <button className="my-btn btn-success" data-bs-toggle="modal" data-bs-target="#modal">Checkout</button>
                        </div>
                    </div>
                </ul>
                <div class="modal fade" aria-hidden="true" id="modal" tabIndex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Checkout Confirmation</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <input
                                        type="text"
                                        name="number"
                                        placeholder="Card Number"
                                    />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Cardholder Name"
                                    />
                                    <input
                                        type="text"
                                        name="expiry"
                                        placeholder="Expiry Date"
                                    />
                                    <input
                                        type="number"
                                        name="cvc"
                                        placeholder="CVC"
                                    />
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={checkout}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ItemList