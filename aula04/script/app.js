(function(){
    const FLICKRKEY = 'd6c0a046d4e9509c5c8973bf907d2114';
    const FLICKRURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=';

    function getPhoto (searchTerm){
        const URL = `${FLICKRURL}${FLICKRKEY}&text=${searchTerm}`;
        return fetch(URL)
            .then(response => response.json())
            .then(data => data.photos.photo);
    }
    
    function createFlickrThumbNail(photoObj){
        let a = document.createElement('a')
        a.setAttribute('href', photoObj.large);
        a.setAttribute('target', '_blank');

        let thumbImage = document.createElement('img');
        thumbImage.setAttribute('src', photoObj.thumb);
        thumbImage.setAttribute('alt', photoObj.title);

        a.appendChild(thumbImage);
        return a;
    }

    function createSearchText(searchWord){
        document.querySelector('#search-title').innerText ="Mostrando resultados para: " + searchWord;
        document.querySelector('#svg-div').className="loading-div-enable"
    }
    
    function removeChildDivs(parentElementClassId){
        const parentElement = document.querySelector(parentElementClassId);
        while(parentElement.firstChild){
            parentElement.removeChild(parentElement.lastChild);
        }
    }

    function submitSearch(event){
        event.preventDefault();
        const search = searchInput.value;
        if (search === null || search === undefined){
            return;
        }
        document.querySelector(".input-search").value = "";
        createSearchText(search);
        
        //cheguei até aqui
        getPhoto(search)
            .then( result => {
                if (photoDiv.hasChildNodes()){
                    removeChildDivs(".photos-div");
                }
                document.querySelector('#svg-div').className="loading-div-disable";
                result.forEach(photo => {
                    const URL = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
                    const thumb = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
                    const item = createFlickrThumbNail({
                        thumb: thumb,
                        large: URL,
                        title: photo.title,
                    });
                    photoDiv.appendChild(item);
                });
            });
    }

    const resultForm = document.querySelector(".search-form");
    const searchInput = document.querySelector(".input-search");
    const photoDiv = document.querySelector(".photos-div");
    resultForm.addEventListener('submit', submitSearch);
}())