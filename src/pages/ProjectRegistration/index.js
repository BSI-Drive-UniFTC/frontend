import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
    Avatar,
    Button,
    TextField,
    Typography,
    Select,
    MenuItem,
    Input
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

import * as yup from "yup";

import { toast } from "react-toastify";
import { useCallback, useContext, useEffect, useState } from "react";
import api from "services/api";
import { AuthContext } from "context/auth";

const schema = yup.object().shape({
    nomeProjeto: yup.string().required("Você deve inserir o nome do projeto"),
    descricao: yup.string().required("Você deve inserir a descrição do projeto"),
});

const defaultValues = {
    nomeProjeto: "",
    descricao: "",
    semestre: "1",
    idProfessor: "",
    idDisciplina: "",
};

function ProjectRegistration() {

    const { userId } = useContext(AuthContext);

    const [teachers, setTeachers] = useState(null);
    const [subjects, setSubjects] = useState(null);

    const [fetchingRegistration, setFetchingRegistration] = useState(false)

    const [project, setProject] = useState(null);

    const { control, formState, handleSubmit, setValue, watch, } = useForm({
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

    const getSubjects = useCallback(async () => {

        try {
            const response = await api.get("/disciplina", { params: { id: userId } });
            setSubjects(response.data);

        } catch (err) {
            console.log(err.response)
            setTeachers([]);
            toast.error("Houve um erro ao buscar as disciplinas no banco de dados, tente novamente!", {
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

    const zipChangeHandler = event => {
        const newProject = event.target?.files?.[0];

        console.log(newProject)

        setProject(newProject);
    };

    const handleRemoveZip = () => {
        setProject(null);
    };

    async function onSubmit(data) {

        setFetchingRegistration(true)

        try {

            const formData = new FormData();
            formData.append("project", project);
            console.log(data, formData)
            console.log({ data, userId })

            const response = await api.post("/upload", formData, {
                params: { data, idUsuario: userId },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.status === 201) {
                toast.success(
                    "Projeto cadastrado com sucesso!",
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
        }

        setFetchingRegistration(false)
    }

    const selectedTeachers = watch("idProfessor");
    const selectedSubjects = watch("idDisciplina");

    useEffect(() => {
        if (!selectedTeachers && teachers && teachers.length) {
            setValue("idProfessor", teachers[0].id);
        }
    }, [selectedTeachers, teachers]);

    useEffect(() => {
        if (!selectedSubjects && subjects && subjects.length) {
            setValue("idDisciplina", subjects[0]._id);
        }
    }, [selectedSubjects, subjects]);

    useEffect(() => {
        getTeachers()
        getSubjects()
    }, [getTeachers, getSubjects]);

    return (
        <div className="flex justify-center items-center h-screen bg-grey-50 my-20">
            <div>
                <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0 ">
                    <Typography className="text-2xl text-center font-extrabold tracking-tight leading-tight">
                        Envie seu projeto para plataforma
                    </Typography>


                    <form
                        name="projectForm"
                        noValidate
                        className="flex flex-col justify-center w-full mt-24"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="nomeProjeto"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-16"
                                    placeholder="Nome"
                                    autoFocus
                                    type="text"
                                    error={!!errors.nomeProjeto}
                                    helperText={errors?.nomeProjeto?.message}
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
                                        className="w-4/12 mb-16 mx-2"
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
                                name="idProfessor"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="w-4/12 mb-16 mx-2"
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
                                name="idDisciplina"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="w-4/12 mb-16 mx-2"
                                        type="text"
                                        error={!!errors.idDisciplina}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        {subjects &&
                                            subjects.map(({ _id, nome }) => (
                                                <MenuItem key={_id} value={_id}>
                                                    {nome}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                )}
                            />
                        </div>

                        <Button
                            variant="outlined"
                            component="label"
                            className="flex flex-col justify-between p-16"
                        >
                            {!project ? (
                                <div className="flex flex-col justify-between items-center w-full">
                                    <Avatar variant="circle" className="w-48 h-48 my-5 bg-black">
                                        <CloudUploadIcon className="w-32 h-32" />
                                    </Avatar>
                                    <div className="my-10">
                                        <Typography variant="button">Click ou arraste o arquivo até essa área para o upload</Typography>
                                    </div>
                                    <div className="text-5" >
                                        <Typography variant="body2" >Suporta um único arquivo no formato ZIP.</Typography>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-between items-center w-full">
                                    <Avatar variant="circle" className="w-48 h-48 my-5 bg-green-A700">
                                        <CloudDoneIcon className="w-32 h-32" />
                                    </Avatar>
                                    <div className="text-5" >
                                        <Typography variant="body2" >Arquivo carregado!</Typography>
                                    </div>
                                </div>

                            )}

                            <Input
                                className="hidden"
                                onChange={e => zipChangeHandler(e)}
                                inputProps={{ accept: ".zip" }}
                                type="file"
                            />
                        </Button>


                        {project ? (
                            <Button variant="contained" className="my-10" onClick={() => handleRemoveZip()}>Remover arquivo</Button>
                        ) : (
                            <Button className="hidden" onClick={() => handleRemoveZip()}>Remover</Button>
                        )}


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
            </div>
        </div>
    );
}

export default ProjectRegistration;
