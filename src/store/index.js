import { createLogger, createStore } from "vuex";
import VuexPersistence from "vuex-persist";

import config from "./modules/config";
import user from "./modules/user";
import auth from "./modules/auth";
import role from "./modules/role";

const debug = process.env.NODE_ENV !== "production";

const vuexLocal = new VuexPersistence({
  modules: ["auth"],
  key: process.env.VITE_APP_SHORT_NAME,
});

const modules = {
  auth,
  config,
  user,
  role,
};

export default createStore({
//   state: main.state,
//   mutations: main.mutations,
  // actions: main.actions,
//   getters: main.getters,
  modules,
  strict: debug,
  plugins: debug ? [createLogger(), vuexLocal.plugin] : [],
});
