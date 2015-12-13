import R          from "ramda";

const resolutionRegEx = /^\d+[x]\d+$/;
const categories = ['buildings', 'food', 'nature', 'people', 'technology', 'objects'];

const WallsplashOptions = (options) => R.pick(['photoResolution', 'categoryName'], options);


WallsplashOptions.prototype.isNull = () => {
  ((resolutionRegEx.exec(photoResolution) === null) || !(R.contains(categoryName,categories)))?
    true:
     false;
}

export default WallsplashOptions;
