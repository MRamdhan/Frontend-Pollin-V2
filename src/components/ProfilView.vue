<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<Nav></Nav>
<!-- <table class="table">
<thead>
    <tr>
        <th scope="col">Id</th>
        <th scope="col">Division</th>
        <th scope="col">Username</th>
        <th scope="col">Role</th>
    </tr>
</thead>
<tbody>
    <tr>
    <th scope="row">{{ user.id }}</th>
    <td>{{ user.division_id}}</td>
    <td>{{ user.username }}</td>
    <td> {{ user.role }}</td>
</tr>
</tbody>
</table> -->
<div class="mt-5">
    <form class="d-flex">
        <div class="position-absolute top-50 start-50 translate-middle w-25">
            <div class="card p-4 border-2 text-black rounded-4">
                <h4 class="mb-3">Data</h4>
                <div class="mb-3">
                    <div v-if="user">
                    <p>Id: {{  this.user.id }} </p>
                    <p>Division: {{ user.division_id}} </p>
                    <p>Username: {{ user.username }} </p>
                    <p>Role: {{ user.role }} </p>
                </div>
                <RouterLink to="/reset" class="btn btn-warning"> Reset Password </RouterLink>
            </div>
        </div>
    </div>
    </form>
</div>

</template>

<script setup>
import Nav from '../components/Nav.vue'

</script>

<script>
import axios from "axios";
export default {
data() {
    return {
        user: JSON.parse(localStorage.getItem('userdata'))
    }
},
methods: {
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
},
mounted() {
    console.log(this.user);
}
}
</script>