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
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            
        }
    },
    methods: {
        async logout() {
            const access_token = localStorage.getItem('access_token');
            const headers = {
                'content-type': 'application/json',
                Authorization : `Bearer${access_token}`
            }
            await axios.post('http://localhost:8000/api/v1/auth/logout/', {},{headers})
            .then(()=>{
                this.$swal({
                    'icon' : 'success',
                    'title' : 'Logout Berhasil'
                });
                localStorage.removeItem('access_token');
                this.$router.push('/');
            })
            .catch((err)=>{
                this.$swal({
                    'icon' : 'error',
                    'title' : 'Logout Gagal'
                });
            })
        }
    }
}

</script>