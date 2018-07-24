<template>
  <div id="app">
    <vissmenu/>
  </div>
</template>

<script>
import vissmenu from "./components/vissmenu";
import historyList from "./components/entrust/entrustOwn/HistoryList";

export default {
  name: "App",
  components: {
    vissmenu,historyList
  }
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>
