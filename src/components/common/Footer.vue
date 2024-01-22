<template>
  <footer>
    <div class="site-footer">
      <div class="footer-section logo-section">
      <img src="../../assets/transparent-logo.png" class="logo-img h-50" />
    </div>
    <div class="footer-section info-section ">
      <div class="business-info text-center ">
        <p>Off The Floor Aerial Arts</p>
        <p>6 Usworth Rd, Hartlepool, United Kingdom</p>
        <p>07714 366314</p>
      </div>
    </div>
    <div class="footer-section social-media w-100">
      <span class="d-flex align-items-end justify-content-end gap-2">
        <i class="fab fa-facebook-f me-1 fa-2x px-2 pe-2"></i>
        <i class="fab fa-youtube me-2 fa-2x"></i>
        <i class="fab fa-instagram me-2 fa-2x"></i>
        <i class="fab fa-twitter fa-2x"></i>
      </span>
    </div>
  </div>
  <div class="footer-info">
    © Off The Floor Aerial Arts 2024<br>
    Web: <a href="https://jayrich.dev" target="_blank">Jay</a>
  </div>
</footer>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
.site-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  background-color: #333;
  color: white;
  height: 12rem;
  overflow: hidden;
}

.footer-section {
  flex: 1 1 30%;
  padding: 10px;
}

.logo-section img {
  max-width: 100%;
  height: auto;
}

.info-section .business-info {
  font-size: 0.9rem;
}

.info-section .intro {
  font-style: italic;
}

.social-media a img {
  width: 35px;
  margin-right: 10px;
}

.search-area form {
  display: flex;
  align-items: center;
}

.search-area input {
  margin-right: 10px;
}

.footer-info {
  font-size: 0.8rem;
  text-align: center;
  background-color: #333;
  padding-bottom: 1rem;
  color: whitesmoke;
  a {
    text-decoration: none;
    color: grey;
  }
}
i, button {
  padding: 5px;
  box-sizing: border-box;
  transition: all 0.2s ease;
}
i:hover,
button:hover {
  cursor: pointer;
  border-radius: 10px;
  transform: translateY(-2px)
}
</style>
