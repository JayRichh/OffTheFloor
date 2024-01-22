<template>
  <div class="facebook-posts" v-auto-animate>
    <div v-for="post in posts" :key="post.id" class="card mb-5 hover-card">
      <div class="card-header">
        <img :src="post.profileImage" class="profile-image" alt="Profile Image">
        <span class="ms-2">{{ post.author }}</span>
      </div>
      <img :src="post.image" class="card-img-top" alt="Post Image">
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ post.content }}</p>
        <p class="card-text"><small class="text-muted">Last updated {{ post.updatedAt }}</small></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

  // https://developers.facebook.com/docs/features-reference/page-public-content-access/

  const posts = ref([]);

  onMounted(async () => {
    try {
      const response = await fetch('<Facebook API URL>');
      const data = await response.json();
      posts.value = data.data;
    } catch (error) {
      console.log('Error fetching Facebook posts:', error);
    }
  });
</script>

<style scoped lang="scss">
.facebook-posts {
  .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
    border-radius: 15px;
    overflow: hidden;

    &.hover-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .card-header {
      display: flex;
      align-items: center;
      background-color: #f0f2f5;
      padding: 10px 15px;

      .profile-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }

    .card-img-top {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .card-body {
      padding: 20px;

      .card-title {
        font-size: 1.25rem;
        margin-bottom: 15px;
      }

      .card-text {
        font-size: 1rem;
        color: #333;
      }
    }
  }
}
</style>