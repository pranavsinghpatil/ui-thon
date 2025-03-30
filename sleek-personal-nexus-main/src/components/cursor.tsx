
import { useState, useEffect } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handlePointerCheck = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      const isPointerNow = hoveredElement ? 
        getComputedStyle(hoveredElement).cursor === "pointer" : 
        false;
      setIsPointer(isPointerNow);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", handlePointerCheck);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    // Add class to body to hide default cursor
    document.body.classList.add("custom-cursor");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handlePointerCheck);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      document.body.classList.remove("custom-cursor");
    };
  }, [position.x, position.y]);

  if (typeof window === "undefined") return null;

  // Don't render custom cursor on mobile devices
  if (window.matchMedia("(max-width: 768px)").matches) return null;

  return (
    <>
      <div
        className={`cursor-dot ${isPointer ? "cursor-pointer" : ""} ${
          isClicked ? "cursor-clicked" : ""
        } ${isHidden ? "cursor-hidden" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        className={`cursor-ring ${isPointer ? "cursor-pointer" : ""} ${
          isClicked ? "cursor-clicked" : ""
        } ${isHidden ? "cursor-hidden" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
