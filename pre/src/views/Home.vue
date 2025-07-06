<template>
  <div class="container">
    <h2>Main Page</h2>
    <div class="newuser">
      <input type="text" v-model="newUser.name" class="inputs" placeholder="Name">
      <input type="text" v-model="newUser.lastname" class="inputs" placeholder="Lastname">
      <input type="text" v-model="newUser.age" class="inputs" placeholder="Age">
      <button @click="saveUser()" class="buttons1">Save Users</button>
    </div>
    <ul>
      <li v-for="(user,index) in users" :key="index">
        <span>{{user.name}}</span>
        <span>{{user.lastname}}</span>
        <span>{{user.age}}</span>
        <span @click="removeUser(user._id)">Remove</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'index',
  data () {
    return {
      users:{},
      newUser: {
        name:null,
        lastname:null,
        age:null
      },
      usersArray:[]
    }
  },
  mounted() {
    this.getUsers()
  },
  methods:{
    async getUsers(){
      await axios.get('/api').then(result =>{
        this.users = result.data
      })
    },
    async saveUser(){
      await axios.post('/api/newuser',{newuser:this.newUser}).then(result =>{
        if (result.data === '200') {
          this.getUsers()
        }
      })
    },
    async removeUser(id){
      await axios.delete('/api/remove-user/' + id).then(result =>{
        if (result.data === '200') {
          this.getUsers()
        }
      })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.newuser{
  width: 200px;
  padding: 10px;
  border:1px solid #ccc;
  border-radius: 4px;
  margin: 20px auto;
}
.inputs{
  padding: 3px;
  border-radius: 3px;
  margin: 5px 0;
}
.buttons1{
  width: 100%;
  margin-top: 10px;
}
ul{
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 250px;
  padding: 10px;
  list-style: none;
  margin: 20px auto;
  overflow-x: auto;
}
ul > li{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 5px;
}
ul > li > span{
  width: 50%;
  text-align: left;
}
.buttons2{
  width: 70px;
  height: 24px;
  margin: 0 5px;
}
.edit{
  background-color: darkkhaki;
}
.delete{
  background-color: firebrick;
  color: #fff;
}
</style>