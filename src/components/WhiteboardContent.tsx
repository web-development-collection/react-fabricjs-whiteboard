import React, {PureComponent, ReactNode} from 'react';


interface Props {}


class WhiteboardContent extends PureComponent<Props> {

  public render(): ReactNode {
    return <canvas className='WhiteboardContent' />;
  }
}

export default WhiteboardContent;
