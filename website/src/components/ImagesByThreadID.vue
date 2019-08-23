<template>
  <div class="justify-center">
    <img
      v-for="image in images"
      v-bind:key="image.id"
      class="p-1 flex-grow"
      :class="GetClassByAmountOfImages()"
      v-bind:src="GetPathFromImageFolder(image.thread_id, image.name)"
    />
  </div>
</template>

<script>
export default {
  props: ["images"],
  methods: {
    GetPathFromImageFolder: function(threadID, imgName) {
      return `/assets/images/${threadID}/${imgName}`;
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