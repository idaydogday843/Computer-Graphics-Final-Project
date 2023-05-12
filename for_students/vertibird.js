import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { GrSoldier } from "./power-armor-soldier.js";

let vertibirdPadCount = 0;
export class GrVertibirdPad extends GrObject {
    constructor (params={}) {
        let pad = new T.Group();
        super(`vertibird_pad-${++vertibirdPadCount}`, pad);
        this.pad = pad;
        let poleMat = new T.MeshStandardMaterial({
            color: 'darkgrey'
        });
        let padMat = new T.MeshStandardMaterial({
            color:'black'
        });
        this.padShelf = new T.Group();
        let padShelfPoleGeom = new T.BoxGeometry(0.2,0.8,0.2);
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let pole = new T.Mesh(padShelfPoleGeom,poleMat);
                pole.translateX(Math.pow(-1,i)*0.8);
                pole.translateY(0.3);
                pole.translateZ(Math.pow(-1,j)*0.8);
                this.padShelf.add(pole);    
            }
        }
        this.pad.add(this.padShelf);

        let padPlatformGeom = new T.BoxGeometry(3,0.2,3);
        let padPlatform = new T.Mesh(padPlatformGeom,padMat);
        padPlatform.translateY(0.7);
        this.pad.add(padPlatform);

        this.pad.translateX(params.x);
        this.pad.translateY(params.y);
        this.pad.translateZ(params.z);
    }
}

let vertibirdCount = 0;
export class GrVertibird extends GrObject {

