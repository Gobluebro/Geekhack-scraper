import Vue from "vue";
import Router from "vue-router";
import Threads from "./views/Threads.vue";
import Image from "./views/EveryImageByThreadID.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "threads",
      component: Threads
    },
    {
      path: "/thread/:id",
      component: Image
    }
  ]
});
