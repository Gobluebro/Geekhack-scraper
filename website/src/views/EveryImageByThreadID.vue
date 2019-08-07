<template>
  <div class="justify-center">
    <img
      v-for="image in requiredImages"
      v-bind:key="image.id"
      class
      v-bind:src="GetPathFromImageFolder(image.thread_id, image.name)"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      images: [],
      requiredImages: []
    };
  },
  methods: {
    GetPathFromImageFolder: function(threadID, imgName) {
      return require(`@/assets/images/${threadID}/${imgName}`);
    },
    GetImagesByPathID: async function(threadID) {
      if (this.images.length == 0 || this.images == undefined) {
        const imagesResponse = await axios.get(
          "http://localhost:8081/GetImages"
        );
        this.images = imagesResponse.data;
      }
      this.requiredImages = this.images.filter(
        x => x.thread_id == threadID && x.is_hidden == false
      );
      //   console.log(threadID);
      //   console.log(this.images);
      //   console.log(this.requiredImages);
    }
  },
  props: ["threadID"],
  created() {
    this.GetImagesByPathID(this.$route.params.id);
    console.log("created " + this.$route.params.id);
  }
  //   beforeRouteUpdate(to, from, next) {
  //     this.GetImagesByPathID(to.params.id);
  //     console.log("before " + to.params.id);
  //     next();
  //   }
};
</script>

<style>
</style>
