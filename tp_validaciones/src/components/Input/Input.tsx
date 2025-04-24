import styles from "./Input.module.css";

type InputProps = {
    label: string;
    name: string;
    value: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
};

export default function Input({ label, name, value, type = "text", onChange, error }: InputProps) {
    return (
        <div className={styles.inputContainer}>
        <label>{label}</label>
        <input name={name} value={value} type={type} onChange={onChange} />
        {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}
