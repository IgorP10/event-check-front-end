<template>
    <v-container>
        <HeaderComponent title="Criar Evento" />

        <v-row class="mt-4" justify="center">
            <v-col cols="12" md="6" lg="4">
                <v-card class="pa-6" color="surface" elevation="3">
                    <v-form>
                        <v-text-field clearable v-model="eventName" label="Nome do Evento"
                            :error-messages="eventNameError" @blur="eventNameTouched = true" required outlined dense
                            prepend-icon="mdi-calendar" />

                        <v-textarea clearable v-model="description" label="Descrição" :error-messages="descriptionError"
                            @blur="descriptionTouched = true" rows="3" required outlined dense
                            prepend-icon="mdi-text-box-outline" />

                        <v-text-field v-model="date" label="Data" type="date" prepend-icon="mdi-calendar"
                            :error-messages="dateError" @blur="dateTouched = true" required outlined dense />

                        <v-text-field v-model="time" label="Hora" type="time" prepend-icon="mdi-clock"
                            :error-messages="timeError" @blur="timeTouched = true" required outlined dense />

                        <v-text-field clearable v-model="location" label="Local" :error-messages="locationError"
                            @blur="locationTouched = true" required outlined dense prepend-icon="mdi-map-marker" />

                        <v-row class="mt-5">
                            <v-col>
                                <v-btn color="primary" :loading="isLoading" :disabled="!isFormValid || isLoading"
                                    @click="createEvent" block elevation="2">
                                    <template v-if="isLoading">
                                        <v-progress-circular indeterminate size="20" color="white" class="mr-2" />
                                    </template>
                                    Marcar Presença
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn color="secondary" @click="goToEvents" block elevation="2">
                                    Voltar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import HeaderComponent from '@/components/Header.vue';

export default defineComponent({
    name: 'CreateEventView',
    components: {
        HeaderComponent,
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const eventName = ref('');
        const description = ref('');
        const date = ref('');
        const time = ref('');
        const location = ref('');
        const isLoading = ref(false);

        const eventNameTouched = ref(false);
        const descriptionTouched = ref(false);
        const dateTouched = ref(false);
        const timeTouched = ref(false);
        const locationTouched = ref(false);

        const menuDate = ref(false);

        const eventNameError = computed(() => (eventNameTouched.value && !eventName.value ? 'Nome do evento é obrigatório' : ''));
        const descriptionError = computed(() => (descriptionTouched.value && !description.value ? 'Descrição é obrigatória' : ''));
        const dateError = computed(() => (dateTouched.value && !date.value ? 'Data é obrigatória' : ''));
        const timeError = computed(() => (timeTouched.value && !time.value ? 'Hora é obrigatória' : ''));
        const locationError = computed(() => (locationTouched.value && !location.value ? 'Local é obrigatório' : ''));

        const isFormValid = computed(() => {
            return eventName.value && description.value && date.value && time.value && location.value;
        });

        const createEvent = async () => {
            if (!isFormValid.value) return;

            isLoading.value = true;
            try {
                await store.dispatch('events/createEvent', {
                    name: eventName.value,
                    description: description.value,
                    date: date.value,
                    time: time.value,
                    location: location.value,
                });
                router.push({ name: 'Events' });
            } catch (error) {
                console.error(error);
            } finally {
                isLoading.value = false;
            }
        };

        const goToEvents = () => {
            router.push({ name: 'Events' });
        };

        return {
            eventName,
            description,
            date,
            time,
            location,
            isLoading,
            eventNameTouched,
            descriptionTouched,
            dateTouched,
            timeTouched,
            locationTouched,
            menuDate,
            eventNameError,
            descriptionError,
            dateError,
            timeError,
            locationError,
            isFormValid,
            createEvent,
            goToEvents,
        };
    },
});
</script>
