import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class GrRunway extends GrObject {
    constructor (params={}, doTwoSided = true) {
        let runway = new T.Group();
        super('Airport Runway',runway);
        this.runway = runway;
        let runwayMat = new T.MeshStandardMaterial({
            color:'black',
            roughness:0.8
        });
        let runwayGeomS1 = new T.BoxGeometry(35,0.1,4);
        let runwayS1 = new T.Mesh(runwayGeomS1,runwayMat);
        this.runway.add(runwayS1);
        let runwayGeomS2 = new T.BoxGeometry(18,0.1,4);
        let runwayS2 = new T.Mesh(runwayGeomS2,runwayMat);
        runwayS2.translateZ(8);
        this.runway.add(runwayS2);
        // let runwayShapeC = new T.Shape();
        let runwayGeomC1 = new T.RingGeometry(4,8,32,1,Math.PI,Math.PI/2);
        let runwayC1 = new T.Mesh(runwayGeomC1,runwayMat);
        runwayC1.translateZ(2);
        runwayC1.translateY(0.05);
        runwayC1.translateX(-9);
        runwayC1.rotateX(-Math.PI/2);
        this.runway.add(runwayC1);
        let runwayGeomC2 = new T.RingGeometry(4,8,32,1,-Math.PI/2,Math.PI/2);
        let runwayC2 = new T.Mesh(runwayGeomC2,runwayMat);
        runwayC2.translateZ(2);
        runwayC2.translateY(0.05);
        runwayC2.translateX(9);
        runwayC2.rotateX(-Math.PI/2);
        this.runway.add(runwayC2);
        this.runway.translateX(params.x);
        this.runway.translateY(params.y);
        this.runway.translateZ(params.z);

    }
}

export class GrAirportTerminal extends GrObject {
    constructor (params={}, doTwoSided = true) {
        let terminal = new T.Group();
        super('Airport Terminal',terminal);
        this.terminal = terminal;
        let building1Geom = new T.BoxGeometry(14,8,10);
        let building1 = new T.Mesh(building1Geom,params.mat);
        this.terminal.add(building1);
        let building2Geom = new T.BoxGeometry(6,8,4);
        let building2 = new T.Mesh(building2Geom,params.mat);
        building2.translateX(10);
        this.terminal.add(building2);
        let building3Geom = new T.BoxGeometry(4,8,10);
        let building3 = new T.Mesh(building3Geom,params.mat);
        building3.translateX(15);
        this.terminal.add(building3);
        this.terminal.translateX(params.x);
        this.terminal.translateY(params.y);
        this.terminal.translateZ(params.z);

    }
}

export class GrRadioTower extends GrObject {
    constructor (params={}, doTwoSided = true) {
        let radiotower = new T.Group();
        super('Radio Tower',radiotower);
        this.radiotower = radiotower;
        let exSettings2 = {
            steps: 4,
            depth: 0.4,
            bevelEnabled: false
        };
        let redMat = new T.MeshStandardMaterial({
            color:'#c82631',
            roughness:0.6
        });
        let shelfs = new T.Group();
        let shelfShape = new T.Shape();
        shelfShape.moveTo(0,0);
        shelfShape.lineTo(0,6);
        shelfShape.lineTo(0.5,7);
        shelfShape.lineTo(1.2,8);
        shelfShape.lineTo(2,9);
        shelfShape.lineTo(3,10);
        shelfShape.lineTo(3.2,9.5);
        shelfShape.lineTo(2.2,8.55);
        shelfShape.lineTo(1.6,7.85);
        shelfShape.lineTo(0.55,6);
        shelfShape.lineTo(0.2,0);
        let shelfGeom = new T.ExtrudeGeometry(shelfShape,exSettings2);
        let shelf1 = new T.Mesh(shelfGeom,params.mat);
        shelfs.add(shelf1);
        let shelf2 = new T.Mesh(shelfGeom,params.mat);
        shelf2.translateX(7.2);
        shelf2.translateZ(0.4);
        shelf2.rotateY(Math.PI);
        shelfs.add(shelf2);
        let shelf3 = new T.Mesh(shelfGeom,params.mat);
        shelf3.translateX(3.4);
        shelf3.translateZ(3.8);
        shelf3.rotateY(Math.PI/2);
        shelfs.add(shelf3);
        let shelf4 = new T.Mesh(shelfGeom,params.mat);
        shelf4.translateX(3.8);
        shelf4.translateZ(-3.4);
        shelf4.rotateY(-Math.PI/2);
        shelfs.add(shelf4);
        this.radiotower.add(shelfs);

        let basepoleGeom = new T.CylinderGeometry(1.5,1.5,8.5);
        let basepole = new T.Mesh(basepoleGeom,params.mat);
        basepole.translateX(3.6);
        basepole.translateY(4.25);
        basepole.translateZ(0.2);
        this.radiotower.add(basepole);

        let watchplatform = new T.Group();
        let watchplatformGeom1 = new T.CylinderGeometry(3.5,2.5,2);
        let watchplatformGeom2 = new T.CylinderGeometry(2.5,3.5,2);
        let watchplatform1 = new T.Mesh(watchplatformGeom1,params.mat);
        let watchplatform2 = new T.Mesh(watchplatformGeom2,params.mat);
        watchplatform1.translateY(9);
        watchplatform2.translateY(11);
        watchplatform.add(watchplatform1);
        watchplatform.add(watchplatform2);
        watchplatform.translateX(3.6);
        watchplatform.translateZ(0.2);
        this.radiotower.add(watchplatform);

        let antenna = new T.Group();
        let antennabaseGeom = new T.CylinderGeometry(0.5,0.5,2);
        let antennabase = new T.Mesh(antennabaseGeom,params.mat);
        antennabase.translateX(3.6);
        antennabase.translateY(13);
        antennabase.translateZ(0.25);
        antenna.add(antennabase);
        let antennatopGeom = new T.SphereGeometry(0.75);
        let antennatop = new T.Mesh(antennatopGeom,redMat);
        antennatop.translateX(3.6);
        antennatop.translateY(14.5);
        antennatop.translateZ(0.25);
        antenna.add(antennatop);
        this.radiotower.add(antenna);

        this.radiotower.translateX(params.x);
        this.radiotower.translateY(params.y);
        this.radiotower.translateZ(params.z);

    }
}

