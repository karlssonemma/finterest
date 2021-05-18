import unsplashInstance from '../config/unsplash';

export const fetchTenRandomPhotos = async () => {
    return await unsplashInstance.photos.getRandom({
        count: 6
    })
};

export const fetchOneRandomPhoto = async () => {
    return await unsplashInstance.photos.getRandom({
        count: 1
    })
};

export const getPhotosBySearch = async ({ input }) => {
    return await unsplashInstance.search.getPhotos({
        query: input,
        page: 1,
        perPage: 10
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
