import * as yup from "yup";

export const formSchema = yup.object().shape({
    name: yup.string().required("El nombre es obligatorio").min(3, "Mínimo 3 caracteres"),
    email: yup.string().required("El correo es obligatorio").email("Correo inválido"),
    password: yup.string().required("La contraseña es obligatoria").min(6, "Mínimo 6 caracteres"),
    repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Repetir la contraseña es obligatorio"),
});
