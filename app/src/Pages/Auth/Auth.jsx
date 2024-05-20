import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    useStyleConfig,
    useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

function Auth() {
    const styles = useStyleConfig("Box", { variant: "default" });
    const navigate = useNavigate();
    useEffect(() => {
        check_token();
    }, []);
    async function check_token() {
        if (localStorage.getItem("access_token") !== null) {
            navigate("/");
        } else {
            navigate("/login");
        }
    }
    const toast = useToast();

    function validateEmail(value) {
        let error;
        if (!value) {
            error = "Поле является обязательным";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            error = "Некорректная почта";
        }
        return error;
    }
    function validatePassword(value) {
        let error;
        if (!value) {
            error = "Поле является обязательным";
        } else if (value.length < 8) {
            error = "Минимальная длина пароля 8 символов";
        }
        return error;
    }

    function authorization(values, actions) {
        axios({
            method: "post",
            url: API_URL + "authorization",
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
            data: {
                email: values.email,
                password: values.password,
            },
        })
            .then(function (response) {
                toast({
                    title: "Успешная авторизация",
                    status: "success",
                    isClosable: true,
                });
                localStorage.setItem("access_token", response.data.access);
                navigate("/");
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
        <>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, actions) => authorization(values, actions)}
            >
                {(props) => (
                    <Container
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        h="75vh"
                        maxW="sm"
                    >
                        <Box
                            __css={styles}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            px={10}
                            pt={6}
                            pb={5}
                        >
                            <Heading size="lg" textAlign={"center"} mb={5}>
                                Авторизация
                            </Heading>
                            <Form>
                                <Field name="email" validate={validateEmail}>
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.email &&
                                                form.touched.email
                                            }
                                        >
                                            <FormLabel>Почта</FormLabel>
                                            <Input
                                                {...field}
                                                placeholder="Введите вашу почту"
                                                type="email"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.email}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field
                                    name="password"
                                    validate={validatePassword}
                                >
                                    {({ field, form }) => (
                                        <FormControl
                                            mt={2}
                                            isInvalid={
                                                form.errors.password &&
                                                form.touched.password
                                            }
                                        >
                                            <FormLabel>Пароль</FormLabel>
                                            <Input
                                                {...field}
                                                placeholder="Введите ваш пароль"
                                                type="password"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.password}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Button
                                    mt="5"
                                    w="100%"
                                    isLoading={props.isSubmitting}
                                    type="submit"
                                    variant={"brand"}
                                >
                                    Войти
                                </Button>
                            </Form>
                        </Box>
                    </Container>
                )}
            </Formik>

            {/* <ModalCode isOpen={isOpen} onClose={setIsOpen} auth={auth} /> */}
        </>
    );
}

export default Auth;
