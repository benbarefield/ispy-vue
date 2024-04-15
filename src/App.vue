<script setup>
  import SpyRoot from './components/SpyRoot.vue';
  import Settings from "@/components/Settings.vue";
  import {ref} from "vue";
  import {playContext, settingsContext} from "@/Utility/constants.js";

  const state = ref({
    objects: 25,
    colors: 4,
    context: settingsContext,
  });
</script>

<template>
  <SpyRoot :state="state" v-if="state.context === playContext" />
  <Settings :state="state" v-if="state.context === settingsContext" />
</template>
