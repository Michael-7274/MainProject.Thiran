import React from 'react'
//tUuuXcvfx2h8Sl-7zufilTkur8PT1r3g5zdayJdoD_8
export default function GetImages() {

    const ACCESS_KEY = 'tUuuXcvfx2h8Sl-7zufilTkur8PT1r3g5zdayJdoD_8'; // Replace with your own API key
    const CATEGORY = 'electronics'; // Replace with the category you want to search for
    const RESULTS_PER_PAGE = 100; // Unsplash API default is 30, you can adjust this

    // Function to fetch photos from Unsplash
    async function fetchPhotos(page) {
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=
            ${CATEGORY}&page=${page}&per_page=${RESULTS_PER_PAGE}&client_id=${ACCESS_KEY}`);
            const data = await response.json();
            return data.results;
        } catch (error) {
            throw new Error(`Error fetching images: ${error}`);
        }
    }

    // Function to get 100 photos
    async function get100Photos() {
        let allPhotos = [];
        let page = 1;

        while (allPhotos.length < 100) {
            const photos = await fetchPhotos(page);
            allPhotos = allPhotos.concat(photos);
            page++;
        }

        return allPhotos.slice(0, 100); // Return only the first 100 photos
    }

    get100Photos()
        .then(photos => {
            console.log(photos);
        })
        .catch(error => {
            console.error(error);
        });

    return (
        <div>GetImages</div>
    )
}
