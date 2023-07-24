<template>
    <div>
        <h1>Product Table</h1>
        <loading-spinner id="spinner" v-bind:spin="isLoading" />

        <table>
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th></th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" v-bind:key="product.id">
                    <td>{{ product.sku }}</td>
                    <td class="links" v-on:click="showDetails(product.id)">
                        {{ product.name }}
                    </td>
                    <td>{{ product.price }}</td>
                    <td>
                        <font-awesome-icon v-if="isLoggedIn" @click="addToCart(product)" class="icon action" title="Add item to cart" icon="fa-solid fa-cart-plus"/>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
    
</template>

<script>

import CartService from '../services/CartServices';
import LoadingSpinner from '../components/LoadingSpinner.vue';

export default {
    name: 'product-table',
    props: ['products'],
    components: {
        LoadingSpinner,
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.token.length > 0;
        }
    },
    methods: {
         addToCart(product) {
            CartService.addItemsToCart({
                productId: product.id,
                quantity: 1
            }).then(() => {
              this.$store.commit('SET_MESSAGE', "Item Added to Cart!")
            });
        },
        showDetails(id) {
            this.$router.push({ name: 'ProductDetails', params: {id: id}});
        }
    }
}
</script>

<style scoped>

    div {
        color: white;
    }

    h1 {
        padding-left: .5em;
        font-size: 2rem;
        background-color: rgb(255, 0, 212);
        padding: .5em;
        margin-top: .5em;
        margin-bottom: .5em;
    }
    table {
        width: calc(100% - 30px);
        border: 1px solid white;
        margin-left: 10px;
        margin-right: 20px;
        margin: 1em;
        height: 60vh;
    }

    th {
        text-align: left;
        padding: .25em;
    }

    td {
        padding: .25em;
    }

    .links {
        cursor: pointer;
        text-decoration: underline;
    }

    .links:hover {
        color: rgb(255, 0, 170);
    }

    .icon {
        cursor: pointer;
    }

    .icon:hover {
        color: rgb(255, 0, 212);
    }

</style>
