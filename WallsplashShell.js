import request    from "request";
import fs         from "fs";
import wallpaper  from "wallpaper";
import WallsplashCore from "./WallsplashCore";
import Unsplash       from "./Unsplash";

const services = {
  request: request,
  fs: fs,
  wallpaper: wallpaper,
  unsplash: Unsplash()
};

const WallspashShell = () => WallsplashCore(services);

export default WallspashShell;
