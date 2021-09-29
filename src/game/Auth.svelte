
<script>
import { player } from '../stores/player';

let inited = false;
if (!$player && !inited) {
    inited = true;

    setTimeout(() => {
        document.getElementById('auth').appendChild(
            document.getElementById('telegram-login-nintenday_bot')
        );
    }, 1);
}

window.onTelegramAuth = ({first_name, last_name, username}) => {
    player.set(`${first_name} ${last_name}${username ? ' ' + username : ''}`.replace(/'/g, ''));
}
</script>


<div class="auth" id="auth">

</div>

<style>
    .auth {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>