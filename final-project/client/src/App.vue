<template>
  <div id="app">
    <header>
      <div id="logo">
        <h1>AstroGIFTS</h1>
      </div>
    </header>

    <nav>
      <div class="left-justify">
        <router-link v-bind:to="{ name: 'products' }">Home</router-link>
        <router-link v-bind:to="{ name: 'CartView' }">Cart</router-link>
      </div>
      <div id="message-area" class="middle-justify">
        {{ $store.state.message }}
        <font-awesome-icon
          class="clear-message-icon"
          icon="fa-solid fa-xmark"
          title="Clear message"
          v-if="$store.state.message"
          v-on:click="$store.commit('CLEAR_MESSAGE')"
        />
      </div>
      <div class="right-justify">
        <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token"
          >Logout</router-link
        >
        <router-link v-bind:to="{ name: 'login' }" v-else>Login</router-link>
      </div>
    </nav>

    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; Copyright Text 2023</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  display: grid;
  grid-template-areas: 
  "header"
  "nav"
  "main"
  "footer";
  height: 100%;
  background-color: black;
  color: white;

}
 header {
  grid-area: header;
 }

#logo {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 200px;
  background-image: url("C:\Users\Student\workspace\valeria-podoynitsyna-student-code\java\module-3\week-9\final-project\client\public\static\Images final project\space2_aldebaran-s-uXchDIKs4qI-unsplash.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
}

h1 {
  font-size: 3rem;
  color: white;
}

nav {
  width: 100%;
  display: flex;
  position: fixed;
  top: 200px;
  border: 1px solid black;
  background-color: rgb(16, 0, 160);
  color: white;
  flex-direction: row;
  align-items: center;
  height: 50px;
  grid-area: nav;
  z-index: 1;

}

.left-justify {
  display: flex;
  gap: 20px;
  padding: 0.5em;
}

.middle-justify {
  flex-grow: 1;
  text-align: center;
  color: rgb(255, 0, 234);
}

.right-justify {
  padding-right: 0.5em;
}

main {
  margin-top: 250px;
  flex-grow: 1;
  grid-area: main;
  overflow: auto;
  margin-bottom: 40px;
}

a {
  text-decoration: none;
  color: white;
}

a:hover {
  color: rgb(255, 0, 221);
}

footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: rgba(255, 0, 221, 0.733);
  border: 1px solid black;
  padding-left: 1em;
  color: white;
  height: 40px;
  display: flex;
  justify-content: left;
  align-items: center;
  grid-area: footer;
}
</style>