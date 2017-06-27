My dad is a web developer, and I wanted to make something cool and pretty for him as a special kind of card.

This HTML page displays an animated fractal tree, animated as growing out of the ground. The structure could potentially allow drawing of an arbitrary number of trees.

## Results

![An animated tree grows from a point, along with the words 'happy fathers' day' and then 'I love you so much dad' with a heart emoji](recording.gif)

A live version can be seen [here](https://canmom.github.io/fathersdaytree).

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