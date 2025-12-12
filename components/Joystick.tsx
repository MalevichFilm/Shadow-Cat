import React, { useState, useRef, useCallback } from 'react';

interface JoystickProps {
  onMove: (data: { angle: number; distance: number }) => void;
  onEnd: () => void;
}

const DEAD_ZONE_RATIO = 0.1; // 10% dead zone

const Joystick: React.FC<JoystickProps> = ({ onMove, onEnd }) => {
  const baseRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [knobPosition, setKnobPosition] = useState({ x: 0, y: 0 });

  const getEventPosition = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !baseRef.current) return;
    e.preventDefault();

    const baseRect = baseRef.current.getBoundingClientRect();
    const radius = baseRect.width / 2;
    const deadZone = radius * DEAD_ZONE_RATIO;
    
    const baseCenter = { x: baseRect.left + radius, y: baseRect.top + radius };
    const eventPos = getEventPosition(e);
    
    const dx = eventPos.x - baseCenter.x;
    const dy = eventPos.y - baseCenter.y;

    const angle = Math.atan2(dy, dx);
    const rawDistance = Math.sqrt(dx * dx + dy * dy);
    
    // Clamp the knob position visually
    const clampedDistance = Math.min(rawDistance, radius);
    const knobX = Math.cos(angle) * clampedDistance;
    const knobY = Math.sin(angle) * clampedDistance;
    setKnobPosition({ x: knobX, y: knobY });

    // Calculate dead zone and remap distance
    if (rawDistance < deadZone) {
      onMove({ angle, distance: 0 });
      return;
    }

    const effectiveDistance = rawDistance - deadZone;
    const maxEffectiveDistance = radius - deadZone;
    const normalizedDistance = Math.min(1, effectiveDistance / maxEffectiveDistance);

    onMove({ angle, distance: normalizedDistance });

  }, [isDragging, onMove]);

  const handleEnd = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    setIsDragging(false);
    setKnobPosition({ x: 0, y: 0 });
    onEnd();
  }, [isDragging, onEnd]);

  React.useEffect(() => {
    const moveHandler = (e: MouseEvent | TouchEvent) => handleMove(e as any);
    const endHandler = (e: MouseEvent | TouchEvent) => handleEnd(e as any);
    
    if (isDragging) {
      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('touchmove', moveHandler, { passive: false });
      window.addEventListener('mouseup', endHandler);
      window.addEventListener('touchend', endHandler, { passive: false });
    }

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('mouseup', endHandler);
      window.removeEventListener('touchend', endHandler);
    };
  }, [isDragging, handleMove, handleEnd]);

  return (
    <div
      ref={baseRef}
      className="relative w-40 h-40 bg-transparent rounded-full flex justify-center items-center select-none"
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      <div
        className="absolute w-16 h-16 bg-white/30 rounded-full border-2 border-white/50 transition-transform duration-75"
        style={{ transform: `translate(${knobPosition.x}px, ${knobPosition.y}px)` }}
      ></div>
    </div>
  );
};

export default Joystick;