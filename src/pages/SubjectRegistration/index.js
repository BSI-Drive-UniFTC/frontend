import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
    Button,
    TextField,
    Typography,
    Select,
    MenuItem
} from "@mui/material";

import * as yup from "yup";

import { toast } from "react-toastify";
import { useState } from "react";

const schema = yup.object().shape({
    subjectName: yup.string().required("Você deve inserir o nome da disciplina"),
    subjectDescription: yup.string().required("Você deve inserir a descrição da disciplina"),
});

const defaultValues = {
    subjectName: "",
    subjectDescription: "",
    professor: "1",
    semester: "1",
    workload: "1",
};

function SubjectRegistration() {

    const [fetchingRegistration, setFetchingRegistration] = useState(false)

    const { control, formState, handleSubmit, reset } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { errors } = formState;

    async function onSubmit(data) {
        console.log(data)
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
        }
        setFetchingRegistration(false)
    }

    return (
        <div className="flex justify-center items-center h-screen bg-grey-50 my-20">
            <div>
                <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0 ">
                    <Typography className="text-2xl text-center font-extrabold tracking-tight leading-tight">
                        Cadastro de Disciplina
                    </Typography>


                    <form
                        name="subjectForm"
                        noValidate
                        className="flex flex-col justify-center w-full mt-24"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="subjectName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-16"
                                    label="Nome"
                                    autoFocus
                                    type="text"
                                    error={!!errors.subjectName}
                                    helperText={errors?.subjectName?.message}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="professor"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    className=" mb-16"
                                    type="text"
                                    error={!!errors.professor}
                                    variant="outlined"
                                    fullWidth
                                >
                                    <MenuItem value="1">Naan</MenuItem>
                                    <MenuItem value="2">Alexandre</MenuItem>
                                </Select>
                            )}
                        />

                        <Controller
                            name="subjectDescription"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-16"
                                    label="Descrição"
                                    type="text"
                                    multiline
                                    rows={5}
                                    error={!!errors.subjectDescription}
                                    helperText={errors?.subjectDescription?.message}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />

                        <div className="flex flex-row justify-between">
                            <Controller
                                name="semester"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="w-5/12 mb-16"
                                        type="text"
                                        error={!!errors.semester}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <MenuItem value="1">Primeiro semestre</MenuItem>
                                        <MenuItem value="2">Segundo semestre</MenuItem>
                                        <MenuItem value="3">Terceiro semestre</MenuItem>
                                        <MenuItem value="4">Quarto semestre</MenuItem>
                                        <MenuItem value="5">Quinta semestre</MenuItem>
                                        <MenuItem value="6">Sexto semestre</MenuItem>
                                        <MenuItem value="7">Sétimo semestre</MenuItem>
                                        <MenuItem value="8">Oitavo semestre</MenuItem>
                                    </Select>
                                )}
                            />

                            <Controller
                                name="workload"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="w-5/12 mb-16"
                                        type="text"
                                        error={!!errors.workload}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <MenuItem value="1">105 horas</MenuItem>
                                        <MenuItem value="2">210 horas</MenuItem>
                                        <MenuItem value="3">315 horas</MenuItem>
                                        <MenuItem value="4">420 horas</MenuItem>
                                    </Select>
                                )}
                            />
                        </div>


                        <Button
                            variant="contained"
                            color="secondary"
                            className="w-3/5 mx-auto text-center my-16 uppercase bg-primary"
                            aria-label="sendSubject"
                            disabled={fetchingRegistration}
                            type="submit"
                            size="large"
                        >
                            Enviar projeto
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SubjectRegistration;
