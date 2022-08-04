const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

async function getToken() {
    console.log(clientId)
    const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token; 
}

async function getGenres(token) {
    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    return data.categories.items;
}

async function getPlaylistByGenre(token, genreId) {
    const limit = 10;
    
    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    return data.playlists.items;
}

async function search(token, name, type) {
    const limit = 10;

    const result = await fetch(`https://api.spotify.com/v1/search?q=${name}&type=${type}&limit=${limit}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();

    console.log(data);
    return data;
}

function getGenreIdFromName(name, genres) {
    for (var i=0; i<genres.length; i++) {
        if (genres[i].name.toLowerCase() === name.toLowerCase()) {
            return genres[i].id;
        }
    }
    return 0;
}

export {getToken, getGenres, getPlaylistByGenre, getGenreIdFromName, search};