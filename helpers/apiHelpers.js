import unsplashInstance from '../config/unsplash';

export const getTenRandomPhotos = async () => {
    return await unsplashInstance.photos.getRandom({
        count: 10
    })
};
