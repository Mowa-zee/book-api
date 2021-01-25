<template>
  <div ref="headerWrapper" class="header-wrapper header-height">
    <header class="normal fixed onScroll">
      <div ref="headerHeight" class="flex items-center inner">
        <div class="w-1/2">
          <p id="logo">
            <router-link to="/">The BookAPI</router-link>
          </p>
        </div>
        <div class="w-1/2">
          <Menu />
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
export default {
  components:{
    Menu
  },
  data() {
    return {}
  }
}
</script>

<style></style>
