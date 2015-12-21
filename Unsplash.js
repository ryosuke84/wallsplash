import request    from "request";
import fs         from "fs";
import UnsplashCore from "./UnsplashCore";

const services = {
  request: request,
  fs: fs
};


const Unsplash = () => UnsplashCore(services);

export default Unsplash;
