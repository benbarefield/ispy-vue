<script setup>
  import {ref, shallowRef} from 'vue';
  import Hints from "@/Utility/Hints.js";

  const rejections = [ "Nope!", "Not It", "Try again" ];

  const colors = {
    blue: {value: "#3333a8", display: "Blue"},
    green : {value: "#09bd33", display :"Green"},
    red : {value: "#c73636", display :"Red"},
    orange : {value: "#c77111", display: "Orange"},
  };

  const shapes = [
    {x: 10, y: 20, width: 15, height: 20, color: colors.blue},
    {x: 50, y: 90, width: 30, height: 40, color: colors.green},
    {x: 10, y: 200, width: 40, height: 20, color: colors.blue},
    {x: 76, y: 174, width: 15, height: 15, color: colors.orange},
    {x: 250, y: 125, width: 60, height: 45, color: colors.red},
    {x: 150, y: 110, width: 30, height: 30, color: colors.orange},
  ];

  const playing = ref(true);
  const pick = shallowRef(null);
  const selectResult = ref("");
  const hint = ref("");

  function shapeSelected(shape) {
    if(!playing.value) {return;}
    if(shape === pick.value) {
      selectResult.value = "That's it!";
      playing.value = false;
      return;
    }

    selectResult.value = rejections[Math.floor(Math.random() * rejections.length)];
    hint.value = Hints(shape, pick.value);
  };

  function startGame() {
    pick.value = shapes[Math.floor(Math.random() * shapes.length)];
    playing.value = true;
    hint.value = "";
    selectResult.value = "";
  };
  startGame();
</script>

<template>
  <div v-if="playing">
    <div>I spy... something <span :style="{ color: pick.color.value }">{{ pick.color.display }}</span></div>
    <div>{{selectResult}}</div>
    <div>{{hint}}</div>
  </div>
  <div v-if="!playing">
    <div>{{selectResult}}</div>
    <button @click="startGame">Try again</button>
  </div>

  <div class="spyObjectsContainer">
    <div v-for="shape in shapes"
         class="spyShape"
         @click="shapeSelected(shape)"
         :style="{
            position: 'absolute',
            left: shape.x+'px',
            top: shape.y+'px',
            width: shape.width+'px',
            height: shape.height+'px',
            backgroundColor: shape.color.value,
            opacity: (!playing && shape !== pick) ? 0 : 1,
    }"/>
  </div>
</template>

<style scoped>
.spyObjectsContainer {
  position: relative;
  width: 500px;
  height: 500px;
  margin: 0 auto;
  border: 2px solid #333;
}

.spyShape {
  position: absolute;
  cursor: pointer;

  box-shadow: 0 0 10px rgba(190, 204, 77, 0);
  transition: box-shadow 0.2s, opacity 0.3s;
}
.spyShape:hover {
  box-shadow: 0 0 10px rgba(234, 222, 100, 0.75);
}

button {
  border: 1px solid var(--color-text);
  color: var(--color-text);
  background: var(--color-background);
  cursor: pointer;
  transition: border-color 0.2s;
  box-sizing: border-box;
  padding: 6px 12px;
}
button:hover {
  border-color: var(--vt-c-indigo);
}
</style>
