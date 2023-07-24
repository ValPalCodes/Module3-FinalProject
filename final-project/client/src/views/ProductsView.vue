<template>
  <div class="home">
    <div id="heading-line">
      <h1>
        Products
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>
      <font-awesome-icon
        v-bind:class="{ 'view-icon': true, active: cardView }"
        v-on:click="cardView = true"
        icon="fa-solid fa-grip"
        title="View tiles"
      />
      <font-awesome-icon
        v-bind:class="{ 'view-icon': true, active: !cardView }"
        v-on:click="cardView = false"
        icon="fa-solid fa-table"
        title="View table"
      />

      <input
        type="text"
        placeholder="Search"
        v-model="searchTerm"
        v-on:keydown="searchProducts"
      />
    </div>

    <p id="login-message" v-if="!isLoggedIn">
      Welcome! You may browse anonymously as much as you wish,<br />
      but you must
      <router-link v-bind:to="{ name: 'login' }">Login</router-link> to add
      items to your shopping cart.
    </p>

    <product-cards v-if="cardView" :products="products" />
    <product-table v-else :products="products" />
  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductCards from "../components/ProductCards.vue";
import ProductTable from "../components/ProductTable.vue";
import ProductService from "../services/ProductService";


export default {
  name: "ProductsView",
  components: {
    LoadingSpinner,
    ProductCards,
    ProductTable,
  },
  data() {
    return {
      isLoading: false,
      cardView: true,
      products: [],
      searchTerm: ""
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
    
  },

  methods: {
    getProducts() {
      this.isLoading = true;
      ProductService.getProducts(this.searchTerm).then((response) => {
        this.products = response.data;
        this.isLoading = false;
      console.log(this.products);

      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
      });
    },
    searchProducts(event) {
      if(event.key === "Enter") {
        this.isLoading = true;
        if(this.searchTerm) {
          ProductService.searchProducts(this.searchTerm).then((response) => {
          this.products = response.data;
          this.isLoading = false;
        }) 
        } else {
        this.getProducts();
      }
    }
  } 
  

  },

  created() {
    this.$store.commit('CLEAR_MESSAGE', '');
    this.$store.commit('SET_MESSAGE', "WELCOME!");
    this.getProducts();
  }
  
  };
</script>

<style scoped>
.home {
  padding-bottom: 20px;
}

#spinner {
  color: rgb(255, 0, 242);
}

.view-icon {
  font-size: 1.2rem;
  margin-right: 7px;
  padding: 3px;
  color: rgb(224, 246, 20);
  border-radius: 3px;
}

.view-icon.active {
  background-color: rgb(250, 11, 230);
}

.view-icon:not(.active) {
  font-size: 1.2rem;
  margin-right: 7px;
  cursor: pointer;
}

.view-icon:not(.active):hover {
  color: blue;
  background-color: rgb(255, 187, 0);
}

#heading-line {
  display: flex;
  width: 100%;
  background-color: black;
  color: white;
  height: 30px;
  margin-top: 0;
  padding-top: 1em;
}

#heading-line h1 {
  flex-grow: 1;
  margin-top: 0;
  padding-left: 0.5em;
  margin-top: 0;
}

</style>