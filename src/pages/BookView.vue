<template>
    <div class="w-full non-container pt-20">
      <div class="text-center lg:pt-14 pt-10 lg:pb-16 pb-14">
        <h1 class="heading-title">The Book Store</h1>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full px-8">
          <SortCpn @sortEvent="onSort"/>
        </div>
        <div class="w-full xl:w-1/4 px-8">
          <FilterCpn :categories="categories" @filterEvent="onFilter"/>
        </div>
        <div class="w-full xl:w-3/4 px-8">
          <div class="shop">
            <BookCpn :books="resultComputed" @openModal="showModal" />
          </div>
        </div>
      </div>
      <transition name="modal">
        <modal :bookDetail="bookDetail" v-show="isModalVisible" @closeModal="closeModal" />
      </transition>
      <div id="modal-overlay" class="modal-overlay" :class="{ 'is-open': isOpen }" @click.prevent="closeModal"></div>
    </div>
</template>

<script>
import BookCpn from '@/components/BookCpn.vue'
import SortCpn from '@/components/SortCpn.vue'
import FilterCpn from '@/components/FilterCpn.vue'
import Modal from '@/components/Modal.vue';
export default {
  components:{
     BookCpn,
     SortCpn,
     FilterCpn,
     Modal
  },
  data() {
    return {
      books: [],
      categories: [],
      filter: 'All',
      sort: 'All',
      bookDetail: {},
      isModalVisible: false,
      isOpen: false,
    };
  },
  computed: {
    resultComputed(){
      if (this.filter !== 'All') {// Check if filter data change
        return this.books.filter(book => this.resultsFilter(book))
      }else if(this.sort !== 'All'){ // Check if sort data change
        switch(this.sort){
          case 'Most recently':
            return this.resultsSort(this.books, 'publishedDate')
            break;
          case 'Top view':
            return this.resultsSort(this.books, 'averageRating')
            break;
          default:
            return this.book
        }
      }else{// Default
        return this.books
      }
    }
  },
  created() {
    // Get 10 result of books from google book api
    this.$http.get("https://www.googleapis.com/books/v1/volumes?q=stephen+king+inauthor:king&maxResults=10&printType=books")
    .then((response) => {
      this.books = response.data.items
      // Make Categories array value
      for(let i = 0; i < this.books.length; i++){
        if(typeof this.books[i].volumeInfo.categories !== 'undefined'){
          for(let j = 0; j < this.books[i].volumeInfo.categories.length; j++) {
            if(this.categories.indexOf(this.books[i].volumeInfo.categories[j]) === -1){
              this.categories.push(this.books[i].volumeInfo.categories[j])
            }
          }
        }
      }
    })
    .catch((error) => { reject(error) })
  },
  methods:{
    onSort(sort){
      this.filter = 'All' // Reset filter to default value
      this.sort = sort
    },
    onFilter(filter){
      this.filter = filter
    },
    resultsFilter(book) {
      if(typeof book.volumeInfo.categories !== 'undefined' && JSON.parse(JSON.stringify(book.volumeInfo.categories[0])) === this.filter){
        return true
      }else{
        return false
      }
    },
    resultsSort(books, item){
      return books.slice().sort((a, b) =>{
          return b.volumeInfo[item] - a.volumeInfo[item] // For descending sort
      })
    },
    showModal(id) {
      // Open modal overlay
      this.isOpen = true
      // Using 'id' get book detail
      const URL = 'https://www.googleapis.com/books/v1/volumes/' + id
        this.$http.get(URL).then((response) => {
            this.bookDetail = response.data
            this.isModalVisible = true;
        })
        .catch((error) => { reject(error) })
      
    },
    closeModal() {
      this.isOpen = false
      this.isModalVisible = false;
    }
  }
};
</script>

<style>
</style>
