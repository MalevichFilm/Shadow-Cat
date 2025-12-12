import { MapConfig } from './types';

export const CAT_SIZE = 30;
export const CAT_SPEED = 2.5;
export const GAME_WIDTH = 400;
export const GAME_HEIGHT = 700;
export const TOTAL_LEVELS = 20;

export const MAPS: MapConfig[] = [
  {
    id: 1,
    name: "Dark Corridor",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 80, baseX: GAME_WIDTH / 2, baseY: 200, moveRadius: 40, moveSpeed: 0.02 },
      { radius: 70, baseX: GAME_WIDTH / 3, baseY: 350, moveRadius: 50, moveSpeed: 0.015 },
      { radius: 75, baseX: GAME_WIDTH * 2 / 3, baseY: 500, moveRadius: 45, moveSpeed: 0.018 },
    ],
  },
  {
    id: 2,
    name: "Moonlit Chamber",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 85, baseX: 100, baseY: 250, moveRadius: 60, moveSpeed: 0.025 },
      { radius: 90, baseX: GAME_WIDTH - 100, baseY: 400, moveRadius: 55, moveSpeed: 0.02 },
      { radius: 70, baseX: GAME_WIDTH / 2, baseY: 300, moveRadius: 40, moveSpeed: 0.022 },
      { radius: 80, baseX: GAME_WIDTH / 2, baseY: 550, moveRadius: 50, moveSpeed: 0.018 },
    ],
  },
  {
    id: 3,
    name: "Shadow Hall",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 75, baseX: 80, baseY: 200, moveRadius: 50, moveSpeed: 0.028 },
      { radius: 80, baseX: GAME_WIDTH - 80, baseY: 280, moveRadius: 60, moveSpeed: 0.02 },
      { radius: 95, baseX: GAME_WIDTH / 2, baseY: 400, moveRadius: 70, moveSpeed: 0.015 },
      { radius: 70, baseX: 120, baseY: 520, moveRadius: 45, moveSpeed: 0.025 },
      { radius: 75, baseX: GAME_WIDTH - 120, baseY: 600, moveRadius: 55, moveSpeed: 0.022 },
    ],
  },
  {
    id: 4,
    name: "Nightmare Passage",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 90, baseX: GAME_WIDTH / 4, baseY: 180, moveRadius: 70, moveSpeed: 0.03 },
      { radius: 85, baseX: GAME_WIDTH * 3 / 4, baseY: 280, moveRadius: 65, moveSpeed: 0.025 },
      { radius: 100, baseX: GAME_WIDTH / 2, baseY: 380, moveRadius: 80, moveSpeed: 0.018 },
      { radius: 75, baseX: 100, baseY: 480, moveRadius: 55, moveSpeed: 0.028 },
      { radius: 80, baseX: GAME_WIDTH - 100, baseY: 550, moveRadius: 60, moveSpeed: 0.022 },
      { radius: 70, baseX: GAME_WIDTH / 2, baseY: 620, moveRadius: 50, moveSpeed: 0.026 },
    ],
  },
  {
    id: 5,
    name: "Final Darkness",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 95, baseX: 60, baseY: 180, moveRadius: 80, moveSpeed: 0.035 },
      { radius: 90, baseX: GAME_WIDTH - 60, baseY: 250, moveRadius: 75, moveSpeed: 0.03 },
      { radius: 110, baseX: GAME_WIDTH / 2, baseY: 320, moveRadius: 90, moveSpeed: 0.02 },
      { radius: 85, baseX: 80, baseY: 420, moveRadius: 70, moveSpeed: 0.032 },
      { radius: 80, baseX: GAME_WIDTH - 80, baseY: 500, moveRadius: 65, moveSpeed: 0.028 },
      { radius: 90, baseX: GAME_WIDTH / 3, baseY: 580, moveRadius: 75, moveSpeed: 0.025 },
      { radius: 85, baseX: GAME_WIDTH * 2 / 3, baseY: 660, moveRadius: 70, moveSpeed: 0.03 },
    ],
  },
  {
    id: 6,
    name: "Pendulum Panic",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 70, baseX: GAME_WIDTH / 2, baseY: 150, moveRadius: 150, moveSpeed: 0.025, movementType: 'horizontal' },
      { radius: 80, baseX: GAME_WIDTH / 2, baseY: 350, moveRadius: 120, moveSpeed: 0.03, movementType: 'horizontal' },
      { radius: 75, baseX: GAME_WIDTH / 2, baseY: 550, moveRadius: 160, moveSpeed: 0.02, movementType: 'horizontal' },
    ],
  },
  {
    id: 7,
    name: "Mixed Signals",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 60, baseX: GAME_WIDTH / 2, baseY: 120, moveRadius: 100, moveSpeed: 0.04, movementType: 'horizontal' },
      { radius: 80, baseX: 100, baseY: 250, moveRadius: 60, moveSpeed: 0.025 },
      { radius: 80, baseX: GAME_WIDTH - 100, baseY: 400, moveRadius: 60, moveSpeed: 0.03 },
      { radius: 60, baseX: GAME_WIDTH / 2, baseY: 520, moveRadius: 140, moveSpeed: 0.035, movementType: 'horizontal' },
      { radius: 70, baseX: GAME_WIDTH / 2, baseY: 620, moveRadius: 50, moveSpeed: 0.02 },
    ],
  },
  {
    id: 8,
    name: "Vertical Voids",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
        { radius: 80, baseX: GAME_WIDTH / 4, baseY: 400, moveRadius: 200, moveSpeed: 0.03, movementType: 'vertical' },
        { radius: 60, baseX: GAME_WIDTH / 2, baseY: 250, moveRadius: 100, moveSpeed: 0.04, movementType: 'vertical' },
        { radius: 70, baseX: GAME_WIDTH * 3 / 4, baseY: 500, moveRadius: 100, moveSpeed: 0.025, movementType: 'vertical' },
    ],
  },
  {
    id: 9,
    name: "Grid Lock",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
        { radius: 60, baseX: GAME_WIDTH / 2, baseY: 550, moveRadius: 150, moveSpeed: 0.03, movementType: 'horizontal' },
        { radius: 70, baseX: 100, baseY: 350, moveRadius: 200, moveSpeed: 0.02, movementType: 'vertical' },
        { radius: 70, baseX: GAME_WIDTH - 100, baseY: 350, moveRadius: 200, moveSpeed: 0.025, movementType: 'vertical' },
        { radius: 80, baseX: GAME_WIDTH / 2, baseY: 150, moveRadius: 120, moveSpeed: 0.035, movementType: 'horizontal' },
    ],
  },
  {
    id: 10,
    name: "Crossing Paths",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 70, baseX: GAME_WIDTH / 2, baseY: 200, moveRadius: 150, moveSpeed: 0.02, movementType: 'horizontal' },
      { radius: 70, baseX: GAME_WIDTH / 2, baseY: 400, moveRadius: 150, moveSpeed: 0.025, movementType: 'horizontal' },
      { radius: 80, baseX: 100, baseY: 300, moveRadius: 150, moveSpeed: 0.03, movementType: 'vertical' },
      { radius: 80, baseX: GAME_WIDTH - 100, baseY: 500, moveRadius: 150, moveSpeed: 0.028, movementType: 'vertical' },
    ],
  },
  {
    id: 11,
    name: "The Gauntlet",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 60, baseX: 100, baseY: 150, moveRadius: 50, moveSpeed: 0.04 },
      { radius: 60, baseX: GAME_WIDTH - 100, baseY: 250, moveRadius: 50, moveSpeed: 0.035 },
      { radius: 60, baseX: 100, baseY: 350, moveRadius: 50, moveSpeed: 0.04 },
      { radius: 60, baseX: GAME_WIDTH - 100, baseY: 450, moveRadius: 50, moveSpeed: 0.035 },
      { radius: 60, baseX: 100, baseY: 550, moveRadius: 50, moveSpeed: 0.04 },
    ],
  },
  {
    id: 12,
    name: "Weaving Shadows",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 90, baseX: GAME_WIDTH / 2, baseY: 350, moveRadius: 120, moveSpeed: 0.015 },
      { radius: 80, baseX: 120, baseY: 200, moveRadius: 80, moveSpeed: 0.02 },
      { radius: 80, baseX: GAME_WIDTH - 120, baseY: 500, moveRadius: 80, moveSpeed: 0.022 },
      { radius: 70, baseX: GAME_WIDTH / 2, baseY: 600, moveRadius: 100, moveSpeed: 0.025 },
    ],
  },
  {
    id: 13,
    name: "Dance of Lights",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 50, baseX: GAME_WIDTH / 2, baseY: 200, moveRadius: 100, moveSpeed: 0.05 },
      { radius: 100, baseX: GAME_WIDTH / 2, baseY: 450, moveRadius: 80, moveSpeed: 0.01 },
      { radius: 50, baseX: 80, baseY: 300, moveRadius: 40, moveSpeed: 0.045 },
      { radius: 50, baseX: GAME_WIDTH - 80, baseY: 600, moveRadius: 40, moveSpeed: 0.055 },
    ],
  },
  {
    id: 14,
    name: "Corridor of Eyes",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 40, baseX: 60, baseY: 150, moveRadius: 20, moveSpeed: 0.06 },
      { radius: 40, baseX: 120, baseY: 250, moveRadius: 20, moveSpeed: 0.05 },
      { radius: 40, baseX: 180, baseY: 350, moveRadius: 20, moveSpeed: 0.06 },
      { radius: 40, baseX: 240, baseY: 450, moveRadius: 20, moveSpeed: 0.05 },
      { radius: 40, baseX: 300, baseY: 550, moveRadius: 20, moveSpeed: 0.06 },
      { radius: 40, baseX: 360, baseY: 650, moveRadius: 20, moveSpeed: 0.05 },
    ],
  },
  {
    id: 15,
    name: "Synchronicity",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 80, baseX: 100, baseY: 200, moveRadius: 60, moveSpeed: 0.02, movementType: 'vertical' },
      { radius: 80, baseX: GAME_WIDTH - 100, baseY: 200, moveRadius: 60, moveSpeed: 0.02, movementType: 'vertical' },
      { radius: 80, baseX: 100, baseY: 500, moveRadius: 60, moveSpeed: 0.02, movementType: 'vertical' },
      { radius: 80, baseX: GAME_WIDTH - 100, baseY: 500, moveRadius: 60, moveSpeed: 0.02, movementType: 'vertical' },
    ],
  },
  {
    id: 16,
    name: "Chaotic Maze",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 70, baseX: GAME_WIDTH * 0.25, baseY: 150, moveRadius: 50, moveSpeed: 0.025 },
      { radius: 60, baseX: GAME_WIDTH * 0.75, baseY: 250, moveRadius: 60, moveSpeed: 0.035, movementType: 'horizontal' },
      { radius: 80, baseX: GAME_WIDTH * 0.5, baseY: 350, moveRadius: 100, moveSpeed: 0.015 },
      { radius: 65, baseX: GAME_WIDTH * 0.2, baseY: 450, moveRadius: 50, moveSpeed: 0.03, movementType: 'vertical' },
      { radius: 75, baseX: GAME_WIDTH * 0.8, baseY: 550, moveRadius: 70, moveSpeed: 0.02 },
      { radius: 60, baseX: GAME_WIDTH * 0.5, baseY: 650, moveRadius: 120, moveSpeed: 0.04, movementType: 'horizontal' },
    ],
  },
  {
    id: 17,
    name: "The Squeeze",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 120, baseX: GAME_WIDTH / 2, baseY: 250, moveRadius: 80, moveSpeed: 0.02 },
      { radius: 120, baseX: GAME_WIDTH / 2, baseY: 550, moveRadius: 80, moveSpeed: 0.025 },
    ],
  },
  {
    id: 18,
    name: "Flooded with Light",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 100, baseX: 100, baseY: 150, moveRadius: 40, moveSpeed: 0.02 },
      { radius: 100, baseX: GAME_WIDTH - 100, baseY: 250, moveRadius: 40, moveSpeed: 0.025 },
      { radius: 100, baseX: 100, baseY: 350, moveRadius: 40, moveSpeed: 0.02 },
      { radius: 100, baseX: GAME_WIDTH - 100, baseY: 450, moveRadius: 40, moveSpeed: 0.025 },
      { radius: 100, baseX: 100, baseY: 550, moveRadius: 40, moveSpeed: 0.02 },
      { radius: 100, baseX: GAME_WIDTH - 100, baseY: 650, moveRadius: 40, moveSpeed: 0.025 },
    ],
  },
  {
    id: 19,
    name: "The Final Chase",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 80, baseX: GAME_WIDTH/2, baseY: 150, moveRadius: 160, moveSpeed: 0.04, movementType: 'horizontal' },
      { radius: 80, baseX: GAME_WIDTH/2, baseY: 300, moveRadius: 160, moveSpeed: 0.045, movementType: 'horizontal' },
      { radius: 80, baseX: GAME_WIDTH/2, baseY: 450, moveRadius: 160, moveSpeed: 0.05, movementType: 'horizontal' },
      { radius: 80, baseX: GAME_WIDTH/2, baseY: 600, moveRadius: 160, moveSpeed: 0.055, movementType: 'horizontal' },
    ],
  },
  {
    id: 20,
    name: "Heart of Darkness",
    backgroundColor: "bg-black",
    startPosition: { x: 40, y: GAME_HEIGHT - 50 },
    lamps: [
      { radius: 90, baseX: GAME_WIDTH / 2, baseY: 350, moveRadius: 150, moveSpeed: 0.03, movementType: 'horizontal' },
      { radius: 90, baseX: 120, baseY: 350, moveRadius: 200, moveSpeed: 0.035, movementType: 'vertical' },
      { radius: 90, baseX: GAME_WIDTH - 120, baseY: 350, moveRadius: 200, moveSpeed: 0.032, movementType: 'vertical' },
      { radius: 70, baseX: GAME_WIDTH / 2, baseY: 150, moveRadius: 100, moveSpeed: 0.04 },
      { radius: 70, baseX: GAME_WIDTH / 2, baseY: 550, moveRadius: 100, moveSpeed: 0.045 },
    ],
  },
];

export const getMap = (mapId: number): MapConfig => {
  return MAPS[mapId - 1] || MAPS[0];
};