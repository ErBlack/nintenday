const host = 'https://functions.yandexcloud.net/d4esa1grli4quj8vs5gs';
const player = 'erblack';

export const uploadScore = (score) => {
    fetch(`${host}?score=${encodeUriComponent(score)}&player=${encodeURIComponent(player)}`)
};