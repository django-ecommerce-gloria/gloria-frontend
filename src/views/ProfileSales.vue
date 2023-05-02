<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Sales</h1>
            </div> 
           

            <div class="column is-12"> 
				
				<h2 class="subtitle">Sales</h2>  
					 
					
					<div v-for="item in orderItems">
					
						<p>{{item.created_at}}</p>						
						<p>{{item.product.name}}</p>
						<p>{{item.quantity}} x {{item.product.price}} = 
						{{item.product.price * item.quantity}}</p>						
						<p>Buyer: {{item.order.buyer.name}}</p>						
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
    name: 'ProfileSales',
    components: {
        OrderSummary
    },
    data() {
        return {            
			orderItems: []
        }
    },
    mounted() {
        document.title = 'Sales | Djackets'  
        this.getSales()
    },
    methods: { 
	
		getUrl(str1, str2) {
			return str1 + str2;
		},  
        
		
		async getSales() { 
            
			await axios
                .get("/api/v1/order-items/")
                .then(response => {  
					this.orderItems = response.data;				
					console.log('-------------- ORDER ITEMS: --------------');
					console.log(this.orderItems); 
					
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