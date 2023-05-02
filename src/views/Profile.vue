<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">{{ profile.name }}</h2>
            </div>
			
			<p>Profile message form</p>
			
			
			
			
			
			
			<p>End profile message form</p>

           
			 
			
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

import ProductBox from '@/components/ProductBox'

export default {
    name: 'Profile',
    components: {
        ProductBox
    },
    data() {
        return {
            profile: {
                products: [],
                posts: [],
            }
        }
    },
    mounted() {
        this.getProfile()
    },
    watch: {
        $route(to, from) {
            if (to.name === 'Profile') {
                this.getProfile()
            }
        }
    },
    methods: {
        async getProfile() {
            const profileSlug = this.$route.params.profile_slug

            this.$store.commit('setIsLoading', true)

            axios
                .get(`/api/v1/profiles/${profileSlug}/`)
                .then(response => {
                    this.profile = response.data 

                    document.title = this.profile.name + ' | Djackets'
					console.log('debug........');
					console.log(this.profile.posts);
					console.log('From profile:', localStorage.getItem('email'));
					console.log('To profile:', this.profile.name);
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