<template>
    <div class="max-w-screen-xl flex-grow mx-auto pt-20">
      <div class="text-center lg:pt-14 pt-10 lg:pb-16 pb-14"><h1 class="heading-title">Results for "{{ $route.query.keyword }}"</h1></div>
      <div class="shop">
        <BookCpn :books="books" />
      </div>
      <div class="text-center mt-20">
        <router-link to="./" class="button shadow normal light-blue soma-link  mx-auto"><span>Back To Home</span></router-link>
      </div>
    </div>
</template>

<script>
import BookCpn from '@/components/BookCpn.vue'
export default {
  components:{
     BookCpn
  },
  data() {
    return {
      books: [],
    };
  },
  watch: {
      '$route.query.keyword'() {
          this.doSearch();
      }
  },
  computed: {
    // books(){
    //   return this.$store.state.searchBooks;
    // }
  },
  created() {
    this.doSearch()
  },
  methods:{
    doSearch(){
      if (this.$route.query.keyword) {
        const encodedURI = encodeURI(
        'https://www.googleapis.com/books/v1/volumes?q=' +
          this.$route.query.keyword +
            '+inauthor:king&maxResults=5&printType=books'
        );
        this.$http.get(encodedURI)
            .then((response) => {
              this.books = response.data.items
            })
            .catch((error) => { reject(error) })
      }
    }
  }
};
</script>

<style>
</style>
