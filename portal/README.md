# SGDS Portal powered with Jekyll 

This is a static site build with jekyll 

## Image compression

Image compression helps to reduce the bundle size of the images with lossless in quality. 
Imagemin library plugins are used to generate this. This process will take some time, so it is only recommended to run in production builds. 

When you are adding new images to the portal
- Add new images to `assets/uncompressed-image` folder 
- Run `npm run build`. Webpack in production mode will run imagemin plugins to generate compressed images into `img` folder 
- `npm run dev` to start your development work 