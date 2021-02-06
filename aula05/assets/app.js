
const URL_FETCH_CATEGORIES='https://api.chucknorris.io/jokes/categories';
const BASE_URL='https://api.chucknorris.io/jokes/';
const METHOD='GET';
const CONTENT_TYPE='application/json';
const MODE = 'cors';

async function getJoke(category){
    const joke = await getRandomJokeFromCategorie(category);
    const divJokes = document.querySelector(".joke-result");
    if (divJokes.hasChildNodes()){
        removeChildDivs(".joke-result")
    }
    const card = createJokeCard({
        url: joke.icon_url,
        joke: joke.value,
    })
    divJokes.appendChild(card)
}

async function submitSearchQueryJoke(){
    var query = document.querySelector(".search-input");
    await getAllJokes(query.value)
        .then(result => {
            var divJokes = document.querySelector(".joke-result")
            if (divJokes.hasChildNodes()){
                removeChildDivs(".joke-result")
            }
            result.result.forEach(joke => {
                const ICON = joke.icon_url;
                const piada = joke.value;
                const card = createJokeCard({
                    url: ICON,
                    joke: piada,
                });
                divJokes.appendChild(card);
            })
    })

}

function createJokeCard(JokeObj){
    let div = document.createElement('div');
    div.setAttribute('class', 'joke-result');

    let img = document.createElement('img');
    img.setAttribute('src', JokeObj.url);
    
    let p = document.createElement('p');
    p.setAttribute('class', 'joke-chuck');
    p.textContent = JokeObj.joke;

    div.appendChild(img);
    div.appendChild(p);
    return div;
}


function removeChildDivs(parentElementClassId){
    const parentElement = document.querySelector(parentElementClassId);
    while(parentElement.firstChild){
        parentElement.removeChild(parentElement.lastChild);
    }
}

async function getAllJokes(query){
    try {
        const res = await fetch(`${BASE_URL}search?query=${query}`, {
            method: METHOD,
            mode: MODE,
            headers: {
                'Content-type': CONTENT_TYPE,
            }
        });
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

async function getRandomJokeFromCategorie(categorie){
    try {
        const res = await fetch(`${BASE_URL}random?categorie=${categorie}`, {
            method: METHOD,
            mode: MODE,
            headers: {
                'Content-type': CONTENT_TYPE,
            }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    } 
}

async function getRandomJoke(){
    try {
        const res = await fetch(`${BASE_URL}random`, {
            method: METHOD,
            mode: MODE,
            headers: {
                'Content-type': CONTENT_TYPE,
            }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}
