import R          from "ramda";
import request    from "request";
import Q          from "q";
import fs         from "fs";
import wallpaper  from "wallpaper";
import PromiseMaybe      from './PromiseMaybe';

const unsplashBaseUrl = 'https://source.unsplash.com';
const imageDestinationPath = 'C:/junk';
const resolutionRegEx = /^\d+[x]\d+$/;
const categories = ['buildings', 'food', 'nature', 'people', 'technology', 'objects'];




//Building blocks
const createUnsplashUrl = (photoResolution, categoryName) => {
  let resolution = photoResolution || "1920x1080";
  let category = categoryName || "random";
  let url;
  categoryName === "random"?
    url = `${unsplashBaseUrl}/random/${photoResolution}`:
    url = `${unsplashBaseUrl}/category/${categoryName}/${photoResolution}`;
  const deferred = Q.defer();
  deferred.resolve(url);
  // deferred.reject("Error");
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

const map = R.curry((fn, functor) => functor.bind(fn));

const curriedCreateUnsplashUrl = R.curry(createUnsplashUrl);
const curriedDownloadImage = R.curry(downloadImage);
const createUnsplashUrlLarge = curriedCreateUnsplashUrl("1920x1080");
const downloadImageToJunkFolder = curriedDownloadImage(imageDestinationPath + '/image.jpg');

const searchAndDownload = R.pipeP(map(createUnsplashUrlLarge),map(downloadImageToJunkFolder), map(wallpaper.set));
// const searchAndDownload = R.pipeP(map(createUnsplashUrlLarge),console.log);

const main = () => {
  PromiseMaybe('random')
  .then((input) => searchAndDownload(input))
  .then(() => setTimeout(main, 5000));
  // .then((imagePath) => {
  //   console.log(`file path: ${imagePath.isNothing()}`);
  //   console.log(imagePath.val())
  //   wallpaper.set(imagePath.val())
  //   setTimeout(main, 5000);
  //   }, (error) => console.log(error));
  // });
}

//Main loop
setTimeout(main, 5000);
