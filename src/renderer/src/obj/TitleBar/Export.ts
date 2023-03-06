export interface MenuItem {
    label: string;
    action: () => void;
    open: boolean;
}