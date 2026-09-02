import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { sceneState } from "@/three/sceneState";
import { sectionConfig } from "@/three/sectionConfig";
import { cameraPositionCurve, CURVE_MAX_T } from "@/three/cameraPath";
import { damp, clamp } from "@/lib/damp";

const lookTarget = new THREE.Vector3();
const curvePos = new THREE.Vector3();
const objectPos = new THREE.Vector3();
const toCam = new THREE.Vector3();
const MIN_CAMERA_DISTANCE = 4.4;

export function CameraRig() {
  const { camera, size } = useThree();
  const fov = useRef(40);
  const smoothedT = useRef(0);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const cfg = sectionConfig[sceneState.activeSection];
    const cam = camera as THREE.PerspectiveCamera;

    const aspect = size.width / size.height;
    // Narrow/portrait viewports see a much tighter horizontal frustum for the same
    // vertical FOV — pull the whole path outward from center so nothing overflows.
    const portraitPad = aspect < 1.3 ? Math.min(2.1, 1.3 / aspect) : 1;

    const targetT = clamp(sceneState.curveT / CURVE_MAX_T, 0, 1);
    smoothedT.current = damp(smoothedT.current, targetT, 2.4, delta);
    cameraPositionCurve.getPoint(smoothedT.current, curvePos);

    // The spline can overshoot close to the object near sharp turns between waypoints —
    // guarantee a minimum clearance regardless of how the curve behaves in between.
    objectPos.set(...sceneState.corePosition);
    toCam.copy(curvePos).sub(objectPos);
    const distToObject = toCam.length();
    if (distToObject < MIN_CAMERA_DISTANCE && distToObject > 1e-4) {
      toCam.setLength(MIN_CAMERA_DISTANCE);
      curvePos.copy(objectPos).add(toCam);
    }

    const parallaxX = sceneState.pointer.x * 0.4;
    const parallaxY = sceneState.pointer.y * 0.22;

    cam.position.x = damp(cam.position.x, curvePos.x * portraitPad + parallaxX, 2.8, delta);
    cam.position.y = damp(cam.position.y, curvePos.y + parallaxY, 2.8, delta);
    cam.position.z = damp(cam.position.z, curvePos.z * portraitPad, 2.8, delta);

    fov.current = damp(fov.current, cfg.cameraFov, 2.4, delta);
    if (Math.abs(cam.fov - fov.current) > 0.01) {
      cam.fov = fov.current;
      cam.updateProjectionMatrix();
    }

    lookTarget.set(
      damp(lookTarget.x, sceneState.corePosition[0], 2.6, delta),
      damp(lookTarget.y, sceneState.corePosition[1], 2.6, delta),
      damp(lookTarget.z, sceneState.corePosition[2], 2.6, delta),
    );
    cam.lookAt(lookTarget);

    sceneState.cameraPosition[0] = cam.position.x;
    sceneState.cameraPosition[1] = cam.position.y;
    sceneState.cameraPosition[2] = cam.position.z;
    sceneState.cameraLookAt[0] = lookTarget.x;
    sceneState.cameraLookAt[1] = lookTarget.y;
    sceneState.cameraLookAt[2] = lookTarget.z;
    sceneState.cameraFov = fov.current;
  });

  return null;
}
