<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">Profiles</h2>
            </div>  
			
			
			<div class="column is-9" v-for="profile in profilelist">
				<div class="box">					 
						<img v-bind:src="'https://icons-for-free.com/iconfiles/png/256/facebook+profile+user+profile+icon-1320184041317225686.png'">
					 
					<h3 class="is-size-4">{{ profile.name }}</h3>
					<h3 class="is-size-4">{{ profile.lastname }}</h3> 




<hr>					
  <router-link v-bind:to="profile.get_message_url" class="button">Send a message</router-link>


<hr>
<router-link v-bind:to="profile.get_profile_url" class="button is-dark mt-4">View details</router-link>
					
				</div>				 
			</div>  
			 
			 
			
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'



export default {
    name: 'Profiles',   
    data() {
        return {
            profilelist: {}
        }
    },
    mounted() {
        this.getProfiles()
    },
   
    methods: {
        async getProfiles() {
            

            this.$store.commit('setIsLoading', true)

            axios
                .get(`/api/v1/profiles/`)
                .then(response => {
                    this.profilelist = response.data 

                    document.title = 'Profiles' 
					 
					 
                })
                .catch(error => {
                    console.log(error)

                    toast({
                        message: 'Something went wrong. Please try again.',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                })

            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>