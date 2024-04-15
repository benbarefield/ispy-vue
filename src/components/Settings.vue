<script setup>
  import {playContext} from "@/Utility/constants.js";

  defineProps({
    state: {
      objects: Number,
      colors: Number,
      context: String,
    },
  });


</script>

<template>
  <div class="settingsContainer">
    <h2>I Spy</h2>
    <div class="setting">
      <label>Number of colors: </label>
      <input type="range" v-model="state.colors" min="1" max="5" />
      <label>{{state.colors}}</label>
    </div>

    <div class="setting">
      <label for="num-objects">Number of objects: </label>
      <input id="num-objects" type="range" v-model="state.objects" :max="40" :min="state.colors * 3" />
      <label for="num-objects">{{state.objects}}</label>
    </div>

    <button @click="state.context = playContext">Play!</button>
  </div>
</template>

<style scoped>
  h2 {
    font-size: 3rem;
    font-weight: 500;
  }

  .settingsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .setting {
    flex: 0 0 1;
    padding: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    max-width: 40vw;
  }

  label, input {
    vertical-align: middle;
    margin-right: 6px;
  }
</style>
