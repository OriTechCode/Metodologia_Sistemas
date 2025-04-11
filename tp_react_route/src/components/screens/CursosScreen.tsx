import { useEffect, useState } from "react";
import { Curso } from "../../types/types";
import CursoCard from "../ui/CursoCard";
import { getCursos } from "../../http/api";
import style from "./CursosScreen.module.css";

const CursosScreen = () => {
    const [cursos, setCursos] = useState<Curso[]>([]);

    useEffect(() => {
        getCursos().then(setCursos);
    }, []);

    return (
        <div className={style.container}>
            <h1>Cursos</h1>
            <div className={style.listaCursos}>
                {cursos.map((curso) => (
                    <CursoCard key={curso.id} curso={curso} />
                ))}
            </div>
        </div>
    );
};

export default CursosScreen;
