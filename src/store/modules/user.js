import api from "@/services/api.js";
import Swal from 'sweetalert2'
import router from "../../router";

const state = () => ({
  user: {},
  users: [],
  pagination: {},
});

const getters = {
  user: (state) => state.user || {},
  users: (state) => state.users || [],
  pagination: (state) => state.pagination || {},
};

const mutations = {
  SET_USER(state, value) {
    state.user = { ...value };
  },
  SET_USERS(state, value) {
    state.users = [...value];
  },
  SET_PAGINATION(state, value) {
    state.pagination = { ...value };
  }
};

const actions = {
  async getAllUsers({ commit }, { page, limit }) {
    await api.get(`/users?page=${page}&limit=${limit}`)
      .then((response) => {
        console.log(response);
        commit("SET_USERS", response.data.result);
        commit("SET_PAGINATION", response.data.pagination);
      }
    )
    .catch((error) => {
      console.log(error);
    }
  );
  },

  async getUser({ commit }, id) {
    await api.get(`/users/${id}`)
      .then((response) => {
        console.log(response);
        commit("SET_USER", response.data.result);
      }
    )
    .catch((error) => {
      console.log(error);
    }
  );
  },

  async updateUser({ commit }, { id, data }) {
    await api.put(`/users/${id}`, data)
      .then((response) => {
        commit("SET_USER", response.data.result);
        Swal.fire({
          title: 'Update Success',
          text:   'User has been updated',
          icon: 'success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          heightAuto: false,
          toast: true
        });
        router.push({ name: 'Users' })
      }
    )
    .catch((error) => {
      Swal.fire({
        title: 'Update Failed',
        text:   error.response.data.message,
        icon: 'error',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        heightAuto: false,
        toast: true
      });
    }
  );
  },

  async deleteUser({ commit }, id) {
    await api.delete(`/users/${id}`)
      .then((response) => {
        Swal.fire({
          title: 'Delete Success',
          text:   'User has been deleted',
          icon: 'success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          heightAuto: false,
          toast: true
        });
      }
    )
    .catch((error) => {
      Swal.fire({
        title: 'Delete Failed',
        text:  'User has not been deleted',
        icon: 'error',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        heightAuto: false,
        toast: true
      });
    }
  );
  },

  async createUser({ commit }, data) {
    await api.post(`auth/signup`, data)
      .then((response) => {
        Swal.fire({
          title: 'Create Success',
          text:   'User has been created',
          icon: 'success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          heightAuto: false,
          toast: true
        });
        router.push({ name: 'Users' })
      }
    )
    .catch((error) => {
      Swal.fire({
        title: 'Create Failed',
        text:   error.response.data.message,
        icon: 'error',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        heightAuto: false,
        toast: true
      });
    }
  );
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
