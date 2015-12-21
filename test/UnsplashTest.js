import test         from "tape";
import sinon        from "sinon";
import request      from "request";
import fs           from "fs";
import UnsplashCore from "../UnsplashCore";

import { install }  from 'source-map-support';
install();

const createServiceStubs =  () => (
  {
    request : request,
    fs: fs
  }
);

// -------------  #createUnsplashUrl ------------- //
test("When called createUnsplashUrl with no 'categoryName' argument, it returns random image url request", (t) =>{

  const services = createServiceStubs();
  const Unsplash = UnsplashCore(services);

  const options = {
    photoResolution: '1920x1080'
  };
  const randomImageUrl = 'https://source.unsplash.com/random/1920x1080';

  t.plan(1);
  Unsplash.createUnsplashUrl('1920x1080')
  .then((url) => {
    t.ok(url === randomImageUrl, 'returns correct url');
  });
});

test("When called createUnsplashUrl with categoryName argument, it returns category image url request", (t) =>{

  const services = createServiceStubs();
  const Unsplash = UnsplashCore(services);

  const options = {
    photoResolution: '1920x1080',
    categoryName: 'nature'
  };

  const categoryImageUrl =   `https://source.unsplash.com/category/nature/1920x1080`;

  t.plan(1);
  Unsplash.createUnsplashUrl(options)
  .then((url) => {
    t.equal(url,categoryImageUrl, 'returns correct url');
  });
});

test("When called createUnsplashUrl without resolution it uses the default one", (t) =>{

  const services = createServiceStubs();
  const Unsplash = UnsplashCore(services);

  const options = {
    categoryName: 'nature'
  };

  const categoryImageUrl =   `https://source.unsplash.com/category/nature/1920x1080`;

  t.plan(1);
  Unsplash.createUnsplashUrl(options)
  .then((url) => {
    t.equal(url,categoryImageUrl, 'returns correct url');
  });
});

test("When called createUnsplashUrl without options it returns random url", (t) =>{

  const services = createServiceStubs();
  const Unsplash = UnsplashCore(services);

  const options = {};

  const randomImageUrl = 'https://source.unsplash.com/random/1920x1080';

  t.plan(1);
  Unsplash.createUnsplashUrl(options)
  .then((url) => {
    t.equal(url,randomImageUrl, 'returns correct url');
  });
});


// -------------  #downloadImage ------------- //

const setup = () => {
  const services = createServiceStubs();
  services.request.get = sinon.spy(request, "get");
  services.fs.createWriteStream = sinon.spy(fs, "createWriteStream");
  return services;
};
const teardown = (services) => {
  services.request.get.restore();
  services.fs.createWriteStream.restore();
};
test("When called downloadImage....", (t) =>{

  const services = setup();

  const Unsplash = UnsplashCore(services);
  const url = 'https://source.unsplash.com/random/1920x1080';

  t.plan(2);
  Unsplash.downloadImage(`${__dirname}/junk/image.jpg`, url)
  .then((url) => {
    t.ok(services.request.get.calledWith('https://source.unsplash.com/random/1920x1080'), 'calls request correctly');
    t.ok(services.fs.createWriteStream.calledWith(`${__dirname}/junk/image.jpg`), 'calls createWriteStream correctly');
    teardown(services);
  });

  //remove all files downloaded into junk

});
