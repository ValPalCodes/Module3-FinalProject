<template>
    <div>
        <h1>Product Cards
        <loading-spinner id="spinner" v-bind:spin="isLoading" />

        </h1>
        <section id="product-cards">
            <article class="product-card" v-for="product in products" :key="product.id">
                <div class="sku" v-on:click="showDetails(product.id)">{{product.sku}}</div>
                <div class="price">{{currency(product.price)}}</div>
                <div class="product-name action">{{product.name}}</div>
                <div class="product-image">
                    <img v-bind:src="product.image_name" class="links" v-on:click="showDetails(product.id)">
                </div>
                <div class="cart">
                     <font-awesome-icon v-if="isLoggedIn" @click="addToCart(product)" class="icon action" title="Add item to cart" icon="fa-solid fa-cart-plus"/>
                </div>
            </article>
        </section>
    </div>
</template>

<script>

import CartService from '../services/CartServices.js';
import LoadingSpinner from '../components/LoadingSpinner.vue';

export default {


    name: 'product-cards',
    props: ['products'],
    components: {
        LoadingSpinner
    },

    methods: {
        currency(value) {
            return new Intl.NumberFormat(`en-US`, {
            currency: `USD`,
            style: "currency",
        }).format(value);
        },

        addToCart(product) {
            this.isLoading = true;
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
    },

    computed: {
        isLoggedIn() {
            return this.$store.state.token.length > 0;
        },

    }
}
</script>

<style scoped>
div {
    background-color: black;
    color: white;
}

h1 {
    margin-top: .5em;
    padding-left: .5em;
    padding: .5em;
    font-size: 2rem;
    background-color: rgb(255, 0, 221);
    margin-bottom: 1em;
}
#product-cards {
    display: flex;
    flex-wrap: wrap;
    margin: 0 10px 0 10px;
    gap: 20px;
    align-items: center;
    justify-content: center;
    padding-top: 1em;

}

.product-card {
    border: 2px solid rgb(255, 0, 255);
    border-radius: 10%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-row: 10px;
    grid-template-areas:
    "header header header price"
    "name name name name"
    "image image image image"
    ". . . cart";
    width: 350px;
    height: 350px;
    padding: 2em;
}


.sku {
    font-size: 1.35rem;
    font-weight: 600;
    grid-area: header;
    text-decoration: underline;
}

.sku:hover {
    color: rgb(255, 0, 179);
    cursor: pointer;
}

.price {
    font-size: 1.35rem;
    justify-items: end;
    align-items: end;
    grid-area: price;
    text-align: right;

}

.product-name {
    font-size: 1.25rem;
    grid-area: name;
}

.product-image {
    grid-area: image;
    margin-top: 5px;

}

.product-image img {
    border-radius: 50px;
    width: 350px;
    height: 250px;

}

.product-image img:hover {
    cursor:pointer;
    border: 2px solid rgb(255, 0, 212);
}

.cart {
    font-size: 20px;
    cursor: pointer;
    grid-area: cart;
    justify-items: end;
    align-items: end;
    text-align: right;
    
}

.cart:hover{
    color: rgb(255, 7, 160);
}


</style>
