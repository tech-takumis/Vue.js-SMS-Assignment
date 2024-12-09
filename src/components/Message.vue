<template>
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 px-4 w-full max-w-7xl mx-auto">
        <div class="relative bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">User Messaging System</h1>
          
          <div class="flex flex-col md:flex-row gap-8">
            <!-- User List Column -->
            <div class="w-full md:w-1/3 bg-white rounded-lg shadow-md overflow-hidden">
              <div class="flex justify-between items-center p-4 bg-gray-50 border-b">
                <h2 class="text-2xl font-semibold">Users</h2>
                <button
                  @click="showCreateUserModal = true"
                  class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
                >
                  Create User
                </button>
              </div>
              <ul class="divide-y divide-gray-200">
                <li 
                  v-for="user in users" 
                  :key="user.id" 
                  @click="selectUser(user)"
                  class="p-4 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
                >
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img class="h-10 w-10 rounded-full" :src="`https://i.pravatar.cc/150?img=${user.id}`" alt="" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {{ user.name }}
                      </p>
                      <p class="text-sm text-gray-500 truncate">
                        {{ user.phone_number }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
  
            <!-- Message Form Column -->
            <div class="w-full md:w-2/3 bg-white rounded-lg shadow-md overflow-hidden">
              <h2 class="text-2xl font-semibold p-4 bg-gray-50 border-b">Message</h2>
              <div v-if="selectedUser" class="p-6">
                <form @submit.prevent="sendMessage" class="space-y-6">
                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="text" name="phone" id="phone" :value="selectedUser.phone_number" readonly class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" name="message" rows="4" v-model="sms.message" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Type your message here..."></textarea>
                  </div>
                  <div>
                    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
              <div v-else class="p-6 text-center text-gray-500">
                Select a user to send a message
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Create User Modal -->
      <div v-if="showCreateUserModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Create New User
              </h3>
              <div class="mt-2">
                <form @submit.prevent="createUser" class="space-y-4">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" id="name" v-model="newUser.name" required class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
                    <input type="number" name="age" id="age" v-model="newUser.age" required class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        +63
                      </span>
                      <input type="tel" name="phone" id="phone" v-model="newUser.phone_number" required class="flex-1 block w-full py-2 px-3 border border-gray-300 rounded-none rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="9123456789" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" @click="createUser" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                Create
              </button>
              <button type="button" @click="showCreateUserModal = false" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useSms } from '@/stores/sms_store'
  import { computed, reactive, ref } from 'vue'

  const store = useSms()

  const users = computed(()=>store.users)

  
  const showCreateUserModal = ref(false)

  const newUser = ref({
    name: '',
    age: '',
    phone_number: ''
  })

  const selectedUser = ref([])

  const sms = ref({
    to: '',
    message:  ''
  })

  const selectUser = (user) => {
    selectedUser.value = user
    sms.value.to = user.phone_number
  }
  
  
  const sendMessage = () => {
    if (selectedUser.value && sms.value.message.trim()) {
      console.log(`Sending message to  ${JSON.stringify(sms.value.to)}`)
      
      store.sendMessage(sms)
      alert(`Message sent to ${selectedUser.value.name}!`)
     sms.value.message = ''
    } else{

    alert("Please enter a message and select a user to send a message!")
    }
  }
  
  const createUser = () => {
    if (newUser.value.name && newUser.value.age && newUser.value.phone_number) {
      const user = {
        name: newUser.value.name,
        age: newUser.value.age,
        phone_number: `+63${newUser.value.phone_number}`,
      }
      store.createUser(user)
      showCreateUserModal.value = false
      newUser.value = { name: '', age: '', phone: '' }
      alert('User created successfully!')
    } else {
      alert('Please fill in all fields')
    }
  }
  </script>