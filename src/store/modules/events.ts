import { Module } from 'vuex';
import { Event, CreateEvent } from '@/types/event';
import { RootState } from '@/types/rootState';
import { apiService } from '@/services/apiService'

export interface EventsState {
    events: Event[],
    event: Event | null,
}

const events: Module<EventsState, RootState> = {
    namespaced: true,
    state: {
        events: [],
        event: null,
    },
    mutations: {
        setEvents: (state, events: Event[]) => {
            state.events = events
        },
        setEvent: (state, event: Event) => {
            state.event = event
        },
    },
    actions: {
        async fetchEvents({ commit }) {
            try {
                const events = await apiService.fetchEvents();
                commit('setEvents', events);
                this.dispatch('notifications/notify', { message: 'Eventos buscados com sucesso', type: 'success' });
            } catch (error) {
                console.error('Error fetching events:', error);
                this.dispatch('notifications/notify', { message: 'Erro ao buscar eventos', type: 'error' });
            }
        },
        async fetchEventById({ commit }, id: number) {
            try {
                const event = await apiService.fetchEventById(id);
                commit('setEvent', event);
                this.dispatch('notifications/notify', { message: 'Evento buscado com sucesso', type: 'success' });
                return event;
            } catch (error) {
                this.dispatch('notifications/notify', { message: 'Erro ao busca evento', type: 'error' });
            }
        },
        async createEvent({ commit }, event: CreateEvent) {
            try {
                const newEvent = await apiService.createEvent(event);
                commit('setEvent', newEvent);
                this.dispatch('notifications/notify', { message: 'Evento criado com sucesso', type: 'success' });
            } catch (error) {
                this.dispatch('notifications/notify', { message: 'Erro ao criar evento', type: 'error' });
            }
        },
    },
    getters: {
        getEvents: state => state.events,
        getEvent: state => state.event,
    },
};

export default events;
