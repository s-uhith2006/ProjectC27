
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;
var bobObj1,bobObj2,bobObj3, bobObj4,bobObj5, roofObject;
var rope1,rope2,rope3, rope4,rope5;
var world;

function preload()
{
	
}

function setup() {
	createCanvas(1600, 700);


	engine = Engine.create();
	world = engine.world;

	roofObject=new roof(width/2,height/4,width/7,20);
	bobDiameter=40;

	startBobPositionX=width/2;
	startBobPositionY=height/4+500;
	bobObj1=new bob(startBobPositionX-bobDiameter*2,startBobPositionY,bobDiameter);
	bobObj2=new bob(startBobPositionX-bobDiameter,startBobPositionY,bobDiameter);
	bobObj3=new bob(startBobPositionX,startBobPositionY,bobDiameter);
	bobObj4=new bob(startBobPositionX+bobDiameter,startBobPositionY,bobDiameter);
	bobObj5=new bob(startBobPositionX+bobDiameter*2,startBobPositionY,bobDiameter);

	var render = Render.create({
		element: document.body,
		engine: engine,
		options: {
		  width: 1200,
		  height: 700,
		  wireframes: false
		}
	  });

	rope1=new rope(bobObj1.body,roofObject.body,-bobDiameter*2, 0)
	rope2=new rope(bobObj2.body,roofObject.body,-bobDiameter*1, 0)
	rope3=new rope(bobObj3.body,roofObject.body,0, 0)
	rope4=new rope(bobObj4.body,roofObject.body,bobDiameter*1, 0)
	rope5=new rope(bobObj5.body,roofObject.body,bobDiameter*2, 0)

	constraint1={
		bodyA:bobObj1.body,
		bodyB:roofObject.body,
		pointB: {x:-bobDiameter*2, y:0}
	}
	constraint2={
		bodyA:bobObj2.body,
		bodyB:roofObject.body,		
		pointB: {x:-bobDiameter, y:0}
	}
	constraint3={
		bodyA:bobObj3.body,
		bodyB:roofObject.body,		
		pointB: {x:0, y:0}
	}
	constraint4={
		bodyA:bobObj4.body,
		bodyB:roofObject.body,		
		pointB: {x:bobDiameter, y:0}	
	}
	constraint5={
		bodyA:bobObj5.body,
		bodyB:roofObject.body,		
		pointB: {x:bobDiameter*2, y:0}
	}

	var pendulum1=Constraint.create(constraint1);
	var pendulum2=Constraint.create(constraint2);
	var pendulum3=Constraint.create(constraint3);
	var pendulum4=Constraint.create(constraint4);
	var pendulum5=Constraint.create(constraint5);

	World.add(world, pendulum1);
	World.add(world, pendulum2);
	World.add(world, pendulum3);
	World.add(world, pendulum4);
	World.add(world, pendulum5);
	


	Engine.run(engine);
  
}


function draw() {
   rectMode(CENTER);
  background(230);
  roofObject.display();

  rope1.display()
  rope2.display()
  rope3.display()
  rope4.display()
  rope5.display()	
  bobObj1.display();
  bobObj2.display();
  bobObj3.display();
  bobObj4.display();
  bobObj5.display();
  
 
}

function keyPressed() {
	if (keyCode === UP_ARROW) {

	  Matter.Body.applyForce(bobObj1.body,bobObj1.body.position,{x:-50,y:-45});

	}
}


function drawLine(constraint)
{
  bobBodyPosition=constraint.bodyA.position
  roofBodyPosition=constraint.bodyB.position

  roofBodyOffset=constraint.pointB;
  
  roofBodyX=roofBodyPosition.x+roofBodyOffset.x
  roofBodyY=roofBodyPosition.y+roofBodyOffset.y
  line(bobBodyPosition.x, bobBodyPosition.y, roofBodyX,roofBodyY);
}


