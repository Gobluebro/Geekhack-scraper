<template>
  <div>
    <div v-for="image in images" v-bind:key="image.id">
      <img v-bind:src="GetPathFromImageFolder(image.thread_id, image.name)" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["images"],
  methods: {
    GetPathFromImageFolder: function(threadID, imgName) {
      return require(`../assets/images/${threadID}/${imgName}`);
    }
  }
};
</script>