    constructor (params={}) {
        let scale = params.scale ? Number(params.scale) : 1;
        let vertibird = new T.Group();
        super(`Vertibird-${++vertibirdCount}`, vertibird);
        this.vertibird = vertibird;
        let wing1 = new T.Group();
        let wing2 = new T.Group();
        this.wing1 = wing1;
        this.wing2 = wing2;
        this.vertibird.add(wing1);
        this.vertibird.add(wing2);
        let rotable1 = new T.Group();
        let rotable2 = new T.Group();
        this.rotable1 = rotable1;
        this.rotable2 = rotable2;
        this.wing1.add(rotable1);
        this.wing2.add(rotable2);
        let propeller1 = new T.Group();
        let propeller2 = new T.Group();
        this.propeller1 = propeller1;
        this.propeller2 = propeller2;
        this.rotable1.add(propeller1);
        this.rotable2.add(propeller2);
        let exSettings1 = {
            steps: 2,
            depth: 1,
            bevelEnabled: true
        };
        let exSettings2 = {
            steps: 2,
            depth: 0.2,
            bevelEnabled: false
        };
        let lightblue_mat = new T.MeshStandardMaterial({
            color: 'lightblue',
            metalness:0.4,
            roughness:0.7
        });
        let grey_mat = new T.MeshStandardMaterial({
            color: 'grey',
            roughness:0.7
        });
        //let midbody_geom = new T.BoxGeometry(0.8,1.2,1);
        let midbody_geom = new T.BoxGeometry(1,1.2,0.8);
        let midbody = new T.Mesh(midbody_geom,lightblue_mat);
        this.vertibird.add(midbody);
        let backbody_curve = new T.Shape();
        backbody_curve.moveTo(0.4,-0.15);
        backbody_curve.lineTo(0.4,0.6);
        backbody_curve.lineTo(0.8,0.6);
        backbody_curve.lineTo(0.75,0);
        backbody_curve.lineTo(0.4,-0.15);
        let backbody_geom = new T.ExtrudeGeometry(backbody_curve,exSettings1);
        let backbody = new T.Mesh(backbody_geom,lightblue_mat);
        backbody.rotateY(Math.PI/2);
        backbody.translateZ(-0.5);
        this.vertibird.add(backbody);
        let floor_geom = new T.BoxGeometry(1,0.25,1.5);
        let floor = new T.Mesh(floor_geom,grey_mat);
        floor.translateZ(1.15);
        floor.translateY(-0.6);
        vertibird.add(floor);
        let roof_curve = new T.Shape();
        roof_curve.moveTo(-1.9,-0.475);
        roof_curve.lineTo(-1.9,-0.1);
        roof_curve.lineTo(-1.4,0.6);
        roof_curve.lineTo(0,0.6);
        roof_curve.lineTo(0.02,0.625);
        roof_curve.lineTo(0,0.65);
        roof_curve.lineTo(-1.4,0.65);
        roof_curve.lineTo(-2.1,-0.15);
        roof_curve.lineTo(-2.7,-0.15);
        roof_curve.lineTo(-2.7,-0.4);
        roof_curve.lineTo(-2.1,-0.475);
        roof_curve.lineTo(-1.9,-0.6);
        roof_curve.lineTo(-1.9,-0.475);
        let roof_geom = new T.ExtrudeGeometry(roof_curve,exSettings1);
        let roof = new T.Mesh(roof_geom,grey_mat);
        roof.rotateY(Math.PI/2);
        roof.translateZ(-0.5);
        this.vertibird.add(roof);
        let cabin_curve = new T.Shape();
        cabin_curve.moveTo(-2.7,-0.15);
        cabin_curve.lineTo(-2.75,-0.1);
        cabin_curve.lineTo(-2,0)
        cabin_curve.lineTo(-1.95,0.35);
        cabin_curve.lineTo(-1.9,0.4);
        cabin_curve.lineTo(-2.75,0.4);
        cabin_curve.lineTo(-1,1);
        cabin_curve.lineTo(0.3,1);
        cabin_curve.lineTo(1.8,0.9);
        cabin_curve.lineTo(1.82,0.8);
        cabin_curve.lineTo(1.5,0.8);
        cabin_curve.lineTo(1.3,0.6);
        cabin_curve.lineTo(-1.4,0.65);
        cabin_curve.lineTo(-2.1,-0.15);
        cabin_curve.lineTo(-2.7,-0.15);
        let cabin_geom = new T.ExtrudeGeometry(cabin_curve,exSettings1);
        let cabin = new T.Mesh(cabin_geom,lightblue_mat);
        cabin.rotateY(Math.PI/2);
        cabin.translateZ(-0.5);
        this.vertibird.add(cabin);
        let pole_geom = new T.CylinderGeometry(0.01,0.01,0.5);
        let pole1 = new T.Mesh(pole_geom,grey_mat);
        let pole2 = new T.Mesh(pole_geom,grey_mat);
        let pole3 = new T.Mesh(pole_geom,grey_mat);
        pole1.position.set(0,0.15,2.75);
        pole2.position.set(0.5,0.15,2.75);
        pole3.position.set(-0.5,0.15,2.75);
        this.vertibird.add(pole1);
        this.vertibird.add(pole2);
        this.vertibird.add(pole3);
        let landingGears = new T.Group();
        let landing_gear_geom = new T.CylinderGeometry(0.2,0.2,1.4);
        let landing_gear1 = new T.Mesh(landing_gear_geom,grey_mat);
        let landing_gear2 = new T.Mesh(landing_gear_geom,grey_mat);
        landingGears.add(landing_gear1);
        landingGears.add(landing_gear2);
        landing_gear1.position.set(-1.2,-0.88,-0.5);
        landing_gear1.rotateZ(Math.PI/2);
        landing_gear2.position.set(-1.2,-0.88,0.5);
        landing_gear2.rotateZ(Math.PI/2);
        landingGears.rotateY(Math.PI/2);
        this.vertibird.add(landingGears);
        let backwing_curve = new T.Shape();
        backwing_curve.moveTo(1.8,0.9);
        backwing_curve.lineTo(2.9,1.4);
        backwing_curve.lineTo(3.6,1.2);
        backwing_curve.lineTo(3.42,1.1);
        backwing_curve.lineTo(3.2,1.1);
        backwing_curve.lineTo(3.2,-0.2);
        backwing_curve.lineTo(2.96,-0.2);
        backwing_curve.lineTo(1.82,0.8);
        backwing_curve.lineTo(1.8,0.9);
        let backwing_geom = new T.ExtrudeGeometry(backwing_curve,exSettings2);
        let backwing = new T.Mesh(backwing_geom,grey_mat);
        backwing.rotateY(Math.PI/2);
        backwing.translateZ(-0.1);
        this.vertibird.add(backwing);
        let horizontalwings = new T.Group()
        let horizontalwing_curve = new T.Shape();
        horizontalwing_curve.moveTo(0,0);
        horizontalwing_curve.lineTo(0.4,1.2);
        horizontalwing_curve.lineTo(0.7,1.5);
        horizontalwing_curve.lineTo(0.6,0);
        horizontalwing_curve.lineTo(0,0);
        let horizontalwing_geom = new T.ExtrudeGeometry(horizontalwing_curve,exSettings2);
        let horizontalwing1 = new T.Mesh(horizontalwing_geom,lightblue_mat);
        horizontalwing1.position.set(1.8,0.9,0);
        horizontalwing1.rotateX(Math.PI/2);
        let horizontalwing2 = new T.Mesh(horizontalwing_geom,lightblue_mat);
        horizontalwing2.position.set(1.8,0.9,0);
        horizontalwing2.translateY(-0.2);
        horizontalwing2.rotateX(-Math.PI/2);
        horizontalwings.add(horizontalwing1);
        horizontalwings.add(horizontalwing2);
        horizontalwings.rotateY(Math.PI/2);
        this.vertibird.add(horizontalwings);
        let ex = {
            steps: 2,
            depth: 0.05,
            bevelEnabled: false
        };
        let black_mat = new T.MeshStandardMaterial({
            color: 'black'
        });
        let wings = new T.Group();
        let staticwing_shape = new T.BoxGeometry(1,0.2,1.5);
        let staticwing1 = new T.Mesh(staticwing_shape,lightblue_mat);
        staticwing1.position.set(-0.7,0.8,1.25);
        wing1.add(staticwing1);
        let staticwing2 = new T.Mesh(staticwing_shape,lightblue_mat);
        staticwing2.position.set(-0.7,0.8,-1.25);
        wing2.add(staticwing2);
        wings.add(wing1);
        wings.add(wing2);
        wings.rotateY(Math.PI/2);
        this.vertibird.add(wings);
        let rotablewing_shape = new T.CylinderGeometry(0.1,0.3,2);
        let rotablewing1 = new T.Mesh(rotablewing_shape,lightblue_mat);
        rotable1.position.set(-0.7,0.8,2.15);
        rotablewing1.rotateZ(Math.PI/2);
        rotable1.add(rotablewing1);
        let rotablewing2 = new T.Mesh(rotablewing_shape,lightblue_mat);
        rotable2.position.set(-0.7,0.8,-2.15);
        rotablewing2.rotateZ(Math.PI/2);
        rotable2.add(rotablewing2);
        let propeller_curve = new T.Shape();
        propeller_curve.moveTo(0,0);
        propeller_curve.lineTo(0.1,0);
        propeller_curve.lineTo(0,1.5);
        propeller_curve.lineTo(-0.1,0);
        propeller_curve.lineTo(0,0);
        let propeller_geom = new T.ExtrudeGeometry(propeller_curve,ex);
        let rotables = [];
        rotables.push(rotable1);
        rotables.push(rotable2);
        let propellers = [];
        propellers.push(propeller1);
        propellers.push(propeller2);
        for (let h = 0; h < 2; h++) {
            for (let i = 0; i < 4; i++) {
                let propeller = new T.Mesh(propeller_geom,black_mat);
                propellers[h].position.set(rotables[h].children[1].position.x-1,
                    rotables[h].children[1].position.y,
                    rotables[h].children[1].position.z);    
                propeller.rotateY(Math.PI/2);
                propeller.rotateZ(i*Math.PI/2);
                propellers[h].add(propeller);
            }
        }
        if (params.seated){
          let passenger1 = new GrSoldier({x:0.4, y:0.15, z:1.4,scale:0.5,mat:params.mat},true);
          this.vertibird.add(passenger1.Soldier);
          passenger1.Soldier.rotateY(Math.PI/2);
          passenger1.sitPose();
          let passenger2 = new GrSoldier({x:-0.4, y:0.15, z:1.4,scale:0.5,mat:params.mat},true);
          this.vertibird.add(passenger2.Soldier);
          passenger2.Soldier.rotateY(-Math.PI/2);
          passenger2.sitPose();
        }
        this.vertibird.translateX(params.x);
        this.vertibird.translateY(params.y);
        this.vertibird.translateZ(params.z);
        this.rotable1.rotateZ(-Math.PI/2);
        this.rotable2.rotateZ(-Math.PI/2);
        this.vertibird.scale.set(scale, scale, scale);
        this.rideable = this.vertibird;
        this.isVert = true;
        this.changing = false;
        this.onTrack = false;
        this.turning = false;
        this.forward = false;
        this.changeAlt = false;
        this.takeoff = false;
        this.landing = false;
        this.raise = false;
        this.onland = true;
        this.gliding = false;
        this.routing = false;
        this.rotateAmount = 0;
        this.flyAmount = 0;
        this.raiseAmount = 0;
        this.directionalDistance = [];
        this.flyDir = [];
        this.x = params.x;
        this.y = params.y;
        this.z = params.z;
    }

