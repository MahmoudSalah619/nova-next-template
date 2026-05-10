import useAutoCompleteTranslation from "@/hooks/useAutoCompleteTranslation";
import Text from "../Text";
import styles from "./styles.module.scss";
import { CustomButtonProps } from "./types";
import Icon from "../Icon";

function Button({
  title,
  variant = "primary",
  size = "large",
  className,
  isFullWidth,
  onClick,
  prefixIcon,
  prefixIconSize,
  suffixIcon,
  suffixIconSize,
  disabled,
  icon,
  iconSize: iconSizeProp,
  fontColor,
  iconButtonType,
  fontVariant,
  children,
  ...otherProps
}: CustomButtonProps) {
  const { t } = useAutoCompleteTranslation();
  const iconSize = size === "large" ? 16 : 12;

  return (
    <button
      {...otherProps}
      onClick={onClick}
      className={`${styles.btn} 
      ${isFullWidth && styles.isFullWidth} 
      ${styles[variant]} 
      ${styles[size]}
      ${iconButtonType && styles[iconButtonType]}
      ${icon && styles.iconButton}
      ${className}`}
      disabled={disabled}
    >
      {icon ? (
        <Icon name={icon} size={iconSizeProp ?? 16} />
      ) : (
        <>
          {prefixIcon && (
            <Icon name={prefixIcon} size={prefixIconSize ?? iconSize} />
          )}

          {title && (
            <Text
              variant={fontVariant ?? (size === "large" ? "B1" : "B2")}
              color={fontColor}
            >
              {t(title)}
            </Text>
          )}

          {children}

          {suffixIcon && (
            <Icon name={suffixIcon} size={suffixIconSize ?? iconSize} />
          )}
        </>
      )}
    </button>
  );
}

export default Button;
