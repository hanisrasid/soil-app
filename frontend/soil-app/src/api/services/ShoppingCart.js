import SHOPPING_CART_API from '../axios'

const service = {
    getCart(userId){
        return SHOPPING_CART_API.get(`/shopping-cart/${userId}`)
    },
    getCartItems(id){
        return SHOPPING_CART_API.get(`/shopping-cart/${id}/items`)
    }

}

export default service