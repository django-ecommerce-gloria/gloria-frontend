<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Orders</h1>
            </div> 
           

            <div class="column is-12"> 
				
				<h2 class="subtitle">Orders</h2>  
					 
					
					<div v-for="order in orders">
						<u>Order id: {{order.id}}</u> 
						<hr>
						
						<div v-for="order_item in order.order_items">
							<img v-bind:src="'http://127.0.0.1:8000/media/uploads/shoes2.jpg'"> 
							<p>{{order_item.product.name}}</p>
							<p>{{order_item.quantity}} x {{order_item.product.price}} = 
							{{order_item.product.price * order_item.quantity}}</p>
							<p v-if="order_item.owner != null">Owner: {{order_item.owner.name}}</p>
							<hr>
						</div>
						
						<hr>
					
					</div>
				
				<hr>				
				
				
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import OrderSummary from '@/components/OrderSummary.vue'

export default {
    name: 'ProfileOrders',
    components: {
        OrderSummary
    },
    data() {
        return {            
			orders: []
        }
    },
    mounted() {
        document.title = 'Orders | Djackets'  
        this.getOrders()
    },
    methods: { 
	
		getUrl(str1, str2) {
			return str1 + str2;
		},  
        
		
		async getOrders() { 
            
			await axios
                .get("/api/v1/orders/")
                .then(response => {  
					this.orders = response.data;				
					console.log('-------------- ORDERS: --------------');
					console.log(this.orders); 
					
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