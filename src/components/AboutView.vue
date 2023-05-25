<template>
<Nav></Nav>
<button class="btn btn-primary" style="margin-top: 50px; margin-left: 100px;" data-bs-toggle="modal" data-bs-target="#modalAddPoll" >Add Poll</button>

<div class="modal fade" id="modalAddPoll">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add Poll</h2>
        </div>
        <div class="modal-body">
          <label for="title">Title : </label>
          <input type="text" class="form-control" name="title" v-model="dataPd.title">
          <label for="desc">Descriptions : </label>
          <textarea class="form-control" style="resize:none;" name="desc" v-model="dataPd.description"></textarea>
          <label for="deadline">Deadline :</label>
          <input type="date" name="deadline" class="form-control" v-model="dataPd.deadline">
          <label for="choices">Choices : </label>
          <div class="d-flex" v-for="(choice, id) in dataPd.choices" :key="id">
            <input type="text" class="form-control" v-model="dataPd.choices[id]">
            <button class="btn btn-danger" @click="removeChoice">Remove</button>
          </div>
          <button class="btn btn-warning w-100" @click="dataPd.choices.push('')">Add</button>

        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="addPoll">Add Poll</button>
          <button class="btn btn-secondary" data-bs-dismiss="modal" id="cancelz">Cancel</button>
        </div>
      </div>
    </div>
  </div>

<div class="container mt-5">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Choices</th>
        <th scope="col">Deadline</th>
        <th scope="col">Aaction</th>
      </tr>
    </thead>
    <tbody v-for="poll in polls" :key="poll.id">
    <tr>
    <th scope="row">{{ poll.id }}</th>
    <td>{{poll.title}}</td>
    <td>{{ poll.description }}</td>
    <td> 
      <div v-for="choice in poll.choices" :key="choice.id">
        {{ choice.choice }}, 
      </div>
    </td>
    <td>{{ poll.deadline }}</td>
    <td><a href="#" class="btn btn-warning" @click.prevent="detailPoll(poll.id)" data-bs-toggle="modal" data-bs-target="#modalDetail"> Details </a> 
    <button type="button" class="btn btn-danger" @click="deletePoll(poll.id)" style="margin-left: 10px;"> Delete </button> </td>
  </tr>
</tbody>
  </table>
</div>

<div class="modal fade" id="modalDetail">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1>Data</h1>
      </div>
      <div class="modal-body">
        <h5>Title:</h5>
        <p>{{ dataPd.title }}</p>
        <h5>Description:</h5>
        <p>{{ dataPd.description }}</p>
        <h5>Deadline:</h5>
        <p>{{ dataPd.deadline }}</p>
        <h5> Choice </h5>
        <div class="">
          <div v-for="choice in detailPollData.choices" :key="choice.id">
            <span>
              <b>{{ choice.choice + ", " }}</b>
            </span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal" >Cancel</button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import Nav from "../components/Nav.vue"
import { ref } from 'vue'

</script>

<script>
import axios from "axios";

export default {
  data() {
    return {
      polls: [],
      token: localStorage.getItem('access_token'),
      dataPd: {
        title: '',
        description: '',
        deadline: '',
        choices: [],
      },
      detailPollData: {},
      choice: '',
    }
  },
  mounted() {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    axios.get('http://127.0.0.1:8000/api/poll/', {
      headers
    })
      .then((res) => {
        this.polls = res.data.data
        console.log(res.data.data);
      }).catch((err) => {
        this.$swal({
          'icon': 'error',
          'title': 'Error',
          'text': err,
        })
      })
  },
  methods: {
    openModal() {

    },
    async addPoll() {
  // const headers = {
  //   Authorization: "Bearer " + this.token,
  // };
  // const pollData = {
  //   title: this.dataPd.title,
  //   description: this.dataPd.description,
  //   deadline: this.dataPd.deadline,
  //   choices: this.dataPd.choices,
  // };
  // axios.post('http://127.0.0.1:8000/api/poll', pollData, { headers })
  //   .then(response => {
  //     this.$swal({
  //       'icon': 'success',
  //       'title': 'Berhasil ditambah'
  //     })
  //   })
  //   .catch(error => {
  //     this.$swal({
  //       'icon': 'error',
  //       'title': 'Error'
  //     })
  //   });
  const headers = {
        Authorization: "Bearer " + this.token,
      };
      await axios
        .post(
          "http://127.0.0.1:8000/api/poll",
          {
            ...this.dataPd,
          },
          { headers }
        )
        .then(() => {
          const headers = {
            Authorization: "Bearer " + this.token,
          };
          axios
            .get("http://127.0.0.1:8000/api/poll", {
              headers,
            })
            .then((res) => {
              this.polls = res.data.data;
            })
            .catch((err) => {
              this.$swal({
                'icon': "error",
                'title': "Oopss!",
                'text': err,
              });
            }); 
          document.getElementById("cancelz").click();
          this.dataPd = {};
          this.dataPd.choices = [""];
        })
        .catch((err) => {
          this.$swal({
            'icon': "error",
            'text': err
          });
        });
},
    detailPoll(id) {
      const headers = {
        Authorization: 'Bearer ' + this.token,
      };
      axios.get(`http://127.0.0.1:8000/api/poll/${id}`, { headers })
        .then((res) => {
          this.dataPd.title = res.data.data.title;
          this.dataPd.description = res.data.data.description;
          this.dataPd.deadline = res.data.data.deadline;
          this.detailPollData = res.data.data;
        })
        .catch((err) => {
          this.$swal({
            icon: 'error',
            title: 'Error',
            text: err,
          });
        });
    },
    deletePoll(id) {
      this.$swal({
        icon:'warning',
        title: 'Are you sure?',
        showCancelButton: true,
        confirmButtonText: 'Sure!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete('http://127.0.0.1:8000/api/poll/' + id, {
            headers: {
              Authorization: `Bearer` + this.token
            }
          })
            .then((res) => {
              this.polls.splice(this.polls.indexOf(id - 1), 1)
              this.$swal({
                icon: 'success',
                text: res.data.message
              })
            })
            .catch((err) => {
              this.$swal({
                icon: 'error',
                text: err
              })
            })
        }
      })
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
  },
}

</script>
