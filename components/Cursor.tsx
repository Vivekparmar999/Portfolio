import { useEffect, useState } from "react";

export default function Cursor() {
  {/**
  Initial set values for cursor
  x&y - will be current position of cursor/inner cursor
  width&Height - will be outer hollow cursor/outer cursor width & height
  borderRadius - outer cursor radius
 */}
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    width: "32px",
    height: "32px",
    borderRadius: "100%",
    hoveredOver: false,
    hideDot: false,
    scrolling: false,
  });

  useEffect(() => {
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("scroll", cursorScroll);
    window.addEventListener("click", checkCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", cursorScroll);
      window.removeEventListener("click", checkCursor);
    };
  }, []);

  const moveCursor = (e: MouseEvent) => {
    let width = "32px",
      height = "32px",
      borderRadius = "100%",
      x = e.clientX - 16,//negative x axis to actual position
      y = e.clientY - 16,//negative y axis to actual position
      hoveredOver = false;

    let hoveredElement: Element | null | undefined = document.elementFromPoint(
      e.clientX,
      e.clientY
    );
    let dataCursor = hoveredElement?.getAttribute("data-cursor");
    //Our Custom Attribute (data-cursor) not present then do nothing
    if (dataCursor) {
      if (dataCursor !== "true") {
        hoveredElement = hoveredElement?.closest(`[data-cursor="true"]`);
      }
      if (!hoveredElement) return;
      const computedStyle = window.getComputedStyle(hoveredElement);
      const boundingRect = hoveredElement.getBoundingClientRect();
      width = boundingRect.width + "px";//Take whole width of hovered element
      height = boundingRect.height + "px";//Take whole width of hovered element
      borderRadius = computedStyle.borderRadius || "100%";//If it has value then assign else assign 100
      if (borderRadius === "0px") {//hovered element borderRadius 0 then change to default
        borderRadius = "4px";
      }
      x = boundingRect.x; //update x & y cursor position top left of hovered element
      y = boundingRect.y; 
      hoveredOver = true; //Make true to add cursor-hover-animation css to outer cursor
    }
    //update the UI
    setCursor({
      x,
      y,
      width,
      height,
      borderRadius,
      hoveredOver,
      hideDot: false,
      scrolling: false,
    });
  };

  const cursorScroll = () => {
    if (cursor.hoveredOver) return;
    // setCursor({
    //   x: 0,
    //   y: 60,
    //   width: window.innerWidth + "px",
    //   height: 4 + "px",
    //   borderRadius: "0",
    //   hoveredOver: false,
    //   scrolling: true,
    //   hideDot: false,
    // });
    resetCursor();
  };

  const checkCursor = (e: MouseEvent) => {
    let hoveredElement: Element | null | undefined = document.elementFromPoint(
      e.clientX,
      e.clientY
    );
    let dataFocusableCursor = hoveredElement?.getAttribute(
      "data-cursor-focusable"
    );
    if (dataFocusableCursor && hoveredElement) {
      const computedStyle = window.getComputedStyle(hoveredElement);
      const boundingRect = hoveredElement.getBoundingClientRect();
      let borderRadius = computedStyle.borderRadius || "100%";
      if (borderRadius === "0px") {
        borderRadius = "4px";
      }
      setCursor({
        x: boundingRect.x,//x axis from viewport 0 to element left side position
        y: boundingRect.y,//y axis from viewport 0 to element top side position
        width: boundingRect.width + "px",
        height: boundingRect.height + "px",
        borderRadius,
        hoveredOver: false,
        hideDot: true,
        scrolling: false,
      });
    } else resetCursor();
  };

  const resetCursor = () => {
    //By Default it will take previous property but it will overridde width,height,borderRadius & hoveredOver
    setCursor((prev) => {
      return {
        ...prev,
        width: "32px",
        height: "32px",
        borderRadius: "100%",
        hoveredOver: false,
      };
    });
  };

  return (
    <>        
    {/*uncomment className: lg:flex hidden*/}
    {/** Neeed to check whether scrolling & cursor will work in laptop & mobile */}
      <div
        className={`custom-cursor border-2 border-v9-yellow flex 
        ${
          cursor.hoveredOver || cursor.scrolling
            ? "border-opacity-100 cursor-hover-animation duration-300"
            : "border-opacity-40 duration-150"
        }
        `}
        style={{
          transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
          width: cursor.width,
          height: cursor.height,
          borderRadius: cursor.borderRadius,
        }}
      />
      {/*uncomment className: md:flex hidden*/}
      {!(cursor.hoveredOver || cursor.hideDot || cursor.scrolling) && (
        <div
          className="fixed w-1 h-1 rounded-full bg-v9-yellow z-[999] pointer-events-none flex"
          style={{
            transform: `translate3d(${cursor.x + 14}px, ${cursor.y + 14}px, 0)`,
          }}
        />
      )}
    </>
  );
}
