<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">My account</h1>
            </div>

            <div class="column is-12">
                <button @click="logout()" class="button is-danger">Log out</button>
            </div>

            <hr>

            <div class="column is-12">
                <h2 class="subtitle">My profile</h2>
				
				<p><strong>Name: </strong> {{profileName}}</p>
				
				<img v-bind:src="'https://icons-for-free.com/iconfiles/png/256/facebook+profile+user+profile+icon-1320184041317225686.png'">

				<router-link v-bind:to="'/product-form'">Add product</router-link>
				
				<hr>
				
				<p>Messages</p>							
				<p><router-link v-bind:to="'/profiles/johnsmith55/orders'">Orders</router-link></p>
				<p><router-link v-bind:to="'/profiles/johnsmith55/sales'">Sales</router-link></p>
				
				<hr> 
				
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import OrderSummary from '@/components/OrderSummary.vue'

export default {
    name: 'MyAccount',
    components: {
        OrderSummary
    },
    data() {
        return {
            profileName: '',
			messages: []			 
        }
    },
    mounted() {
        document.title = 'My account | Djackets'
		
        this.getProfile()        
    },
    methods: {
	
	
	
		getUrl(str1, str2) {
			return str1 + str2;
		}, 
	
        logout() {
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("email")
            localStorage.removeItem("userid")

            this.$store.commit('removeToken')

            this.$router.push('/')
        },
        async getProfile() {
			
			let email = localStorage.getItem("email");
			let slug = email.substring(0, email.indexOf('@'));
            
			await axios
                .get("/api/v1/profiles/" + slug + "/")
                .then(response => {
                    console.log('current profile is:');
                    console.log(response.data.posts);
                    
                    console.log('----------MESSAGES:----------');
					console.log(response.data.messages_to);
					this.messages = response.data.messages_to;
					
					this.orders = response.data.orders;
				 
					
                    console.log('slug is: ', slug);
					this.profileName = response.data.name;
					
					console.log('profile name is: ');
					console.log(this.profileName);
					
					console.log('response data is: ');
					console.log(this.profileName);
					
                })
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                    } else {
                        this.errors.push('Something went wrong. Please try again')
                        
                        console.log(JSON.stringify(error))
                    }
                })
        }	
				
    }
}
</script>