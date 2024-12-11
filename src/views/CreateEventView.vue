<template>
    <v-container class="d-flex align-center justify-center fill-height pa-6">
        <v-card class="pa-5" color="surface" width="100%" max-width="600">
            <v-row class="mb-4">
                <HeaderComponent title="Criar Evento" />
            </v-row>
            <v-form @submit.prevent="createEvent">
                <v-text-field v-model="eventName" label="Nome do Evento" required outlined dense />
                <v-textarea v-model="description" label="Descrição" rows="4" required outlined dense />
                <v-row>
                    <v-col cols="6">
                        <v-text-field v-model="date" label="Data" type="date" required outlined dense />
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="time" label="Hora" type="time" required outlined dense />
                    </v-col>
                </v-row>
                <v-text-field v-model="location" label="Local" required outlined dense />

                <v-row class="mt-4">
                    <v-col>
                        <v-btn color="primary" :loading="isLoading" :disabled="isLoading" type="submit" block>
                            <template v-if="isLoading">
                                <v-progress-circular indeterminate size="20" color="white" class="mr-2" />
                            </template>
                            Criar Evento
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn color="secondary" @click="goToEvents" block>
                            Voltar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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

        const createEvent = async () => {
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
            createEvent,
            goToEvents,
        };
    },
});
</script>

<style scoped>
.v-card {
    box-shadow: var(--v-card-elevation-1);
}
</style>