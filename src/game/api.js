import { get } from 'svelte/store';
import { player } from '../stores/player';

const host = 'https://functions.yandexcloud.net/d4esa1grli4quj8vs5gs';

export const uploadScore = (score) => {
    request(`${host}?score=${encodeURIComponent(score)}&player=${encodeURIComponent(get(player))}`);
};

const request = (url) => {
    let r = 0;

    const exec = () => {
        return fetch(url).catch(() => {
            if (r < 20) {
                r++;

                return exec();
            }
        });
    }

    return exec();
}