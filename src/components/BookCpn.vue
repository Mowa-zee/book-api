<template>
    <div class="flex flex-wrap relative xxl:-mx-8 -mx-4">
        <div v-for="book in books" :key="book.id" class="w-full md:w-1/2 xl:w-1/2 lg:px-8 lg:pb-16 px-6 pb-12 book">
            <div class="shadow">
                <div class="book-cell">
                <a class="book-img" @click.prevent="handleClick(book.id)" v-if="typeof book.volumeInfo.imageLinks !== 'undefined'">
                    <img :src="book.volumeInfo.imageLinks.thumbnail" class="book-photo">
                </a>
                <a class="book-img" @click.prevent="handleClick(book.id)" v-else>
                    <img src="@/assets/images/no-img.png" class="book-photo">
                </a>
                <div class="book-content">
                    <div class="book-title">
                        {{book.volumeInfo.title}}
                    </div>
                    <div class="book-author">By: {{ book.volumeInfo.authors | formatAuthor }}</div>
                    <div class="rate">
                    <div class="rating" v-if="!!book.volumeInfo.averageRating">
                        <!-- {{ Math.round(book.volumeInfo.averageRating) }} -->
                        <i class="icon-star" v-for="index in Math.round(book.volumeInfo.averageRating)" :key="index"></i>
                        <!-- {{ book.volumeInfo.averageRating }} -->
                    </div>
                    <div class="rating" v-else>
                        <i class="icon-star"></i>
                    </div>
                    <span class="book-voters">Category: {{ book.volumeInfo.categories | formatCategories }}</span>
                    </div>
                    <div class="book-sum">{{book.volumeInfo.description}}</div>
                    <button type="button" class="btn mt-5" @click="handleClick(book.id)">More Info</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BookCpn',
    props: {
        books: {
            required: true,
            type: Array
        }
    },
    methods: {
      handleClick(id) {
        this.$emit('openModal', id);
      },
    },
}
</script>

<style>

</style>