<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
<div class="container-fluid">
        <a class="navbar-brand" href="/about">Home</a>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="/profil">Profil</a>
    </div>
</div>
    <div class="navbar-nav">
        <a class="nav-link" href="#" @click="logout">Logout</a>
    </div>
</div>
</nav>
<div class="mt-5">
    <form @submit.prevent="resetpassword" class="d-flex">
        <div class="position-absolute top-50 start-50 translate-middle w-25">
            <div class="card p-4 border-2 text-black rounded-4">
                <h4 class="mb-3">Reset Password</h4>
                <div class="mb-3">
                <label for="username" class="form-label">Old Password</label>
                <input type="text" name="username" id="old_password" v-model="old_password" class="form-control" required/>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="text" name="password" id="password" v-model="new_password" class="form-control" required />
            </div>
            <div class="mt-3">
                <button class="btn btn-warning rounded-4 fw-bold w-100" type="submit"> Submit </button>
            </div>
        </div>
    </div>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
        old_password: '',
        new_password: ''
        }
    },
    methods: {
        resetpassword() {
        const data = {
        old_password: this.old_password,
        new_password: this.new_password
    };
    const access_token = localStorage.getItem('access_token');
    const config = {
        headers: {
        'Authorization': `Bearer ${access_token}`
        }
    };
        axios.post('http://127.0.0.1:8000/api/v1/auth/reset-password', data, config)
        .then(response => {
            this.$swal({
            'icon' : 'success',
            'title' : 'Berhasil diubah'
            });
            localStorage.removeItem('access_token');
            this.$router.push('/')            
        })
        .catch(error => {
            this.$swal({
            'icon' : 'error',
            'title': 'Old password tidak sama',
            });
        });
    },
    async logout() {
    const access_token = localStorage.getItem('access_token');
    const headers = {
        'content-type': 'application/json',
        Authorization: `Bearer ${access_token}`
    }
    await axios.post('http://localhost:8000/api/v1/auth/logout/', {}, { headers })
        .then(() => {
        this.$swal({
            'icon' : 'success',
            'title': 'Login Berhasil',
        });
        localStorage.removeItem('access_token');
        this.$router.push('/');
        })
        .catch((err) => {
        console.log(err);
        });
    }
    }
}
</script>