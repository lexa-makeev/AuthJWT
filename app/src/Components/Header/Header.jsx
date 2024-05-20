import React from "react";

import { Flex } from "@chakra-ui/react";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../../services/api";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const toast = useToast();
    function exit() {
        axios({
            method: "get",
            url: API_URL + "exit",
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
            .then(function (response) {
                localStorage.removeItem("access_token");
                navigate("/login");
            })
            .catch(function (error) {
                toast({
                    title: error.response.data.message,
                    status: "error",
                    isClosable: true,
                });
            });
    }
    return (
        <Flex justifyContent="center" as="header">
            {localStorage.getItem("access_token") !== null && (
                <Button onClick={exit} mt="5" w="10%" variant={"brand"}>
                    Выход
                </Button>
            )}
        </Flex>
    );
}

export default Header;
