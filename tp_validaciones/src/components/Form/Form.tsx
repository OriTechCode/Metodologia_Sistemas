import { useState } from "react";
import Swal from "sweetalert2";
import { formSchema } from "../../schemas/formSchema";
import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./Form.module.css";

export default function Form() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newForm = { ...formData, [name]: value };
        setFormData(newForm);

        try {
        await formSchema.validateAt(name, newForm);
        setErrors((prev) => {
            const copy = { ...prev };
            delete copy[name];
            return copy;
        });
        } catch (err: any) {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        await formSchema.validate(formData, { abortEarly: false });
        Swal.fire({icon: "success", title:"Formulario enviado correctamente", showConfirmButton: false, timer: 1500,});
        setFormData({ name: "", email: "", password: "", repeatPassword: "" });
        setErrors({});
        } catch (err: any) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error: any) => {
            newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
        }
    };

    return (
        <div className={styles.form_container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Formulario Manejo de Errores</h2>
                <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
                <Input label="Correo" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                <Input label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
                <Input label="Repetir Contraseña" name="repeatPassword" type="password" value={formData.repeatPassword} onChange={handleChange} error={errors.repeatPassword} />
                <Button disabled={Object.keys(errors).length > 0} />
            </form>
        </div>

    );
}