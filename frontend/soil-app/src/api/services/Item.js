import ITEM_API from '../axios'

const service = {
    getAllItems() {
        return ITEM_API.get(`/item/`);
    },
    getItem(id){
        return ITEM_API.get(`/item/${id}`)
    },
    createItem(params){
        return ITEM_API.post('/item/', params)
    },
    decrementStock(item){
        return ITEM_API.put(`/item/${item.id}`, item)
    },
    incrementStock(params){
        return ITEM_API.put(`/item/${params.itemID}/increment`, params)
    }
}

export default service