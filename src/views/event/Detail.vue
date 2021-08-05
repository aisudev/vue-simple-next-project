<template>
  <img :src="passenger.airline[0].logo">
  <p>{{ passenger.name }} on {{ passenger.trips }} @ {{ passenger.airline[0].name }}</p>
</template>

<script>
export default {
  props: ['passenger']
}
</script>
