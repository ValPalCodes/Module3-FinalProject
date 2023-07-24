import axios from 'axios';

export default {

    getCart() {
        return axios.get('/cart')
    },

    addItemsToCart(cartItem) {
        return axios.post('/cart/items', cartItem)
    },

    removeItemsFromCart(id) {
        return axios.delete(`/cart/items/${id}`)
    },

    clearCart() {
        return axios.delete('/cart')
    }

}