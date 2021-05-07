import unsplashInstance from '../config/unsplash';

export const fetchTenRandomPhotosPhotos = async () => {
    return await unsplashInstance.photos.getRandom({
        count: 10
    })
};

export const getPhotosBySearch = async ({ input }) => {
    return await unsplashInstance.search.getPhotos({
        query: input,
        page: 1,
        perPage: 10
    })
};