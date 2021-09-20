export const getMouseHandles = (savePosition) => {
    let offsetX = null;
    let offsetY = null;

    return {
        onMouseDown: ({currentTarget, clientX, clientY}) => {
            const {x, y} = currentTarget.getBoundingClientRect();

            offsetX = clientX - x;
            offsetY = clientY - y;
        },
        onMouseMove: ({clientX, clientY}) => {
            if (offsetX !== null && offsetY !== null) {
                savePosition(clientX - offsetX, clientY - offsetY);
            }
        },
        onMouseUp: () => {
            offsetX = null;
            offsetY = null;
        },
        onMouseWheel: ({deltaY}) => {
            savePosition(undefined, undefined, Math.sign(deltaY))
        }
    }
}