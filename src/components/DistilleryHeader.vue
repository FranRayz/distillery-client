<template>
  <header>
    <div class="logo"></div>
    <div class="page-info">Тестирование</div>
  </header>
</template>

<script>
export default {

}
</script>

<style scoped>
  header {
    background: linear-gradient(#faf9f9,#faf9f9);
    background-size: 100vw 100px;
    background-repeat: no-repeat;
    background-position: top left;
    padding: 0 25px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    width: 165px;
    height: 54px;
    background-image: url(../assets/logo_header.svg);
    background-repeat: no-repeat;
    background-position: 0 18px;
  }

  .page-info {
    color: #7d7a85;
    text-transform: uppercase;
    border-top: 1px solid;
    border-bottom: 1px solid;
    padding: 4px;
    cursor: pointer;
  }

</style>
