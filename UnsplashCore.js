//Core module for Unsplash
import Q          from "q";

import { install } from 'source-map-support';
install();


const unsplashBaseUrl = 'https://source.unsplash.com';

const UnsplashCore = (services) => ({
  createUnsplashUrl:({photoResolution: photoResolution = '1920x1080', categoryName: categoryName = 'random'}) => {
    let url;
    categoryName === "random"?
      url = `${unsplashBaseUrl}/random/${photoResolution}`:
      url = `${unsplashBaseUrl}/category/${categoryName}/${photoResolution}`;
    const deferred = Q.defer();
    deferred.resolve(url);
    // deferred.reject("Error");
    return deferred.promise;
  },
  downloadImage:(destinationPath, imageUrl) => {
    console.log(`ready to download: ${imageUrl} to ${destinationPath}`);
    const deferred = Q.defer();
    // const url = `${imageUrl}`; // why ?

      services.request.get(imageUrl)
      .on('error', err => deferred.reject(new Error(error)))
      .pipe(services.fs.createWriteStream(destinationPath))
      .on('error',  err => deferred.reject(new Error(error)))
      .on('finish', () => deferred.resolve(destinationPath));
    return deferred.promise;
  }
});

export default UnsplashCore;




export default UnsplashCore
