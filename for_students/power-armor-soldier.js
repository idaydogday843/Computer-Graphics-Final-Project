import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let soldierCount = 0;
export class GrSoldier extends GrObject {
    constructor (params={}, doTwoSided = true) {
        let scale = params.scale ? Number(params.scale) : 1;
        let Soldier = new T.Group();
        super(`Brotherhood Of Steel Soldier-${++soldierCount}`, Soldier);
        this.Soldier = Soldier;
        let bodymat = params.mat;
        let rustyMat = new T.MeshStandardMaterial({
            color:'#ce7320',
            roughness:0.4
        });
        let rubberMat = new T.MeshStandardMaterial({
            color: '#6b8112',
            roughness: 0.75
        });
        let reflectiveMat = new T.MeshStandardMaterial({
            color:'lightblue',
            metalness:0.4
        });
        this.head = this.drawHead({x:0,y:1.85-1.85,z:-0.1,mat:bodymat,rustyMat:rustyMat,rubberMat:rubberMat,reflectiveMat:reflectiveMat});
        this.Soldier.add(this.head);
        this.body = this.drawBody({x:0,y:1.2-1.85,z:0,mat:bodymat,rustyMat:rustyMat,rubberMat:rubberMat,reflectiveMat:reflectiveMat});
        this.Soldier.add(this.body);
        this.leftArm = this.drawArm({x:0.35,y:1.45-1.85,z:0,mat:bodymat,rustyMat:rustyMat,rubberMat:rubberMat,reflectiveMat:reflectiveMat});
        this.Soldier.add(this.leftArm);
        this.rightArm = this.drawArm({x:-0.35,y:1.45-1.85,z:0,mat:bodymat,rustyMat:rustyMat,rubberMat:rubberMat,reflectiveMat:reflectiveMat});
        this.Soldier.add(this.rightArm);
        this.leftLeg = this.drawLeg({x:0.04,y:0.35-1.625,z:0,mat:bodymat,rustyMat:rustyMat,rubberMat:rubberMat,reflectiveMat:reflectiveMat});
        this.Soldier.add(this.leftLeg);
        this.rightLeg = this.drawLeg({x:-0.04,y:0.35-1.625,z:0,mat:bodymat,rustyMat:rustyMat,rubberMat:rubberMat,reflectiveMat:reflectiveMat});
        this.Soldier.add(this.rightLeg);

        this.Soldier.translateX(params.x);
        this.Soldier.translateY(params.y);
        this.Soldier.translateZ(params.z);
        this.Soldier.scale.set(scale, scale, scale);
        this.rideable = this.Soldier;
        this.headRotate = 0;
        this.headDir = false;
        this.limbRotate = 0;
        this.walkAmount = 0;
        this.soldierRotate = 0;
        this.walkOrder = true; //left foot & right arm go forward when true
        this.walkDirX = false; // walk towards positive X direction if true
    }

    drawArm(params={}, doTwoSided = true) {
        let arm = new T.Group();
        let shoulderGeom = new T.BufferGeometry();
        const shoulderCoords = new Float32Array([
            0.2,0,0.2, //0
            -0.2,0,0.2, //1
            -0.2,0,-0.2, //2
            0.2,0,-0.2, //3
            0.2,0.2,-0.2, //4
            -0.2,0.2,-0.2, //5
            -0.2,0.16,0.2, //6
            0.2,0.16,0.2, //7
        ]);
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
        shoulder.rotateY(params.x/Math.abs(params.x) * Math.PI/2);
        arm.add(shoulder);

        let upperarmGeom = new T.CylinderGeometry(0.15,0.12,0.5,8);
        let upperarm = new T.Mesh(upperarmGeom,params.mat);
        upperarm.translateX(params.x/Math.abs(params.x)*0.08);
        upperarm.translateY(-0.1);
        arm.add(upperarm);

        let lowerarmGeom = new T.CylinderGeometry(0.12,0.09,0.5,8);
        let lowerarm = new T.Group();
        lowerarm.add(new T.Mesh(lowerarmGeom,params.mat));
        lowerarm.translateX(params.x/Math.abs(params.x)*0.08);
        lowerarm.translateY(-0.6);
        arm.add(lowerarm);

        let handGeom = new T.SphereGeometry(0.1);
        let hand = new T.Group();
        hand.add(new T.Mesh(handGeom,params.mat));
        hand.translateX(params.x/Math.abs(params.x)*0.08);
        hand.translateY(-0.8);
        arm.add(hand);

        arm.translateX(params.x);
        arm.translateY(params.y);
        arm.translateZ(params.z);
        return arm;
    }

