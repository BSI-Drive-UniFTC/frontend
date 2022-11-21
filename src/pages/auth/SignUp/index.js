import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    TextField,
    Typography,
    Paper,
    FormHelperText,
    Select,
    MenuItem
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import logo from "assets/logo.png";
import api from "services/api";
import { toast } from "react-toastify";
import { useState } from "react";

const schema = yup.object().shape({
    nome: yup.string().required("Você deve inserir seu nome"),
    email: yup.string().email("Seu email deve ser valido").required("Você deve inserir um email"),
    senha: yup
        .string()
        .required("Insira a sua senha.")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Senha deve conter 8 caracteres, uma letra maiúscula," +
            " uma letra minuscula, um numero e um carácter especial"
        ),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("senha"), null], "Senha não confere")
        .required("Insira a senha e confira"),
    registrationTerms: yup.boolean().oneOf([true], "Os termos e condições devem ser aceitos.")
});

const defaultValues = {
    nome: "",
    email: "",
    perfil: "aluno",
    senha: "",
    passwordConfirm: "",
    registrationTerms: false
};

function SignUp() {
    const navigate = useNavigate();

    const [fetchingRegistration, setFetchingRegistration] = useState(false)

    const { control, formState, handleSubmit, reset } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { errors } = formState;

    async function onSubmit(data) {
        setFetchingRegistration(true)
        try {

            const response = await api.post("/signUp", data);
            if (response.status === 201) {
                toast.success(
                    "Usuário cadastrado com sucesso! Um email de confirmação foi enviado para sua caixa de entrada.",
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    }
                );
                navigate("/");
                setFetchingRegistration(false)
            }
        } catch (err) {
            if (err.response.status === 401) {
                toast.error(
                    "Erro ao cadastrar, o numero de matricula digitado possui um valor inválido ou já está cadastrado no banco de dados.",
                    {
                        position: "top-right",
                        autoClose: 4500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    }
                );
            }

            if (err.response.status === 406) {
                toast.error("Erro ao cadastrar, o Email digitado já consta no banco de dados.", {
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
                toast.error("Houve algum erro e o usuário não pode ser cadastrado, tente novamente!", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }

            setFetchingRegistration(false)
        }
    }

    return (
        <div className="flex justify-center items-center bg-grey-50">
            <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0 p-28">
                <div className="w-500 h-92 flex flex-col justify-center items-center my-10">
                    <img className=" w-full items-center justify-center" src={logo} alt="logo" />
                </div>
                <Paper
                    variant="outlined"
                    square
                    className="w-full sm:w-auto min-h-full sm:min-h-auto py-24 px-16 sm:px-32 sm:shadow"
                >
                    <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
                        <Typography className="text-2xl text-center font-extrabold tracking-tight leading-tight">
                            Criar uma nova conta
                        </Typography>


                        <form
                            name="registerForm"
                            noValidate
                            className="flex flex-col justify-center w-full mt-24"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Controller
                                name="nome"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className="mb-24"
                                        label="Nome"
                                        autoFocus
                                        type="text"
                                        error={!!errors.nome}
                                        helperText={errors?.nome?.message}
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />



                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className="mb-24"
                                        label="Email"
                                        type="email"
                                        error={!!errors.email}
                                        helperText={errors?.email?.message}
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />

                            <div className="flex flex-row justify-between">
                                <Controller
                                    name="senha"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mb-24 mr-5"
                                            label="Senha"
                                            type="password"
                                            error={!!errors.senha}
                                            helperText={errors?.senha?.message}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                />

                                <Controller
                                    name="passwordConfirm"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mb-24 ml-5"
                                            label="Confirmar senha"
                                            type="password"
                                            error={!!errors.passwordConfirm}
                                            helperText={errors?.passwordConfirm?.message}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                />
                            </div>

                            <div className="flex flex-row justify-start">
                                <Controller
                                    name="perfil"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            className="w-2/5 mb-24 "
                                            type="text"

                                            placeholder="Perfil"
                                            error={!!errors.perfil}
                                            variant="outlined"
                                            fullWidth
                                        >
                                            <MenuItem value="aluno">Aluno</MenuItem>
                                            <MenuItem value="professor">Professor</MenuItem>
                                        </Select>
                                    )}
                                />
                            </div>

                            <Controller
                                name="registrationTerms"
                                control={control}
                                render={({ field }) => (
                                    <FormControl className="items-center" error={!!errors.registrationTerms}>
                                        <FormControlLabel
                                            label="Aceito o Contrato do Usuário, 
                                            a Política de Privacidade e a Política de Cookies da BSI Drive."
                                            control={<Checkbox size="small" {...field} />}
                                        />
                                        <FormHelperText>{errors?.registrationTerms?.message}</FormHelperText>
                                    </FormControl>
                                )}
                            />

                            <Button
                                variant="contained"
                                color="secondary"
                                className=" w-full my-16 bg-primary"
                                aria-label="Register"
                                disabled={fetchingRegistration}
                                type="submit"
                                size="large"
                            >
                                FINALIZAR CADASTRO
                            </Button>

                            <div className="flex justify-center items-baseline mt-2 font-medium">
                                <Typography>Já está cadastrado?</Typography>
                                <Link className="ml-4 text-primary" to="/">
                                    Sign in
                                </Link>
                            </div>
                        </form>
                    </div>
                </Paper>
            </div>
        </div>
    );
}

export default SignUp;
