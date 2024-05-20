import React from "react";
import ReactDOM from "react-dom/client";
import { theme } from "./config-themes";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <ChakraProvider theme={theme}>
        <ColorModeSwitcher position="absolute" bottom="1%" right="1%" />
        <Router>
            <App />
        </Router>
    </ChakraProvider>
);
