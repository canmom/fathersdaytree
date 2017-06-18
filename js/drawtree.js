import anime from 'animejs'

var svg_namespace = "http://www.w3.org/2000/svg";

var svg_element = document.getElementById('tree')

var parameters = {
  base_length: 30,
  branch_angle: 40,
  branch_scale: 0.7,
  generations: 7,
  tree: null
}

var timeline = anime.timeline();

class Line {
	constructor(originx,originy,angle,scale) {
    
    this.scale = scale || 1;
		this.create_node();
    if (originx) {
		  this.node.setAttributeNS(null,"transform","translate(" + originx + " " + originy + ") rotate(" + angle + ")" + " scale(" + this.scale + ")");
    }
    this.node.style.visibility = "hidden";
    svg_element.appendChild(this.node);
	}

  create_node() {
    this.node = document.createElementNS(svg_namespace,"line");
    this.node.setAttributeNS(null,"x1",0);
    this.node.setAttributeNS(null,"y1",0);
    this.node.setAttributeNS(null,"x2",0);
    this.node.setAttributeNS(null,"y2",0);
  }

  set_transform(transformations) {
    this.node.setAttributeNS(null,"transform",transformations);
  }

  get_transform() {
    return this.node.getAttributeNS(null,"transform");
  }

  reveal() {
    this.node.style.visibility = "visible";
  }

  make_branch(angle,scale,is_leaf) {
    if (is_leaf){
      var branch = new Leaf();
    } else {
      var branch = new Line();
    }
    branch.set_transform(this.get_transform() + " translate(0 " + parameters.base_length + ") rotate(" + (angle+30*(Math.random()-0.5)) + ") scale(" + scale + ")");
    return branch;
  }

  remove_node() {
    this.node.remove();
  }
}

class Leaf extends Line {
  create_node() {
    this.node = document.createElementNS(svg_namespace,"ellipse");
    this.node.setAttributeNS(null,"cx",0.);
    this.node.setAttributeNS(null,"cy",parameters.base_length/2);
    this.node.setAttributeNS(null,"rx",0.);
    this.node.setAttributeNS(null,"ry",0.);
  }
}

function animate(nodes,params) {
  timeline.add(Object.assign({
    targets: nodes,
    y2: parameters.base_length
  },params));
}

function draw_tree(parameters,timeline) {
  const base = new Line(80,5,0,0.8);
  const branches = [[base]];

  base.reveal();
  timeline.add({
    targets: base.node,
    easing: 'easeInQuart',
    y2: parameters.base_length
  })

  for (let gen = 0; gen < parameters.generations; gen++) {
    let this_gen_branches = [];
    branches.push(this_gen_branches);
    let prev_gen_branches = branches[gen];

    let final_gen = (gen + 1 >= parameters.generations);

    for (let branch of prev_gen_branches) {
      if (final_gen) {
        for (let i = 0; i < 5; i++) {
          this_gen_branches.push(branch.make_branch(240 * (Math.random()-0.5),1,true));
        }
      }
      else {
        this_gen_branches.push(branch.make_branch(parameters.branch_angle,parameters.branch_scale));
        this_gen_branches.push(branch.make_branch(-parameters.branch_angle,parameters.branch_scale));
      }
    }

    let reveal_gen = function(anim) {
      for (let branch of this_gen_branches) {
        branch.reveal()
      }
    }

    let this_gen_nodes = this_gen_branches.slice().map(function(branch) {return branch.node;});
    if (final_gen) {
      timeline.add({
        targets: this_gen_nodes,
        easing: "easeOutQuart", 
        rx: parameters.base_length/4,
        ry: parameters.base_length/2,
        begin: reveal_gen
      });
    }
    else {
      timeline.add({
        targets: this_gen_nodes,
        easing:'linear',
        duration:500*Math.pow(parameters.branch_scale,gen),
        y2: parameters.base_length,
        begin: reveal_gen
      });
    }
  }

  timeline.add({
    targets: '.bigger text',
    easing: 'easeInOutQuad',
    duration: 2000,
    opacity:1
  })

  timeline.add({
    targets: '.smaller text',
    easing: 'easeInOutQuad',
    opacity:1
  })

  parameters.tree = branches;
}

function clear_tree() {
  for (let generation of parameters.tree) {
    for (let branch of generation) {
      branch.remove_node();
    }
  }
  timeline = anime.timeline();
  parameters.tree = null;
  let texts = document.getElementsByTagName('text');
  for (let text of texts) {
    text.style.opacity = 0;
  }
}

function redraw_tree() {
  clear_tree();
  draw_tree(parameters,timeline);
}

function create_controller(key,slider_settings) {
  var change_parameter = function() {
    timeline.pause();
    parameters[key] = parseFloat(document.getElementById(key+'-setter').value);
    document.getElementById(key+'-display').textContent = parameters[key];
    redraw_tree();
  }

  let controllers = document.getElementById('controllers');
  let button = document.getElementById('redraw');

  let control = document.createElement('div');
  controllers.insertBefore(control,button);

  control.appendChild(document.createTextNode(key+': '));
  control.className += ' control';
  control.id = key;

  let slider = document.createElement('input');
  slider.id = key + '-setter';
  slider.setAttribute('type','range');
  slider.oninput = change_parameter;

  for (let att of ['min','max','step']) {
    slider.setAttribute(att,slider_settings[att]);
  }
  slider.setAttribute('value',parameters[key]);
  control.appendChild(slider);

  let display = document.createElement('span')
  display.id = key + '-display';
  display.textContent = parameters[key];
  control.appendChild(display);


}

create_controller('branch_scale',{min:0.1,max: 1.5, step: 0.1})
create_controller('branch_angle',{min: 0, max: 90, step: 5});
create_controller('generations', {min: 2, max: 10, step: 1});

document.getElementById('redraw').onclick = redraw_tree;

draw_tree(parameters,timeline);