  /**
   * @param {number} delta
   * @param {number} timeOfDay
   */
    stepWorld(delta, timeOfDay) {
      let rotateAmount = delta/800;
      let speed = delta/80;
      let raiseAmount = delta/1000;
      this.propeller1.rotateX(delta * 4);
      this.propeller2.rotateX(delta * 4);
  
      if (this.name == "Vertibird-1") {
        this.patrolRoute1(speed);
        this.onland = false;
        if (this.forward && this.onTrack) {
          this.flyForward(speed);
        }
        
      }

      if (this.name == "Vertibird-2") {
        this.patrolRoute2(rotateAmount,speed);
      }

      if (this.turning) {
        this.changeFlyingDirection(rotateAmount,speed);
      }
      
      if (this.changeAlt){
        this.changeHeight(raiseAmount);
      }
      if (this.changing) {
        this.rotateWings(rotateAmount);
      }
    }

    flyForward(speed) {
      this.vertibird.translateZ(speed);
      this.flyAmount += speed;
      let distance = 0;
      if (this.flyDir[1] == -1) {
        distance = this.directionalDistance[0];
      }
      else if (this.flyDir[0] == -1) {
        distance = this.directionalDistance[1];
      }
      else if (this.flyDir[1] == 1) {
        distance = this.directionalDistance[2];
      }
      else if (this.flyDir[0] == 1) {
        distance = this.directionalDistance[3];
      }
      if (this.flyAmount > distance) {
        this.vertibird.translateZ(distance - this.flyAmount);
        this.turning = true;
        this.forward = false;
        this.flyAmount = 0;
      }
    }

