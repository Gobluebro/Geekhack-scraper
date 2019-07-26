<template>
  <div class>
    <div class="flex flex-wrap">
      <div
        class="flex-none self-end w-1/3 rounded shadow-lg p-2"
        v-for="thread in threads"
        v-bind:key="thread.id"
      >
        <div>
          <ImagesByThreadID
            v-if="CheckIfImagesExist(images, thread.id)"
            v-bind:images="GetImagesByThreadID(images, thread.id)"
          ></ImagesByThreadID>
          <a v-bind:href="`https://geekhack.org/index.php?topic=` + thread.id">
            <p class="text-xl leading-relaxed">{{ thread.title }}</p>
          </a>
          <p class="text-sm leading-relaxed">By: {{ thread.author }}</p>
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
.thread {
  flex: 1 1 25%;
  margin: 10px;
}
.thread img {
  max-width: 100%;
}
.thread .text {
  padding: 0 20px 20px;
}
</style>
