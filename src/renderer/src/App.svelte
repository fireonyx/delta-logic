<script lang="ts">
    import TitleBar from "./obj/TitleBar/Element.svelte";
    import Gutter from "./obj/Gutter/Element.svelte";
    import View from "./obj/View/Element.svelte"
    import type { MenuItem } from "./obj/TitleBar/Export";
    import type { Node } from "./obj/View/Export";
    import nullMG from "./assets/null.gif";

    const items: MenuItem[] = [
        {
            label: "File",
            action: () => {
                console.log("File");
            },
            open: false
        },
        {
            label: "Edit",
            action: () => {
                console.log("Edit");
            },
            open: false
        },
        {
            label: "Terminal",
            action: () => {
                console.log("Terminal");
            },
            open: false
        },
        {
            label: "View",
            action: () => {
                console.log("View");
            },
            open: false
        },
        {
            label: "Help",
            action: () => {
                console.log("Help");
            },
            open: false
        }
    ];
</script>

<div class="main">
    <TitleBar items={items} title="Delta Logic" />

    <Gutter />

    <div class="nu" style={`background-image: url(${nullMG});`}></div>

    <div class="content">
        <View />
    </div>
</div>

<style lang="scss">
    @import "assets/color.scss";

    .main {
        padding-top: calc(50px + 30px + 1px);
        display: flex;
        flex-direction: row;

        .nu {
            position: fixed;
            width: 100vw;
            height: calc(100vh - 50px - 30px - 40px - 1px);
            overflow: hidden;
            opacity: 0.05;
        }

        .content {
            position: fixed;
            width: 100vw;
            height: calc(100vh - 50px - 30px - 40px - 1px);
            overflow: hidden;
            top: calc(50px + 30px + 1px);

            &:after {
                content: "";
                position: fixed;
                width: 100vw;
                height: 1px;
                background: $d0;
                top: calc(100vh - 40px);
                opacity: 0.6;
            }
        }
    }
</style>
