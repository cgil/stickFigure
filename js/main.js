var Character = Base.extend({
	initialize: function(position, maxSpeed, maxForce) {
		this.body = this.create();
		this.actions = [];
		this.vector = new Point(0, 0);
		this.gravity = 0.001;
	},
	create: function() {
		this.chestV  = view.center;
		this.armV    = new Point(50, 0);
		this.elbowV	= new Point(50, 0);
		this.legV    = new Point(10, 50);
		this.kneeV	= new Point(10, 50);
		this.headV   = new Point(0,40);
		this.hipV    = new Point(0, 70);

		var head = new Path({
			segments: [this.chestV, this.chestV - this.headV],
			name: "head"
		});
		var leftArm = new Path({
			segments: [this.chestV, this.chestV - this.elbowV, this.chestV - this.elbowV - this.armV],
			name: "leftArm"
		});
		var rightArm = new Path({
			segments: [this.chestV, this.chestV + this.elbowV, this.chestV + this.elbowV + this.armV],
			name: "rightArm"
		});
		var hip = new Path({
			segments: [this.chestV, this.chestV + this.hipV],
			name: "hip"
		});
		var rightLeg = new Path({
			segments: [this.chestV + this.hipV, this.chestV + this.hipV + this.kneeV, this.chestV + this.hipV + this.legV + this.kneeV],
			name: "rightLeg"
		});
		var leftLeg = new Path({
			segments: [this.chestV + this.hipV, new Point(this.chestV.x + this.hipV.x - this.kneeV.x, this.chestV.y + this.hipV.y + this.kneeV.y), 
				new Point(this.chestV.x + this.hipV.x - this.kneeV.x - this.legV.x, this.chestV.y + this.hipV.y + this.kneeV.y + this.legV.y)],
			name: "leftLeg"
			});
		var face = new Path.Circle({
			center: this.chestV - this.headV,
			radius: 30,
			strokeColor: 'black',
			name: "face"
		});
		var person = new Group({
			children: [head, face, leftArm, rightArm, hip, leftLeg, rightLeg],
			strokeColor: 'black',
			position: view.center
		});
		return person;
	},
	run: function() {
		// for(var j = 0; j < this.body.children.length; j++) {
		// 	var size = view.size;
		// 	var point = this.body.children[j].position;
		// 	this.vector.y += this.gravity;
		// 	var pre = point + this.vector;

		// }

		for(var i = 0 ; i < this.actions.length; i++) {
			if(this.actions[i].duration <= 0) {
				this.removeAction(this.actions[i].name);
				continue;
			}
			else if(this.actions[i].name === "airGuitar") {
				this.airGuitar(this.actions[i]);
			}
			this.actions[i].duration -= 1;
		}
	},
	airGuitar: function(a) {
		this.body.children[a.arm].rotate(a.speed, this.body.children[a.arm].segments[0].point);
	},
	addAction: function(a) {
		for(var i = 0; i < this.actions.length; i++) {
			if(this.actions[i].name == a.name) {
				this.removeAction(this.actions[i].name);
			}
		}
		this.actions.push(a);
	},
	removeAction: function(a) {
		for(var i = 0; i < this.actions.length; i++) {
			if(this.actions[i].name == a) {
				this.actions.splice(i, 1);
			}
		}
	},
	resetActions: function() {
		this.actions = [];
	}
});

var people = [];
people.push(new Character());
for(var i = 0; i < people.length; i++) {
	// people[i].addAction({name: "airGuitar", speed: 3, arm: "rightArm", duration: 180});
}

function onMouseMove(event) {
	for(var i = 0; i < people.length; i++) {
		// people[i] += event.point;
	}
	// path.firstSegment.point = event.point;
	// for (var i = 0; i < points - 1; i++) {
	// 	var segment = path.segments[i];
	// 	var nextSegment = segment.next;
	// 	var vector = segment.point - nextSegment.point;
	// 	vector.length = length;
	// 	nextSegment.point = segment.point - vector;
	// }
	// path.smooth();
}


function onFrame(event) {
	for(var i = 0; i < people.length; i++) {
		people[i].run();
	}
}




