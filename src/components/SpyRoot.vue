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

  const pick = shallowRef(shapes[Math.floor(Math.random() * shapes.length)]);
  const selectResult = ref("");
  const hint = ref("");

  const shapeSelected = (shape) => {
    if(shape === pick.value) {
      selectResult.value = "That's it!";
      return;
    }

    selectResult.value = rejections[Math.floor(Math.random() * rejections.length)];
    hint.value = Hints(shape, pick.value);
  };
</script>

<template>
  <div>
    <div>I spy... something <span :style="{ color: pick.color.value }">{{ pick.color.display }}</span></div>
    <div>{{selectResult}}</div>
    <div>{{hint}}</div>
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
            backgroundColor: shape.color.value
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

  box-shadow: 0 0 10px rgba(190, 204, 77, 0);
  transition: box-shadow 0.2s;
}
.spyShape:hover {
  box-shadow: 0 0 10px rgba(190, 204, 77, 0.75);
}
</style>
