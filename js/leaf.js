import TreeNodeBase from './treenode';
import svgNamespace from './svgnamespace';

export default class Leaf extends TreeNodeBase {
  createElement() {
    this.element = document.createElementNS(svgNamespace, 'ellipse');
    this.element.setAttributeNS(null, 'cx', 0);
    this.element.setAttributeNS(null, 'cy', 0);
    this.element.setAttributeNS(null, 'rx', 0);
    this.element.setAttributeNS(null, 'ry', 0);
  }

  static animProperties(length) {
    return {
      cy: length / 2,
      rx: length / 4,
      ry: length / 2,
      easing: 'easeOutQuart',
    };
  }
}
