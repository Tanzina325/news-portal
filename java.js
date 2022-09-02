const loadMedias =()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res=>res.json())
    .then(data=>displayMedias(data.data.news_category))
}
const displayMedias = medias=>{
    console.log(medias);
     const categoryContainer = document.getElementById('category-container');
     medias.forEach(media =>{
        console.log(media.category_name)
        const categoryList = document.createElement('li');
        categoryList.innerHTML= `<button class="p-8">${media.category_name}</button>`;
    categoryContainer.appendChild(categoryList)
     }
        )
}

    loadMedias();