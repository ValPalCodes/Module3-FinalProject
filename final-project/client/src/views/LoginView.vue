<template>
  <div id="login">
    <form v-on:submit.prevent="login">
      <h1>Please Sign In</h1>
      <div id="fields">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          v-model="user.username"
          required
          autofocus
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="user.password"
          required
        />
        <div><button type="submit">Sign in</button></div>
      </div>
      <hr/>
      Need an account? <router-link v-bind:to="{ name: 'register' }">Register!</router-link>
    </form>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  name: "LoginView",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          const response = error.response;
          if (!response) {
            alert(error);
          } else if (response.status === 401) {
            alert("Invalid username and password!");
          } else {
            alert(response.message);
          }
        });
    },
  },
};
</script>

<style scoped>
#login{
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-image: url("C:\Users\Student\workspace\valeria-podoynitsyna-student-code\java\module-3\week-9\final-project\client\public\static\astro1_monica-garniga-XClNDg9Z9Ag-unsplash.jpg");
  background-size: 1900px;
  background-repeat: no-repeat; 
  background-position: center center;
  object-fit: cover;
  margin-top: 2em;
}

 #fields {
   display: flex;
   flex-direction: column;
   width: 400px;
   padding: 2em;
   background-color: rgba(0, 0, 0, 0.534);
   margin-top: 1em;
 }

 h1 {
   font-size: 2rem;
   border-bottom: 1px solid black;
   margin-top: 5em;
   background-color: rgba(0, 0, 0, 0.479);
   padding: 1em;

 }

 label {
   font-weight: 700;
   padding-top: .5em;
 }

 button {
   margin-top: 1em;
   width: 400px;
   background-color: black;
   color: white;
   text-transform: uppercase;
   border: 1px solid white;
 }

 button:hover {
   cursor: pointer;
   background-color: rgb(255, 0, 212);
   border-color: black;
   color: black;
 }

 a {
   color: rgb(255, 0, 221);
 }
</style>