    drawLeg(params={}, doTwoSided = true) {
        let leg = new T.Group();
        let upperlegGeom = new T.CylinderGeometry(0.17,0.16,0.55);
        let upperleg = new T.Mesh(upperlegGeom,params.mat);
        upperleg.translateX(params.x/Math.abs(params.x)*0.14);
        upperleg.rotateX(-Math.PI/25);
        leg.add(upperleg);

        let lowerlegGeom = new T.CylinderGeometry(0.16,0.15,0.55);
        let lowerleg = new T.Mesh(lowerlegGeom,params.mat);
        lowerleg.translateX(params.x/Math.abs(params.x)*0.14);
        lowerleg.translateY(-0.475);
        leg.add(lowerleg);

        let footGeom = new T.BoxGeometry(0.3,0.1,0.35,10,10,10);
        let foot = new T.Mesh(footGeom,params.mat);
        foot.translateX(params.x/Math.abs(params.x)*0.14);
        foot.translateY(-0.775);
        foot.translateZ(0.07);
        leg.add(foot);

        leg.translateX(params.x);
        leg.translateY(params.y);
        leg.translateZ(params.z);
        return leg;
    }

    drawBody(params={}, doTwoSided = true) {
        let body = new T.Group();
        let exSettings2 = {
            steps: 4,
            depth: 0.4,
            bevelEnabled: false
        };
        let redMat = new T.MeshStandardMaterial({
            color:'#c82631',
            roughness:0.6
        });
        let torsoGeom = new T.CylinderGeometry(0.3,0.3,0.5,8,8);
        let torso = new T.Mesh(torsoGeom,params.mat);
        torso.translateY(0.2);
        torso.rotateZ(Math.PI/2);
        body.add(torso);
        let backGeom = new T.BoxGeometry(0.45,0.8,0.15);
        let back = new T.Mesh(backGeom,params.mat);
        back.translateZ(-0.2);
        body.add(back);
        let stomach = new T.Group();
        let stomachGeom1 = new T.CylinderGeometry(0.2,0.18,0.4,8,8);
        let stomach1 = new T.Mesh(stomachGeom1,params.rustyMat);
        stomach1.translateY(-0.1);
        stomach.add(stomach1);
        let stomachpipeGeom = new T.CylinderGeometry(0.05,0.05,0.5);
        let pipeY = -0.1;
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let stomachpipe = new T.Mesh(stomachpipeGeom,params.rustyMat);
                stomachpipe.translateX(Math.pow(-1,i)*0.2);
                stomachpipe.translateY(pipeY);
                stomachpipe.translateZ(Math.pow(-1,j)*0.08);
                stomach.add(stomachpipe);
            }
        }
        let stomacharmorGeom = new T.BoxGeometry(0.2,0.2,0.03);
        let stomacharmor = new T.Mesh(stomacharmorGeom,params.mat);
        stomacharmor.translateZ(0.2);
        stomacharmor.translateY(-0.1);
        stomach.add(stomacharmor);
        body.add(stomach);
        let hip = new T.Group();
        let backhipShape = new T.Shape();
        backhipShape.moveTo(-0.3,-0.3);
        backhipShape.lineTo(-0.3,0);
        backhipShape.lineTo(-0.125,0.15);
        backhipShape.lineTo(0,0.2);
        backhipShape.lineTo(0.125,0.15);
        backhipShape.lineTo(0.3,0);
        backhipShape.lineTo(0.3,-0.3)
        backhipShape.lineTo(0.27,-0.3)
        backhipShape.lineTo(0.27,0);
        backhipShape.lineTo(0.1,0.135);
        backhipShape.lineTo(0,0.18);
        backhipShape.lineTo(-0.1,0.135);
        backhipShape.lineTo(-0.27,0);
        backhipShape.lineTo(-0.27,-0.3)
        backhipShape.lineTo(-0.3,-0.3);
        let backhipGeom = new T.ExtrudeGeometry(backhipShape,exSettings2);
        let backhip = new T.Mesh(backhipGeom,params.mat);
        backhip.translateY(-0.4);
        backhip.translateZ(-0.1);
        backhip.rotateX(-Math.PI/2);
        hip.add(backhip);
        let fronthipShape = new T.Shape();
        fronthipShape.moveTo(0.22,-0.2);
        fronthipShape.lineTo(-0.22,-0.2);
        fronthipShape.lineTo(-0.22,-0.3);
        fronthipShape.lineTo(0,-0.5);
        fronthipShape.lineTo(0.22,-0.3);
        fronthipShape.lineTo(0.22,-0.2);
        let fronthipGeom = new T.ExtrudeGeometry(fronthipShape,exSettings2);
        let fronthip = new T.Mesh(fronthipGeom,params.mat);
        fronthip.translateZ(-0.2);
        hip.add(fronthip);
        body.add(hip);
        let gascanGeom = new T.CylinderGeometry(0.08,0.06,0.25);
        let gascans = new T.Group();
        let gascan1 = new T.Mesh(gascanGeom,params.rubberMat);
        let gascan2 = new T.Mesh(gascanGeom,params.rubberMat);
        gascan1.translateX(0.15);
        gascan1.translateY(0.15);
        gascan2.translateX(-0.15);
        gascan2.translateY(0.15);
        gascans.add(gascan1,gascan2);
        gascans.translateZ(-0.3);
        body.add(gascans);
        let fusioncore = new T.Group()
        let valveGeom1 = new T.TorusGeometry(0.15,0.02);
        let valve1 = new T.Mesh(valveGeom1,params.reflectiveMat);
        let coreGeom = new T.SphereGeometry(0.1);
        let core = new T.Mesh(coreGeom,redMat);
        let valveGeom2 = new T.BoxGeometry(0.26,0.05,0.01);
        let valve2 = new T.Mesh(valveGeom2,params.reflectiveMat);
        let valve3 = new T.Mesh(valveGeom2,params.reflectiveMat);
        valve3.rotateZ(Math.PI/2);
        core.translateZ(0.05);
        fusioncore.add(core);
        fusioncore.add(valve1);
        fusioncore.add(valve2);
        fusioncore.add(valve3);
        fusioncore.translateY(-0.15);
        fusioncore.translateZ(-0.3);
        body.add(fusioncore);
        this.fusioncore = fusioncore;
        
        body.translateX(params.x);
        body.translateY(params.y);
        body.translateZ(params.z);
        return body;
    }

    drawHead(params={}, doTwoSided = true) {
        let head = new T.Group();
        let exSettings1 = {
            steps: 2,
            depth: 0.15,
            bevelEnabled: true
        };
        let exSettings2 = {
            steps: 4,
            depth: 0.07,
            bevelEnabled: false
        };
        let rustyMat = new T.MeshStandardMaterial({
            color:'#ce7320'
        });
        let rubberMat = new T.MeshStandardMaterial({
            color: '#6b8112',
            roughness: 0.75
        });
        let eyemaskMat = new T.MeshStandardMaterial({
            color:'lightblue',
            metalness:0.4
        });
        let headShape = new T.Shape();
        headShape.moveTo(0.1,0.15);
        headShape.lineTo(0.15,0);
        headShape.lineTo(0.1,-0.15);
        headShape.lineTo(-0.1,-0.15);
        headShape.lineTo(-0.15,0);
        headShape.lineTo(-0.1,0.15);
        headShape.lineTo(0.1,0.15);
        let headGeom = new T.ExtrudeGeometry(headShape,exSettings1);
        let head1 = new T.Mesh(headGeom,params.mat);
        head.add(head1);
        let gasmaskShape = new T.Shape();
        gasmaskShape.moveTo(0,0);
        gasmaskShape.lineTo(0.05,0);
        gasmaskShape.lineTo(0.12,-0.2);
        gasmaskShape.lineTo(-0.12,-0.2);
        gasmaskShape.lineTo(-0.05,0);
        gasmaskShape.lineTo(0.05,0);
        let gasmaskGeom = new T.ExtrudeGeometry(gasmaskShape,exSettings2);
        let gasmask = new T.Mesh(gasmaskGeom,params.mat);
        gasmask.translateZ(0.35);
        head.add(gasmask);
        let gasmaskpipeGeom = new T.TorusGeometry(0.25,0.02);
        let gasmaskpipe = new T.Mesh(gasmaskpipeGeom,params.rustyMat);
        gasmaskpipe.translateY(-0.1);
        gasmaskpipe.translateZ(0.15);
        gasmaskpipe.rotateX(Math.PI/2);
        head.add(gasmaskpipe);
        let gasmaskfilterGeom = new T.CylinderGeometry(0.04,0.04,0.02);
        let gasmaskfilter = new T.Mesh(gasmaskfilterGeom,params.rustyMat);
        gasmaskfilter.translateY(-0.13);
        gasmaskfilter.translateZ(0.43);
        gasmaskfilter.rotateX(Math.PI/2);
        head.add(gasmaskfilter);
        let rubberpipeGeom = new T.TorusGeometry(0.25,0.05);
        let rubberpipe = new T.Mesh(rubberpipeGeom,params.rubberMat);
        rubberpipe.translateY(-0.3);
        rubberpipe.translateZ(-0.04);
        rubberpipe.rotateY(Math.PI/2);
        head.add(rubberpipe);
        let eyemaskShape = new T.Shape();
        eyemaskShape.moveTo(0,0.05);
        eyemaskShape.lineTo(0.07,0.02);
        eyemaskShape.lineTo(0.13,0.035);
        eyemaskShape.lineTo(0.11,0.08);
        eyemaskShape.lineTo(0,0.065);
        eyemaskShape.lineTo(-0.11,0.08);
        eyemaskShape.lineTo(-0.13,0.035);
        eyemaskShape.lineTo(-0.07,0.02);
        eyemaskShape.lineTo(0,0.05);
        let eyemaskGeom = new T.ExtrudeGeometry(eyemaskShape,exSettings2);
        let eyemask = new T.Mesh(eyemaskGeom,params.reflectiveMat);
        eyemask.translateY(0.02);
        eyemask.translateZ(0.32);
        head.add(eyemask);
        let flashlightGeom = new T.CylinderGeometry(0.02,0.02,0.2);
        let flashlight = new T.Mesh(flashlightGeom,params.reflectiveMat);
        flashlight.translateX(-0.2);
        flashlight.translateY(0.2);
        flashlight.translateZ(0.2);
        flashlight.rotateX(Math.PI/2);
        head.add(flashlight);

        head.translateX(params.x);
        head.translateY(params.y);
        head.translateZ(params.z);
        return head;
    }

    /**
   * @param {number} delta
   * @param {number} timeOfDay
   */
    stepWorld(delta, timeOfDay) {
        this.fusioncore.rotateZ(delta/1000);
        // if (this.name == "Brotherhood Of Steel Soldier-1") {
        //     this.walkToAboard(delta);
        // }
        if (this.name == "Brotherhood Of Steel Soldier-1") {
            let rotate = Math.PI;
            let distance = 16;
            this.repeatWalkingOnSingleAxis(delta,rotate,distance);
        }
        if (this.name == "Brotherhood Of Steel Soldier-2") {
            this.commanderRotateHead(delta);
        }
        if (this.name == "Brotherhood Of Steel Soldier-3") {
            let rotate = Math.PI;
            let distance = 20;
            this.repeatWalkingOnSingleAxis(delta,rotate,distance);
        }
    }

    walk(delta,distance = 0) {
        let rotateAmount = delta/600;
        // let walkAmount = delta/5000;
        if (this.walkOrder && this.walkAmount <= distance) {
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

    sitPose() {
        this.rightLeg.children[0].translateY(-0.05);
        this.leftLeg.children[0].translateY(-0.05);
        this.rightLeg.children[0].translateZ(0.1);
        this.leftLeg.children[0].translateZ(0.1);
        this.rightLeg.rotateX(-Math.PI/2);
        this.leftLeg.rotateX(-Math.PI/2);
        this.rightLeg.children[1].translateY(0.12);
        this.rightLeg.children[1].translateZ(-0.1);
        this.rightLeg.children[1].rotateX(Math.PI/3);
        this.leftLeg.children[1].translateY(0.12);
        this.leftLeg.children[1].translateZ(-0.1);
        this.leftLeg.children[1].rotateX(Math.PI/3);
        this.rightLeg.children[2].translateY(0.17);
        this.rightLeg.children[2].translateZ(-0.4);
        this.rightLeg.children[2].rotateX(Math.PI/3);
        this.leftLeg.children[2].translateY(0.17);
        this.leftLeg.children[2].translateZ(-0.4);
        this.leftLeg.children[2].rotateX(Math.PI/3);
    }

    repeatWalkingOnSingleAxis(delta,rotate,distance) {
        let rotateAmount = delta/800;
        let speed = delta/2500;
        this.walk(delta,distance);

        if (!this.walkDirX && this.walkAmount <= distance) {
            this.Soldier.translateZ(speed);
            this.walkAmount += speed;
        }
        if (this.walkAmount > distance) {
            if (this.soldierRotate <= rotate) {
                this.Soldier.rotateY(rotateAmount);
                this.soldierRotate += rotateAmount;
            }
            else if (this.soldierRotate > rotate) {
                this.Soldier.rotateY(rotate - this.soldierRotate);
                this.walkDirX = true;
                this.soldierRotate = 0;
                this.walkAmount = 0;
            }
        } 
        if (this.walkDirX && this.walkAmount >= -distance) {
            this.Soldier.translateZ(speed);
            this.walkAmount -= speed;
        }
        if (this.walkAmount < -distance) {
            if (this.soldierRotate <= rotate) {
                this.Soldier.rotateY(rotateAmount);
                this.soldierRotate += rotateAmount;
            }
            else if (this.soldierRotate > rotate) {
                this.Soldier.rotateY(rotate - this.soldierRotate);
                this.walkDirX = true;
                this.soldierRotate = 0;
                this.walkAmount = 0;
            }
        }
    }

    commanderPose1() {
        this.leftArm.rotateZ(Math.PI/6);
        this.rightArm.rotateZ(-Math.PI/6);
        this.leftArm.children[2].children[0].rotateZ(-Math.PI/3);
        this.leftArm.children[2].children[0].translateX(-0.3);
        this.leftArm.children[3].children[0].translateX(-0.43);
        this.leftArm.children[3].children[0].translateY(0.28);
        this.rightArm.children[2].children[0].rotateZ(Math.PI/3);
        this.rightArm.children[2].children[0].translateX(0.3);
        this.rightArm.children[3].children[0].translateX(0.43);
        this.rightArm.children[3].children[0].translateY(0.28);
    }

    commanderRotateHead(delta) {
        let rotateAmount = delta/4000;
        if (!this.headDir) {
            this.head.rotateY(rotateAmount);
            this.headRotate += rotateAmount;
            if (this.headRotate > Math.PI/4) {
                this.headDir = true;
            }
        }
        else if (this.headDir) {
            this.head.rotateY(-rotateAmount);
            this.headRotate -= rotateAmount;
            if (this.headRotate < -Math.PI/4) {
                this.headDir = false;
            }
        }
         
    }
}