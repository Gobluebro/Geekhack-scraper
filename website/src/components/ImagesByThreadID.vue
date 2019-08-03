<template>
  <div class="justify-center">
    <img
      v-for="image in images"
      v-bind:key="image.id"
      class="p-1 flex-grow"
      :class="GetClassByAmountOfImages()"
      v-bind:src="GetPathFromImageFolder(image.thread_id, image.name)"
    />
    <div v-if="this.images.length == 0 || this.images == undefined" class="relative self-center">
      <font-awesome-icon class="text-teal-200" size="10x" icon="frown" />
      <span
        class="absolute inline-block text-xl text-teal-200"
        style="top:160px; right:0px"
      >No images found</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["images"],
  methods: {
    GetPathFromImageFolder: function(threadID, imgName) {
      return require(`@/assets/images/${threadID}/${imgName}`);
    },
    GetClassByAmountOfImages: function() {
      switch (this.images.length) {
        case 4:
          return "w-1/2 h-200";
        case 2:
          return "h-200";
        case 1:
          return "h-400";
        default:
          return "w-1/2 h-200";
      }
    }
  }
};
</script>

<style>
</style>
