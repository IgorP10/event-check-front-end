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
            } catch (error) {
                console.error('Error marking attendance:', error);
            }
        },
    },
    getters: {
        getAttendances: state => state.attendances,
    },
}

export default Attendances