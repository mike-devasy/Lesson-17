<template>
	<div class="container">

		<notebooks-list :selected-sellers="selectedSellers" :selected-brands="selectedBrands"/>
		<div class="filters-container">
			<div class="container-seller">
				<h3>Продавці:</h3>
			<div v-for="note in getItemsList" :key="note.id">
			<Label>
				<input v-model="selectedSellers" type="checkbox" :value="note.seller" > {{note.seller}}</Label>
									</div>
			</div>
			<div class="container-brand">
				<h3>Бренди:</h3>
				
			<div     v-for="note in getItemsList" :key="note.id">
				<Label>
					<input  v-model="selectedBrands"  type="checkbox" :value="note.brand">{{note.brand}}
				</Label>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
import NotebooksList from   './NotebooksList.vue';
import { mapGetters, mapActions } from 'vuex';
	export default {
		name:'NotebooksFilter',
		components:{
			NotebooksList
		},
		data(){
			return{
				selectedSellers:[
				],
				selectedBrands:[
				],
			}
		},
		computed: {
		...mapGetters('notebooks', ['getItemsList'])
		},
		created(){
			this.loadList();
		},
 
		methods: {
...mapActions('notebooks', ['loadList', 'loadFilteredData']),
 
		},
	}
</script>

<style lang="scss" scoped>
.container{
	gap: 25px;
display: flex;
flex-direction: row-reverse;
padding: 15px;
}
.filters-container{
	font-size: 20px;
	width: 150px;
	padding: 20px;
	align-self: flex-start;
border: 3px solid green;
border-radius:10px;

display: flex;
flex-direction: column;
gap: 150px;
}
 
</style>