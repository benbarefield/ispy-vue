<script setup>
  import {ref, shallowRef} from 'vue';
  import Hints from "@/Utility/hints.js";
  import ShapeCreation from "@/Utility/shapeCreation.js";
  import {colors, settingsContext} from "@/Utility/constants.js";

  const props = defineProps({
    state: {
      objects: Number,
      colors: Number,
      context: String,
    },
  });

  const rejections = [ "Nope!", "Not It", "Try again" ];

  console.log(props.state.colors);
  const shapes = ShapeCreation(500, 500, props.state.objects, 30, 110, 30, 110, colors.slice(0, props.state.colors));

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
    hint.value = shape.color === pick.value.color ? Hints(shape, pick.value) : "";
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
  <div class="gameContainer">
    <div class="infoContainer">
      <div>
        <div v-if="playing">I spy... something <span :style="{ color: pick.color.value }">{{ pick.color.display }}</span></div>
        <div>{{selectResult}}</div>
        <div v-if="playing">{{hint}}</div>
      </div>
      <div>
        <button v-if="!playing" @click="startGame">Try again</button>
        <button @click="state.context = settingsContext">Back</button>
      </div>
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
  </div>
</template>

<style scoped>
  .gameContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100vh;
    justify-content: center;
  }

  .infoContainer {
    flex: 0 0 auto;
    margin-right: 50px;
    text-align: right;
  }

  .spyObjectsContainer {
    position: relative;
    width: 500px;
    height: 500px;
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

  button:not(:last-of-type) {
    margin-right: 10px;
  }
</style>
