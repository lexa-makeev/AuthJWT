import { defineStyleConfig, extendTheme } from "@chakra-ui/react";

const Box = defineStyleConfig({
    variants: {
        default: (props) => ({
            bg:
                props.colorMode === "dark"
                    ? "background.700"
                    : "background.300",
        }),
    },
});
const Modal = defineStyleConfig({
    variants: {
        default: (props) => ({
            bg:
                props.colorMode === "dark"
                    ? "background.700"
                    : "background.300",
        }),
    },
});

export const theme = extendTheme({
    colors: {
        brand: {
            100: "#005691",
            200: "#005691",
            300: "#005691",
            400: "#005691",
            500: "#8CD1FF",
            600: "#8CD1FF",
            700: "#8CD1FF",
        },
        background: {
            100: "#ffff",
            200: "#ffff",
            300: "#ffff",
            400: "#ffff",
            500: "#1B1B1B",
            600: "#1B1B1B",
            700: "#1B1B1B",
        },
    },
    styles: {
        global: (props) => ({
            body: {
                bg: props.colorMode === "dark" ? "#131313" : "#D3EDFF",
            },
        }),
    },
    components: {
        Button: {
            variants: {
                brand: (props) => ({
                    bg: props.colorMode === "dark" ? "brand.300" : "brand.700",
                }),
            },
        },
        Box,
        Modal,
    },
});
