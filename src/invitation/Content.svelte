<script>
    import Timer from './Timer.svelte';
    import Links from './Links.svelte';

    const start = new Date('2021-10-16T11:00:00.000Z');
</script>
<section class="content">
    <h1 class="heading">nintenday</h1>
    <p class="text">
        Удачной охоты
        <br/>
        <br/>
        ©2021 год
    </p>
    <Links/>
</section>
<style>
    .content {
        background: linear-gradient(135deg, #212023, #1a171c);
        position: absolute;
        width: 40.7%;
        left: 41%;
        top: 2.95%;
        height: 63%;
        border-bottom-left-radius: 1.5%;
        border-bottom-right-radius: 1.5%;
        box-sizing: border-box;
        box-shadow: inset 0 0 5px rgba(0,0,0,.3);
        display: grid;
        grid-template-rows: max-content 1fr max-content;
    }

    .text {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
    }

    .heading {
        font-family: SNES;
        color: #e02112;
        margin: 16px 0 16px 0;
        font-size: 64px;
    }

    @media (min-width: 1024px) {
        .content {
            padding: 20px;
        }
    }

    @media (max-width: 1023px) and (min-width: 800px) {
        .content {
            padding: 15px;
        }
    }

    @media (max-aspect-ratio: 1181/1236) and (max-width: 799px) {
        .content {
            padding: 10px;
        }

        .heading {
            font-size: 9vw;
            margin: 0 0 1vw 0;
        }

        .text {
            font-size: 3vw;
            line-height: 1.2;
            font-weight: normal;
        }
    }

    @media (min-aspect-ratio: 1181/1236) and (max-height: 799px) {
        .content {
            padding: 10px;
        }

        .heading {
            font-size: 9vh;
            margin: 0 0 1vh 0;
        }

        .text {
            font-size: 3vh;
            line-height: 1.2;
            font-weight: normal;
        }
    }
</style>