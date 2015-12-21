import R          from "ramda";
import Q          from "q";
import PromiseMaybe      from './PromiseMaybe';
import WallsplashOptions      from './WallsplashOptions';

const WallsplashCore = (services) => {
  const unsplashBaseUrl = 'https://source.unsplash.com';
  const imageDestinationPath = 'C:/junk';

  //Building blocks
  // const createUnsplashUrl = ({photoResolution: photoResolution = '1920x1080', categoryName: categoryName = 'random'}) => {
  //   let url;
  //   categoryName === "random"?
  //     url = `${unsplashBaseUrl}/random/${photoResolution}`:
  //     url = `${unsplashBaseUrl}/category/${categoryName}/${photoResolution}`;
  //   const deferred = Q.defer();
  //   deferred.resolve(url);
  //   // deferred.reject("Error");
  //   return deferred.promise;
  // };
  // const downloadImage = (destinationPath, imageUrl) => {
  //   console.log(`ready to download: ${imageUrl} to ${destinationPath}`);
  //   const deferred = Q.defer();
  //   const url = `${imageUrl}`; // why ?
  //
  //     services.request.get(url)
  //     .on('error', err => deferred.reject(new Error(error)))
  //     .pipe(services.fs.createWriteStream(destinationPath))
  //     .on('error',  err => deferred.reject(new Error(error)))
  //     .on('finish', () => deferred.resolve(destinationPath));
  //   return deferred.promise;
  // };

  const map = R.curry((fn, functor) => functor.bind(fn));
  const curriedDownloadImage = R.curry(services.unsplash.downloadImage);
  const downloadImageToJunkFolder = curriedDownloadImage(imageDestinationPath + '/image.jpg');


  const changeWallpaper = R.pipeP(map(services.unsplash.createUnsplashUrl),map(downloadImageToJunkFolder), map(services.wallpaper.set));

  return {
    changeWallpaper:changeWallpaper
  };
};

export default WallsplashCore;
// const searchAndDownload = R.pipeP(map(createUnsplashUrlLarge),map(downloadImageToJunkFolder), map(wallpaper.set));



// const main = (options) => {
//   PromiseMaybe(options)
//   .then((input) => searchAndDownload(input))
//   .then((output) => {
//     console.log(`isNothing? ${output.isNothing()}`);
//     setTimeout(main(options), 5000)
//   });
// }
//
// //Main loop
//
// const options = WallsplashOptions({
//   photoResolution : '1920x1080',
//   categoryName: 'nature'
// });
// setTimeout(main(options), 5000);
