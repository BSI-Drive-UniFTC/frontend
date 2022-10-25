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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import logo from "assets/logo.png";
import api from "services/api";
import { toast } from "react-toastify";
import { useState } from "react";

const schema = yup.object().shape({
    name: yup.string().required("Você deve inserir seu nome"),
    userRegistration: yup
        .number()
        .typeError("Informe o numero de matricula")
        .required("Você deve inserir seu numero de matricula")
        .min(10, "A matricula deve conter 11 digitos"),
    email: yup.string().email("Seu email deve ser valido").required("Você deve inserir um email"),
    password: yup
        .string()
        .required("Insira a sua senha.")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Senha deve conter 8 caracteres, uma letra maiúscula," +
            " uma letra minuscula, um numero e um carácter especial"
        ),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Senha não confere")
        .required("Insira a senha e confira"),
    registrationTerms: yup.boolean().oneOf([true], "Os termos e condições devem ser aceitos.")
});

const defaultValues = {
    name: "",
    email: "",
    userRegistration: "",
    cdPerfilCad: "1",
    password: "",
    passwordConfirm: "",
    registrationTerms: false
};

function ProjectRegistration() {
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
            console.log(data)

            // const response = await api.post("/cadastro", data);
            // if (response.status === 201) {
            //     toast.success(
            //         "Usuário cadastrado com sucesso! Um email de confirmação foi enviado para sua caixa de entrada.",
            //         {
            //             position: "top-right",
            //             autoClose: 5000,
            //             hideProgressBar: true,
            //             closeOnClick: true,
            //             pauseOnHover: true,
            //             draggable: true,
            //             progress: undefined
            //         }
            //     );
            //     navigate("/");
            //     setFetchingRegistration(false)
            // }
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
        <div className="flex justify-center items-center h-[93vh] bg-grey-50">
            <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0 pb-28 px-28">

                {/* <Paper
                    variant="outlined"
                    square
                    className="w-full sm:w-auto min-h-full sm:min-h-auto py-24 px-16 sm:px-32 sm:shadow"
                > */}
                <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
                    <Typography className="text-2xl text-center font-extrabold tracking-tight leading-tight">
                        Envie seu projeto para plataforma
                    </Typography>


                    <form
                        name="registerForm"
                        noValidate
                        className="flex flex-col justify-center w-full mt-24"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-16"
                                    label="Nome"
                                    autoFocus
                                    type="text"
                                    error={!!errors.name}
                                    helperText={errors?.name?.message}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="descricao"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-16"
                                    label="Descrição"
                                    type="text"
                                    multiline
                                    rows={5}
                                    // error={!!errors.email}
                                    // helperText={errors?.email?.message}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />

                        <div className="flex flex-row justify-between">
                            <Controller
                                name="cdPerfilCad"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="w-5/12 mb-16"
                                        type="text"
                                        error={!!errors.cdPerfilCad}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <MenuItem value="1">Aluno</MenuItem>
                                        <MenuItem value="2">Professor</MenuItem>
                                    </Select>
                                )}
                            />

                            <Controller
                                name="cdPerfilCad"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="w-5/12 mb-16"
                                        type="text"
                                        error={!!errors.cdPerfilCad}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <MenuItem value="1">Aluno</MenuItem>
                                        <MenuItem value="2">Professor</MenuItem>
                                    </Select>
                                )}
                            />
                        </div>

                        <Button
                            variant="outlined"
                            component="label"
                            className="flex flex-col justify-between p-16"
                        >
                            <CloudUploadIcon />
                            <div className="my-10">
                                <Typography variant="button">Click ou arraste o arquivo até essa área para o upload</Typography>
                            </div>
                            <div className="text-5" >
                                <Typography variant="body2" >Suporta um arquivo único ou diversos uploads. Tamanho máximo do arquivo 150MB.</Typography>
                            </div>

                            <input
                                type="file"
                                hidden
                            />
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            className="w-3/5 mx-auto text-center my-16 uppercase bg-primary"
                            aria-label="sendProject"
                            disabled={fetchingRegistration}
                            type="submit"
                            size="large"
                        >
                            Enviar projeto
                        </Button>
                    </form>
                </div>
                {/* </Paper> */}
            </div>
        </div>
    );
}

export default ProjectRegistration;
