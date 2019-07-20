<template>
  <div>
    <h1>Threads</h1>
    <div class="threads">
      <div class="thread" v-for="thread in threads" v-bind:key="thread.id">
        <div>
          <h2>{{ thread.title }}</h2>
          <div>By: {{ thread.author }}</div>
          <ImagesByThreadID
            v-if="CheckIfImagesExist(images, thread.id)"
            v-bind:images="GetImagesByThreadID(images, thread.id)"
          ></ImagesByThreadID>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ImagesByThreadID from "@/components/ImagesByThreadID.vue";

export default {
  data: function() {
    return {
      threads: [],
      images: []
    };
  },
  components: {
    ImagesByThreadID
  },
  methods: {
    GetImagesByThreadID: function(images, threadID) {
      let fourImages = this.images
        .filter(x => x.thread_id == threadID && x.is_hidden == false)
        .slice(0, 4);
      console.log(fourImages);
      return fourImages;
    },
    CheckIfImagesExist: function(images, threadID) {
      let newImages = this.GetImagesByThreadID(images, threadID);
      if (newImages.length > 0 && newImages !== undefined) {
        return true;
      } else {
        return false;
      }
    }
  },
  async created() {
    const threadsResponse = await axios.get("http://localhost:8081/GetThreads");
    this.threads = threadsResponse.data;
    const imagesResponse = await axios.get("http://localhost:8081/GetImages");
    this.images = imagesResponse.data;
  }
};
</script>

<style>
.threads {
  display: flex;
  flex-wrap: wrap;
}
.thread {
  flex: 1 1 25%;
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
