<template>
    <div class="container">
        <nav>
            <!-- <router-link to="/">Home</router-link> |
						 <router-link to="/about">About</router-link> |
            <router-link to="/contacts">Contacts</router-link> | -->
						<router-link v-for="menuItem in menuItemsList" :key="menuItem.to" :to="menuItem.to">
                {{ $t(`menu.${menuItem.titleLabel}`) }} |
            </router-link>
            <router-link v-if="!getUser" to="/login" >Login</router-link>

            <router-link v-else :class="{ 'router-link-inactive': getUser }"  to="/login" > Login </router-link>
            <!-- <router-link to="/login">Login</router-link> -->
        </nav>
         
					<div style="display:flex; justify-content:space-between; width: 450px;">
						<button v-if="currentLanguage.title === 'EN'"  class="button-lang"  @click="changeLocale('ua')" >
							<img :src="currentLanguage.img" alt="flag" class="lang-image">
							{{ currentLanguage.title }}
						</button>
						<button v-else class="button-lang"  @click="changeLocale('en')" >
							<img :src="currentLanguage.img" alt="flag" class="lang-image">
							{{ currentLanguage.title }}
						</button>
            <div v-if="getUser" class="user">
                <span class="user-name">{{ getUser.displayName }}</span>
                <span class="user-image"><img :src="getUser.photoURL" /></span>
                <button @click="onLogout">
                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" style="color: #0d27c9" size="2x" />
                </button>
            </div>
            <button v-else @click="loginWithGoogle">
                <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']" style="color: red" size="2x" />
            </button>
					</div>
    </div>
    <router-view />
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	data() {
        return {
            menuItemsList: [
                {
                    to: '/',
                    titleLabel: 'home',
                },
                {
                    to: '/about',
                    titleLabel: 'about',
                },
                {
                    to: '/contacts',
                    titleLabel: 'contacts',
                },
            ],
        }
    },
 
    computed: {
			...mapGetters('auth', ['getUser']),

        currentLanguage() {
            return this.$i18n.locale === 'ua' ? {title:'УКР', img: require('@/assets/ua.svg') } : {title:'EN', img: require('@/assets/gb.svg')}
        },
    },
		created() {
        this.$i18n.locale = localStorage.getItem('lastLocale') ?? process.env.VUE_APP_I18N_LOCALE

        const self = this
        window.addEventListener('storage', function () {
            if (self.$i18n.locale !== localStorage.getItem('lastLocale')) {
                self.$i18n.locale = localStorage.getItem('lastLocale')
                self.$router.go()
            }
        })
    },
    methods: {
        ...mapActions('auth', ['loginWithGoogle', 'logout']),
        onLogout() {
            this.logout()
            this.$router.push({
                name: 'login',
            })
        },
				changeLocale(lang) {
            this.$i18n.locale = lang
            localStorage.setItem('lastLocale', lang)
        },
    },
}
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
.container {
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.user {
    display: flex;
    align-items: center;
    gap: 20px;
    padding-right: 20px;
}
.user-image img {
    max-width: 60%;

    border-radius: 50%;
}
.user-name {
    font-size: 22px;
    font-style: italic;
}
.router-link-inactive{
	pointer-events: none;
  color: grey; 
}
button {
    display: inline-block;
}
.lang-image{
	display: inline-block;
}
.button-lang{
cursor:pointer
}
</style>
