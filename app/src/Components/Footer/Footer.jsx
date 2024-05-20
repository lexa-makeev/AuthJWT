import { Container, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

function Footer() {
    return (
        <Container maxW="sm">
            <Flex
                justifyContent="center"
                as="footer"
                fontSize="sm"
                flexDirection={"column"}
                textAlign={"center"}
                pt={5}
                pb={5}
            >
                <Text>Все права защищены.</Text>
                <Link href="https://chakra-ui.com" isExternal>
                    Политика конфедициальности
                </Link>
                <Link href="https://chakra-ui.com" isExternal>
                    Обработка персональных данных
                </Link>
            </Flex>
        </Container>
    );
}

export default Footer;