    rotateWings(rotateAmount) {
      if (this.isVert) {
        if (this.rotateAmount <= Math.PI/2) {
          this.rotable1.rotateZ(rotateAmount);
          this.rotable2.rotateZ(rotateAmount);
          this.rotateAmount += rotateAmount;
        }
        else {
          this.isVert = false;
          this.changing = false;
          this.rotateAmount = 0;
        }
      }
      else if (!this.isVert){
        if (this.rotateAmount >= -Math.PI/2) {
          this.rotable1.rotateZ(-rotateAmount);
          this.rotable2.rotateZ(-rotateAmount);
          this.rotateAmount -= rotateAmount;
        }
        else {
          this.isVert = true;
          this.changing = false;
          this.rotateAmount = 0;
        }
      }
    }

    changeFlyingDirection(rotateAmount,speed) {
      this.vertibird.rotateY(rotateAmount);
      this.rotateAmount += rotateAmount;
      this.vertibird.translateZ(speed);
      if (this.rotateAmount > Math.PI/2) {
        this.vertibird.rotateY(Math.PI/2 - this.rotateAmount);
        this.forward = true;
        this.turning = false;
        if (this.onTrack) {
          this.changeAlt = true;
        }
        this.rotateAmount = 0;
      }
    }

    changeHeight(raiseAmount) {
      if (this.raise) {
        this.vertibird.translateY(raiseAmount);
        this.raiseAmount += raiseAmount;
        if (this.raiseAmount >= 1) {
          this.raise = false;
          this.changeAlt = false;
          this.raiseAmount = 0;
        }
      }
      else if (!this.raise) {
        this.vertibird.translateY(-raiseAmount);
        this.raiseAmount -= raiseAmount
        if (this.raiseAmount <= -1) {
          this.raise = true;
          this.changeAlt = false;
          this.raiseAmount = 0;
        }
      }
    }

