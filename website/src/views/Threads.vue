<template>
  <div>
    <h1>Threads</h1>
    <div class="threads" v-for="thread in threads" v-bind:key="thread.id">
      <div class="thread">
        <h2>{{ thread.title }}</h2>
        <div>By: {{ thread.author }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      threads: []
    };
  },
  mounted() {
    axios.get("http://localhost:8081/GetThreads").then(response => {
      this.threads = response.data;
      console.log(this.threads);
    });
  }
};
</script>

<style>
.threads {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
.thread {
  flex: 0 0 200px;
  margin: 10px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
}
.thread img {
  max-width: 100%;
}
.thread .text {
  padding: 0 20px 20px;
}
</style>
