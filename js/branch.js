import TreeNodeBase from './treenode';
import svgNamespace from './svgnamespace';

export default class Branch extends TreeNodeBase {
  createElement() {
    this.element = document.createElementNS(svgNamespace, 'line');
    this.element.setAttributeNS(null, 'x1', 0);
    this.element.setAttributeNS(null, 'y1', 0);
    this.element.setAttributeNS(null, 'x2', 0);
    this.element.setAttributeNS(null, 'y2', 0);
  }

  static animProperties(length) {
    return {
      y2: length,
      easing: 'linear',
    };
  }
}
