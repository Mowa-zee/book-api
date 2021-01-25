<template>
  <div>
    <div class="menu-text_holder text-right">
      <a href="#" class="menu-text" @click.prevent="handleMenuOpen">Search</a>
    </div>
    <div
      id="header-overlay"
      class="modal-overlay"
      :class="{ 'is-open': isOpen }"
      @click.prevent="handleMenuClose"
    ></div>
    <div class="lateral fixed-lateral right" :class="{ 'is-open': isOpen }">
      <div
        class="search flex justify-center is-open"
      >
        <div class="self-center">
          <a id="close-search" href="#" class="is-active" @click.prevent="handleMenuClose">Close</a>
          <input
              id="search-input"
              ref="searchInput"
              type="search"
              placeholder="Search..."
              class="mb0 text-center p-0"
              v-on:keyup.enter="submitSearch"
              v-model="keyword"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
 
  data() {
    return {
      menuList: '',
      history: [],
      keyword: '',
      isOpen: false,
      isOpenSearch: false,
      itemDelayOn: false,
      checkMobile: false
    }
  },
  
  watch: {
    $route() {
      this.handleMenuClose()
    }
  },
  mounted() {
    this.mobileBindings()
  },
  methods: {

    handleMenuClose() {
      if (this.history.length > 0) {
        const animationInterval = this.history.length * 200

        this.history.reverse().forEach(
          function (menuItem, key) {
            const interval = (key + 1) * 200

            setTimeout(
              function () {
                this.closeMenuItem(menuItem)

                this.history.pop() // just remove the items
              }.bind(this),
              interval
            )
          }.bind(this)
        )

        setTimeout(
          function () {
            this.animateMenuHide()
          }.bind(this),
          animationInterval
        )
      } else {
        this.animateMenuHide()
      }
    },

    animateMenuHide() {
      setTimeout(() => {
        this.isOpen = false
      }, 500)
      setTimeout(() => {
        this.itemDelayOn = false
      }, 200)
      this.isOpenSearch = false
    },

    handleMenuOpen() {
      this.isOpen = true
      setTimeout(() => {
        this.itemDelayOn = true
      }, 400)
    },

    handleSearchOpen() {
      this.isOpenSearch = true

      setTimeout(() => {
        this.$refs.searchInput.focus()
        // if (this.isMobile) {
        //   this.checkMobile = true
        // }
      }, 400)

      document.addEventListener('keydown', (e) => {
        if (e.which == 27) {
          this.isOpenSearch = false
          // if (this.isMobile) {
          //   this.checkMobile = false
          // }
        }
      })
    },

    submitSearch(){
      // Logic search here
      this.handleMenuClose()
    },

    mobileBindings() {
      if (this.isMobile) {
        document.querySelector('.lateral').classList.add('is-mobile')
        document.querySelector('#close-menu').classList.add('is-active')
        document
          .querySelector('#close-search')
          .addEventListener('click', function () {
            document.querySelector(this).classList.remove('is-active')
            document.querySelector('.search').classList.remove('is-open')
            document.querySelector('#search-input').focusout()
          })
      }
    }
  }
}
</script>

<style></style>
