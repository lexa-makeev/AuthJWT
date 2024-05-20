import React, { useState } from "react";

import { Box, Button, Icon, IconButton, VStack } from "@chakra-ui/react";
import {
    HamburgerIcon,
    SettingsIcon,
    ChatIcon,
    EmailIcon,
} from "@chakra-ui/icons";
function Menu() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <>
            <Box
                w={isExpanded ? 180 : 20}
                transition="width 0.2s ease-in-out"
                overflow="hidden"
                border="1px"
                borderRadius="lg"
            >
                <IconButton
                    aria-label="Toggle Navigation"
                    icon={<HamburgerIcon />}
                    onClick={toggleExpansion}
                    mt={4}
                    ml={5}
                    alignSelf="flex-start"
                />

                <VStack spacing={4} mt={8} align="start" ml={5}>
                    {isExpanded ? (
                        <>
                            <Button leftIcon={<ChatIcon />} colorScheme="blue">
                                Контакты
                            </Button>
                            <Button
                                leftIcon={<SettingsIcon />}
                                colorScheme="green"
                            >
                                Настройки
                            </Button>
                            <Button leftIcon={<EmailIcon />} colorScheme="red">
                                Заказы
                            </Button>
                        </>
                    ) : (
                        <>
                            <IconButton
                                aria-label="Контакты"
                                icon={<ChatIcon />}
                                colorScheme="blue"
                            />
                            <IconButton
                                aria-label="Настройки"
                                icon={<SettingsIcon />}
                                colorScheme="green"
                            />
                            <IconButton
                                aria-label="Заказы"
                                icon={<EmailIcon />}
                                colorScheme="red"
                            />
                        </>
                    )}
                </VStack>
            </Box>
        </>
    );
}

export default Menu;
