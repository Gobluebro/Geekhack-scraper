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
            v-if="CheckIfImagesExist(images, thread.id)"
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
    },
    CheckIfImagesExist: function(images, threadID) {
      let newImages = this.GetImagesByThreadID(images, threadID);
      if (newImages.length > 0 && newImages !== undefined) {
        return true;
      } else {
        return false;
      }
    },
    SortThreadsByHighestID: function() {
      this.threads.sort((a, b) => {
        // flip the > symbol if you wish to go from lowest to highest.
        // currently using highest to lowest so newer threads are shown
        var x = a.id > b.id ? -1 : 1;
        return x;
      });
    },
    SortImagesByOrderNumber: function() {
      this.images.sort((a, b) => {
        // flip the < symbol if you wish to go from highest to lowest.
        // currently using lowest to highest
        var x = a.order_number < b.order_number ? -1 : 1;
        return x;
      });
    }
  },
  async created() {
    const threadsResponse = await axios.get("http://localhost:8081/GetThreads");
    this.threads = threadsResponse.data;
    const imagesResponse = await axios.get("http://localhost:8081/GetImages");
    this.images = imagesResponse.data;
    this.SortThreadsByHighestID();
    this.SortImagesByOrderNumber();
  }
};
</script>

<style>
</style>
