<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">Profiles</h2>
            </div>

            
				
			<ul> 
			
				<li v-for="profile in profilelist">
					
				  <h3><strong>Profile:</strong></h3>
				  
				  {{ profile.name }} {{ profile.lastname }}
				  
					<h3><strong>Products:</strong></h3>		  
				  
					<li v-for="product in profile.products">
						- {{ product.name }} {{ product.price }}
					</li>		  
				  
				</li>				
				
			</ul>
			
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
					
					console.log('yes!');
					console.log(this.profilelist);
					//console.log(this.categorylist.categories);
					//console.log(response.data);
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