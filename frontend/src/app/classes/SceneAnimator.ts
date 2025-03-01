import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D } from "three";
import { DotManager } from "./DotManager";

class SceneAnimator {
  private mesh: InstancedMesh | null = null;
  private dummy = new Object3D();
  private dotManager: DotManager;

  constructor() {
    this.dotManager = DotManager.getInstance();
  }

  setMesh(mesh: InstancedMesh) {
    this.mesh = mesh;
  }

  update() {
    if (!this.mesh) return;

    const activeDots = this.dotManager.activeDots;
    for (let i = 0; i < activeDots.length; i++) {
      const dot = activeDots[i];
      this.dummy.position.copy(dot.object.position);
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(i, this.dummy.matrix);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
  }
}

export const useSceneAnimator = (meshRef: React.RefObject<InstancedMesh>) => {
  const animator = new SceneAnimator();

  useFrame(() => {
    console.log("rolling!")
    animator.update();
  });

  return animator;
};
