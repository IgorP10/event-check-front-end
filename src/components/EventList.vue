<template>
    <v-container>
        <v-list>
            <v-list-item-group>
                <v-list-item v-for="event in events" :key="event.id" @click="goToEvent(event.id)">
                    <v-list-item-content>
                        <v-list-item-title>{{ event.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ event.date }} - {{ event.time }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'EventList',

    setup() {
        const store = useStore();
        const router = useRouter();

        store.dispatch('events/fetchEvents');

        const events = store.getters.getEvents;

        const goToEvent = (id: number) => {
            router.push(`/event/${id}`);
        };

        return {
            events,
            goToEvent,
        };
    },
});
</script>
