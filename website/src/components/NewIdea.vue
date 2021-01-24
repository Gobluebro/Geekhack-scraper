<template>
  <flickity ref="flickity" :options="flickityOptions">
    <div class="carousel-cell" v-for="image in images" v-bind:key="image.id">
      <img
        v-bind:data-flickity-lazyload="
          GetPathFromImageFolder(image.thread_id, image.name)
        "
      />
    </div>
  </flickity>
</template>

<script>
import Flickity from "vue-flickity";

export default {
  props: ["images"],
  data: function() {
    return {
      flickityOptions: {
        pageDots: true,
        wrapAround: true,
        lazyLoad: true,
      },
    };
  },
  components: {
    Flickity,
  },
  methods: {
    GetPathFromImageFolder: function(threadID, imgName) {
      return `/assets/images/${threadID}/${imgName}`;
    },
    next() {
      this.$refs.flickity.next();
    },
    previous() {
      this.$refs.flickity.previous();
    },
  },
};
</script>

<style></style>
