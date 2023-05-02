<template>
    <div class="page-log-in">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Add product</h1>

                <form @submit.prevent="submitForm">
				
				<div class="field">
                        <label>productImage</label>
                        <div class="control">
                            <input type="file" @change="onFileChange" />							
                        </div>
                    </div>
                    
					<div class="field">
                        <label>productName</label>
                        <div class="control">
                            <input type="text" class="input" v-model="productName">
                        </div>
                    </div>
					
					<div class="field">
                        <label>productSlug</label>
                        <div class="control">
                            <input type="text" class="input" v-model="productSlug">
                        </div>
                    </div> 
					
					<div class="field">
                        <label>productDesc</label>
                        <div class="control">
                            <input type="text" class="input" v-model="productDesc">
                        </div>
                    </div> 
					
					<div class="field">
                        <label>productPrice</label>
                        <div class="control">
                            <input type="text" class="input" v-model="productPrice">
                        </div>
                    </div> 
					
					<div class="field">
                        <label>categories</label>
                        <div class="control">
                            <select v-model="selectedCat">
								<option v-for="cat in categories" v-bind:value="cat">{{cat.name}}</option>
							</select>
                        </div>
                    </div> 
					

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Add product</button>
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
    name: 'AddProduct',
    data() {
        return {            
			productName: '',
			productSlug: '',
			productDesc: '',
			productPrice: '',
			categories: [],
			selectedCat: null,
			selectedFile: null
        }
    },
    mounted() {
        document.title = 'Add product | Djackets'
		this.getCategories()
    },
    methods: {
		
		async getCategories() {
			
			await axios
                .get("/api/v1/categories/")
                .then(response => { 
				
					this.categories = response.data;
					console.log('Categories is: ');
					//console.log(this.categories);
					
					for (let i = 0; i < this.categories.length; i++) {
						console.log(this.categories[i].name);
					}
				   
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
		
		onFileChange(e) {

			 this.selectedFile = e.target.files[0];
			 console.log('file loaded...');
			 console.log(this.selectedFile);
			 
		},
		
		
		
        async submitForm() {    

			const data = new FormData();
			
			data.append("image", this.selectedFile, this.selectedFile.name);
			data.append("name", this.productName);
			data.append("slug", this.productSlug);
			data.append("description", this.productDesc);
			data.append("price", this.productPrice);
			data.append("cat", this.selectedCat);
             
			/*const data = {
				name: this.productName,
				slug: this.productSlug,
				description: this.productDesc,				 
				price: this.productPrice,				 
				cat: this.selectedCat,
				image: this.selectedFile
			}*/

            await axios
                .post("/api/v1/products/", data)
                .then(response => {
                   console.log('the product added!');
                   console.log('data is: ', data);
				   console.log(this.selectedCat);
				   
				   this.productName = '';
				   this.productSlug = '';
				   this.productDesc = '';
				   this.productPrice = '';
				   
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