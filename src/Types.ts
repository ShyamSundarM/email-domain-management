export type SimpleButtonProps = {
  clickHandler?: () => void;
  disabled?: boolean;
  spacing?: string | number;
  text: string;
  type?: "button";
  variant?: string;
};

export type PrimaryButtonProps = {
  clickHandler?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  spacing?: string | number;
  text: string;
  type?: "button";
  variant?: string;
};

// DialogProps as a type
export type DialogProps = {
  handleDialogAction?: () => void;
  actionButtonText?: string;
  children: React.ReactNode;
  color?: string;
  hasAction?: boolean;
  title?: string;
  TriggerElement: React.FC<{ clickHandler: () => void }>;
};
