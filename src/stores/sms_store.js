import axios from "axios";
import { defineStore } from "pinia";



export const useSms = defineStore('sms',{
    state: () =>({
        users: []
    }),getters:{

    },actions:{
        getUsers(){
            axios.get('http://127.0.0.1:8000/api/users/')
                .then(res=>{
                    this.users = res.data
                    console.log("Users: ",this.users)
                })
                .catch(error=>{
                    if(error.response.status !== 401) throw error
                })
        },
        sendMessage(form){
            axios.post('http://127.0.0.1:8000/api/sms/create',form.value)
                .then(res=>{
                    console.log(res.data)
                })
                .catch(error=>{
                    if(error.response.status !== 401) throw error
                })
        },
        createUser(form){
            axios.post('http://127.0.0.1:8000/api/users/create/',form)
                .then(res=>{
                    this.users.push(res.data)
                })
                .catch(error=>{
                    if(error.response.status !== 401) throw error
                })
        }
    },persist: true
})