<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import type { Node } from './Export'
    import ResistorMark_Symbol from "../../assets/mark/ResistorMark.svg";

    let cWidth,
      cHeight = 0

    let element: HTMLElement | null = null
    let canvas: HTMLCanvasElement | null = null
    let ctx: CanvasRenderingContext2D | null = null

    let loop = 0
    let po = 0;
    let resizeListener = 0
    let scrollWheelListener = 0
    let mouseListenerMove = 0
    let mouseListenerBtn = 0
    let mouseListenerBtnUp = 0;
    let keyListener = 0

    let scrubDiv = 10;

    let mouseX = 0;
    let mouseY = 0;

    let mouseXSinceDrag = 0;
    let mouseYSinceDrag = 0;

    let zoomFactor = 1;
    let zoomFactorScrubDiv = 100;

    let mouseDown = false;
    let currentKeyName = "";

    export let nodes: Node[] = [
        {
            type: "Rstr",
            x: 0, y: 0,
            breakdownTemperature: 1000,
            capacitance: 1000,
            resistance: 1000,
            impedance: 1000,
            label: "R1",
            pinA: {
                x: 0, y: 0,
            },
            pinB: {
                x: 0, y: 0,
            },
            inductance: 1000,
            wattage: 1000,
        }
    ]

    export let fps = 120
    export let pps = 120
    let centerX = 0;
    let centerY = 0;

    let positionOffsetX = 0;
    let positionOffsetY = 0;

    function drawText(text: string, x: number = 0, y: number = 0, size: number = 11) {
        ctx.font = `${size}px sans-serif`
        ctx.fillText(text, x, y)
    }

    function textMath(text: string, size: number = 11) {
        ctx.font = `${size}px sans-serif`
        return ctx.measureText(text)
    }

    function getTextCenter(textMathData: TextMetrics) {
        return {
            x: centerX - textMathData.width / 2,
            y: centerY + (textMathData.actualBoundingBoxAscent / 4)
        }
    }

    function drawSVGFromURL(url: string, x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
        let img = new Image();
        img.src = url;
        ctx.drawImage(img, x, y, width, height);
    }

    let renderFunction = (): void => {
        ctx.clearRect(0, 0, cWidth, cHeight);

        let gridLineSpacing = 20;
        let gridLineSpacingOffsetX = positionOffsetX % gridLineSpacing;
        let gridLineSpacingOffsetY = positionOffsetY % gridLineSpacing;

        ctx.strokeStyle = "#090909";
        ctx.lineWidth = 1;

        for (let i = 0; i < cWidth; i += gridLineSpacing) {
            ctx.beginPath();
            ctx.moveTo(i + gridLineSpacingOffsetX, 0);
            ctx.lineTo(i + gridLineSpacingOffsetX, cHeight);
            ctx.stroke();
        }

        for (let i = 0; i < cHeight; i += gridLineSpacing) {
            ctx.beginPath();
            ctx.moveTo(0, i + gridLineSpacingOffsetY);
            ctx.lineTo(cWidth, i + gridLineSpacingOffsetY);
            ctx.stroke();
        }

        // Render each node
        nodes.forEach((node, nodeIndex) => {
            if (node.type == "Rstr") {
                drawSVGFromURL(ResistorMark_Symbol, node.x + positionOffsetX, node.y + positionOffsetY, 40 * zoomFactor, 8 * zoomFactor)
            }
        })
    }

    let processFunction = (): void => {
      centerX = Math.round(cWidth / 2)
      centerY = Math.round(cHeight / 2)

        // handle mouse canvas dragging feature
        if (mouseDown) {
            positionOffsetX += mouseX - mouseXSinceDrag;
            positionOffsetY += mouseY - mouseYSinceDrag;

            mouseXSinceDrag = mouseX;
            mouseYSinceDrag = mouseY;
        }
    }

    let renderPointer: () => void = () => {}
    let processPointer: () => void = () => {}

    function centerCanvas() {
        positionOffsetX = cWidth / 2
        positionOffsetY = cHeight / 2
    }

    function load() {
        console.log("Trying to load editor UI");

        cWidth = element.clientWidth;
        cHeight = element.clientHeight;
        canvas.width = cWidth;
        canvas.height = cHeight
        ctx = canvas.getContext("2d");

        ctx.imageSmoothingEnabled = false;

        renderPointer = renderFunction;
        processPointer = processFunction;

        centerCanvas()

        console.log(`[SC] Canvas size: ${cWidth}x${cHeight}`)
    }

    onMount(() => {
        load()
        loop = setInterval(() => {
            renderPointer()
        }, 1000 / fps)

        po = setInterval(() => {
            processPointer()
        }, 1000 / pps)

        resizeListener = window.addEventListener("resize", () => {
            renderPointer()
            load()
            renderPointer()
        })

        scrollWheelListener = window.addEventListener("wheel", (e) => {
            if (e.shiftKey && !e.ctrlKey) {
                positionOffsetX -= e.deltaY / scrubDiv;
            } else if (!e.shiftKey && !e.ctrlKey) {
                positionOffsetY += e.deltaY / scrubDiv;
            }

            if (e.ctrlKey) {
                const zoomOld = zoomFactor;
                zoomFactor += -e.deltaY / zoomFactorScrubDiv;
                if (zoomFactor < 1) zoomFactor = 1;

                const zoomedIn = zoomFactor > zoomOld;
                const zoomedOut = zoomFactor < zoomOld;

                // Zoom Position Code:
            }
        })

        mouseListenerMove = window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        })

        mouseListenerBtn = window.addEventListener("mousedown", (e) => {
            mouseDown = true;

            mouseXSinceDrag = mouseX;
            mouseYSinceDrag = mouseY;
        })

        mouseListenerBtnUp = window.addEventListener("mouseup", (e) => {
            mouseDown = false;

            mouseXSinceDrag = 0;
            mouseYSinceDrag = 0;
        })
    })

    onDestroy(() => {
        renderPointer = () => {}
        clearInterval(loop)
        clearInterval(po)

        window.removeEventListener("resize", resizeListener)
        window.removeEventListener("wheel", scrollWheelListener)
        window.removeEventListener("mousemove", mouseListenerMove)
        window.removeEventListener("mousedown", mouseListenerBtn)
        window.removeEventListener("mouseup", mouseListenerBtnUp)
    })

    // if (import.meta.hot) {
    //     import.meta.hot.dispose(() => {
    //         location.reload();
    //     });
    // }
</script>

<div class="element" bind:this={element}>
    <canvas class="render" bind:this={canvas} width={cWidth} height={cHeight}></canvas>
</div>

<style lang="scss">
    @import "../../assets/color.scss";

    .element {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: $l0;

        canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
</style>