    patrolRoute1(speed) {
        if (this.isVert) {
          this.vertibird.translateY(speed*2/3);
          if (this.vertibird.position.y > 8) {
            this.changing = true;
          }
        }

        else if (!this.isVert) {
          if (!this.onTrack) {
            if (!this.forward) {
              this.turning = true;
              this.flyDir = [1,0];
            }
            if (this.forward) {
              this.vertibird.translateZ(speed);
              this.flyAmount += speed;
              if (this.flyAmount > 10) {
                this.onTrack = true;
                this.turning = true;
                this.forward = false;
                this.flyAmount = 0;
              }
            }
          }

          else if (this.onTrack) {
            if (this.flyDir[0] == 1) {
              if (this.flyAmount > 15) {
                this.flyDir = [0,-1];
              }
            }
            if (this.flyDir[0] == -1) {
              if (this.flyAmount > 15) {
                this.flyDir = [0,1];
              }
            }
            if (this.flyDir[1] == 1) {
              if (this.flyAmount > 15) {
                this.flyDir = [1,0];
              }
            }
            
            if (this.flyDir[1] == -1) {
              if (this.flyAmount > 15) {
                this.flyDir = [-1,0];
              }
            }
          }
        
        }
    }

    patrolRoute2(rotateAmount,speed) {
      let microAmount = speed * 0.8;
      if (!this.changing) {
        if (this.takeoff) {
          this.vertibird.translateZ(speed);
          this.flyAmount += speed;
          if (this.flyAmount > 15) {
            this.onland = false;
            this.vertibird.translateY(speed/2);
            this.raiseAmount += speed/2;
            if (this.raiseAmount > 15) {
              this.raiseAmount = 0;
              this.flyAmount = 0;
              this.takeoff = false;
              this.forward = true;
              this.turning = true;
              this.flyDir = [0,-1];
            }
          }
        }
        if (!this.takeoff && !this.landing && !this.onland){
          if (!this.turning) {
            this.onTrack = true;
            this.vertibird.translateZ(speed);
            this.flyAmount += speed;
            if (this.flyDir[0] == -1) {
              if (this.flyAmount > 70) {
                this.flyDir = [0,1];
                this.turning = true;
                this.flyAmount = 0;
              }
            }
            if (this.flyDir[1] == 1) {
              if (this.flyAmount > 15 || this.vertibird.position.z > -1) {
                this.flyDir = [1,0];
                this.turning = true;
                this.flyAmount = 0;
                this.landing = true;
              }
            }
            
            if (this.flyDir[1] == -1) {
              if (this.flyAmount > 15) {
                this.flyDir = [-1,0];
                this.turning = true;
                this.flyAmount = 0;
              }
            }
          }
        }

        if (!this.turning && this.landing) {
          this.vertibird.translateY(-speed/2);
          this.vertibird.translateZ(speed);
          this.flyAmount += speed;
          this.raiseAmount -= speed/2;
          if (this.vertibird.position.y < 1.2) {
            this.flyAmount = 0;
            this.raiseAmount = 0;
            this.landing = false;
            this.onland = true;
            this.gliding = true;
          }
        }

        if (this.onland && !this.takeoff && !this.landing) {
          if (this.gliding) {
            if (this.vertibird.position.x <= 15) {
              this.vertibird.translateZ(speed);
            }
            if (this.vertibird.position.x > 15) {
              this.gliding = false;
              this.routing = true;
            }
          }
          if (this.routing) {
            if (this.rotateAmount <= Math.PI/2) {
              this.vertibird.translateZ(microAmount/100);
              this.vertibird.rotateY(-rotateAmount);
              this.rotateAmount += rotateAmount;
              
            }
            if (this.rotateAmount > Math.PI/2 && this.rotateAmount <= Math.PI) {
              this.vertibird.translateZ(microAmount);
              this.vertibird.rotateY(-rotateAmount);
              this.rotateAmount += rotateAmount;
            }
            if (this.rotateAmount > Math.PI && this.rotateAmount <= Math.PI/2 * 3) {
              if (this.vertibird.position.x >= -9.55) {
                this.vertibird.translateZ(speed);
                this.flyAmount += speed;
              }
              if (this.vertibird.position.x < -9.55) {
                this.vertibird.translateZ(microAmount*0.85);
                this.vertibird.rotateY(-rotateAmount);
                this.rotateAmount += rotateAmount;
              }
            }
            if (this.rotateAmount > Math.PI/2*3 && this.rotateAmount <= Math.PI*2) {
              this.vertibird.translateZ(microAmount/6);
              this.vertibird.rotateY(-rotateAmount);
              this.rotateAmount += rotateAmount;
            }
            if (this.rotateAmount > Math.PI * 2) {
              this.routing = false;
              this.rotateAmount = 0;
              this.flyAmount = 0;
              this.takeoff = true;
            }
          }
        }
      }
    }
}