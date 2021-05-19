import unsplashInstance from '../config/unsplash';

export const fetchRandomPhotos = async (count) => {
    return await unsplashInstance.photos.getRandom({
        count: count
    })
};

export const getPhotosBySearch = async (input, pageNr) => {
    return await unsplashInstance.search.getPhotos({
        query: input,
        page: pageNr,
        perPage: 30
    })
};
export const getPhotosByColor = async ({ color }) => {
    return await unsplashInstance.search.getPhotos({
        query: 'cat',
        color: color,
        page: 1,
        perPage: 1
    })
};
