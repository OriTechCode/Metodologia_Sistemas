import { FC } from 'react'
import { ITarea } from '../../../types/ITarea'
import styles from './CardList.module.css'
import { useTareas } from '../../../hooks/useTareas';

type ICarList = {
    tarea: ITarea;
    handleOpenModalEdit: (tarea: ITarea) => void;
};

export const CardList : FC<ICarList> = ({tarea, handleOpenModalEdit}) => {

    const {eliminarTarea} = useTareas();
    const eliminarTareaById = () => {
        eliminarTarea(tarea.id!);
    }
    const editarTarea = () => {
        handleOpenModalEdit(tarea);
    }
    return (
        <div className={styles.containerCard}>
            <div>
                <h3>Titulo: {tarea.titulo}</h3>
                <p>Descripción: {tarea.descripcion}</p>
                <p>
                    <b>Fecha Limite: {tarea.fechaLimite}</b>
                </p>
            </div>
            <div className={styles.actionCard}>
                <button onClick={eliminarTareaById}>Eliminar</button>
                <button onClick={editarTarea}>Editar</button>
            </div>
        </div>
    )
}
