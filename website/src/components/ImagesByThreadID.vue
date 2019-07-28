<template>
  <div class="flex flex-wrap">
    <img
      v-for="image in images"
      v-bind:key="image.id"
      class="w-1/2 h-200 p-1"
      v-bind:src="GetPathFromImageFolder(image.thread_id, image.name)"
    />
  </div>
</template>

<script>
export default {
  props: ["images"],
  methods: {
    GetPathFromImageFolder: function(threadID, imgName) {
      return require(`@/assets/images/${threadID}/${imgName}`);
    }
  }
};
</script>

<style>
</style>
