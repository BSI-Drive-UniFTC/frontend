import { Button, TextField, Typography, Paper } from "@mui/material";

import { Link } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";

import logo from "assets/logo.png";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthContext } from "context/auth";
import { useContext } from "react";
import api from "services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    dsEmailLogin: yup.string().email("Informe um email valido").required("Você deve informar um email"),
    dsSenhaLogin: yup
        .string()
        .required("Insira a sua senha.")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "A senha deve conter 8 caracteres, uma letra maiúscula," +
            " uma letra minuscula, um numero e um carácter especial - Exemplo: Senha123#"
        )
});

const defaultValues = {
    dsEmailLogin: "",
    dsSenhaLogin: ""
};

function SignIn() {
    const { login } = useContext(AuthContext);

    const { control, formState, handleSubmit, reset } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { errors } = formState;

    async function onSubmit(data) {
        try {
            const response = await api.post("/login", data);

            if (response.status === 200) {
                const userInfo = response.data;
                login(userInfo);
            }
        } catch (err) {
            if (err.response.status === 403) {
                toast.error("Licença expirada!", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }

            if (err.response.status === 401) {
                toast.error("Email não confirmado, verifique sua caixa de entrada e confirme o cadastro!", {
                    position: "top-right",
                    autoClose: 4500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }

            if (err.response.status === 400) {
                toast.error("usuário ou senha inválidos!", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }
        }
    }

    return (
        <div className=" h-screen flex justify-center items-center bg-gray-50">
            <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0 mx-20">
                <div className="w-500 h-92 flex flex-col justify-center items-center my-10">
                    <img className=" w-full items-center justify-center" src={logo} alt="logo" />
                </div>

                <Paper
                    variant="outlined"
                    square
                    className="w-full sm:w-auto min-h-full sm:min-h-auto py-24 px-16 sm:px-16 sm:shadow"
                >
                    <div className="w-xs flex flex-col justify-center items-center  ">
                        <form
                            name="loginForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Controller
                                name="dsEmailLogin"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        className="mb-24"
                                        autoFocus
                                        color="primary"
                                        type="email"
                                        error={!!errors.dsEmailLogin}
                                        helperText={errors?.dsEmailLogin?.message}
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />

                            <Controller
                                name="dsSenhaLogin"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className=" mb-16"
                                        label="Senha"
                                        type="password"
                                        error={!!errors.dsSenhaLogin}
                                        helperText={errors?.dsSenhaLogin?.message}
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />

                            <div className="flex flex-col sm:flex-row items-center justify-end sm:justify-end mb-20 ">
                                <Link className="text-10 font-small text-primary no-underline hover:underline" to="/ForgotPassword">
                                    Esqueceu a senha?
                                </Link>
                            </div>

                            <Button
                                variant="contained"
                                color="error"
                                className=" w-full bg-primary"
                                aria-label="Sign in"
                                type="submit"
                                size="large"
                            >
                                Entrar
                            </Button>

                            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-center mt-20 ">
                                <div className="flex items-center font-small">
                                    <Typography>Ainda não tem uma conta?</Typography>
                                    <Link className="ml-4 text-primary no-underline hover:underline" to="/SignUp">
                                        Cadastre-se
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </Paper>
            </div>
        </div>
    );
}

export default SignIn;
