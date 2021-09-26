import { get } from 'svelte/store';
import { hidden } from './store';

const SHOW_TIMEOUT = 15000;
const HIDE_TIMEOUT = 5000;
const CANCEL_TIMEOUT = 1000;

let cancelTimeout = null;
let showTimeout = null;
let hideTimeout = null;

export const touch = () => {
    const isHidden = get(hidden);

    if (isHidden) {
        clearTimeout(showTimeout);
        
        showTimeout = setTimeout(() => {
            hidden.set(false);
            showTimeout = null;
        }, SHOW_TIMEOUT)
    } else {
        if (!hideTimeout) {
            hideTimeout = setTimeout(() => {
                clearTimeout(cancelTimeout);

                hideTimeout = null;
                cancelTimeout = null;

                hidden.set(true);
            }, HIDE_TIMEOUT);
        } else {
            clearTimeout(cancelTimeout);
            
            cancelTimeout = setTimeout(() => {
                clearTimeout(hideTimeout);

                hideTimeout = null;
                cancelTimeout = null;
            }, CANCEL_TIMEOUT);
        }
    }
}