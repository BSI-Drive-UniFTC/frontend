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
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "context/auth";
import api from "services/api";

const schema = yup.object().shape({
    nome: yup.string().required("Você deve inserir o nome da disciplina"),
    descricao: yup.string().required("Você deve inserir a descrição da disciplina"),
});

const defaultValues = {
    nome: "",
    descricao: "",
    idProfessor: "",
    semestre: "1",
    cargahoraria: "80",
};

function SubjectRegistration() {

    const { userId } = useContext(AuthContext);

    const [teachers, setTeachers] = useState(null);

    const [fetchingRegistration, setFetchingRegistration] = useState(false)

    const { control, formState, handleSubmit, setValue, watch, reset } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { errors } = formState;



    const getTeachers = useCallback(async () => {

        try {
            const response = await api.get("/professores", { params: { id: userId } });
            setTeachers(response.data);

        } catch (err) {
            console.log(err.response)
            setTeachers([]);
            toast.error("Houve um erro ao buscar os professores no banco de dados, tente novamente!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    }, [userId]);

    async function onSubmit(data) {
        console.log(data)
        setFetchingRegistration(true)
        try {
            const response = await api.post("/disciplina", data);
            if (response.status === 201) {
                toast.success(
                    "Disciplina cadastrada com sucesso!",
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
                reset()
            }
        } catch (err) {
            console.log(err.response)
            if (err.response.status === 400) {
                toast.error("Houve algum erro e a disciplina não pode ser cadastrada, tente novamente!", {
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

    const selectedTeachers = watch("idProfessor");

    useEffect(() => {
        if (!selectedTeachers && teachers && teachers.length) {
            setValue("idProfessor", teachers[0].id);
        }
    }, [selectedTeachers, teachers]);

    useEffect(() => {
        getTeachers();
    }, [getTeachers]);

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
                            name="nome"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-16"
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
                            name="idProfessor"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    className=" mb-16"
                                    type="text"
                                    error={!!errors.idProfessor}
                                    variant="outlined"
                                    fullWidth
                                >
                                    {teachers &&
                                        teachers.map(({ id, nome }) => (
                                            <MenuItem key={id} value={id}>
                                                {nome}
                                            </MenuItem>
                                        ))}
                                </Select>
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
                                    error={!!errors.descricao}
                                    helperText={errors?.descricao?.message}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />

                        <div className="flex flex-row justify-between">
                            <Controller
                                name="semestre"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="w-5/12 mb-16"
                                        type="text"
                                        error={!!errors.semestre}
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
                                name="cargahoraria"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="w-5/12 mb-16"
                                        type="text"
                                        error={!!errors.cargahoraria}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <MenuItem value="80">80 horas</MenuItem>
                                        <MenuItem value="120">120 horas</MenuItem>
                                        <MenuItem value="240">240 horas</MenuItem>
                                        <MenuItem value="315">315 horas</MenuItem>
                                        <MenuItem value="420">420 horas</MenuItem>
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
                            Cadastrar Disciplina
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SubjectRegistration;
