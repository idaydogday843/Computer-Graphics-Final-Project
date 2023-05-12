import * as B from "./buildings.js";
import { GrVertibird, GrVertibirdPad } from "./vertibird.js";
import { GrPrydwen } from "./prydwen.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrLibertyPrime } from "./liberty_prime.js";
import * as L from "./loaded-objects.js";
import { GrSoldier } from "./power-armor-soldier.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";


export function main(world) {
    // make two rows of houses, mainly to give something to look at
    let tex = new T.CubeTextureLoader().load(["./for_students/skybox/px.png","./for_students/skybox/nx.png","./for_students/skybox/py.png","./for_students/skybox/ny.png","./for_students/skybox/pz.png","./for_students/skybox/nz.png"]);
    world.scene.background = tex,'blue';
    let pad = new GrVertibirdPad({x:0,y:0,z:14});
    world.add(pad); 
    let doTwoSided = true;
    let soldierMat = new T.MeshStandardMaterial({
        color: "grey",
        metalness: 0.4,
        roughness: 0.6,
        side: doTwoSided ? T.DoubleSide : T.FrontSide
    });
    let commanderMat = new T.MeshStandardMaterial({
        color: "#908080",
        metalness: 0.4,
        roughness: 0.6,
        side: doTwoSided ? T.DoubleSide : T.FrontSide
    });

    let prydwen = new GrPrydwen({x:0,y:25,z:0-5},true);
    world.add(prydwen);
    let tree1 = new L.Tree({x:-5,y:0,z:-6});
    world.add(tree1);
    let tree2 = new L.Tree({x:0,y:0,z:-6});
    world.add(tree2);
    let tree3 = new L.Tree({x:5,y:0,z:-6});
    world.add(tree3);
    // let tree4 = new L.Tree({x:-5,y:0,z:-6});
    // world.add(tree1);
    
    let libertyPrime = new GrLibertyPrime({x:15,y:0.3,z:-7},true);
    libertyPrime.LibertyPrime.rotateY(-Math.PI/2);
    world.add(libertyPrime);
    // let soldier1 = new GrSoldier({x:-6, y:20.55, z:-0.5,scale:0.48,mat:soldierMat},true);
    // world.add(soldier1);
    let soldier2 = new GrSoldier({x:2.5,y:20.55,z:-5,scale:0.5,mat:soldierMat},true);
    soldier2.Soldier.rotateY(-Math.PI/2);
    world.add(soldier2);
    
    let commander1 = new GrSoldier({x:-22,y:26.05,z:0-5,scale:0.5,mat:commanderMat},true);
    commander1.Soldier.rotateY(-Math.PI/2);
    commander1.commanderPose1();
    world.add(commander1);
    let soldier3 = new GrSoldier({x:10,y:1.1,z:9.5,scale:0.5,mat:soldierMat},true);
    soldier3.Soldier.rotateY(-Math.PI/2);
    world.add(soldier3);
    // let soldier3 = new GrSoldier({x:0.4, y:2.15, z:14.3,scale:0.5,mat:soldierMat},true);
    // soldier3.sitPose();
    // soldier3.Soldier.rotateY(Math.PI/2);
    // world.add(soldier3);
    let vertibird1 = new GrVertibird({scale:1, x:0,y:2,z:13,seated:true,mat:soldierMat});
    vertibird1.directionalDistance = [20,30,20,30];
    vertibird1.flyDir = [0,1];
    world.add(vertibird1);
    let vertibird2 = new GrVertibird({scale:1, x:-15, y:1.2, z:-2,seated:true,mat:soldierMat});
    vertibird2.vertibird.rotateY(Math.PI/2);
    vertibird2.changing = true;
    vertibird2.takeoff = true;
    vertibird2.directionalDistance = [10,40,12,5];
    vertibird2.flyDir = [1,0];
    world.add(vertibird2);

    let runway = new B.GrRunway({x:0,y:0.1,z:-2});
    world.add(runway);
    let terminalMat = shaderMaterial("./for_students/shaders/terminal.vs", "./for_students/shaders/terminal.fs", {
        uniforms: {
            radius: { value: 0.3 },
            dots: { value: 5.0 },
            light: { value: new T.Vector3(0.5, 0.5, 0.5) },
            dark: { value: new T.Vector3(0.777, 0.887, 0.879) },
            shine: {value: 1},
        },
        side: T.DoubleSide,
      });
      let radioMat = shaderMaterial("./for_students/shaders/terminal.vs", "./for_students/shaders/terminal.fs", {
        uniforms: {
            light: { value: new T.Vector3(0.5, 0.5, 0.5) },
            dark: { value: new T.Vector3(0.5, 0.5, 0.5) },
            shine: {value: 1},
        },
        side: T.DoubleSide,
      });
      let matmap = new T.TextureLoader().load("./for_students/brickMat.jpg");
      let brickMat = new T.MeshStandardMaterial({
        color: "#cb4154",
        roughness:0.8,
        bumpMap:matmap,
        side: T.DoubleSide,

      });
    let terminal = new B.GrAirportTerminal({x:-10,y:4.1,z:-14,mat:terminalMat});
    world.add(terminal);
    let radiotower = new B.GrRadioTower({x:10,y:0.1,z:-14,mat:radioMat,});
    world.add(radiotower);
    let hanger1 = new B.GrHanger({scale:1.5,x:10,y:2.25,z:14,mat:brickMat},true);
    world.add(hanger1);
    let hanger2 = new B.GrHanger({scale:1.5,x:-10,y:2.25,z:14,mat:brickMat},true);
    world.add(hanger2);
    let radar = new B.GrRadar({scale:1,x:-10,y:8.8,z:-12});
    world.add(radar);
    let Billboard = new B.GrBillBoard({scale:1,x:0,y:2.5,z:1.5,mat:radioMat,tex:tex},world);
    world.add(Billboard);

    world.go();
}