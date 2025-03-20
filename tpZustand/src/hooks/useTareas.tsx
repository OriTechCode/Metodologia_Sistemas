import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { getAllTareas, editarTarea, eliminarTareaPorID, postNuevaTarea } from "../http/tareas";
import { ITarea } from "../types/ITarea";
import Swal from "sweetalert2";

export const useTareas = () => {

    const {tareas, setArrayTareas, agregarNuevaTarea, eliminarUnaTarea, editarUnaTarea} = tareaStore(useShallow((state) => ({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        eliminarUnaTarea: state.eliminarUnaTarea,
        editarUnaTarea: state.editarUnaTarea,
    })));

    const getTareas = async()=>{
        const data = await getAllTareas();
        if (data) setArrayTareas(data);
    };

    const crearTarea = async (nuevaTarea: ITarea) => {
        agregarNuevaTarea(nuevaTarea);
        try {
            await postNuevaTarea(nuevaTarea);
            Swal.fire({title: "Éxito", text:"Tarea creada correctamente", icon: "success", background: "#2c2c2c", color: "#fff"})
        } catch (error) {
            eliminarUnaTarea(nuevaTarea.id!);
            console.log("Algo salio mal al crear la tarea");
        }
    }

    const putTareaEditar = async (tareaEditada: ITarea) => {
        const estadoPrevio = tareas.find((el) =>el.id === tareaEditada.id);
        editarUnaTarea(tareaEditada)

        try {
            await editarTarea(tareaEditada);
            Swal.fire({title: "Éxito", text:"Tarea editada correctamente", icon: "success", background: "#2c2c2c", color: "#fff"})
        } catch (error) {
            if (estadoPrevio) editarUnaTarea(estadoPrevio);
            console.log("Algo salio mal al editar la tarea");
        }
    }

    const eliminarTarea = async (idTarea: string) => {
        const estadoPrevio = tareas.find((el) =>el.id === idTarea);
        const confirm = await Swal.fire({
            title: "¿Etás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            background: "#2c2c2c",
            color: "#fff",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (!confirm.isConfirmed) return;
        eliminarUnaTarea(idTarea)
        try {
            await eliminarTareaPorID(idTarea);
            Swal.fire({title: "Eliminado", text:"La tarea se elimino correctamente", icon: "success", background: "#2c2c2c", color: "#fff"})
        } catch (error) {
            if (estadoPrevio) agregarNuevaTarea(estadoPrevio)
            console.log("Algo salio mal al eliminar la tarea");
        }
    }

    return {
        getTareas,
        crearTarea,
        putTareaEditar,
        eliminarTarea,
        tareas, 
    }
}
