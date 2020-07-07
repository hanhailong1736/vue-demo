<template>
  <div id="app">
    <head-view></head-view>
    <div class="container">
      <left-bar></left-bar>
      <div class="mainPage">
        <div class="k-crumb-wrap">
          <span>{{ crumb }}</span>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import HeadView from "./common/HeadView";
import LeftBar from "./common/LeftBar";
export default {
  name: "App",
  components: {
    "head-view": HeadView,
    "left-bar": LeftBar
  },
  computed: {
    crumb() {
      return this.$store.getters.crumb;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
:root {
  --width: 1440px;
}

.container {
  background-color: white;
  min-width: var(--width);
  min-height: calc(100vh-110px);
  padding: 20px 0;
  display: flex;
}

.mainPage {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #eaeaea;
  width: 87%;
  max-width: calc(100vw-190px);
  min-height: calc(100vh-110px);
  overflow: hidden;
  word-break: break-word;
  word-wrap: break-word;
}

.k-crumb-wrap {
  font-size: 12px;
  color: #888;
  height: 46px;
  line-height: 46px;
  text-align: left;
  padding-right: 10px;
  background-color: #f8f9fb;
  padding-left: 10px;
}

button::after {
  border: none;
}
</style>