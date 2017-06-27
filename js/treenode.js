export default class TreeNodeBase {
  constructor(svgElement, originx, originy, angle, scale) {
    this.createElement();
    if (arguments.length === 5) {
      this.element.setAttributeNS(null, 'transform', `translate(${originx} ${originy}) rotate(${angle}) scale(${scale || 1})`);
    }
    this.element.style.visibility = 'hidden';
    svgElement.appendChild(this.element);
  }

  setTransform(transformations) {
    this.element.setAttributeNS(null, 'transform', transformations);
  }

  getTransform() {
    return this.element.getAttributeNS(null, 'transform');
  }

  reveal() {
    this.element.style.visibility = 'visible';
  }

  removeElement() {
    this.element.remove();
  }
}
