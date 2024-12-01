

function getMovie(movieName){

    let url = `http://www.omdbapi.com/?apikey=c9123a6b&s=${movieName}`;


const movieBox = document.querySelector('#movie-box');
movieBox.innerHTML = ''
fetch(url,{
    method: "GET",
    contentType: "application/json",
    accept: "application/json",
})
.then(response => response.json())
.then(data => {
    console.log(data.Search);
    let movies = data.Search;
    movies.forEach((movie)=>{
        let cardElement = `
        <div class="col-md-4 ">
                <div class="movie-card mt-3">
                    <div class="card shadow ">
                        <div class="movie-img">
                            <img src="${movie.Poster}" alt="" class="card-img-top">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${movie.Title}</h5>
                            <span>${movie.Year}</span>
                            <p class="card-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                            <button id="viewMoreBtn" data-id="${movie.imdbID}" class="btn btn-outline-secondary float-end">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        movieBox.innerHTML += cardElement;

    })
    
    document.querySelectorAll('#viewMoreBtn').forEach(button=>{
        button.addEventListener('click',(e)=>{
            const movieId = e.target.getAttribute('data-id');
            getMovieDetails(movieId)
        })
    })
    
})
.catch(error => console.log(error));


}
// Movie Details 
function getMovieDetails(movieId){
    const url = `http://www.omdbapi.com/?apikey=c9123a6b&i=${movieId}`

    fetch(url,{
        method: 'GET',
        contentType: 'application/json'
    })
    .then(res=> res.json())
    .then(data=>{
        const detailView = document.getElementById('detailView');
        console.log(data)
        const element = `
            <div class="col-10 mx-auto">
                <div class="card banner mt-3 rounded shadow">
                    <div class="banner-img">
                        <img src="${data.Poster}" class="rounded-start" alt="">
                    </div>
                    <div class="text mt-5">
                        <h3>${data.Title}</h3>
                        <p class="fw-bold">
                            Published : <span class="text-muted">2024</span> Type : <span class="text-muted">${data.Type}</span>
                        </p>
                        <button class="btn btn-warning fw-bold">IMDB ${data.imdbRating}</button>
                        <p class="mt-3">
                            ${data.Plot}
                        </p>
                    </div>
                </div>
            </div>
        `
        detailView.innerHTML = element;
    })
}

// Search movie 
const searchBtn = document.querySelector('#searchBox');
searchBtn.addEventListener('keypress',(e)=>{
    if (e.key=='Enter'){
        let searchVal = e.target.value
        console.log(searchVal)
        getMovie(searchVal)
        // e.target.value = ''
    }
})






