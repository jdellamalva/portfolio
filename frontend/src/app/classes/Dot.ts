import { Object3D } from "three";

export class Dot {
  object: Object3D;
  active: boolean;

  constructor() {
    this.object = new Object3D();
    this.active = false;
  }

  activate(x: number, y: number, z: number) {
    this.object.position.set(x, y, z);
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  update() {
    if (!this.active) return;
    // Placeholder for future animations and interactions
  }
}