let hangerCount = 0;
export class GrHanger extends GrObject {
    constructor (params={}, doTwoSided = true) {
        let scale = params.scale ? Number(params.scale) : 1;
        let hanger = new T.Group();
        super(`Hanger-${++hangerCount}`,hanger);
        this.hanger = hanger;
        let hangerbaseGeom = new T.BoxGeometry(5,3,5);
        let hangerbase = new T.Mesh(hangerbaseGeom,params.mat);
        this.hanger.add(hangerbase);
        let hangerroofGeom = new T.BufferGeometry();
        const hangerroofCoords = new Float32Array([
            2.5,1.5,2.5, //0
            0,2.5,2.5, //1
            -2.5,1.5,2.5, //2
            2.5,1.5,-2.5, //3
            0,2.5,-2.5, //4
            -2.5,1.5,-2.5, //5
        ]);
        const hangerroofOrder = [
            0,2,1,
            5,3,4,
            5,2,4,
            2,1,4,
            3,0,4,
            0,1,4,
        ];
        hangerroofGeom.setAttribute("position",new T.BufferAttribute(hangerroofCoords,3));
        hangerroofGeom.setIndex(hangerroofOrder);
        hangerroofGeom.computeVertexNormals();
        let hangerroof = new T.Mesh(hangerroofGeom,params.mat);
        this.hanger.add(hangerroof);

        this.hanger.translateX(params.x);
        this.hanger.translateY(params.y);
        this.hanger.translateZ(params.z);
        this.hanger.scale.set(scale,scale,scale);
    }
}

export class GrRadar extends GrObject {
    constructor(params={},doTwoSided = true) {
        let Radar = new T.Group();
        super("Radar", Radar);
        let radarShelfShape = new T.ConeGeometry(0.5,1);
        let radarMat = new T.MeshStandardMaterial({
            color: "silver",
            metalness: 0.5,
            roughness: 0.7
        });
        let radarShelf = new T.Mesh(radarShelfShape,radarMat);
        let radarDiskGroup = new T.Group();
        Radar.add(radarDiskGroup);
        let radarDiskShape = new T.ConeGeometry(1.5,0.7);
        let radarDisk = new T.Mesh(radarDiskShape,radarMat);
        radarDiskGroup.add(radarDisk);
        Radar.add(radarShelf);
        radarDisk.rotateX(Math.PI);
        radarDisk.rotateZ(Math.atan2(Math.sqrt(18),2.6));
        radarDiskGroup.position.set(0.28,0.7,0);
        Radar.scale.set(params.scale, params.scale, params.scale);
        Radar.translateX(params.x);
        Radar.translateY(params.y);
        Radar.translateZ(params.z);
    }
}

export class GrBillBoard extends GrObject {
    constructor (params={},world,doTwoSided = true) {
        let Billboard = new T.Group();
        super("Billboard", Billboard);
        this.Billboard = Billboard;
        this.world = world;
        
        const obj = new T.WebGLCubeRenderTarget( 128, { generateMipmaps: true, minFilter: T.LinearMipmapLinearFilter } );
        this.cubecam = new T.CubeCamera(1.1,1000,obj);
        // radarcam.position.x = 0;
        // radarcam.position.y = 4.5;
        // radarcam.position.z = 1.5;
        let reflectiveMat = new T.MeshStandardMaterial({
            roughness : 0,
            metalness : 1,
            envMap : this.cubecam.renderTarget.texture,
        });
        // reflectiveMat.envMap = radarcam.renderTarget.texture;
        let postGeom = new T.CylinderGeometry(0.7,0.7,5);
        let post = new T.Mesh(postGeom,params.mat);
        this.Billboard.add(post);
        let boardGeom = new T.BoxGeometry(7,3,0.25);
        let board1 = new T.Mesh(boardGeom,reflectiveMat);
        let board2 = new T.Mesh(boardGeom,reflectiveMat);
        board1.translateZ(-0.75);
        board1.translateY(2.5);
        board1.rotateY(Math.PI/20);
        board2.translateZ(0.75);
        board2.translateY(2.5);
        board2.rotateY(-Math.PI/20);
        this.Billboard.add(board1);
        this.Billboard.add(board2);
        this.Billboard.add(this.cubecam);


        this.Billboard.translateX(params.x);
        this.Billboard.translateY(params.y);
        this.Billboard.translateZ(params.z);
    }

    stepWorld(delta,timeOfDay) {
        this.cubecam.update(this.world.renderer, this.world.scene);
    }
}