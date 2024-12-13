<template>
    <v-container>
        <!-- Cabeçalho com Nome do Sistema e Logo -->
        <v-row class="text-center mt-6">
            <v-col>
                <v-row justify="center" align="center" class="mb-4">
                    <!-- Logo Temporário -->
                    <v-icon color="primary" size="56">mdi-vuetify</v-icon>
                </v-row>
                <h1 class="text-h4 font-weight-bold">EventCheck</h1>
                <p class="text-body-1 text-secondary">
                    Sistema simples e prático para marcar presença em eventos.
                </p>
            </v-col>
        </v-row>

        <!-- Nome do Evento -->
        <v-row class="text-center mt-4">
            <v-col>
                <template v-if="isLoadingEvent">
                    <v-skeleton-loader class="mx-auto" type="heading" height="60" width="60%" />
                </template>
                <template v-else>
                    <h2 class="text-h5 font-weight-medium">Evento: {{ event.name }}</h2>
                </template>
            </v-col>
        </v-row>

        <!-- Verifica se o evento já passou -->
        <v-row class="text-center mt-4" v-if="eventPassed">
            <v-col>
                <v-alert type="error" elevation="2" class="ma-4" outlined>
                    O evento já ocorreu. Não é possível marcar presença.
                </v-alert>
            </v-col>
        </v-row>

        <!-- Formulário -->
        <v-row class="mt-6" justify="center" v-if="!eventPassed">
            <v-col cols="12" md="6" lg="5">
                <v-card class="pa-6" elevation="2">
                    <template v-if="isLoadingEvent">
                        <v-skeleton-loader class="mx-auto" type="card" height="200" />
                    </template>
                    <template v-else>
                        <v-form>
                            <v-text-field v-model="name" label="Seu Nome Completo" :error-messages="nameError"
                                @blur="nameTouched = true" required outlined dense prepend-icon="mdi-account" />

                            <v-text-field v-model="role" label="Seu Cargo ou Função" :error-messages="roleError"
                                @blur="roleTouched = true" required outlined dense
                                prepend-icon="mdi-briefcase-outline" />

                            <v-text-field v-model="congregation" label="Sua Congregação"
                                :error-messages="congregationError" @blur="congregationTouched = true" required outlined
                                dense prepend-icon="mdi-church" />

                            <v-row class="mt-6">
                                <v-col>
                                    <v-btn color="primary" :loading="isLoading" :disabled="!isFormValid || isLoading"
                                        @click="markAttendance" block elevation="2">
                                        <template v-if="isLoading">
                                            <v-progress-circular indeterminate size="20" color="white" class="mr-2" />
                                        </template>
                                        Marcar Presença
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </template>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { Event } from '@/types/event';

export default defineComponent({
    name: 'MarkAttendanceView',
    setup() {
        const store = useStore();
        const route = useRoute();

        const eventId = Number(route.params.id);
        const event = ref<Event | null>(null);
        const isLoadingEvent = ref(true);
        const eventPassed = ref(false);

        const name = ref('');
        const role = ref('');
        const congregation = ref('');
        const isLoading = ref(false);

        const nameTouched = ref(false);
        const roleTouched = ref(false);
        const congregationTouched = ref(false);

        const nameError = computed(() => (nameTouched.value && !name.value ? 'O nome é obrigatório.' : ''));
        const roleError = computed(() => (roleTouched.value && !role.value ? 'O cargo ou função é obrigatório.' : ''));
        const congregationError = computed(() => (congregationTouched.value && !congregation.value ? 'A congregação é obrigatória.' : ''));

        const isFormValid = computed(() => name.value && role.value && congregation.value);

        const markAttendance = async () => {
            if (!isFormValid.value) return;

            isLoading.value = true;
            try {
                await store.dispatch('attendance/markAttendance', {
                    event_id: eventId,
                    name: name.value,
                    role: role.value,
                    congregation: congregation.value,
                });

                name.value = '';
                role.value = '';
                congregation.value = '';
                nameTouched.value = false;
                roleTouched.value = false;
                congregationTouched.value = false;
            } catch (error) {
                console.error('Erro ao marcar presença:', error);
            } finally {
                isLoading.value = false;
            }
        };

        const loadEvent = async () => {
            try {
                event.value = await store.dispatch('events/fetchEventById', eventId);
                checkEventDate();
            } catch (error) {
                console.error('Erro ao carregar o evento:', error);
            } finally {
                isLoadingEvent.value = false;
            }
        };

        const checkEventDate = () => {
            if (!event.value) return;

            const eventDateParts = event.value.date.split('/');
            const formattedDate = `${eventDateParts[2]}-${eventDateParts[1]}-${eventDateParts[0]}`;

            const eventDateTime = new Date(`${formattedDate}T${event.value.time}:00`);

            const currentDate = new Date();

            eventPassed.value = currentDate > eventDateTime;
        };


        onMounted(() => {
            loadEvent();
        });

        return {
            event,
            isLoadingEvent,
            eventPassed,
            name,
            role,
            congregation,
            isLoading,
            nameTouched,
            roleTouched,
            congregationTouched,
            nameError,
            roleError,
            congregationError,
            isFormValid,
            markAttendance,
        };
    },
});

</script>

<style scoped>
.text-secondary {
    color: #6b6b6b;
}
</style>
