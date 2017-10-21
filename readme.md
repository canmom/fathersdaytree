Displays an animated SVG fractal tree, animated as growing out of the ground. Could potentially allow drawing of an arbitrary number of trees.

The fractal is based on a recursive scheme, where each branch takes on the transformation of the previous branch, translates itself along the length of that branch, and rotates and is scaled.

This is possible because each command in an SVG transform property also transforms the coordinate system of the element. So, for example, if you scale an element by a factor of 0.8 and then translated it by a length 1, it will only be moved a length of 0.8. If it is rotated by 20 degrees and then translated in the Y direction, the translation will 20 degrees from the Y translation.

[Anime.js](http://animejs.com/) is used to create the growing animation of each branch, by moving the endpoint of the svg line element. All branches are transformed in the same simple way, but due to the coordinate system transformations, they grow in many directions.

The sliders at the bottom of the screen control parameters: the base angle between successive branches (on top of which a small amount of variation is added), the size of each branch relative to the previous, and the number of fractal generations.

At the end of each branch is a small cluster of branch-sized elliptical leaves with random angles.

This project was created in a day to be a birthday card for my dad, hence the 'Happy fathers' day!' text.

## Results

![An animated tree grows from a point, along with the words 'happy fathers' day' and then 'I love you so much dad' with a heart emoji](recording.gif)

You can play with a live version [here](https://canmom.github.io/fathersdaytree).

## Setup

Dependencies should be installed with [NPM](https://www.npmjs.com/).

In the repository's folder, type 

```
npm install
```
to install the development version, or 

```
npm install --production
```
to skip dev dependencies such as ESLint.

Then, you can run

```bash
npm run pack
```
to have Webpack bundle the Javascript along with dependencies into one minified file. Then, open `index.html` and you'll be able to watch the tree grow.
