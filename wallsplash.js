import R          from "ramda";
import request    from "request";
import Q          from "q";
import fs         from "fs";
import wallpaper  from "wallpaper";

const unsplashBaseUrl = 'https://source.unsplash.com';
const imageDestinationPath = 'C:/junk';

const createUnsplashUrl = (photoResolution, categoryName) => {
  let url;
  categoryName === "random"?
    url = `${unsplashBaseUrl}/random/${photoResolution}`:
    url = `${unsplashBaseUrl}/category/${categoryName}/${photoResolution}`;
  const deferred = Q.defer();
  deferred.resolve(url);
  return deferred.promise;
};
const downloadImage = (destinationPath, imageUrl) => {
  console.log(`ready to download: ${imageUrl} to ${destinationPath}`);
  const deferred = Q.defer();
  const url = `${imageUrl}`; // why ?

    request.get(url)
    .on('error', err => deferred.reject(new Error(error)))
    .pipe(fs.createWriteStream(destinationPath))
    .on('error',  err => deferred.reject(new Error(error)))
    .on('finish', () => deferred.resolve(destinationPath));
  return deferred.promise;
};


const curriedCreateUnsplashUrl = R.curry(createUnsplashUrl);
const curriedDownloadImage = R.curry(downloadImage);
const createUnsplashUrlLarge = curriedCreateUnsplashUrl("1920x1080");
const downloadImageToJunkFolder = curriedDownloadImage(imageDestinationPath + '/image.jpg');


const searchAndDownload = R.pipe(createUnsplashUrlLarge,downloadImageToJunkFolder);
const main = () => {
  searchAndDownload('random')
  .then((imagePath) => {
    wallpaper.set(imagePath)
    setTimeout(main, 3000);
  });
}

//Main loop
setTimeout(main, 3000);
