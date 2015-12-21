import Wallsplash         from "./WallsplashShell";
import WallsplashOptions  from './WallsplashOptions';
import PromiseMaybe       from './PromiseMaybe';


  const main = (options) => {


    PromiseMaybe(options)
    .then((input) => {
      const ws = Wallsplash();
      return ws.changeWallpaper(input)
    })
    .then((output) => {
      console.log(`isNothing? ${output.isNothing()}`);
      setTimeout(main(options), 5000)
    });
  }
  //Main loop

  const options = WallsplashOptions({
    photoResolution : '1920x1080',
    categoryName: 'nature'
  });
  setTimeout(main(options), 5000);
