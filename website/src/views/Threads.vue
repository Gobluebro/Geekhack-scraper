<template>
  <div>
    <div class="flex flex-wrap">
      <!-- rounded border border-white  -->
      <div
        class="flex-auto w-1/4 rounded bg-gray-700 p-2 m-3"
        v-for="thread in threads"
        v-bind:key="thread.id"
      >
        <div class="flex flex-col justify-end h-full">
          <ImagesByThreadID
            class="flex flex-wrap flex-grow"
            :images="GetImagesByThreadID(images, thread.id)"
          ></ImagesByThreadID>
          <a class :href="`https://geekhack.org/index.php?topic=` + thread.id">
            <p class="text-xl text-gray-400 leading-relaxed pl-1 h-16">{{ thread.title }}</p>
          </a>
          <p class="text-sm text-gray-400 leading-relaxed pl-1">By: {{ thread.author }}</p>
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
</style>
