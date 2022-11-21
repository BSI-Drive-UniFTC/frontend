import { Card, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import image from "assets/emailConfirm.png";

function EmailConfirm() {
    return (
        <div className="flex flex-col flex-1 items-center h-screen justify-center">
            <div className="flex flex-col items-center  w-full max-w-1xl text-center  ">
                <Card variant="elevation" className="w-208 h-208">
                    <CardMedia component="img" height="380" image={image} alt="imagem de confirmação do email" />
                </Card>
                <Typography
                    variant="h1"
                    className="mt-20 sm:mt-32 text-4xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-none text-center text-primary"
                >
                    Usuário ativo!
                </Typography>
                <Typography
                    variant="h5"
                    color="text.secondary"
                    className="mt-8 text-lg md:text-xl font-medium tracking-tight text-center"
                >
                    Sua conta foi confirmada e agora você tem acesso ao BSI Drive.
                </Typography>

                <Link className="block font-normal my-24 text-primary" to="/">
                    Voltar para a tela de Sign In
                </Link>
            </div>
        </div>
    );
}

export default EmailConfirm;
