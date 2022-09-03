const loadMedias =()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res=>res.json())
    .then(data=>displayMedias(data.data.news_category))
    .catch(error=>console.log(error))
}
const displayMedias = medias=>{
    // console.log(medias);
     const categoryContainer = document.getElementById('category-container');
    
     medias.forEach(media =>{
        // console.log(media.category_name)
        
        const categoryList = document.createElement('li');
        categoryList.innerHTML= `<button onclick="categoryIdList('${media.category_id}')" class="p-8">${media.category_name}</button>`;
        
     categoryContainer.appendChild(categoryList); }
       )
        }


const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader')
  if(isLoading){
loaderSection.classList.remove('hidden')
  }
  else{loaderSection.classList.add('hidden')}
}
const categoryIdList =(categoryId)=>{
    url= `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    // console.log(url)
    toggleSpinner(true);
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCategoryIdList(data.data))
    .catch(error=>console.log(error))
    
}
const displayCategoryIdList =categoryNews =>{
  // console.log(categoryNews);
const lengthContainer = document.getElementById('length-container')
lengthContainer.textContent='';
const lengthDiv =document.createElement('div');
lengthDiv.innerHTML = `<p class ="text-center p-5">In this category ${categoryNews.length} items are found</p>`;
lengthContainer.appendChild(lengthDiv);

const newsContainer = document.getElementById('news-container');
newsContainer.textContent = '';
categoryNews.sort((a,b)=>{return b.total_view -a.total_view})
categoryNews.map(category=>{
console.log(category)


    const newsContainerDiv = document.createElement('div');
    newsContainerDiv.innerHTML = `
    <div class="card lg:card-side bg-base-100 m-16 shadow-xl">
  <figure><img src="${category.thumbnail_url}" alt="Movie"></figure>
  <div class="card-body lg:w-3/5">
    <h2 class="card-title">${category.title}</h2>
    <p>${category.details.slice(0,350)+' ...'}</p>
    <div class ="inline">
    <img  class="w-16 rounded-full " src="${category.author.img}" alt=>
    <span class="pt-40">${category.author.name ?category.author.name :'name of author not found'}</span>
    </div>
    <div class="inline  my-5"><i class="fa-regular fa-eye"></i><span class="ml-4">${category.total_view ?category.total_view :'viewer not found'}</span></div>
    <div class="card-actions justify-end">
    <label for="my-modal-6" onclick="newsDetails('${category._id}')" class="btn modal-button">Details</label>
    </div>
  </div>
</div>`
newsContainer.appendChild(newsContainerDiv);
})
toggleSpinner(false);
}
const newsDetails =(detailsId)=>{
  url= ` https://openapi.programming-hero.com/api/news/${detailsId}`
  // console.log(url)
  fetch(url)
  .then(res=>res.json())
  .then(data=>displayNewsDetails(data.data[0]))
  
}
const displayNewsDetails =(categoryId) =>{
console.log(categoryId)
const detailModalTitle = document.getElementById('modal-body');
detailModalTitle.innerHTML=`
<h3 class="font-bold text-lg">Title: ${categoryId.title}</h3>
<img  class="w-96  " src="${categoryId.image_url}" alt=>
<img  class="w-12 mt-5 rounded-full " src="${categoryId.author.img}" alt=>
<span class="pt-40">${categoryId.author.name ?categoryId.author.name :'name of author not found'}</span>
<div class="inline  m-5"><i class="fa-regular fa-eye"></i><span class="ml-4">${categoryId.total_view ?categoryId.total_view :'viewer not found'}</span></div>
<div class="modal-action">
  <label for="my-modal-6" class="btn">Yay!</label>
  </div>`

}
// categoryIdList(07);
loadMedias();