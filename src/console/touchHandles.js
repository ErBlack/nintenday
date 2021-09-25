export const getTouchHandles = (savePosition) => {
  let offsetX = null;
  let offsetY = null;
  let fy = null;
  let sy = null;

  return {
    onTouchStart: ({
      currentTarget,
      touches: [{ clientX, clientY }, second],
    }) => {
      const { x, y } = currentTarget.getBoundingClientRect();

      offsetX = clientX - x;
      offsetY = clientY - y;
      fy = clientY;
      sy = second?.clientY;
    },
    onTouchMove: ({
      target: eventTarget,
      touches: [{ clientX, clientY, target }, second],
    }) => {
      if (eventTarget !== target) return;

      if (fy && sy && second && target === second.target) {
        const df = fy - clientY;
        const ds = sy - second.clientY;

        savePosition(
          undefined,
          undefined,
          Math.ceil(Math.abs(df - ds) / 2) *
            Math.sign(second.clientX > clientX ? df : ds)
        );
      } else {
        savePosition(clientX - offsetX, clientY - offsetY);
      }

      fy = clientY;
      sy = second?.clientY;
    },
    onTouchEnd: () => {
      offsetX = null;
      offsetY = null;
      fy = null;
      sy = null;
    },
  };
};
