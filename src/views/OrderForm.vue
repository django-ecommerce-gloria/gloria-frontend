<template>
    <div class="page-log-in">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Add order</h1>

                <form @submit.prevent="submitForm">  
					 
					 
					<div class="field">
                        <label>productSlug</label>
                        <div class="control">
                            <input type="text" class="input" v-model="productSlug">
                        </div>
                    </div> 
					
					<div class="field">
                        <label>orderName</label>
                        <div class="control">
                            <input type="text" class="input" v-model="orderName">
                        </div>
                    </div> 
					
					<div class="field">
                        <label>orderQuantity</label>
                        <div class="control">
                            <input type="text" class="input" v-model="orderQuantity">
                        </div>
                    </div> 					 
					

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Add order</button>
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
    name: 'AddOrder',
    data() {
        return {            
			productSlug: '',
			orderName: '',
			orderQuantity: ''			 
        }
    },
    mounted() {
        document.title = 'Add order | Djackets'		 
    },
    methods: { 
		
		
        async submitForm() {   
		
			const data = {
				product_slug: this.productSlug,
				name: this.orderName,
				quantity: this.orderQuantity
			} 
			 

            await axios
                .post("/api/v1/orders/", data)
                .then(response => {
                   console.log('the order added!');
                   console.log('data is: ', data);
				   
				   
					this.productSlug = '';
					this.orderName = '';
					this.orderQuantity = '';	
				   
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