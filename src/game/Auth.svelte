
<script>
import { player } from '../stores/player';

window.onTelegramAuth = ({first_name, last_name, username}) => {
    player.set(`${first_name} ${last_name}${username ? ' ' + username : ''}`.replace(/'/g, ''));
}
</script>


<div class="auth">
    <script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-login="nintenday_bot" data-size="medium" data-radius="8" data-onauth="onTelegramAuth(user)"></script>
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

    .auth:hover {
        background: rgba(0,0,0,.25);
    }
</style>