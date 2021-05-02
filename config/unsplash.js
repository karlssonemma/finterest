import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
})

const unsplashInstance = unsplash;
export default unsplashInstance;