import React, {useState, useEffect} from "react";
import "./ItemList.css";
import Item from "./Item";

import { useCartQuantity, useCartQuantityUpdate } from "../../../shared/components/CartQuantityContext";

import { useLogStatus } from "../../../shared/components/LogStatusContext";

import ITEM_API from '../../../api/services/Item';
import CART_ITEM_API from '../../../api/services/CartItem';
import SHOPPING_CART_API from '../../../api/services/ShoppingCart';

function ItemList(props) {
    const cartQuanity = useCartQuantity();
    const setCartQuantity = useCartQuantityUpdate();

    const logStatus = useLogStatus();

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(props.items);
    }, []);
    
    async function addToCart(itemID) {

        //update item
        await ITEM_API.decrementStock(items[itemID-1]);

        // Add item to shopping cart
        const shoppingCart = await SHOPPING_CART_API.getCart(logStatus)
        const cartItems = await CART_ITEM_API.getAllItemsFromCart(shoppingCart.data.id)

        let params = {
            itemID: itemID,
            cartID: shoppingCart.data.id,
            itemPrice: items?.find(item => item.id === itemID).price,
            quantity: 1
        }

        if (cartItems.data.length === 0) {
            // Cart is empty. Add item
            await CART_ITEM_API.createItem(params)
            setCartQuantity(cartQuanity+1)
            console.log('Cart was empty. Item added successfully.', params)
        }
        else {
            let isItemInCart = false;
            let indexAt;
            for (let index in cartItems.data) {
                
                if (cartItems.data[index].itemID === itemID) {
                    isItemInCart = true;
                    indexAt = index;
                }
                
            }
            if(isItemInCart) {
                // if item is already in the user's cart. Increment quantity
                cartItems.data[indexAt].quantity += 1
                await CART_ITEM_API.decrementStock(cartItems.data[indexAt].id, cartItems.data[indexAt])
                setCartQuantity(cartQuanity+1)
                console.log('item is already in cart. Incremented quantity')
            }
            else {
                // Cart is not empty and item not in cart. Add item
                await CART_ITEM_API.createItem(params)
                setCartQuantity(cartQuanity+1)
                console.log('cart is not empty but item not in cart. Add item')
            }
        }

        //update UI
        setItems(items.map(item => {
            if(item.id === itemID) {
                return {...item, stockCount: --item.stockCount}
            }
            else return item
        })
    );
    }

    if (items?.length === 0) {
        return(
            <p>There is no items available</p>
        )
    }
  else {
      return (
          <ul className="container d-flex align-items-center justify-content-center">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {items?.map((item) => {
              return (
                <div key={item.id} className="col-md-4" style={{width: "25rem"}}>
                  <Item
                    id={item.id}
                    name={item.name}
                    image={item.img}
                    description={item.description}
                    stockCount={item.stockCount}
                    price={item.price}
                    addToCart={addToCart}
                  />
                </div>
              );
            })}
          </div>
        </ul>
      )
  }
}

export default ItemList