let search = document.getElementById('search-field')
let container = document.querySelector('.box')
let filterBtns = document.querySelectorAll('.filter'),
    BtnSearch = document.querySelector('.search-button')

let filmData = []

filterBtns.forEach((btn) => {
    let filterType
    btn.addEventListener('click', (e) => {
        filterType = e.target.textContent.toLowerCase()//text btn
        switch (filterType) {
            case 'series':
                renderFilmByTypes(filmData, filterType)
                break;
            case 'movie':
                renderFilmByTypes(filmData, filterType)
                break;
            case 'game':
                renderFilmByTypes(filmData, filterType)
                break;
            default:
                renderAllFilm(filmData)
                break;
        }
    })
})

BtnSearch.addEventListener('click', () => {
    fetchMovie(search.value)
})

search.addEventListener('keyup', (e) => {
    let filmName = e.target.value
    if (filmName.trim().length > 3) {
        filmData = []//filmData очурду
        console.log(filmData);
        fetchMovie(filmName)
    }
})

fetchMovie('marvel')

function fetchMovie(name) {
    console.log('get Film')
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=4ab21d00&s=${name}`)
        .then((response) => response.json())
        .then((data) => {
            renderMovie(data)
            filmData.push(data)
            console.log(filmData)
        })
}

function renderAllFilm(data) {
    container.innerHTML = data[0].Search.map((film) => {
        return `
                <div class="movie">
                    <div class="movie-image">
                            <img src=${film.Poster} alt=""/>
                    </div>
                    <div>
                        <h4>Name: ${film.Title}</h4>
                        <p>Year: ${film.Year}</p>
                        <p>Type: ${film.Type}</p>
                    </div>
                </div>`
    }).join(' ')

}

function renderFilmByTypes(data, type) {
    let filteredFilm = data[0].Search.filter((film) => film.Type === type)
    container.innerHTML = filteredFilm.map((film) => {
        return `
                <div class="movie">
                    <div class="movie-image">
                            <img src=${film.Poster} alt=""/>
                    </div>
                    <div>
                        <h4>Name: ${film.Title}</h4>
                        <p>Year: ${film.Year}</p>
                        <p>Type: ${film.Type}</p>
                    </div>
                </div>`
    }).join(' ')
}

function renderMovie(data) {
    container.innerHTML = data.Search.map((film) => {
        return `
                <div class="movie">
                    <div class="movie-image">
                            <img src=${film.Poster} alt=""/>
                        </a>
                    </div>
                    <div>
                        <h4>Name: ${film.Title}</h4>
                        <p>Year: ${film.Year}</p>
                        <p>Type: ${film.Type}</p>
                    </div>
                </div>`
    }).join(' ')
}



