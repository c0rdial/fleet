import api from '@/services/api.js'
import Swal from 'sweetalert2'
import router from '../../router'

const state = {
  auth: {},
  token: ''
}

const getters = {
  getAuth(state) {
    return state.auth || {}
  },
}

const mutations = {
  SET_AUTH(state, value) {
    state.auth = { ...value }
  },
}

const actions = {
  async login({ commit }, { data: { email, password } }) {
    await api
      .post('auth/login', { email, password })
      .then((response) => {
        commit('SET_AUTH', response.data)
        Swal.fire({
            title: 'Login Success',
            text:   'Welcome to Dashboard',
            icon: 'success',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            heightAuto: false,
            toast: true
        });
        localStorage.setItem('token', response.data.accessToken)
        router.push({ name: 'Dashboard' })
    })
    .catch((error) => {
        Swal.fire({
            title: 'Login Failed',
            text:   error.response.data.message,
            icon: 'error',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            heightAuto: false,
            toast: true
        });
      })
  },

  async register({ commit }, { data: { name, email, password } }) {
    await api
      .post('auth/signup', { name, email, password })
      .then((response) => {
        commit('SET_AUTH', response.data)
        Swal.fire({
            title: 'Register Success',
            text:   'Please Login',
            icon: 'success',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            heightAuto: false,
            toast: true
        });
        router.push({ name: 'Login' })
    })
    .catch((error) => {
        Swal.fire({
            title: 'Register Failed',
            text:   error.response.data.message || 'Something went wrong',
            icon: 'error',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            heightAuto: false,
            toast: true
        });
      })
  },

  async logout({ commit }) {
    commit('SET_AUTH', {})
    localStorage.removeItem('token')
    localStorage.removeItem('vuex')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
