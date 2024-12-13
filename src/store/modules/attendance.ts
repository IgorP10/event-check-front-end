import { Module } from 'vuex';
import { Attendance, MarkAttendance } from '@/types/attendance';
import { RootState } from '@/types/rootState';
import { apiService } from '@/services/apiService';

export interface AttendancesState {
    attendances: Attendance[],
}

const Attendances: Module<AttendancesState, RootState> = {
    namespaced: true,
    state: {
        attendances: [],
    },
    mutations: {
        setAttendances: (state, attendances: Attendance[]) => {
            state.attendances = attendances
        },
    },
    actions: {
        async fetchAttendances({ commit }, eventId: number) {
            try {
                const attendances = await apiService.fetchAttendances(eventId);
                commit('setAttendances', attendances);
            } catch (error) {
                console.error('Error fetching attendances:', error);
            }
        },
        async markAttendance(_, attendance: MarkAttendance) {
            try {
                await apiService.markAttendance(attendance);
                this.dispatch('notifications/notify', { message: 'Presença marcada com sucesso', type: 'success' });
            } catch (error) {
                this.dispatch('notifications/notify', { message: 'Erro ao marcar presença', type: 'error' });
                throw new Error('Error marking attendance');
            }
        },
    },
    getters: {
        getAttendances: state => state.attendances,
    },
}

export default Attendances