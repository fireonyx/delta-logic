<script lang="ts">
    import TitleBar from "./obj/TitleBar/Element.svelte";
    import Gutter from "./obj/Gutter/Element.svelte";
    import View from "./obj/View/Element.svelte"
    import type { MenuItem } from "./obj/TitleBar/Export";

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

    <View />
</div>

<style lang="scss">
    .main {
        padding-top: calc(50px + 30px);
    }
</style>