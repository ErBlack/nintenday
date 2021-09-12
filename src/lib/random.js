export default function random(min = 0, max) {
    return min + Math.floor(Math.random() * Math.floor(max));
}