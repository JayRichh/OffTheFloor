<template>
  <div>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2338.024289512135!2d-1.2300596845324088!3d54.68589798027588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e8e9f7d6b0e8b%3A0x4da64d3b2a1e1e1e!2sOff%20The%20Floor%20Aerial%20Arts!5e0!3m2!1sen!2suk!4v1642708793831!5m2!1sen!2suk" class="map" width="600" height="450" style="border:0;" allowfullscreen loading="lazy"></iframe>
  </div>
</template>

<script lang="ts" setup>
import {  onMounted, ref } from 'vue';

const mapRef = ref(null);

onMounted(async () => {
  // await loadGoogleMapsApi();
  // const map = createMap(mapRef.value);
  // createMarker(map);
});

function loadGoogleMapsApi() {
  // return new Promise((resolve) => {
  //   const script = document.createElement('script');
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
  //   script.async = true;
  //   script.defer = true;
  //   script.onload = resolve;
  //   document.head.appendChild(script);
  // });
}

function createMap(mapElement: HTMLElement) {
  const location = { lat: 54.68589798027588, lng: -1.2300596845324088 };
  // return new google.maps.Map(mapElement, {
  //   center: location,
  //   zoom: 15,
  // });
}

// function createMarker(map: google.maps.Map) {
//   const location = { lat: 54.68589798027588, lng: -1.2300596845324088 };
//   return new google.maps.Marker({
//     position: location,
//     map: map,
//     title: 'Off The Floor Aerial Arts',
//   });
// }
</script>

<style scoped>
.map {
  width: 100%;
  height: 400px;
}
</style>