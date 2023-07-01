import api from "@/services/api.js";
import Swal from 'sweetalert2'
import router from "../../router";

const state = () => ({
  vehicle: {},
  vehicles: [],
  pagination: {},
});

const getters = {
  vehicle: (state) => state.vehicle || {},
  vehicles: (state) => state.vehicles || [],
  pagination: (state) => state.pagination || {},
};

const mutations = {
  SET_VEHICLE(state, value) {
    state.vehicle = { ...value };
  },
  SET_VEHICLES(state, value) {
    state.vehicles = [...value];
  },
  SET_PAGINATION(state, value) {
    state.pagination = { ...value };
  }
};

const actions = {
  async getAllVehicles({ commit }, { page, limit }) {
    await api.get(`/vehicles?page=${page}&limit=${limit}`)
      .then((response) => {
        commit("SET_VEHICLES", response.data.result);
        commit("SET_PAGINATION", response.data.pagination);
      }
    )
    .catch((error) => {
      console.log(error);
    }
  );
  },

  async getVehicle({ commit }, id) {
    await api.get(`/vehicles/${id}`)
      .then((response) => {
        commit("SET_VEHICLE", response.data.result);
      }
    )
    .catch((error) => {
      console.log(error);
    }
  );
  },

  async updateVehicle({ commit }, { id, data }) {
    await api.put(`/vehicles/${id}`, data)
      .then((response) => {
        commit("SET_VEHICLE", response.data.result);
        Swal.fire({
          title: 'Update Success',
          text:   'Vehicle has been updated',
          icon: 'success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          heightAuto: false,
          toast: true
        });
        router.push('/vehicles')
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

  async deleteVehicle({ commit }, id) {
    await api.delete(`/vehicles/${id}`)
      .then((response) => {
        Swal.fire({
          title: 'Delete Success',
          text:   'Vehicle has been deleted',
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
        text:  'Vehicle has not been deleted',
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

  async createVehicle({ commit }, data) {
    await api.post(`vehicles`, data)
      .then((response) => {
        Swal.fire({
          title: 'Create Success',
          text:   'Vehicle has been created',
          icon: 'success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          heightAuto: false,
          toast: true
        });
        router.push('/vehicles')
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
