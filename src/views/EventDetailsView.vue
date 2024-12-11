<template>
    <v-container fluid class="pa-0">
        <HeaderComponent title="Detalhes do Evento" />

        <v-row class="d-flex justify-center pa-4" v-if="isLoading">
            <v-col cols="12" class="text-center">
                <v-progress-circular indeterminate color="primary" size="70" />
            </v-col>
        </v-row>

        <v-row class="d-flex justify-center pa-4" v-else>
            <v-col cols="12" md="8" lg="6">
                <EventDetails v-if="event" :event="event" :eventId="eventId" />

                <v-alert v-else type="error" outlined>
                    {{ error || `Evento com ID ${eventId} não foi encontrado.` }}
                </v-alert>

                <v-btn @click="goBack" color="primary" outlined block>
                    Voltar
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import HeaderComponent from '@/components/Header.vue';
import EventDetails from '@/components/EventDetails.vue';

export default defineComponent({
    name: 'EventDetailsView',
    components: {
        HeaderComponent,
        EventDetails,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        const eventId = Number(route.params.id);
        const event = ref(null);
        const isLoading = ref(true);
        const error = ref<string | null>(null);

        const goBack = () => {
            router.push({ name: 'Events' });
        };

        onMounted(async () => {
            if (eventId) {
                try {
                    isLoading.value = true;

                    const result = await store.dispatch('events/fetchEventById', eventId);
                    event.value = result;
                } catch (err) {
                    error.value = 'Erro ao carregar os detalhes do evento.';
                    console.error(err);
                } finally {
                    isLoading.value = false;
                }
            } else {
                error.value = 'ID do evento inválido.';
                isLoading.value = false;
            }
        });

        return {
            event,
            eventId,
            goBack,
            isLoading,
            error,
        };
    },
});
</script>
