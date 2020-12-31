<template>
  <div id="app" :class="vueAppClasses">
    <main id="main" role="main">
      <TopHeader />
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      <BottomFooter />
    </main>
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader.vue'
import BottomFooter from '@/components/BottomFooter.vue'
export default {
  components:{
    TopHeader,
    BottomFooter
  },
  methods: {
    handleScroll() {
      const onScroll = document.querySelector('header.fixed');

      if (window.scrollY >= 30) {
        onScroll.classList.add('onScroll');
      } else {
        onScroll.classList.remove('onScroll');
      }
    }
  },
  data() {
    return {
      vueAppClasses: [],
    };
  },
  created() {

    // window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('scroll', this.handleScroll)


  },
  destroyed() {
    // window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('scroll', this.handleScroll)
  },
};
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
