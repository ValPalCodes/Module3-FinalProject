<template>
  <div>
    <div class="header-div">
      <h1>Shopping Cart</h1>
      <loading-spinner id="spinner" v-bind:spin="isLoading" />

      <button @click="clearCart()" id="clearCart">
        <font-awesome-icon icon="fa-solid fa-trash-can" />

        Clear Cart
      </button>
    </div>
    <div class="image-bg">
      <div class="container-grid">
        <div class="table-div">
          <table>
            <thead>
              <tr>
                <th class="header-quantity">Quantity</th>
                <th class="header-product">Product</th>
                <th class="header-price">Price</th>
                <th class="header-amount">Amount</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in cart.cartItemsList" v-bind:key="item.id">
                <td class="quantity">{{ item.quantity }}</td>
                <td class="product">{{ item.product.name }}</td>
                <td class="price">{{ currency(item.product.price) }}</td>
                <td class="amount">
                  {{ currency(item.quantity * item.product.price) }}
                </td>
                <td>
                  <button class="trash" @click="removeCartItem(item)">
                    <font-awesome-icon icon="fa-solid fa-trash-can" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <hr class="hr" />

          <div class="total">
            <p class="subtotal">Item Subtotal:</p>
            <p class="subtotal-amount">{{ currency(cart.subtotal) }}</p>
            <p class="tax">Tax:</p>
            <p class="tax-amount">{{ currency(cart.taxAmount) }}</p>
            <p class="total-sum">Total:</p>
            <p class="total-sum-amount">{{ currency(cart.total) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartService from "../services/CartServices";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
  name: "CartView",
  components: {
    LoadingSpinner,
  },

  data() {
    return {
      cart: {},
      isLoading: false,
    };
  },
  created() {
    this.loadCart();
  },
  methods: {
    currency(value) {
      if (isNaN(value)) {
        return "";
      } else {
        return new Intl.NumberFormat(`en-US`, {
          currency: `USD`,
          style: "currency",
        }).format(value);
      }
    },
    loadCart() {
      CartService.getCart().then((response) => {
        this.cart = response.data;
      });
    },
    removeCartItem(cartItem) {
      CartService.removeItemsFromCart(cartItem.product.id).then(() => {
        this.loadCart();
      });
    },
    clearCart() {
      CartService.clearCart().then(() => {
        this.loadCart();
      });
    },
  },
};
</script>

<style scoped>
div {
  color: white;
}

h1 {
  font-size: 2rem;
  flex-grow: 1;
  display: flex;
  margin-left: 10px;
}

.trash:hover {
  background-color: rgb(248, 0, 165);
  cursor: pointer;
}

.header-div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  background-color: rgb(255, 0, 221);
  padding: 1em;
}

.image-bg {
  background-image: url("C:\Users\Student\workspace\valeria-podoynitsyna-student-code\java\module-3\week-9\final-project\client\public\static\Images final project\astro3_brian-mcgowan-MIdLSFHYuMk-unsplash.jpg");
  background-size: 1900px;
  background-repeat: no-repeat;
  background-position: center center;
  object-fit: cover;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  padding-bottom: 20px;
}

.container-grid {
  display: flex;
  justify-content: center;
  position: fixed;
}


.table-div {
  margin-left: 0px;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr auto 0.01fr 0.5fr;
  grid-template-areas:
    "quantity product price amount ."
    "value1 value2 value3 value4 trash"
    "hr hr hr hr hr"
    ". total total total .";
  border: 1px solid white;
  width: 500px;
  margin-top: 8em;
  padding: 1em;
  background-color: black;
}

.hr {
  width: 100%;
  grid-area: hr;
}

tbody {
  color: white;
}

th {
  font-size: 1.5rem;
  padding: 0.5em;
}

td {
  color: white;
}

.header-quantity {
  grid-area: quantity;
}

.header-product {
  grid-area: product;
}

.header-price {
  grid-area: price;
}

.header-amount {
  grid-area: amount;
}

.quantity {
  text-align: center;
  grid-area: value1;
}

.product {
  text-align: center;
  grid-area: value2;
}

.price {
  text-align: center;
  grid-area: value3;
}

.amount {
  text-align: center;
  grid-area: value4;
}

.total {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 23%;
  position: relative;
  margin-left: -22em;
  grid-area: total;
  margin-top: 10px;
  z-index: 0;
}

.subtotal {
  font-weight: 500;
}

.tax {
  font-weight: 500;
}

.total-sum {
  font-weight: 500;
}

#clearCart {
  border: 2px solid black;
}

#clearCart:hover {
  cursor: pointer;
  background-color: rgb(255, 0, 221);
}
</style>