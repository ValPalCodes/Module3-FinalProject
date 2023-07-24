import axios from 'axios';

export default {

  getProducts(nameSearchTerm, skuSearchTerm ) {
    if (nameSearchTerm == "") nameSearchTerm = null;
    if (skuSearchTerm == "") skuSearchTerm = null;

    if(nameSearchTerm == null && skuSearchTerm == null) {
      return axios.get('/products')
    } else if (nameSearchTerm == null) {
      return axios.get('/products?sku=' + skuSearchTerm)
    }else if (skuSearchTerm == null) {
      return axios.get('/products?name=' + nameSearchTerm)
    } else {
      return axios.get('/products?name=' + nameSearchTerm + '&sku' + skuSearchTerm)
    }
  },

  getProductById(id) {
      return axios.get('/products/' + id)
  },

  searchProducts(nameSearchTerm) {
    if(nameSearchTerm) {
      return axios.get('/products?name=' + nameSearchTerm)
    }
  }
}