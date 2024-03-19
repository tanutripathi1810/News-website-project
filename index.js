let breakingImg = document.querySelector('#breakingImg')
let breakingNews_title = document.querySelector('#breakingNews .title')
let breakingNews_desc = document.querySelector('#breakingNews .description')
let topNews = document.querySelector('.topNews')
let sportsNews = document.querySelector('#sportsNews .newsBox')
let businessNews = document.querySelector('#businessNews .newsBox')
let techNews = document.querySelector('#techNews .newsBox')

let header = document.querySelector('.header')
let toggleMenu = document.querySelector('.bar')
let menu = document.querySelector('nav ul')

const toggle = (e)=>{
    toggleMenu.classList.toggle('active')
    menu.classList.toggle('activeMenu')
}

toggleMenu.addEventListener('click',toggle)



window.addEventListener('scroll',()=>{
    if(window.scrollY>50){
        header.classList.add('sticky')
    }
    else{
        header.classList.remove('sticky')
    }
})


const apiKey = "5f9ab8244ce14a40934cb7c5dabc8d3f"

const fetchData = async (category,pageSize)=>{
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`
    const data = await fetch(url)
    const response = await data.json()
    console.log(response);
    return response.articles
    
}

const add_breakingNews = (data)=>{
    breakingImg.innerHTML = `<img src=${data[0].urlToImage} alt="image">`
    breakingNews_title.innerHTML = `<a href=${data[0].url} target="_blank"><h2>${data[0].title}</h2></a>`
    breakingNews_desc.innerHTML = `${data[0].description}`
}
fetchData('general',5).then(add_breakingNews)


const add_topNews = (data) => {
    let html = '';
    let title = '';
    data.forEach((element) => {
        if (element.urlToImage) { 
            if (element.title.length < 100) {
                title = element.title;
            } else {
                title = element.title.slice(0, 100) + "...";
            }

            html += `<div class="news">
                        <div class="img">
                            <img src=${element.urlToImage} alt="image">
                        </div>
                        <div class="text">
                            <div class="title">
                                <a href=${element.url} target="_blank"><p>${title}</p></a>
                            </div>
                        </div>
                    </div>`;
        }
    });
    topNews.innerHTML = html;
};
fetchData('general',20).then(add_topNews)

const add_sportsNews = (data) => {
    let html = '';
    let title = '';
    data.forEach((element) => {
        if (element.urlToImage) { 
            if (element.title.length < 100) {
                title = element.title;
            } else {
                title = element.title.slice(0, 100) + "...";
            }

            html += `<div class="newsCard">
                        <div class="img">
                            <img src=${element.urlToImage} alt="image">
                        </div>
                        <div class="text">
                            <div class="title">
                                <a href=${element.url} target="_blank"><p>${title}</p></a>
                            </div>
                        </div>
                    </div>`;
        }
    });
    sportsNews.innerHTML = html;
};

fetchData('sports', 20).then(add_sportsNews);

const add_businessNews = (data) => {
    let html = '';
    let title = '';
    data.forEach((element) => {
        if (element.urlToImage) { 
            if (element.title.length < 100) {
                title = element.title;
            } else {
                title = element.title.slice(0, 100) + "...";
            }

            html += `<div class="newsCard">
                        <div class="img">
                            <img src=${element.urlToImage} alt="image">
                        </div>
                        <div class="text">
                            <div class="title">
                                <a href=${element.url} target="_blank"><p>${title}</p></a>
                            </div>
                        </div>
                    </div>`;
        }
    });
    businessNews.innerHTML = html;
};

fetchData('business',20).then(add_businessNews)
const add_techNews = (data) => {
    let html = '';
    let title = '';
    data.forEach((element) => {
        if (element.urlToImage) { 
            if (element.title.length < 100) {
                title = element.title;
            } else {
                title = element.title.slice(0, 100) + "...";
            }

            html += `<div class="newsCard">
                        <div class="img">
                            <img src=${element.urlToImage} alt="image">
                        </div>
                        <div class="text">
                            <div class="title">
                                <a href=${element.url} target="_blank"><p>${title}</p></a>
                            </div>
                        </div>
                    </div>`;
        }
    });
    techNews.innerHTML = html;
};
fetchData('technology',20).then(add_techNews)
function openSurvey() {
    window.open("news.html", "_blank");
}
searchButton.addEventListener("click", async function() {

    const query = searchText.value.trim();
    

    if (query === "") {
        alert("Please enter a search query.");
        return;
    }
    
    try {
    
        const searchData = await fetchData('Sports', 20); 
        const searchResults = searchData.filter(article => {

            return article.title.toLowerCase().includes(query.toLowerCase());
        });
        
       
        displaySearchResults(searchResults);
    } catch (error) {
        console.error('Error fetching search results:', error);
    
    }
});

function displaySearchResults(results) {
    let html = '';
    results.forEach(article => {
        
        html += `<div class="news">
                    <div class="img">
                        <img src="${article.urlToImage}" alt="image">
                    </div>
                    <div class="text">
                        <div class="title">
                            <a href="${article.url}" target="_blank"><p>${article.title}</p></a>
                        </div>
                    </div>
                </div>`;
    });
    
    topNews.innerHTML = html;
}



