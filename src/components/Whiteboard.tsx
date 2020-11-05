import React, { PureComponent } from 'react';
import ToolPanel from "./Panels/ToolPanel";
import WhiteboardContent from "./WhiteboardContent";
import {WhiteboardContextValue, WhiteboardProvider} from "./Context/WhiteboardContext";
import "../css/Whiteboard.css";


interface Props {
  defaultItems?: any[],
  actions?: any[],
  onAction?: (action: any, throttle: any) => void,
}


class Whiteboard extends PureComponent<Props> {
  public render() {
    const whiteboardContextValue: WhiteboardContextValue = {};

    return <div className='Whiteboard'>

      <WhiteboardProvider value={whiteboardContextValue}>

        <ToolPanel />
        <WhiteboardContent/>

      </WhiteboardProvider>

    </div>;
  }
}

export default Whiteboard;
