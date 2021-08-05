<template>
  <h1>Passengers</h1>
  <div class="events">
    <Card
      v-for="passenger in passengers"
      :key="passenger._id"
      :passenger="passenger"
    />
    <div class="pagination">
      <router-link
        :to="{ name: 'List', query: { page: page - 1 } }"
        ><h3>Prev</h3></router-link
      >
      <router-link
        :to="{ name: 'List', query: { page: page + 1 } }"
        ><h3>Next</h3></router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import EventService from "@/services/EventService.js";

export default {
  name: "List",
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    Card, // register it as a child component
  },
  data() {
    return {
      passengers: null,
      totalPassengers: 0, // <--- Added this to store totalEvents
    };
  },
  computed: {
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventService.getPassengers(parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.passengers = response.data.data;
          comp.totalPassengers = response.headers["x-total-count"];
        });
      })
      .catch(() => {
        next({ name: "NetworkError" });
      });
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteUpdate(routeTo, routeFrom, next) {
    EventService.getPassengers(parseInt(routeTo.query.page) || 1)
      .then((response) => {
        this.passengers = response.data.data;
        this.totalPassengers = response.headers["x-total-count"];
        next();
      })
      .catch(() => {
        next({ name: "NetworkError" });
      });
  },
};
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
