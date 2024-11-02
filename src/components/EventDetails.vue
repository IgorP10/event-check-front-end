<template>
    <v-container>
        <v-card v-if="event" class="mb-4" :style="{ borderColor: 'accent' }">
            <v-card-title>{{ event.name }}</v-card-title>
            <v-card-subtitle>{{ event.date }} - {{ event.time }}</v-card-subtitle>
            <v-card-text>{{ event.description }}</v-card-text>
            <v-card-actions>
                <slot name="actions"></slot>
            </v-card-actions>
        </v-card>
        <v-card v-else>
            <v-card-title>Event not found</v-card-title>
            <v-card-text>Event with id {{ eventId }} not found</v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Event } from '@/types/event';

export default defineComponent({
    name: 'EventDetails',
    props: {
        event: {
            type: Object as PropType<Event>,
            required: true
        },
        eventId: {
            type: Number,
            required: true
        }
    },
});
</script>
