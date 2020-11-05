import React, { FunctionComponent as FC } from 'react';


interface Props {
  name: string,
}


const ToolButton: FC<Props> = (props: Props) => {

  return <div
    className="ToolButton"
    children={props.name}
  />;
};

export default ToolButton;
