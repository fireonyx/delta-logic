export interface NodeGeneric {
    type: "Rstr" | "Wre";
    label: string;
    inductance: bigint
    capacitance: bigint
    impedance: bigint
}

export interface NodeRstr {
    type: "Rstr"
    resistance: bigint
    wattage: bigint
    breakdownTemperature: bigint
    pinA: {x: number, y: number}
    pinB: { x: number; y: number }
    x: number
    y: number
}

export interface NodeWre {
    type: "Wre"
    resistance: bigint
    wattage: bigint
    breakdownTemperature: bigint
    pinA: {x: number, y: number}
    pinB: {x: number, y: number}
    x: number
    y: number
}

export type Node = NodeGeneric | NodeRstr | NodeWre;
