import Vue from 'vue'

Vue.filter("toLowerCase",  function(value)  {
    if  (!value)  {
        return  "";
    }
    value  =  value.toString();
    return  value.toLowerCase().replace(/\s/g, '');
});

Vue.filter("formatAuthor",  function(authors)  {
    if  (!authors)  {
        return  "";
    }

    return authors.join(',');
});

Vue.filter("formatCategories",  function(categories)  {
    if(typeof categories !== 'undefined'){
        return categories.join(',')
    }else{
        return 'Updating'
    }
});