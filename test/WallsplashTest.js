import test               from "tape";
import sinon              from "sinon";
import Q                  from "q";
import wallpaper          from "wallpaper";
import WallsplashOptions  from '../WallsplashOptions';
import PromiseMaybe       from '../PromiseMaybe';
import Unsplash           from "../Unsplash";
import WallsplashCore     from "../WallsplashCore";

import { install }  from 'source-map-support';
install();

const createServiceStubs = () => ({
  wallpaper: {
    set: sinon.stub()
  },
  unsplash: sinon.stub(Unsplash())
});

const setup = () => {
  const services = createServiceStubs();

  services.wallpaper.set.returns(Q("foo"));
  services.unsplash.createUnsplashUrl.returns(Q("http://foo.bar"));
  services.unsplash.downloadImage.returns(Q("foo/bar/baz.jpg"));

  return services;
};

const teardown = (services) => {
  services.wallpaper.set.restore();
  services.unsplash.createUnsplashUrl.restore();
  services.unsplash.downloadImage.restore();
};


test('When called changed wallpaper it creates an url based on options, downloads the image and sets the wallpaper', (t) => {
  const services = setup();



  t.plan(2);
  t.timeoutAfter(5000);
  const options = WallsplashOptions({
    photoResolution : '1920x1080',
    categoryName: 'nature'
  });

  PromiseMaybe(options)
  .then((input) => {
    console.log('strunz1');
    const ws = WallsplashCore(services);
    const res =  ws.changeWallpaper(input);
    console.log(res);
    return res;
  })
  .then((result) => {
    t.ok(services.unsplash.createUnsplashUrl.calledWith(options), 'createUrl correctly called');
    // t.ok(services.unsplash.downloadImage.calledWith("http://foo.bar"), 'downloadImage correctly called');
    t.ok(services.wallpaper.set.calledWith("foo/bar/baz.jpg"), 'setWallpaper correctly called');

    teardown(services);
  });

});
