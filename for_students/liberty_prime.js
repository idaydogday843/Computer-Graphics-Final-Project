import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class GrLibertyPrime extends GrObject {
    constructor (params={}, doTwoSided = true) {
        let LibertyPrime = new T.Group();
        super('Liberty Prime', LibertyPrime);
        this.LibertyPrime = LibertyPrime;
        let bodymat = new T.MeshStandardMaterial({
            color: "grey",
            metalness: 0.4,
            roughness: 0.6,
            side: doTwoSided ? T.DoubleSide : T.FrontSide
        });
        this.head = this.drawHead({x:0,y:6,z:0,mat:bodymat});
        this.LibertyPrime.add(this.head);
        this.body = this.drawBody({x:0,y:4,z:0,mat:bodymat});
        this.LibertyPrime.add(this.body);
        this.leftArm = this.drawArm({x:1.5,y:4.2,z:0,mat:bodymat});
        this.LibertyPrime.add(this.leftArm);
        this.rightArm = this.drawArm({x:-1.5,y:4.2,z:0,mat:bodymat});
        this.LibertyPrime.add(this.rightArm);
        this.leftLeg = this.drawLeg({x:0.5,y:2.5,z:0,mat:bodymat});
        this.LibertyPrime.add(this.leftLeg);
        this.rightLeg = this.drawLeg({x:-0.5,y:2.5,z:0,mat:bodymat});
        this.LibertyPrime.add(this.rightLeg);
        //this.rideable = this.LibertyPrime;

        this.limbRotate = 0;
        this.walkAmount = 0;
        this.soldierRotate = 0;
        this.walkOrder = true; //left foot & right arm go forward when true
        this.walkDirX = false; // walk towards positive X direction if true

        this.LibertyPrime.translateX(params.x);
        this.LibertyPrime.translateY(params.y);
        this.LibertyPrime.translateZ(params.z);
    }

    drawArm(params={}, doTwoSided = true) {
        let arm = new T.Group();
        let shoulderGeom = new T.BufferGeometry();
        const shoulderCoords = new Float32Array([
            0.6,0,0.6, //0
            -0.6,0,0.6, //1
            -0.6,0,-0.6, //2
            0.6,0,-0.6, //3
            0.6,1,-0.6, //4
            -0.6,1,-0.6, //5
            -0.6,0.8,0.6, //6
            0.6,0.8,0.6, //7
        ]);//1,5,2,1,6,5,
        const shoulderOrder = [
            0,1,2,0,2,3,
            4,5,6,4,6,7,
            2,3,4,2,4,5,
            0,6,1,0,7,6,
            0,3,4,0,4,7,
            1,5,2,1,6,5,
        ];
        shoulderGeom.setAttribute("position",new T.BufferAttribute(shoulderCoords,3));
        shoulderGeom.setIndex(shoulderOrder);
        shoulderGeom.computeVertexNormals();
        let shoulder = new T.Mesh(shoulderGeom,params.mat);
        arm.add(shoulder);

        let upperarmGeom = new T.CylinderGeometry(0.3,0.3,1.7);
        let upperarm = new T.Mesh(upperarmGeom,params.mat);
        upperarm.translateX(params.x/Math.abs(params.x)*0.1);
        upperarm.translateY(-0.75);
        arm.add(upperarm);

        let lowerarmGeom = new T.CylinderGeometry(0.5,0.4,1.1);
        let lowerarm = new T.Group();
        lowerarm.add(new T.Mesh(lowerarmGeom,params.mat));
        lowerarm.translateX(params.x/Math.abs(params.x)*0.1);
        lowerarm.translateY(-1.6);
        arm.add(lowerarm);

        let handGeom = new T.SphereGeometry(0.4);
        let hand = new T.Group();
        hand.add(new T.Mesh(handGeom,params.mat));
        hand.translateX(params.x/Math.abs(params.x)*0.01);
        hand.translateY(-0.45);
        lowerarm.add(hand);

        arm.translateX(params.x);
        arm.translateY(params.y);
        arm.translateZ(params.z);
        return arm;
    }

    drawLeg(params={}, doTwoSided = true) {
        let leg = new T.Group();

        let upperlegGeom = new T.CylinderGeometry(0.3,0.3,1.7);
        let upperleg = new T.Mesh(upperlegGeom,params.mat);
        upperleg.translateX(params.x/Math.abs(params.x)*0.1);
        upperleg.translateY(-0.75);
        leg.add(upperleg);

        let lowerlegGeom = new T.CylinderGeometry(0.5,0.4,1.7);
        let lowerleg = new T.Group();
        lowerleg.add(new T.Mesh(lowerlegGeom,params.mat));
        lowerleg.translateX(params.x/Math.abs(params.x)*0.1);
        lowerleg.translateY(-2);
        leg.add(lowerleg);

        let footGeom = new T.SphereGeometry(0.4);
        let foot = new T.Group();
        foot.add(new T.Mesh(footGeom,params.mat));
        foot.translateX(params.x/Math.abs(params.x)*0.01);
        foot.translateY(-0.45);
        lowerleg.add(foot);

        leg.translateX(params.x);
        leg.translateY(params.y);
        leg.translateZ(params.z);
        return leg;
    }

    drawBody(params={}, doTwoSided = true) {
        let body = new T.Group();
        let bulbMat = new T.MeshStandardMaterial({
            color: 'cyan',
            emissive:1.0
        });
        let torsoGeom = new T.CylinderGeometry(1,1,2.5,6,6);
        let torso = new T.Mesh(torsoGeom,params.mat);
        torso.translateY(0.5);
        torso.rotateZ(Math.PI/2);
        body.add(torso);
        let stomachGeom = new T.BoxGeometry(1.5,1,1,36,36,36);
        let stomach = new T.Mesh(stomachGeom,params.mat);
        stomach.translateY(-0.8);
        body.add(stomach);
        let bulbGeom = new T.SphereGeometry(0.1);
        for (let i = 0; i < 2; i++) {
            let bulb = new T.Mesh(bulbGeom,bulbMat);
            bulb.translateY(-0.4);
            bulb.translateX(Math.pow(-1,i)*0.8);
            body.add(bulb);
        }

        let hipShape = new T.Shape();
        hipShape.moveTo(0.75,-1.3);
        hipShape.lineTo(-0.75,-1.3);
        hipShape.lineTo(-0.75,-1.5);
        hipShape.lineTo(0,-2);
        hipShape.lineTo(0.75,-1.5);
        hipShape.lineTo(0.75,-1.3);
        let hipGeom = new T.ExtrudeGeometry(hipShape);
        let hip = new T.Mesh(hipGeom,params.mat);
        hip.translateZ(-0.5);
        body.add(hip);

        body.translateX(params.x);
        body.translateY(params.y);
        body.translateZ(params.z);
        return body;
    }

    drawHead(params={}, doTwoSided = true) {
        let head = new T.Group();
        let headGeom1 = new T.SphereGeometry(1);
        let headGeom2 = new T.TorusGeometry(0.8,0.05);
        let eyeringMat = new T.MeshStandardMaterial({
            color: 'cyan',
            emissive:1.0
        });

        let head1 = new T.Mesh(headGeom1,params.mat);
        let head2 = new T.Mesh(headGeom2,eyeringMat);
        head2.rotateX(Math.PI/2);
        head2.translateY(0.2);
        head2.translateZ(-0.2);
        head.add(head1);
        head.add(head2);
        head.translateX(params.x);
        head.translateY(params.y);
        head.translateZ(params.z);
        return head;
    }

    walk(delta,distance = 0) {
        let rotateAmount = delta/600;
        // let walkAmount = delta/5000;
        if (this.walkOrder && this.walkAmount <= distance && rotateAmount <= 0.02) {
            this.leftArm.rotateX(rotateAmount);
            this.rightArm.rotateX(-rotateAmount);
            this.leftLeg.rotateX(-rotateAmount);
            this.rightLeg.rotateX(rotateAmount);
            this.limbRotate += rotateAmount;
            if (this.limbRotate > Math.PI/8) {
                this.walkOrder = false;
            }
        }
        else if (!this.walkOrder && this.walkAmount <= distance) {
            this.leftArm.rotateX(-rotateAmount);
            this.rightArm.rotateX(rotateAmount);
            this.leftLeg.rotateX(rotateAmount);
            this.rightLeg.rotateX(-rotateAmount);
            this.limbRotate -= rotateAmount;
            if (this.limbRotate < -Math.PI/8) {
                this.walkOrder = true;
            }
        }
    }

    repeatWalkingOnSingleAxis(delta,rotate,distance) {
        let rotateAmount = delta/300;
        let speed = delta/1000;
        this.walk(delta,distance);

        if (!this.walkDirX && this.walkAmount <= distance) {
            this.LibertyPrime.translateZ(speed);
            this.walkAmount += speed;
        }
        if (this.walkAmount > distance) {
            if (this.soldierRotate <= rotate) {
                this.LibertyPrime.rotateY(rotateAmount);
                this.soldierRotate += rotateAmount;
            }
            else if (this.soldierRotate > rotate) {
                this.LibertyPrime.rotateY(rotate - this.soldierRotate);
                this.walkDirX = true;
                this.soldierRotate = 0;
                this.walkAmount = 0;
            }
        } 
        if (this.walkDirX && this.walkAmount >= -distance) {
            this.LibertyPrime.translateZ(speed);
            this.walkAmount -= speed;
        }
        if (this.walkAmount < -distance) {
            if (this.soldierRotate <= rotate) {
                this.LibertyPrime.rotateY(rotateAmount);
                this.soldierRotate += rotateAmount;
            }
            else if (this.soldierRotate > rotate) {
                this.LibertyPrime.rotateY(rotate - this.soldierRotate);
                this.walkDirX = true;
                this.soldierRotate = 0;
                this.walkAmount = 0;
            }
        }
    }

    /**
   * @param {number} delta
   * @param {number} timeOfDay
   */
    stepWorld(delta, timeOfDay) {
        this.repeatWalkingOnSingleAxis(delta,Math.PI,5);
    }
}