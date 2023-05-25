<template>  
  <div class="mt-5">
    <form @submit.prevent="login" class="d-flex">
      <div class="position-absolute top-50 start-50 translate-middle w-25">
        <div class="card p-4 border-2 text-black rounded-4">
          <h4 class="mb-3">LOGIN</h4>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" name="username" id="username" v-model="username" class="form-control" required/>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" name="password" id="password" v-model="password" class="form-control" required />
          </div>
          <div class="mt-3">
            <button class="btn btn-success rounded-4 fw-bold w-100" type="button" @click="login">
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
@import '../assets/css/bootstrap.min.css';

</style>

<script setup>

import '../assets/js/bootstrap.min.js'

</script>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async login () {
      try{
        const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/login', {
          username: this.username,
          password: this.password
        });
        localStorage.setItem('access_token', response.data.access_token);
        if(response && response.status === 200) {
          this.$swal({
            'icon' : 'success',
            'title' : 'Login Berhasil'
          })
          this.$router.push('/about');
        }
      }catch(err){
        this.$swal({
            'icon' : 'error',
            'title' : 'Login Gagal'
          })
      }
    }
  }
}


</script>