import times from 'lodash.times';
import Tree from './tree';

const svgElement = document.getElementById('tree');
let tree;

const parameters = {
  baseLength: 30,
  branch: {
    scale: 0.7,
    angle: 40,
    angles: () => [parameters.branch.angle, -parameters.branch.angle],
  },
  leaf: {
    scale: 1,
    angles: () => times(5, () => 240 * (Math.random() - 0.5)),
  },
  root: {
    originx: 80,
    originy: 5,
    angle: 0,
    scale: 0.8,
  },
  generations: 7,
  tree: null,
};

function updateParameter(key, newValue) {
  const layers = key.split('.');
  let obj = parameters;
  while (layers.length > 1) {
    obj = obj[layers.shift()];
  }
  obj[layers[0]] = newValue;
}

function getParameter(key) {
  const layers = key.split('.');
  let obj = parameters;
  while (layers.length) {
    obj = obj[layers.shift()];
  }
  return obj;
}

function drawTree() {
  tree = new Tree(svgElement, parameters);

  const timeline = tree.timeline;

  timeline.add({
    targets: '.bigger text',
    easing: 'easeInOutQuad',
    duration: 2000,
    opacity: 1,
  });

  timeline.add({
    targets: '.smaller text',
    easing: 'easeInOutQuad',
    opacity: 1,
  });
}

function clear() {
  tree.timeline.pause();
  tree.clear();
  const texts = document.getElementsByTagName('text');
  [...texts].forEach((text) => { text.style.opacity = 0; });
}

function redrawTree() {
  clear();
  drawTree();
}

function createController(key, sliderSettings) {
  const safeKey = key.replace('.', '-');

  const controllers = document.getElementById('controllers');
  const button = document.getElementById('redraw');

  const control = document.createElement('div');
  controllers.insertBefore(control, button);

  control.appendChild(document.createTextNode(`${key}: `));
  control.className += ' control';
  control.id = safeKey;

  const slider = document.createElement('input');
  slider.id = `${safeKey}-setter`;
  slider.setAttribute('type', 'range');

  ['min', 'max', 'step'].forEach((att) => {
    slider.setAttribute(att, sliderSettings[att]);
  });
  slider.setAttribute('value', parameters[key]);
  control.appendChild(slider);

  const display = document.createElement('span');
  display.id = `${safeKey}-display`;
  display.textContent = getParameter(key);

  function changeParameter() {
    const newValue = parseFloat(slider.value);
    updateParameter(key, newValue);
    display.textContent = newValue;
    redrawTree();
  }

  slider.oninput = changeParameter;
  control.appendChild(display);
}

createController('branch.scale', { min: 0.1, max: 1.5, step: 0.1 });
createController('branch.angle', { min: 0, max: 90, step: 5 });
createController('generations', { min: 2, max: 10, step: 1 });

document.getElementById('redraw').onclick = redrawTree;

drawTree();
