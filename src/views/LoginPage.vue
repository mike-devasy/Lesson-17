<template>
	<div>
		<h1>Увійдіть для користування сервісами</h1>
		<button  v-if="!getUser" @click="onLogin" class="button-login">Увійти</button>

	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
	export default {
		name:'LoginPage',
		computed: {
        ...mapGetters('auth', ['getUser']),
    },
		methods: {
        ...mapActions('auth', ['loginWithGoogle']),
        async onLogin() {
            try {
                await this.loginWithGoogle()
                this.$router.push({
                    name: 'home',
                })
            } catch (error) {
                alert(error.message)
            }
        },
    },
	}
</script>

<style lang="scss" scoped>
.button-login{
	cursor:pointer;
	font-size: 20px;
	width: 200px;
	height: 40px;
	border-radius: 10px;
	border:none;
	background-color: rgba(0, 115, 255, 0.516);
	transition: all 0.3s ease 0s;
	&:hover{
	background-color: rgba(0, 0, 255, 0.267);

	}
}
</style>