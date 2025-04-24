import styles from "./Button.module.css";

type ButtonProps = {
    disabled: boolean;
};

export default function Button({ disabled }: ButtonProps) {
    return (
        <button type="submit" className={disabled ? styles.disabled : ""} disabled={disabled}>
            Enviar
        </button>
    );
}
