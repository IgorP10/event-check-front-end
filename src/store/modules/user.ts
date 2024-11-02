import { Module } from 'vuex';
import { RootState } from '@/types/rootState';
import { apiService } from '@/services/apiService';

export interface UserState {
  token: string | null;
}

const user: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || null,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  actions: {
    async login({ commit, dispatch }, credentials: { email: string; password: string }) {
      try {
        const token = await apiService.login(credentials);
        commit('setToken', token);
        dispatch('notifications/notify', { message: 'Login bem-sucedido', type: 'success' }, { root: true });
      } catch (error) {
        dispatch('notifications/notify', { message: 'Erro ao fazer login', type: 'error' }, { root: true });
        console.error('Login error:', error);
      }
    },
    async register({ commit, dispatch }, user: { name: string; email: string; password: string; password_confirmation: string }) {
      try {
        const token = await apiService.register(user);
        commit('setToken', token);
        dispatch('notifications/notify', { message: 'Registro bem-sucedido', type: 'success' }, { root: true });
      } catch (error) {
        const customError = error as { message: string; errors: { [key: string]: string[] } };

        if (customError.errors) {
          throw customError.errors;
        } else {
          dispatch('notifications/notify', { message: 'Erro ao fazer registro', type: 'error' }, { root: true });
        }
      }
    },
    logout({ commit, dispatch }) {
      commit('clearToken');
      dispatch('notifications/notify', { message: 'Logout realizado com sucesso', type: 'success' }, { root: true });
    },
  },
};

export default user;
