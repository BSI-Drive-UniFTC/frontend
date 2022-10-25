import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col flex-1 items-center h-screen justify-center p-16">
            <div className="w-full max-w-1xl text-center ">
                <Typography
                    variant="h1"
                    className="mt-48 sm:mt-96 text-4xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-none text-center text-primary"
                >
                    Ooops... 404!
                </Typography>
                <Typography
                    variant="h5"
                    color="text.secondary"
                    className="mt-8 text-lg md:text-xl font-medium tracking-tight text-center"
                >
                    A pagina que você procura não foi encontrada.
                </Typography>

                <Link className="block font-normal mt-48 text-primary" to="/">
                    Voltar para a tela de Sign In
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
