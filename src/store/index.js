import { createStore } from "vuex";
import auth from "./modules/auth";
import users from "./modules/users";
import notebooks from "./modules/notebooks";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
		auth,
		users,
		notebooks,
	},
});
