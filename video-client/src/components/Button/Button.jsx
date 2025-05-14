import "./Button.scss"

const Button = ({
                    text = null,
                    type = "button",
                    variant = "primary",
                    size = "md",
                    disabled = false,
                    icon = null,
                    className = "",
                    isIconOnly = false,
                    onClick,
                }) => {
    const classes = `btn ${variant} ${size} ${isIconOnly ? 'icon-only' : ''} ${className}`;
    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            {!isIconOnly && text}
        </button>
    );
};

export default Button;
