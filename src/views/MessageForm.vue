<template>
    <div class="page-log-in">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Add message</h1>

                <form @submit.prevent="submitForm">
                    
					<div class="field">
                        <label>messageTitle</label>
                        <div class="control">
                            <input type="text" class="input" v-model="messageTitle">
                        </div>
                    </div>
					
					<div class="field">
                        <label>messageText</label>
                        <div class="control">
                            <input type="text" class="input" v-model="messageText">
                        </div>
                    </div>  
					 
					

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Add message</button>
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
    name: 'AddMessage',
    data() {
        return {            
			messageTitle: '',
			messageText: '',
			recipientSlug: ''			 
        }
    },
    mounted() {
        document.title = 'Add message | Djackets'
		console.log('start.......');
		 
		this.recipientSlug = this.$route.params.recip_slug;
		console.log(this.recipientSlug);
		 
    },
    methods: { 
		
        async submitForm() {            
             
			const data = {
				title: this.messageTitle,
				text_msg: this.messageText,
				recipSlug: this.recipientSlug
			}

            await axios
                .post("/api/v1/messages/", data)
                .then(response => {
                   console.log('the message added!');
                   console.log('data is: ', data);
				  
				   
					this.messageTitle = '';
					this.messageText = '';
					this.recipientSlug = '';	
				   
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