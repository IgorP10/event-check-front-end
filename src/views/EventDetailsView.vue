<template>
    <v-container>
        <EventDetails v-if="event" :event="event" :eventId="eventId">
            <template #actions>
                <v-btn @click="goBack">Voltar</v-btn>
            </template>
        </EventDetails>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import EventDetails from '@/components/EventDetails.vue';

export default defineComponent({
    name: 'EventDetailsView',
    components: {
        EventDetails,
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const event = computed(() => store.getters.getEvent);

        onMounted(() => {
            store.dispatch('events/fetchEventById', Number(router.currentRoute.value.params.id));
        });

        const goBack = () => {
            router.push({ name: 'events' });
        };

        return {
            event,
            eventId: Number(router.currentRoute.value.params.id),
            goBack,
        };
    },
});
</script>
