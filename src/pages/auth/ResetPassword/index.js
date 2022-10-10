import { Button, TextField, Typography, Paper, FormControlLabel, Checkbox } from "@mui/material";

import { Controller, useForm } from "react-hook-form";

import logo from "assets/logo.png";

import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useState } from "react";

const schema = yup.object().shape({
    verificationCode: yup
        .string()
        .required('Por favor, insira o código de verificação')
        .min(8, 'O código contém 8 dígitos'),
    newPassword: yup
        .string()
        .required("Insira a sua senha.")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Senha deve conter 8 caracteres, uma letra maiúscula," +
            " uma letra minuscula, um numero e um carácter especial"
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Senha não confere")
        .required("Insira a senha e confira"),


});

const defaultValues = {
    verificationCode: '',
    newPassword: "",
    confirmPassword: "",

};

function ResetPassword() {
    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);

    const { control, formState, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { errors } = formState;

    async function onSubmit({ verificationCode, newPassword, confirmPassword }) {
        try {

            const response = await api.put("/resetPassword", { verificationCode, newPassword, confirmPassword });
            if (response.status === 200) {
                toast.success("Senha alterada com sucesso! ", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
                navigate("/");
            }
        } catch (err) {
            console.error(err);

            if (err.response.status === 401) {
                toast.error("Código de verificação invalido, solicite um novo código para seu email!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }

            if (err.response.status !== 401) {
                toast.error("Houve algum erro no servidor e a senha não pode ser alterada, tente novamente!", {
                    position: "top-right",
                    autoClose: 5000,
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
                    className="w-full sm:w-auto min-h-full sm:min-h-auto py-14 pb-24 px-16 sm:px-16 sm:shadow"
                >
                    <div className="w-xs flex flex-col justify-center items-center  ">
                        <Typography className=" text-2xl tracking-tight leading-tight my-10">
                            Alterar a senha esquecida
                        </Typography>

                        <form
                            name="ResetForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Controller
                                name="verificationCode"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className="my-10"
                                        name="verificationCode"
                                        label="Código de verificação"
                                        error={!!errors.verificationCode}
                                        helperText={errors?.verificationCode?.message}
                                        variant="outlined"
                                        autoComplete="off"
                                        fullWidth
                                    />
                                )}
                            />

                            <Controller
                                name="newPassword"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className="mb-10"
                                        label="Senha nova"
                                        name="newPassword"
                                        type={passwordVisible ? 'text' : 'password'}
                                        error={!!errors.newPassword}
                                        helperText={errors?.newPassword?.message}
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />

                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className="mb-10"
                                        label="Confirmar senha nova"
                                        type={passwordVisible ? 'text' : 'password'}
                                        error={!!errors.confirmPassword}
                                        helperText={errors?.confirmPassword?.message}
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />

                            <FormControlLabel
                                className="mb-14"
                                control={
                                    <Checkbox

                                        checked={passwordVisible}
                                        color="primary"
                                        onChange={() => setPasswordVisible(prevState => !prevState)}
                                    />
                                }
                                label="Mostrar senha"
                            />

                            <Button
                                variant="contained"
                                color="error"
                                className=" w-full bg-primary"
                                type="submit"
                                size="large"
                            >
                                Alterar Senha
                            </Button>
                        </form>
                    </div>
                </Paper>
            </div>
        </div>
    );
}

export default ResetPassword;
