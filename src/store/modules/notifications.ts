import { Module } from 'vuex';
import { Notification } from '@/types/notification';
import { RootState } from '@/types/rootState';

const notifications: Module<Notification, RootState> = {
    namespaced: true,
    state: {
        snackbar: {
            visible: false,
            message: '',
            type: 'success'
        }
    },
    mutations: {
        setNotification(state, { message, type }: { message: string; type: string }) {
            state.snackbar = {
                visible: true,
                message,
                type
            };
        },
        clearNotification(state) {
            state.snackbar.visible = false;
            state.snackbar.message = '';
        }
    },
    actions: {
        notify({ commit }, { message, type }: { message: string; type: string }) {
            commit('setNotification', { message, type });
        },
        clearNotification({ commit }) {
            commit('clearNotification');
        }
    },
    getters: {
        getSnackbar: state => state.snackbar
    },
};

export default notifications;
