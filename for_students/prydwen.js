import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class GrPrydwen extends GrObject {
    constructor (params={}, doTwoSided = true) {
        let prydwen = new T.Group
        super('The Prydwen', prydwen);
        this.prydwen = prydwen;

        let bodymat = new T.MeshStandardMaterial({
            color: "grey",
            metalness: 0.4,
            roughness: 0.6,
            side: doTwoSided ? T.DoubleSide : T.FrontSide
        });
        let redmat = new T.MeshStandardMaterial({
            color: '#ca7631',
            side: doTwoSided ? T.DoubleSide : T.FrontSide
        });
        let blackmat = new T.MeshStandardMaterial({
            color: 'black'
        });
        let platformmat = new T.MeshStandardMaterial({
            color:"#311825",
            roughness:0.6,
            side: doTwoSided ? T.DoubleSide : T.FrontSide
        });
        let mainbodyGeom = new T.CylinderGeometry(3.5,3.5,25);
        this.mainbody = new T.Mesh(mainbodyGeom,bodymat);
        this.mainbody.castShadow = true;
        this.prydwen.add(this.mainbody);

        let frontcabinGeom = new T.CylinderGeometry(1.5,3.5,5);
        this.frontcabin = new T.Mesh(frontcabinGeom,bodymat);
        this.frontcabin.castShadow = true;
        this.frontcabin.translateY(15);
        this.prydwen.add(this.frontcabin);

        let backbodyGeom = new T.CylinderGeometry(3.5,1,9);
        this.backbody = new T.Mesh(backbodyGeom,bodymat);
        this.backbody.castShadow = true;
        this.backbody.translateY(-17);
        this.prydwen.add(this.backbody);

        let propellers = new T.Group();
        let x0 = 2.2;
        let z0 = 2.2;
        propellers.rotateX(Math.PI/2);
        for (let i = 0; i < 2; i++) {
            let propeller = this.drawPropellers({x:Math.pow(-1,i)*x0,y:0,z:0,mat:blackmat},true);
            propellers.add(propeller);
        }
        for (let i = 0; i < 2; i++) {
            let propeller = this.drawPropellers({x:0,y:Math.pow(-1,i)*z0,z:0,mat:blackmat},true);
            propellers.add(propeller);
        }
        this.propellers = propellers;
        this.propellers.translateZ(21.5);
        this.prydwen.add(this.propellers);

        let lowershelfGeom = new T.BufferGeometry();
        let x1 = 0;
        let z1 = Math.sqrt(Math.pow(3.5,2) - Math.pow(x1,2));
        let amount1 = 3;
        let amount2 = 2;
        const lowershelfCoords = new Float32Array([
            -x1,12.5,-z1,
            -x1-amount2,12.5,-z1-amount1,
            -x1,-12.5,-z1,
            -x1-amount2,-12.5,-z1-amount1,
            -x1,12.5,z1,
            -x1-amount2,12.5,z1+amount1,
            -x1,-12.5,z1,
            -x1-amount2,-12.5,z1+amount1,

            -x1-amount2,17,0,
            -x1-amount2,-14,0
        ]);
        const lowershelfOrder = [
            0,2,1,
            2,3,1,

            4,5,6,
            5,7,6,

            1,8,0,
            0,8,4,
            4,8,5,

            2,9,3,
            6,9,2,
            7,9,6,
        ];
        lowershelfGeom.setAttribute("position",new T.BufferAttribute(lowershelfCoords,3));
        lowershelfGeom.setIndex(lowershelfOrder);
        lowershelfGeom.computeVertexNormals();
        this.lowershelf = new T.Mesh(lowershelfGeom, platformmat);
        this.prydwen.add(this.lowershelf);

        let frontdeckGeom = new T.BufferGeometry();
        let z2 = Math.sqrt(Math.pow(1.5,2) - Math.pow(1,2));
        const frontdeckCoords = new Float32Array([
            1.1,17.5,-z2, //0
            1.1,17.5,z2, //1
            1.1,20.5,0, //2
            1.6,17.5,0, //3
            2,16.5,0, //4

            0,17.5,0.75, //5
            0,17.5,-0.75, //6
            0,22.5,-0.75, //7
            0,22.5,0.75, //8

            -0.2,17.5,0.75, //9
            -0.2,17.5,-0.75, //10
            -0.2,22.5,-0.75, //11
            -0.2,22.5,0.75, //12

            -1.1,17.5,-z2, //13
            -1.1,17.5,z2, //14
            -1.1,20.5,0, //15
            -1.6,17.5,0, //16

            -1.1,18.5,0.5, //17
            -3.8,18.5,0.5, //18
            -3.8,16.5,0.5, //19
            -3.8,16.5,-0.5, //20
            -3.8,18.5,-0.5, //21
            -1.1,18.5,-0.5, //22

            -3.8,14.5,-0.5, //23
            -3.8,14.5,0.5, //24
            -3.6,17,0.4, //25
            -3.6,17,-0.4, //26
            -3.6,14.5,-0.4, //27
            -3.6,14.5,0.4, //28

        ]);
        const frontdeckOrder = [
            0,2,3,
            1,3,2,
            0,3,4,
            1,4,3,

            5,7,6,
            8,7,5,

            9,10,11,
            12,9,11,

            7,11,8,
            11,12,8,

            6,11,7,
            10,11,6,

            5,8,12,
            5,12,9,

            13,15,16,
            14,16,15,

            15,18,21,
            15,21,20,
            15,19,18,
            15,20,22,
            15,17,19,
            21,20,18,
            18,20,19,
            17,22,20,
            17,20,19,
            20,19,23,
            19,24,23,
            26,27,25,
            27,28,25,
            25,19,28,
            19,24,28,
            26,23,20,
            26,27,23,
        ];
        frontdeckGeom.setAttribute("position",new T.BufferAttribute(frontdeckCoords,3));
        frontdeckGeom.setIndex(frontdeckOrder);
        frontdeckGeom.computeVertexNormals();
        this.frontdeck = new T.Mesh(frontdeckGeom, bodymat);
        this.prydwen.add(this.frontdeck);

        let torusGeom = new T.TorusGeometry(1.1,0.05);
        let torus = new T.Mesh(torusGeom,bodymat);
        torus.position.set(0,20.5,0);
        torus.rotateX(Math.PI/2);
        this.prydwen.add(torus);

        let tailGeom = new T.BufferGeometry();
        const tailCoords = new Float32Array([
            3.5,-12.5,0.2, //0
            3.5,-12.5,-0.2, //1
            3.5,-24.5,-0.2, //2
            3.5,-24.5,0.2, //3
            3.4,-12.5,0.2, //4
            3.4,-12.5,-0.2, //5
            3.4,-24.5,-0.2, //6
            3.4,-24.5,0.2, //7

            -3.5,-12.5,0.2, //8
            -3.5,-12.5,-0.2, //9
            -3.5,-24.5,-0.2, //10
            -3.5,-24.5,0.2, //11
            -3.4,-12.5,0.2, //12
            -3.4,-12.5,-0.2, //13
            -3.4,-24.5,-0.2, //14
            -3.4,-24.5,0.2, //15

        ]);
        const tailOrder = [
            0,2,1,
            0,3,2,
            4,6,5,
            4,7,6,
            0,4,7,
            0,7,3,
            1,6,5,
            1,2,6,
            2,3,7,
            2,7,6,

            8,11,9,
            11,10,9,
            15,13,12,
            15,14,13,
            11,12,8,
            15,12,11,
            13,10,9,
            13,14,10,
            11,10,15,10,14,15,
        ];
        tailGeom.setAttribute("position",new T.BufferAttribute(tailCoords,3));
        tailGeom.setIndex(tailOrder);
        tailGeom.computeVertexNormals();
        let tail1 = new T.Mesh(tailGeom, bodymat);
        let tail2 = new T.Mesh(tailGeom, bodymat);
        tail2.rotateY(Math.PI/2);
        let tail = new T.Group();
        tail.add(tail1);
        tail.add(tail2);
        this.tail = tail;
        this.prydwen.add(this.tail);

        let rearwingFrameGeom = new T.BufferGeometry();
        const rearwingFrameCoords = new Float32Array([
            3.5,-24.5,-0.2, //0
            3.5,-24.5,0.2, //1
            -3.5,-24.5,-0.2, //2
            -3.5,-24.5,0.2, //3

            -0.2,-24.5,3.5, //4
            0.2,-24.5,3.5, //5
            -0.2,-24.5,-3.5, //6
            0.2,-24.5,-3.5, //7
        ]);
        const rearwingFrameOrder = [
            0,1,2,
            1,3,2,

            5,7,4,
            7,6,4,
        ];
        rearwingFrameGeom.setAttribute("position",new T.BufferAttribute(rearwingFrameCoords,3));
        rearwingFrameGeom.setIndex(rearwingFrameOrder);
        rearwingFrameGeom.computeVertexNormals();
        this.rearwingFrame = new T.Mesh(rearwingFrameGeom,bodymat);
        this.prydwen.add(this.rearwingFrame);

        let rearwingpoleGeom = new T.CylinderGeometry(1,.3,6);
        let rearwingpole = new T.Mesh(rearwingpoleGeom,bodymat);
        this.rearwingpole = rearwingpole;
        this.rearwingpole.translateY(-24.5);
        this.prydwen.add(this.rearwingpole);

        let rearwing = new T.Group();
        let hrearwingGeom = new T.BoxGeometry(0.1,1,5);
        let hrearwing1 = new T.Mesh(hrearwingGeom,redmat);
        let hrearwing2 = new T.Mesh(hrearwingGeom,redmat);
        this.rearwing = rearwing;
        this.rearwing.add(hrearwing1);
        this.rearwing.add(hrearwing2);
        hrearwing1.translateX(-0.2);
        hrearwing1.translateY(-25);
        hrearwing1.translateZ(-3);
        hrearwing2.translateX(-0.2);
        hrearwing2.translateY(-25);
        hrearwing2.translateZ(3);
        let vrearwingGeom1 = new T.BoxGeometry(3,1,0.2);
        let vrearwing1 = new T.Mesh(vrearwingGeom1,redmat);
        this.rearwing.add(vrearwing1);
        vrearwing1.translateX(2);
        vrearwing1.translateY(-25);
        let vrearwingGeom2 = new T.BoxGeometry(5,1,0.2);
        let vrearwing2 = new T.Mesh(vrearwingGeom2,redmat);
        this.rearwing.add(vrearwing2);
        vrearwing2.translateX(-3);
        vrearwing2.translateY(-25);
        this.prydwen.add(this.rearwing);

        let bottomdeckGeom = new T.BufferGeometry();
        const bottomdeckCoords = new Float32Array([
            -3.5,15,-2, //0
            -3.5,15,2, //1
            -1,15,-2, //2
            -1,15,2, //3
            -4.2,14,-2, //4
            -4.2,14,2, //5
            -4.2,8.5,-2, //6
            -4.2,8.5,2, //7
            -1,8.5,-2, //8
            -1,8.5,2, //9

            -5.5,14,-2, //10
            -5.5,14,2, //11
            -5.5,10,-2, //12
            -5.5,10,2, //13
            -7,13,-2, //14
            -7,13,2, //15
            -7,10,-2, //16
            -7,10,2, //17

            -1,0,-2, //18
            -1,0,2, //19
            -4.2,0,-2, //20
            -4.2,0,2, //21
            -1,3,-2, //22
            -1,3,2, //23
            -4.2,3,-2, //24
            -4.2,3,2, //25
            -5.5,2,-2, //26
            -5.5,2,2, //27
            -5.5,-3,-2, //28
            -5.5,-3,2, //29
            -7,2,-2, //30
            -7,2,2, //31
            -7,-1,-2, //32
            -7,-1,2, //33
        ]);
        const bottomdeckOrder = [
            0,1,2,
            1,3,2,
            0,4,5,
            0,5,1,
            4,5,6,
            5,7,6,
            1,5,3,
            0,2,4,
            2,4,6,
            3,5,7,
            2,6,8,
            3,7,9,
            6,8,9,
            6,9,7,
            10,12,11,
            12,13,11,
            10,14,15,
            10,15,11,
            12,13,16,
            13,17,16,
            14,16,15,
            15,16,17,
            10,16,14,
            10,12,16,
            11,15,17,
            11,17,13,
            18,20,19,
            20,21,19,
            22,25,24,
            22,23,25,
            20,24,21,
            24,25,21,
            19,21,25,
            19,25,23,
            18,24,20,
            18,22,24,
            26,28,27,
            28,29,27,
            30,32,31,
            32,33,31,
            26,30,27,
            30,31,27,
            28,29,32,
            29,33,32,
            27,31,29,
            31,33,29,
            26,28,30,
            28,32,30,
        ];
        bottomdeckGeom.setAttribute("position",new T.BufferAttribute(bottomdeckCoords,3));
        bottomdeckGeom.setIndex(bottomdeckOrder);
        bottomdeckGeom.computeVertexNormals();
        this.bottomdeck = new T.Mesh(bottomdeckGeom,platformmat);
        this.prydwen.add(this.bottomdeck);
        
        let aisleGeom1 = new T.BoxGeometry(0.1,10,2);
        this.aisle1 = new T.Mesh(aisleGeom1,platformmat);
        this.aisle1.translateX(-5.56);
        this.aisle1.translateY(6.5);
        this.aisle1.translateZ(0);
        this.prydwen.add(this.aisle1);
        let aisleGeom2 = new T.BoxGeometry(0.1,1,10);
        this.aisle2 = new T.Mesh(aisleGeom2,platformmat);
        this.aisle2.translateX(-5.5);
        this.aisle2.translateY(6);
        this.prydwen.add(this.aisle2);

        for (let i = 0; i < 2; i++) {
            let paramsY = [13.85,10.15,1.85,0.15];
            for (let j = 0; j < 4; j++){
                let pole = this.drawPoles({x:-4.8,y:paramsY[j],z:Math.pow(-1,i)*1.85,mat:bodymat});
                this.prydwen.add(pole);
            }
        }

        for (let i = 0; i < 2; i++) {
            let paramsY = [11.5,1];
            for (let j = 0; j < 2; j++) {
                let thrust = this.drawThrusts({x:-6.7,y:paramsY[j],z:Math.pow(-1,i+1)*3,mat:bodymat});
                thrust.rotateY(Math.PI * i);
                this.prydwen.add(thrust);
            }
        }

        this.spotlight = new T.SpotLight("yellow");
        this.spotlight.angle = Math.PI / 36; // narrow (5 degrees)
        this.spotlight.position.set(-5.5, 4, 0);
        this.spotlight.target.position.set(-16, 0, 0);
        // we will use the target
        this.prydwen.add(this.spotlight.target);
        this.prydwen.add(this.spotlight);

        this.prydwen.translateX(params.x);
        this.prydwen.translateY(params.y);
        this.prydwen.translateZ(params.z);
        this.prydwen.rotateZ(Math.PI/2);
        // this.rideable = this.prydwen;
    }
    drawPropellers(params={}, doTwoSided = true) {
        let propellers = new T.Group();
        let exSettings2 = {
            steps: .2,
            depth: 0.2,
            bevelEnabled: false
        };
        let ex = {
            steps: 2,
            depth: 0.05,
            bevelEnabled: false
        };
        let backpropellerFrameGeom = new T.TorusGeometry(1.2,0.05);
        let backpropellerFrame = new T.Mesh(backpropellerFrameGeom,params.mat);
        propellers.add(backpropellerFrame);
        let propellerShape = new T.Shape();
        propellerShape.moveTo(0,0);
        propellerShape.lineTo(0.1,0);
        propellerShape.lineTo(0,1.2);
        propellerShape.lineTo(-0.1,0);
        propellerShape.lineTo(0,0);
        let backpropellerGeom = new T.ExtrudeGeometry(propellerShape,ex);
        let completePropeller = new T.Group();
        for (let i = 0; i < 4; i++) {
            let propeller = new T.Mesh(backpropellerGeom,params.mat);  
            propeller.rotateY(Math.PI/2);
            propeller.rotateZ(i*Math.PI/2);
            completePropeller.add(propeller);
        }
        propellers.add(completePropeller);
        completePropeller.rotateY(Math.PI/2)
        propellers.translateX(params.x);
        propellers.translateY(params.y);
        propellers.translateZ(params.z);
        return propellers;
    }
    drawThrusts(params={}, doTwoSided = true) {
        let completeThrust = new T.Group();
        let thrustGeom = new T.CylinderGeometry(0.2,0.5,2);
        let thrustBody = new T.Mesh(thrustGeom,params.mat);
        completeThrust.add(thrustBody);
        let thrustPivot = new T.Mesh(new T.BoxGeometry(0.5,0.5,1.5),params.mat);
        thrustPivot.translateY(-0.5);
        thrustPivot.translateZ(0.8);
        completeThrust.add(thrustPivot);
        completeThrust.translateX(params.x);
        completeThrust.translateY(params.y);
        completeThrust.translateZ(params.z);
        completeThrust.rotateZ(Math.PI/2);
        return completeThrust;
    }
    drawPoles(params={}, doTwoSided = true) {
        let poleGeom = new T.BoxGeometry(1.5,0.2,0.2);
        let pole = new T.Mesh(poleGeom,params.mat);
        pole.translateX(params.x);
        pole.translateY(params.y);
        pole.translateZ(params.z);
        return pole;
    }
  /**
   * @param {number} delta
   * @param {number} timeOfDay
   */
    stepWorld(delta, timeOfDay) {
        for (let i = 0; i < 4; i++) {
            this.propellers.children[i].rotateZ(delta * 4);
        }
    }
}