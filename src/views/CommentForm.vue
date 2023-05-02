<template>
    <div class="page-log-in">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Add comment</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>commentText</label>
                        <div class="control">
                            <input type="text" class="input" v-model="commentText">
                        </div>
                    </div>

                    

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Add comment</button>
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
    name: 'AddComment',
    data() {
        return {
            commentText: ''            
        }
    },
    mounted() {
        document.title = 'Add comment | Djackets'
    },
    methods: {
        async submitForm() {
            
            const formData = {
                text: this.commentText                 
            }

            await axios
                .post("/api/v1/comments/", formData)
                .then(response => {
                   console.log('the comment added!');
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