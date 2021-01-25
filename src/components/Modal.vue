<template>
    <div class="modal-lateral fixed-lateral is-open" v-if="bookDetail.volumeInfo">
        <div class="max-w-screen-xl flex-grow mx-auto pt-10 pb-20">
            <div class="text-center lg:pt-10 pt-7 lg:pb-10 pb-7"><h1 class="heading-title">{{ bookDetail.volumeInfo.title }}</h1></div>
            <a id="close-modal" href="#" class="is-active" @click.prevent="close">Close</a>
            <div class="shadow">
                <div class="book_detail xl:p-20 sm:p-10">
                    <div class="flex flex-wrap relative xxl:-mx-8 -mx-4">
                        <div class="w-full sm:w-1/3 xl:w-1/3 xl:px-8 px-4">
                            <p class="book_image" v-if="typeof bookDetail.volumeInfo.imageLinks !== 'undefined'">
                                <img :src="bookDetail.volumeInfo.imageLinks.thumbnail" class="book-photo">
                            </p>
                            <p class="book_image" v-else>
                                <img src="@/assets/images/no-img.png" class="book-photo">
                            </p>
                        </div>
                        <div class="w-full sm:w-2/3 xl:w-2/3 xl:px-8 px-4">
                            <div class="book-content">
                                <div class="book-author">By: {{ displayAuthor(bookDetail.volumeInfo.authors) }}</div>
                                <div class="rate">
                                <div class="rating">
                                    <i class="icon-star"></i>
                                    <i class="icon-star"></i>
                                    <i class="icon-star"></i>
                                    <i class="icon-star"></i>
                                    <i class="icon-star"></i>
                                </div>
                                <span class="book-voters">Category: {{ displayCategory(bookDetail.volumeInfo.categories) }}</span>
                                </div>
                                <div class="book-sum" v-html="bookDetail.volumeInfo.description"></div>
                                <div class="book-link mt-20">
                                    <p>More Information: <a :href=" bookDetail.volumeInfo.infoLink" class="link">{{ bookDetail.volumeInfo.infoLink }}</a></p>
                                    <p>Preview Link: <a :href=" bookDetail.volumeInfo.previewLink" class="link">{{ bookDetail.volumeInfo.previewLink }}</a></p>
                                    <p v-if="bookDetail.saleInfo.buyLink">Buy Link: <a :href=" bookDetail.volumeInfo.previewLink" class="link">{{ bookDetail.saleInfo.buyLink }}</a></p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'modal',
    props: {
        bookDetail: {
            required: true,
            type: Object,
            default:[

            ]
        }
    },
    data(){
        return{
        book: [],
        categories: [],
        }
    },
    methods: {
      close() {
        this.$emit('closeModal');
      },
      displayAuthor(authors){
        return authors.join(',')
        },
        displayCategory(categories){
            // console.log(categories)
            if(typeof categories !== 'undefined'){
                return categories.join('/')
            }else{
                return 'Updating'
            }
        },
        displayImage(image){
            if(image){
                return image;
            }else{
                return "@/assets/images/no-img.png"
            }
        }
    },
  };
</script>
<style scoped>
    #close-modal{
        display: block;
        position: absolute;
        top: 3rem;
        right: 3rem;
        font-size: 1rem;
        color: var(--act-color);
    }
    .modal-lateral{
        width: 70%;
        height: 80vh;
        left: 50%;
        top: 50%;
        overflow-y: auto;
        transform: translate(-50%, -50%) !important;
    }
</style>