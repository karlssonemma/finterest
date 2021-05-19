import unsplashInstance from '../config/unsplash';

export const fetchTenRandomPhotos = async () => {
    return await unsplashInstance.photos.getRandom({
        count: 30
    })
};

export const fetchOneRandomPhoto = async () => {
    return await unsplashInstance.photos.getRandom({
        count: 4
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
