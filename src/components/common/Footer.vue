<template>
  <footer>
    <div class="site-footer">
      <div class="footer-section logo-section">
      <img src="../../assets/transparent-logo.png" class="logo-img" />
    </div>
    <div class="footer-section info-section ">
      <div class="business-info text-center ">
        <p>Off The Floor Aerial Arts</p>
        <p>6 Usworth Rd, Hartlepool, United Kingdom</p>
        <p>07714 366314</p>
      </div>
    </div>
    <div class="footer-section social-media w-100">
      <span class="d-flex align-items-end justify-content-center gap-2">
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
  overflow: hidden;
}

.footer-section {
  flex: 1 1 30%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;


}

.logo-section {
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0;
  margin: 0;
  img {
    max-height: 100px;
  }

}

.info-section .business-info {
  font-size: 0.9rem;
}

.social-media i,
.social-media button {
  padding: 5px;
  transition: all 0.2s ease;
  &:hover {
    cursor: pointer;
    border-radius: 10px;
    transform: translateY(-2px);
  }
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

@media (max-width: 768px) {
  .site-footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-section {
    flex: 0 0 auto; 
    margin-bottom: 10px;
  }

  .info-section .business-info,
  .footer-info {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .site-footer {
    height: auto; 
  }

  .logo-section img {
    max-height: 80px;
  }

  .info-section .business-info,
  .footer-info {
    font-size: 0.7rem; 
  }
}
</style>
