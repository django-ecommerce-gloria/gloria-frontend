<template>
    <div class="page-log-in">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Add comment</h1>

                <form @submit.prevent="submitForm">
                    
					<div class="field">
                        <label>postName</label>
                        <div class="control">
                            <input type="text" class="input" v-model="postName">
                        </div>
                    </div>
					
					<div class="field">
                        <label>postDesc</label>
                        <div class="control">
                            <input type="text" class="input" v-model="postDesc">
                        </div>
                    </div>
					
					<div class="field">
                        <label>postComment1</label>
                        <div class="control">
                            <input type="text" class="input" v-model="postComment1">
                        </div>
                    </div>
					
					<div class="field">
                        <label>postComment2</label>
                        <div class="control">
                            <input type="text" class="input" v-model="postComment2">
                        </div>
                    </div>

                    

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Add post</button>
                        </div>
                    </div>

                    <hr>

                    
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'AddPost',
    data() {
        return {            
			postName: '', 
			postDesc: '',
			postComment1: '',
			postComment2: ''			
        }
    },
    mounted() {
        document.title = 'Add post | Djackets'
    },
    methods: {
        async submitForm() {
            
             
			const data = {
				name: this.postName,
				description: this.postDesc,
				comments: [
					{text: this.postComment1},
					{text: this.postComment2},
				]
			}

            await axios
                .post("/api/v1/posts/", data)
                .then(response => {
                   console.log('the post added!');
                   console.log('data is: ', data);
				   this.postName = '';
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