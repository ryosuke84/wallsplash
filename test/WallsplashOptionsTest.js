import test               from "tape";
import sinon              from "sinon";
import WallsplashOptions  from "../WallsplashOptions";

import { install }  from 'source-map-support';
install();


test("When WallsplashOptions is called with correct resolution and category it is not considered null", (t) => {
  const options = {
    photoResolution: '1920x1080',
    categoryName: 'buildings'
  };

  const opts = WallsplashOptions(options);

  t.ok(!opts.isNull(), 'WallsplashOptions is not null');
  t.end();
});
