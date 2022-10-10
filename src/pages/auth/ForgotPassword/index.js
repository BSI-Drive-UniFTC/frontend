import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Button, TextField, Typography, Paper } from "@mui/material";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import logo from "assets/logo.png";
import api from "services/api";
import { toast } from "react-toastify";

const schema = yup.object().shape({
    dsEmailReset: yup.string().email("Informe um email valido").required("Você deve informar um email")
});

const defaultValues = {
    dsEmailReset: ""
};

function ClassicForgotPasswordPage() {
    const navigate = useNavigate();

    const { control, formState, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { isValid, dirtyFields, errors } = formState;

    async function onSubmit(data) {
        try {
            const response = await api.post("/forgotPassword", data);
            if (response.status === 200) {
                toast.success("Foi enviado ao seu email um novo token para alteração da senha!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
                navigate("/");
            }
        } catch (err) {
            toast.error("Email não cadastrado!", {
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

    return (
        <div className=" h-screen flex justify-center items-center bg-grey-50">
            <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
                <div className="w-500 h-92 flex flex-col justify-center items-center my-16 ">
                    <img className=" w-full items-center justify-center" src={logo} alt="logo" />
                </div>
                <Paper
                    variant="outlined"
                    square
                    className="w-full sm:w-auto min-h-full sm:min-h-auto py-10 px-16 sm:p-24 sm:shadow"
                >
                    <Typography className="text-xl text-center font-extrabold tracking-tight leading-tight">
                        Esqueceu a Senha?
                    </Typography>
                    <div className="flex justify-center text-center items-baseline mt-2 font-medium">
                        <Typography>Para redefinir sua senha informe seu email!</Typography>
                    </div>
                    <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
                        <form
                            name="registerForm"
                            noValidate
                            className="flex flex-col justify-center w-full "
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Controller
                                name="dsEmailReset"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className="mt-16"
                                        label="Email"
                                        margin="normal"
                                        type="email"
                                        error={!!errors.dsEmailReset}
                                        helperText={errors?.dsEmailReset?.message}
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />

                            <Button
                                variant="contained"
                                color="error"
                                margin="normal"
                                className=" w-full my-10 bg-primary"
                                aria-label="Register"
                                type="submit"
                                size="large"
                            >
                                Envie o Link para redefinir a senha
                            </Button>

                            <Typography className="mt-16 text-center text-sm font-small" color="text.secondary">
                                <span>Volte para a tela de</span>
                                <Link className="ml-4 text-primary" to="/">
                                    Sign In
                                </Link>
                            </Typography>
                        </form>
                    </div>
                </Paper>
            </div>
        </div>
    );
}

export default ClassicForgotPasswordPage;
