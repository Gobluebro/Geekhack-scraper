<template>
  <div>
    <nav class="flex justify-center text-xl p-1 mb-3 pb-3 text-white border-b border-gray-700">
      <router-link class="p-1" to="/">Group Buys</router-link>
      <div class="p-1">|</div>
      <router-link class="p-1" to="/">Interest Checks</router-link>
    </nav>
    <div id="app" class="container">
      <router-view />
    </div>
  </div>
</template>

<style>
</style>
