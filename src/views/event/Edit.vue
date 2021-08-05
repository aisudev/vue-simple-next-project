<template>
  <p>Edit the passenger here</p>
  <input type="text" placeholder="name" v-model="name" />
  <input type="text" placeholder="trips" v-model="trips" />
  <button type="submit" @click="edit">Submit</button>
</template>

<script>
import api from "@/services/EventService.js";

export default {
  props: ["passenger"],
  inject: ["GStore"],
  data() {
    return {
      name: this.passenger.name,
      trips: this.passenger.trips,
    };
  },
  methods: {
    edit() {
      this.GStore.flashMessage =
        "You are succesfully edit " + this.passenger._id;
      api
        .updatePassenger(this.passenger._id, {
          name: this.name,
          trips: this.trips,
        })
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.error(err.message);
        });
      this.$router.push({ name: "Detail" });
      setTimeout(() => {
        this.GStore.flashMessage = "";
      }, 3000);
    },
  },
};
</script>
