<template>
    <v-container fluid class="pa-0">
        <HeaderComponent title="Detalhes do Evento" />

        <v-row class="d-flex justify-center pa-4">
            <v-col cols="12" md="8" lg="6">
                <EventDetails v-if="event" :event="event" :eventId="eventId" />

                <v-btn @click="goBack" color="primary" outlined block>
                    Voltar
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
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

        const eventId = computed(() => Number(route.params.id));
        const event = computed(() => store.getters['events/getEvent']);

        const goBack = () => {
            router.push({ name: 'Events' });
        };

        onMounted(async () => {
            if (eventId.value) {
                await store.dispatch('events/fetchEventById', eventId.value);
            }
        });

        return {
            event,
            eventId,
            goBack,
        };
    },
});
</script>