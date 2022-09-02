const loadMedias =()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res=>res.json())
    .then(data=>displayMedias(data.data.news_category))
}
const displayMedias = medias=>{
    // console.log(medias);
     const categoryContainer = document.getElementById('category-container');
     medias.forEach(media =>{
        // console.log(media.category_name)
        const categoryList = document.createElement('li');
        categoryList.innerHTML= `<button onclick=categoryIdList('${media.category_id}') class="p-8">${media.category_name}</button>`;
    categoryContainer.appendChild(categoryList)
     }
        )
}
const categoryIdList =(categoryId)=>{
    url= `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    // console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCategoryIdList(data.data))
}
const displayCategoryIdList =categoryNews =>{
console.log(categoryNews);
const newsContainer = document.getElementById('news-container');
newsContainer.textContent = '';
categoryNews.forEach(category=>{
    const newsContainerDiv = document.createElement('div');
    newsContainerDiv.innerHTML = `
    <div class="card card-side bg-base-100 m-16 shadow-xl">
  <figure><img src="${category.thumbnail_url}" alt="Movie"></figure>
  <div class="card-body w-3/5">
    <h2 class="card-title">${category.title}</h2>
    <p>${category.details.slice(0,250)}</p>
    
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Watch</button>
    </div>
  </div>
</div>`
newsContainer.appendChild(newsContainerDiv);
})
}
// categoryIdList(07);
    loadMedias();