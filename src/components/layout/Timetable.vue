<template>
  <div class="container my-timetable mx-auto my-3" v-auto-animate>
    <div v-if="data.length > 0" class="row align-content-center justify-content-center">
      <div class="col-lg-4 col-md-6 col-sm-12 pt-1" v-for="(day, index) in data" :key="index">
        <div class="card" :class="{ 'card-closed': day.closed }">
          <img v-if="day.image" :src="day.image" class="card-img-top" alt="Day silhouette" :class="index == 1 ? 'spin' : ''">
          <div class="card-header">{{ day.name }}</div>
          <div class="card-body">
            <ul class="list-group list-group-flush" v-if="!day.closed">
              <li class="list-group-item" v-for="(session, sIndex) in day.sessions" :key="sIndex">
                <span class="time">{{ session.time }}</span>
                <span class="info">{{ session.info }}</span>
                <span class="price">{{ session.price }}</span>
              </li>
            </ul>
            <div v-if="day.closed" class="closed-text">Closed</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// @ts-ignore
import timetableData from '@/data/timetable';

import set1 from '@/assets/set1.png';
import set2 from '@/assets/set2.png';
import set3 from '@/assets/set3.png';
import set4 from '@/assets/set4.png';
import set5 from '@/assets/set5.png';
import set6 from '@/assets/set6.png';
import set7 from '@/assets/set7.png';

const imageImports = [set1, set2, set3, set4, set5, set6, set7];

// Assign images to the timetable data
const dataWithImages = timetableData.map((day, index) => ({
  ...day,
  image: imageImports[index % imageImports.length] // Use modulo to loop over the images if there are more days than images
}));

const data = ref(dataWithImages);
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.container {
  max-width: 1140px;
  margin: auto;
}

.my-timetable {
  font-family: 'Roboto', sans-serif;
  
  .card {
    position: relative;
    border: none;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
    min-height: 220px;

    &:hover {
      transform: translateY(-2px)
    }

    &.card-closed {
      background-color: #e9ecef;
      .card-header {
        color: #fff;
      }
      .closed-text {
        text-align: center;
        font-size: 1.5rem; // Smaller text
        font-weight: 700;
        color: #6c757d;
        margin-top: 2rem;
      }
    }

    .card-img-top {
      position: absolute;
      top: 0px;
      right: 1rem;
      width: 20%; 
      height: auto; 
      object-fit: contain;
      z-index: 0;
    }

    .card-header {
      background-color: transparent;
      padding: 0.75rem 1.25rem;
      font-size: 1rem; // Smaller text
      font-weight: 700;
      color: #333;
      z-index: 1;
    }

    .card-body {
      margin-top: 60px; 
      z-index: 1;

      .list-group-item {
        display: flex;
        justify-content: space-between;
        padding: 0.25rem 0rem;
        margin: 0;
        border: none;
        background-color: transparent;

        .time {
          font-weight: 700;
          font-size: 0.9rem;
          text-wrap: nowrap;
        }

        .info {
          font-weight: 400;
          font-size: 0.9rem; 
          text-wrap: nowrap;
        }

        .price {
          font-weight: 700;
          font-size: 0.9rem;
          text-wrap: nowrap;
        }
      }
    }
  }

  @media (max-width: 992px) {
    .row {
      .col-lg-4 {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }

    img {
      max-height: 100px;
    }
  }
}

@keyframes rotate3d {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.spin {
  transition: all 0.2s ease;
&:hover {
  animation: rotate3d 2s linear infinite;
  transform-style: preserve-3d;
  perspective: 400px;
  transform-origin: center;
  }
}
</style>