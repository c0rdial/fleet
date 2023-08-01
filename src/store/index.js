import { createLogger, createStore } from "vuex";
import VuexPersistence from "vuex-persist";

import config from "./modules/config";
import user from "./modules/user";
import auth from "./modules/auth";
import role from "./modules/role";
import vehicle from "./modules/vehicle";

const debug = process.env.NODE_ENV !== "production";

const vuexLocal = new VuexPersistence({
  modules: ["auth"],
  key: 'vuex',
});

const modules = {
  auth,
  config,
  user,
  role,
  vehicle,
};

export default createStore({
  modules,
  strict: debug,
  plugins: debug ? [createLogger(), vuexLocal.plugin] : [],
});
