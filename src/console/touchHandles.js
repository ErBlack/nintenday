export const getTouchHandles = (savePosition) => {
    let offsetX = null;
    let offsetY = null;

    return {
        onTouchStart: ({currentTarget, touches: [{clientX, clientY}]}) => {
            const {x, y} = currentTarget.getBoundingClientRect();

            offsetX = clientX - x;
            offsetY = clientY - y;
        },
        onTouchMove: ({touches: [{clientX, clientY}]}) => {
            savePosition(clientX - offsetX, clientY - offsetY);
        },
        onTouchEnd: () => {
            offsetX = null;
            offsetY = null;
        }
    }
}