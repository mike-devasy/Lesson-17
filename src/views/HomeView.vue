<template>
		<div class="content">
			<h2>{{ $t(`messages.welcome`) }}</h2>
				<div class="home">
			<notebooks-filter/>
			<!-- <notebooks-list :selected-sellers="selectedSellers"/> -->
				</div>
		</div>
</template>

<script>
import NotebooksFilter from '../components/NotebooksFilter.vue';
// import NotebooksList from '../components/NotebooksList.vue';
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {
    // NotebooksList,
    NotebooksFilter
  },
	// data() {
  //   return {
  //     selectedSellers: [],
  //   };
  // },
};
</script>
<style lang="scss">
.home{
display: flex;
gap: 50px;

}
.content{
	text-align: left;
	padding-left: 40px;
}
</style>