import './Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  [key: string]: any;
}

export const Button = ({ text, onClick, ...rest }: ButtonProps): JSX.Element => {
  return <button {...rest} className="button" onClick={onClick}>{text}</button>;
};
