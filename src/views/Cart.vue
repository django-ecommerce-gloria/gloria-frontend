<template>
    <div class="page-cart">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Cart</h1>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth" v-if="cartTotalLength">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <CartItem
                            v-for="item in cart.items"
                            v-bind:key="item.product.id"
                            v-bind:initialItem="item"
                            v-on:removeFromCart="removeFromCart" />
                    </tbody>
                </table>

                <p v-else>You don't have any products in your cart...</p>
            </div>

            <div class="column is-12 box">
                <h2 class="subtitle">Summary</h2>

                <strong>${{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} items

                <hr>

                <router-link to="/cart/checkout" class="button is-dark">Proceed to checkout</router-link>
				
				 				
				<hr>
				 
				
				<div class="control">
                      <a class="button is-dark" @click="buy()">Buy</a>
                </div>
				
				<hr>
				
				<div class="control">
                      <a class="button is-dark" @click="clearCart()">clear cart</a>
                </div>
				
				 
				
				
				
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import CartItem from '@/components/CartItem.vue'

export default {
    name: 'Cart',
    components: {
        CartItem
    },
    data() {
        return {
            cart: {
                items: []
            }
        }
    },
    mounted() {
        this.cart = this.$store.state.cart		
    },
    methods: {
		
		 async buy() {
			 
           console.log('buy......');
		   
		   const data = { 
				
				products: []
			}
			
			console.log('products in the car: ');
			let cartItems = this.cart.items;
			
			for (let i = 0; i < cartItems.length; i++) {
				let item = cartItems[i];
				console.log('item slug is: ', item.product.slug);
				let s = cartItems[i].product.slug;
				let q = cartItems[i].quantity;
				
				data.products.push({product_slug: s, quantity: q}); 
				
			}
			
			console.log('length is: ', cartItems.length);
			
			console.log('data is: ');
			console.log(data);
			
			await axios
                .post("/api/v1/orders/", data)
                .then(response => {
                   console.log('the order added!');
                   console.log('data is: ', data);
				   
				   this.clearCart();
				   this.$router.push('/my-account')
				   
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
		   
		   
		   
           
        },	
        removeFromCart(item) {
            this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
        },
		clearCart() {
			
			this.cart.items.forEach( (item) => {
				
				//console.log('item is: ', item);
				console.log('clear');
				
				this.removeFromCart(item);
				
				
			});
			
			localStorage.setItem('cart', JSON.stringify(this.cart));
			
		}
		 
    },
    computed: {
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
    }
}
</script>