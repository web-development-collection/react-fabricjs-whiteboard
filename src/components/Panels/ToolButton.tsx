import React, { FunctionComponent as FC } from 'react';


interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name: string,
}


const ToolButton: FC<Props> = ({name, className, ...rest}: Props) => {

  return <div
    className={`${className} ToolButton`}
    children={name}
    {...rest}
  />;
};

export default ToolButton;
