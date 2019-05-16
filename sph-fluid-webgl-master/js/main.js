window.onload = function() {
  var fluid = new SPHFluid();
  var engine = new WaterEngine(fluid);
  engine.render();
  const density_base = 1/4; // M / h^2 = 1/4
  const gui = new dat.GUI();

  var text = new function() {
    this.density =1;
  }

  gui.add(fluid, 'viscousity_default', 4000, 5000);
  gui.add(fluid, 'stiffness_default', 1000, 3000);
  gui.add(fluid, 'particleMass_default', 50, 100);
  gui.add(fluid, 'h_default', 0.1, 22);
  gui.add(fluid, "bounce_factor", 0.1, 2, 0.1);
  gui.add(text, "density", 0.1, 5, 0.1).onChange(function(value)  {
    fluid.particleMass_default = density_base * value * fluid.h_default * fluid.h_default;
    console.log(fluid.particleMass_default)
  })
  gui.add(WaterEngine, 'PARTICLE_RADIUS', 0.1, 22);
  gui.add(fluid, 'dt', 0.0001, 0.0008);
  gui.add(engine, "toggleRender")

  var restart = { restart:function(){ 
    //fluid.particleMass_default = density_base * text.density * fluid.h_default * fluid.h_default;
    console.log(fluid.particleMass_default)
    fluid.initParticles();
    engine.initScene();
   }};

gui.add(restart,'restart');

  // TODO: implement change number of particles
  gui.add(fluid, 'numParticles', 1, 800).onChange(function(){
    //engine.clear()
    fluid.initParticles();
    engine.initScene();
  });

  document.addEventListener("mousedown", () => fluid.fireParticles());
  document.addEventListener("mouseup", () => fluid.fireParticles());
};

