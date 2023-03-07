<script lang="ts">
    import type { MenuItem } from "./Export";

    export let items: MenuItem[] = [];
    export let title: string = "Delta Logic";
</script>

<div class="element">
    <section class="info">
        <div class="icon">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 80H0L30 50L15 35H35L50 50L80 20H100L70 50L85 65H65L50 50L20 80Z" fill="#BB01FD"/>
            </svg>                
        </div>

        <span>{title}</span>
    </section>

    <section class="control">
        <button>-</button>
        <button>[]</button>
        <button>X</button>
    </section>
</div>

<div class="menu-bar">
    {#each items as item}
        <button on:click={item.action}>{item.label}</button>
    {/each}
</div>

<style lang="scss">
    @import "../../assets/color.scss";

.element {
    display: flex;
    height: 50px;
    width: 100vw;
    top: 0px;
    left: 0px;
    background: transparent;
    position: fixed;
    -webkit-app-region: drag;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;    

    .info {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-left: 10px;

        .icon {
            width: 30px;
            height: 30px;
            margin-right: 10px;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;

            svg {
                width: 20px;
                height: 20px;
                fill: white;
            }
        }

        span {
            font-size: 11px;
            color: $f0;
        }
    }

    .control {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 1px;
        height: 100%;
        -webkit-app-region: no-drag;

        button {
            height: 100%;
            width: 32px;
            border: none;
            outline: none;
            color: $f0;
            background: transparent;
            transition: 100ms;
            margin: 0;
            padding: 0;

            &:hover {
                background: $d0;
                transition: 50ms;
                cursor: pointer;

                &:nth-child(3) {
                    background: rgb(255, 0, 85);
                    color: $l0;
                }
            }
        }
    }
}

.menu-bar {
    position: fixed;
    top: 50px;
    left: 0;
    height: 30px;
    display: flex;
    flex-direction: row;
    gap: 1px;
    padding: 0 5px;
    width: 100vw;
    -webkit-app-region: drag;

    &:after {
        position: fixed;
        display: flex;
        width: 100vw;
        height: 1px;
        background: $d0;
        opacity: 0.6;
        top: calc(50px + 30px);
        content: "";
        left: 0;
    }

    button {
        outline: none;
        background: transparent;
        height: 30px;
        display: flex;
        -webkit-app-region: no-drag;
        justify-content: center;
        align-items: center;
        color: $f0;
        cursor: pointer;
        font-size: 11px;
        transition: 100ms;
        padding: 0 10px;
        border: none;
        margin: 0;

        &:hover {
            background: $d0;
            transition: 50ms;
            color: $f1;
        }
    }
}
</style>
