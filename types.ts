export interface Position {
  x: number;
  y: number;
}

export interface Lamp {
  id: number;
  x: number;
  y: number;
  radius: number;
  baseX: number;
  baseY: number;
  moveAngle: number;
  moveSpeed: number;
  moveRadius: number;
  movementType?: 'circular' | 'horizontal' | 'vertical';
}

export interface MapConfig {
  id: number;
  name: string;
  backgroundColor: string;
  lamps: Omit<Lamp, 'x' | 'y' | 'moveAngle' | 'id'>[];
  startPosition: Position;
}