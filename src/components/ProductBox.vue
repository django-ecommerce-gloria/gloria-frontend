<template>
    <div class="column is-3">
        <div class="box">
             
                <img v-bind:src="product.get_thumbnail">
            

            <h3 class="is-size-4">{{ product.name }}</h3>
            <h4 class="is-size-4"><router-link v-bind:to="product.get_category_url">{{ product.category }}</router-link></h4>
            <p class="is-size-6 has-text-grey">${{ product.price }}</p>			
			<h4 class="is-size-4"><router-link v-bind:to="product.get_profile_url">{{ product.profile }}</router-link></h4>
						
            <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">View details</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductBox',
    props: {
        product: Object
    }
}

console.log('Test from product box');


</script>

<style scoped>
  .image {
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
  }
</style>