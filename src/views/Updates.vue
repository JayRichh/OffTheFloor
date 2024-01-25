<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-6">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FOfftheflooraerialarts&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=943015840787023"
          width="100%"
          height="500"
          style="border:none;overflow:hidden;"
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div class="col-lg-6">
        <div>
          <h3 class="mb-3">Latest Updates</h3>
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(update, index) in updates"
              :key="index"
            >
              <h5>{{ update.title }}</h5>
              <p>{{ update.description }}</p>
            </li>
          </ul>
        </div>
        <div class="mt-4">
          <h3 class="mb-3">Upcoming Events</h3>
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(event, index) in events"
              :key="index"
            >
              <h5>{{ event.title }}</h5>
              <p>{{ event.date }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const updates = ref([
  {
    title: "Update 1",
    description: "This is a description of the first update.",
  },
  {
    title: "Update 2",
    description: "This is a description of the second update.",
  },
]);

const events = ref([
  {
    title: "Event 1",
    date: "January 1, 2023",
  },
  {
    title: "Event 2",
    date: "February 14, 2023",
  },
]);
</script>

<style scoped>
h2,
h3 {
  color: #333;
}

.list-group-item {
  border: none;
  background-color: transparent;
}
</style>