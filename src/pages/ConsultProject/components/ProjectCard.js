import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

function ProjectCard() {
    return (
        <Card variant="outlined" className="w-200 ">
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Trabalho da 1 unidade
                </Typography>

                <Typography gutterBottom variant="subtitle1" component="div">
                    TPW - Alexandre
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Uma disciplina foca no desenvolvimento para a web!
                </Typography>
            </CardContent>
            <CardActions className="flex justify-center mb-5">
                <Button variant="contained">Baixar Projeto</Button>
            </CardActions>
        </Card>
    );
}

export default ProjectCard;
