<template>
    <div id="app">
        <BlocklyComponent/>
        <!-- <BlocklyComponent id="blockly1" :options="options" ref="blocks"></BlocklyComponent> -->
        <!-- <p id="code">
        <button v-on:click="showCode()">Show NetLogo</button>
        <pre v-html="code"></pre>
        </p> -->
    </div>
</template>

<script>
import BlocklyComponent from '@/components/BlocklyComponent.vue'

export default {
    name: 'app',
    components: {
        BlocklyComponent
    },
    mounted() {
        console.log('there');
    },
    methods: {
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

#app {
  font-family: Poppins, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body {
  margin: 0;
}

#code {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
  margin: 0;
  background-color: beige;
}

#blockly1 {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
}

/* Makes our label white. */
.blocklyTreeLabel {
    font-family: Poppins, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: black;
    font-weight: 500;
}

.blocklyTreeRow {
  padding: 3px;
  margin-bottom: 1em;
}

.blocklyTreeRow {
    height: initial;
}

.swal2-title {
    font-family: Poppins, sans-serif;
}

</style>
