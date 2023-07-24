<template>
  <div>
    <h1>Product {{ $route.params.id }} Details
      <loading-spinner id="spinner" v-bind:spin="isLoading" />

    </h1>

    <section id="product-cards-header">
      <div class="product-name action">{{ product.name }}</div>
      <button class="cart" @click="addToCart(product)">
        <font-awesome-icon
          v-if="isLoggedIn"
          class="icon action"
          title="Add item to cart"
          icon="fa-solid fa-cart-plus"
        />

        Add To Cart
      </button>
    </section>
    <section class="product-cards-body">
      <div class="details">{{ product.description }}</div>
      <div class="sku">{{ product.sku }}</div>
      <div class="price">{{ currency(product.price) }}</div>
      <div class="product-image">
        <img v-bind:src="product.image_name" />
      </div>
    </section>
  </div>
</template>

<script>
import ProductService from "../services/ProductService";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import CartService from "../services/CartServices";

export default {
  name: "ProductDetails",
  components: {
    LoadingSpinner,
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
  },
  methods: {
    currency(value) {
      return new Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: "currency",
      }).format(value);
    },
    addToCart(product) {
            CartService.addItemsToCart({
                productId: product.id,
                quantity: 1
            }).then(() => {
              this.$store.commit('SET_MESSAGE', "Item Added to Cart!")
            });
        }
  },

  data() {
    return {
      product: {},
      isLoading: false,
    };
  },
  created() {
    this.isLoading = true;
    ProductService.getProductById(this.$route.params.id).then((response) => {
      this.product = response.data;
      this.isLoading = false;
    }),
      this.$store.commit("CLEAR_MESSAGE");
  },
};
</script>

<style scoped>

div {
  color: white;
  background-color: black;
  height: 100%;
}

h1 {
  font-size: 2rem;
  margin-left: 20px;
}

#product-cards-header {
  display: flex;
  justify-content: space-between;
  padding: 1em;
  flex-wrap: wrap;
  flex-direction: row;
}

.product-name {
  font-size: 1.5em;
  font-weight: 500;
  flex-grow: 1;
  color: white;
  background-color: rgb(255, 0, 200);
  padding: 0.5em;
}

button {
  width: 25%;
}

.product-cards-body {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
  border: 1px solid black;
  padding: 0.5em;
}
.details {
  font-family: 'Times New Roman', Times, serif;
  font-size: 1.25em;

}

.sku {
  font-weight: 500;
}

.price {
  font-weight: 600;
  padding-bottom: 1em;
}

img {
  width: 400px;
  height: 250px;
  border: 2px solid rgb(255, 0, 234);
  border-radius: 10%;
}

.cart {
  border: 1px solid rgb(255, 255, 255);
}

.cart:hover {
  background-color: rgb(255, 0, 212);

}
</style>