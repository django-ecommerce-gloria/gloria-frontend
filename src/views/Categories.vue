<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">Categories</h2>
            </div>

            
				
			<ul>
				<li v-for="category in categorylist">
				  {{ category.name }}
				</li>
			</ul>
			
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'



export default {
    name: 'Categories',   
    data() {
        return {
            categorylist: {}
        }
    },
    mounted() {
        this.getCategories()
    },
   
    methods: {
        async getCategories() {
            

            this.$store.commit('setIsLoading', true)

            axios
                .get(`/api/v1/categories/`)
                .then(response => {
                    this.categorylist = response.data

                    document.title = 'Categories'
					
					console.log('yes!');
					console.log(this.categorylist);
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