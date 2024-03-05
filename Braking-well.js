/*
Braking distance d1 is the distance a vehicle will go from 
the point when it brakes to when it comes to a complete stop. 
It depends on the original speed v and on the coefficient 
of friction mu between the tires and the road surface.

The braking distance is one of two principal components of the total stopping distance. 
The other component is the reaction distance, which is the product 
of the speed and the perception-reaction time of the driver.

The kinetic energy E is 0.5*m*v**2, the work W given by braking is mu*m*g*d1. 
Equalling E and W gives the braking distance: d1 = v*v / 2*mu*g 
where g is the gravity of Earth and m the vehicle's mass.

We have v in km per hour, g as 9.81 m/s/s, and in the following -
we suppose that the reaction time is constant and equal to 1 s. 
The coefficient mu is dimensionless.

Tasks:
  The first one is to calculate the total stopping distance 
  in meters given v, mu (and the reaction time t = 1).
  dist(v, mu) -> d = total stopping distance

  The second task is to calculate v in km per hour knowing d in meters 
  and mu with the supposition that the reaction time is still t = 1.
  speed(d, mu) -> v such that dist(v, mu) = d.

Examples:
  dist(100, 0.7) -> 83.9598760937531
  speed(83.9598760937531, 0.7) -> 100.0

Notes:
  Remember to convert the velocity from km/h to m/s or from m/s in km/h when necessary.
  Don't forget the reaction time t: t = 1
  Don't truncate or round your results. 
*/


// Solution

function dist(v, mu) {								  // suppose reaction time is 1
  let g = 9.81; 									      // acceleration due to gravity in m/s
  let coef = 1000.0 / 3600.0; 					// km/h -> m/s
  let dreact = v * coef; 							  // distance of reaction with t = 1
  let vms = coef * v; 							    // speed in m/s
  let dbrak = 0.5 * Math.pow(vms, 2) / mu / g; 	// braking distance
  return dreact + dbrak; 							  // total distance
}

function speed(d, mu) {								  // suppose reaction time is 1
  let g = 9.81; 									      // acceleration due to gravity in m/s
  let coef = 3600 / 1000.0;						  // m/s -> km/h
  return 0.5 * mu * g * (- 2 + Math.sqrt(4 + 8*d/mu/g)) * coef;
}

// or

function dist(v, mu) {			// suppose reaction time is 1
  const g = 9.81;
  v = convertKPHtoMPS(v);
  return (v*v/(2*mu*g)) + v;
  // We're given that distance = v*v / 2*mu*g;
  // Since reaction time is a single second, we add a constant
}

function speed(d, mu) {		  // suppose reaction time is 1
  /*As above, we know that d = (v*v / (2*mu*g)) + v;
  Let's call 2*mu*g q, since it's a constant and c means something special in physics.
  d = (v*v / q) + v
  d - v = v*v / q
  dq - vq = v*v
  v^2 + vq - dq = 0
  and now we can apply the quadratic formula:
  v = (-q +- sqrt(q^2 - 4(1)(-qd))) / 2;
  v = (-q +- sqrt(q*q + 4*q*d)) / 2;
  */
  const g = 9.81;
  const q = 2*mu*g;
  return convertMPStoKPH((-q + Math.sqrt((q*q) + 4*q*d)) / 2); //We're assuming a positive distance, of course.
  //We're also assuming a sensible input.
  //This kind of problem will have a positive root and a negative root, so we can just take the positive root
  //Without bothering to check the negative root. Consequently, you can't represent driving backwards with this.
}

function convertMPStoKPH(metersPerSecond){
  return metersPerSecond*3.6;
}

function convertKPHtoMPS(kilometersPerHour){
  return kilometersPerHour/3.6;
}