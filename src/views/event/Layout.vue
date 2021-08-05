<template>
  <div v-if="GStore.passenger">
    <div id="nav">
      <router-link :to="{ name: 'Detail' }">Details</router-link>
      |
      <router-link :to="{ name: 'Edit' }">Edit</router-link>
    </div>
    <router-view :passenger="GStore.passenger" />
  </div>
</template>
<script>
export default {
  inject: ['GStore']
}
</script>
