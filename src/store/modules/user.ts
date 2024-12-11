import { Module } from 'vuex';
import { RootState } from '@/types/rootState';
import { apiService } from '@/services/apiService';

export interface UserState {
  token: {
    accessToken: {
      name: string;
      abilities: string[];
      expires_at: string;
      tokenable_id: number;
      tokenable_type: string;
      updated_at: string;
      created_at: string;
      id: number;
    };
    plainTextToken: string;
  } | null;
}

const user: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    token: (() => {
      const storedToken = localStorage.getItem('token');
      try {
        return storedToken ? JSON.parse(storedToken) : null;
      } catch (e) {
        console.error('Erro ao parsear o token:', e);
        return null;
      }
    })()
  },
  getters: {
    isAuthenticated: (state) => {
      if (!state.token?.accessToken?.expires_at) {
        return false;
      }

      const expirationDate = new Date(state.token.accessToken.expires_at);
      return new Date() < expirationDate;
    },
    getToken: (state) => state.token,
  },
  mutations: {
    setToken(state, token: UserState['token']) {
      state.token = token;
      localStorage.setItem('token', JSON.stringify(token));
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

        if (!token) {
          throw new Error('Token não recebido');
        }

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
