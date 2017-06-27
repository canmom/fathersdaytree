import anime from 'animejs';
import Leaf from './leaf';
import Branch from './branch';

class Generation {
  makeRoot(originx, originy, angle, scale) {
    this.nodes.push(
      new Branch(
        this.svgElement,
        originx,
        originy,
        angle,
        scale,
      ),
    );
  }

  makeDescendant(root, length, angle, scale, isLeaf) {
    const node = isLeaf ? new Leaf(this.svgElement) : new Branch(this.svgElement);
    node.setTransform(`${root.getTransform()} translate(0 ${length}) rotate(${angle + (30 * (Math.random() - 0.5))}) scale(${scale})`);
    this.nodes.push(node);
  }

  constructor(svgElement, isLeaves, parameters, prevGen) {
    this.nodes = [];
    this.isLeaves = isLeaves;
    this.svgElement = svgElement;
    this.baseLength = parameters.baseLength;

    if (prevGen) {
      this.genScale = prevGen.genScale * parameters.branch.scale;
      let angles;
      let scale;

      if (isLeaves) {
        angles = parameters.leaf.angles();
        scale = parameters.leaf.scale;
      } else {
        angles = parameters.branch.angles();
        scale = parameters.branch.scale;
      }
      prevGen.nodes.forEach((node) => {
        angles.forEach((angle) => {
          this.makeDescendant(
            node,
            parameters.baseLength,
            angle,
            scale,
            isLeaves,
          );
        });
      });
    } else {
      // this is the base node of the tree
      this.genScale = 1;
      this.makeRoot(
        parameters.root.originx,
        parameters.root.originy,
        parameters.root.angle,
        parameters.root.scale,
      );
    }
  }

  reveal() {
    this.nodes.forEach(node => node.reveal());
  }

  animate(timeline) {
    const elements = this.nodes.map(node => node.element);
    const animProperties = (this.isLeaves ? Leaf : Branch).animProperties(this.baseLength);
    timeline.add(
      Object.assign(
        {
          targets: elements,
          duration: this.isLeaves ? 1000 : 500 * this.genScale,
          begin: this.reveal.bind(this),
        },
        animProperties,
      ),
    );
  }

  clear() {
    this.nodes.forEach((node) => {
      node.removeElement();
    });
  }
}

export default class Tree {
  constructor(svgElement, parameters) {
    this.parameters = parameters;
    this.generations = [];
    this.svgElement = svgElement;
    this.timeline = anime.timeline();

    // create the first generation
    this.generations.push(new Generation(svgElement, false, parameters));

    let prevGeneration;
    let thisGeneration;
    for (let i = 0; i < parameters.generations - 1; i += 1) {
      thisGeneration = new Generation(svgElement, false, parameters, prevGeneration);
      this.generations.push(thisGeneration);
      prevGeneration = thisGeneration;
    }
    this.generations.push(new Generation(svgElement, true, parameters, prevGeneration));

    this.generations.forEach((gen) => { gen.animate(this.timeline); });
  }

  clear() {
    this.generations.forEach((generation) => {
      generation.clear();
    });
  }
}
