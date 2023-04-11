import api from "@/services/api.js";
import Swal from 'sweetalert2'
import router from "../../router";

const state = () => ({
  role: {},
  roles: [],
  pagination: {},
});

const getters = {
  role: (state) => state.role || {},
  roles: (state) => state.roles || [],
  pagination: (state) => state.pagination || {},
};

const mutations = {
  SET_ROLE(state, value) {
    state.role = { ...value };
  },
  SET_ROLES(state, value) {
    state.roles = [...value];
  },
  SET_PAGINATION(state, value) {
    state.pagination = { ...value };
  }
};

const actions = {
  async getAllRoles({ commit }, { page, limit }) {
    await api.get(`/roles?page=${page}&limit=${limit}`)
      .then((response) => {
        commit("SET_ROLES", response.data.result);
        commit("SET_PAGINATION", response.data.pagination);
      }
    )
    .catch((error) => {
      console.log(error);
    }
  );
  },

  async getRole({ commit }, id) {
    await api.get(`/roles/${id}`)
      .then((response) => {
        commit("SET_ROLE", response.data.result);
      }
    )
    .catch((error) => {
      console.log(error);
    }
  );
  },

  async updateRole({ commit }, { id, data }) {
    await api.put(`/roles/${id}`, data)
      .then((response) => {
        commit("SET_ROLE", response.data.result);
        Swal.fire({
          title: 'Update Success',
          text:   'Role has been updated',
          icon: 'success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          heightAuto: false,
          toast: true
        });
        router.push({ name: 'Roles' })
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

  async deleteRole({ commit }, id) {
    await api.delete(`/roles/${id}`)
      .then((response) => {
        Swal.fire({
          title: 'Delete Success',
          text:   'Role has been deleted',
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
        text:  'Role has not been deleted',
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

  async createRole({ commit }, data) {
    await api.post(`roles`, data)
      .then((response) => {
        Swal.fire({
          title: 'Create Success',
          text:   'Role has been created',
          icon: 'success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          heightAuto: false,
          toast: true
        });
        router.push({ name: 'Roles' })
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
