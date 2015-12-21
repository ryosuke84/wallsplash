import R          from "ramda";

const resolutionRegEx = /^\d+[x]\d+$/;
const categories = ['buildings', 'food', 'nature', 'people', 'technology', 'objects', 'random'];

const opts = {
  photoResolution: null,
  categoryName: null,
  isNull: function () {
    if(((resolutionRegEx.exec(this.photoResolution) === null) || (this.categoryName !== null && this.categoryName !== 'undefined' && !(R.contains(this.categoryName,categories)))))
      return true;
       return false;
  }
};

const WallsplashOptions = (options) => (Object.assign(Object.create(opts),R.pick(['photoResolution', 'categoryName'], options)));



export default WallsplashOptions;
