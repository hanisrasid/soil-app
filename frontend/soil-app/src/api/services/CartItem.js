import CART_ITEM_API from '../axios'

const service = {
    getAllItems() {
        return CART_ITEM_API.get(`/cart-item/`);
    },
    getItem(id){
        return CART_ITEM_API.get(`/cart-item/${id}`)
    },
    createItem(params){
        return CART_ITEM_API.post('/cart-item/', params)
    },
    getItemFromCart(cartID, itemID){
        return CART_ITEM_API.get(`/cart-item/shopping-cart/${cartID}/${itemID}`)
    },
    getAllItemsFromCart(cartID){
        return CART_ITEM_API.get(`/cart-item/shopping-cart/${cartID}`)
    },
    decrementStock(id, params){
        return CART_ITEM_API.put(`/cart-item/${id}/`, params)
    },
    removeItem(params){
        return CART_ITEM_API.delete('/cart-item/shopping-cart/delete/', {data: params})
    },
    incrementStock(params){
        return CART_ITEM_API.put(`/cart-item/${params.itemID}/increment`, params)
    }
}

export default service