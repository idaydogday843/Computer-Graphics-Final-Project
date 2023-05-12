import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";

let treeCount = 0
export class Tree extends Loaders.ObjGrObject {
    constructor(params={}, doTwoSided = true) {
      super({
        obj: "./lowpoly_tree/obj/tree.obj",
        norm: 2.0,
        name: `Tree-${++treeCount}`,
        mtl: "./lowpoly_tree/obj/tree.mtl",
      });
      this.u = 0;
      // the fbx loader puts the car on the ground - we need a ride point above the ground
      this.plant = new T.Object3D();


      this.objects[0].add(this.plant);
      this.objects[0].translateX(params.x);
      this.objects[0].translateY(params.y);
      this.objects[0].translateZ(params.z);
      this.objects[0].scale.set(2,2,2);
    }
  }

  export class DeadPlant extends Loaders.ObjGrObject {
    constructor(params={}, doTwoSided = true) {
      super({
        obj: "./arbol_seco/arbol_seco.obj",
        norm: 2.0,
        name: "Dead Plant",
        mtl: "./arbol_seco/arbol_seco.mtl",
      });
      this.u = 0;
      // the fbx loader puts the car on the ground - we need a ride point above the ground
      this.plant = new T.Object3D();


      this.objects[0].add(this.plant);
      this.objects[0].translateX(params.x);
      this.objects[0].translateY(params.y);
      this.objects[0].translateZ(params.z);
    }
  }