type SimpleButtonProps = {
  clickHandler?: () => void;
  disabled?: boolean;
  spacing?: string | number;
  text: string;
  type?: "button";
  variant?: string;
};
