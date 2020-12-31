<template>
  <div id="widget" class="widget left-8" :class="{ 'is_sticky': isSticky }">
    <div class="shadow">
      <div class="shadow-holder p-8">
        <h6 class="widget-title pb-3 mb-5">Book Categories</h6>
        <ul class="tagcloud flex-col">
          <li @click="handleClick('All')" :class="{ 'active': filter == 'All' }">All</li>
          <li v-for="(category, index) in categories" :key="index" @click="handleClick(category)" :class="{ 'active': category == filter }">{{category}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'FilterCpn',
    props: {
        categories: {
            required: true,
            type: Array
        }
    },
    data() {
        return {
            filter: 'All',
            isSticky: false,
        };
    },
    methods:{
        handleClick(category){
            this.filter = category
            this.$emit('filterEvent', category)
        }
    }
  // mounted(){
  //   window.addEventListener('scroll', this.handleScroll);
  // },
  // destroyed () {
  //   window.removeEventListener('scroll', this.handleScroll);
  // },
}
</script>

<style>

</style>