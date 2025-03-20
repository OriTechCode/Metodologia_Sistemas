import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { tareaStore } from '../../../store/tareaStore'
import style from './Modal.module.css'
import { ITarea } from '../../../types/ITarea'
import { useTareas } from '../../../hooks/useTareas'

type IModal = {
    handleCloseModal: VoidFunction
}

const initialState: ITarea = {
    titulo: "",
    descripcion: "",
    fechaLimite: "",
}

export const Modal: FC<IModal> = ({handleCloseModal}) => {
    const tareaActiva = tareaStore((state)=>state.tareaActiva);
    const setTareaActiva = tareaStore((state) => state.setTareaActiva);

    const{crearTarea, putTareaEditar} = useTareas();

    const[formValues, setFormValues] = useState <ITarea>(initialState);

    useEffect(()=>{
        if(tareaActiva) setFormValues(tareaActiva)
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const{name, value} = e.target;

        setFormValues((prev) => ({ ...prev, [`${name}`]: value}));
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(tareaActiva) {
            putTareaEditar(formValues);
        }else {
            crearTarea({...formValues, id: new Date().toDateString()})
        }
        setTareaActiva(null);
        handleCloseModal()
        
    }
    return (
        <div className={style.containerPrincipalModal}>
            <div className={style.contentPopUP}>
                <div>
                    <h3>{tareaActiva ? "Editar Tarea": "Crear Tarea"}</h3>
                </div>
                <form onSubmit={handleSubmit} className={style.formContent}>
                    <div>
                        <input placeholder='Ingrese un titulo' type="text" required onChange={handleChange} value={formValues.titulo} autoComplete='off' name='titulo' />
                        <textarea placeholder='Ingrese una descripción' required onChange={handleChange} value={formValues.descripcion} name='descripcion' />
                        <input type="date" required value={formValues.fechaLimite} onChange={handleChange} autoComplete='off' name='fechaLimite' />
                    </div>
                    <div className={style.buttonCard}>
                        <button onClick={handleCloseModal}>Cancelar</button>
                        <button type='submit'> {tareaActiva ? "Editar Tarea": "Crear Tarea"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
