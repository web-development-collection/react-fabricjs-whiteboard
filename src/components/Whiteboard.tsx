import React, {Component} from 'react';
import ToolPanel from "./Panels/ToolPanel";
import WhiteboardContent from "./WhiteboardContent";
import {WhiteboardContextValue, WhiteboardProvider} from "./Context/WhiteboardContext";
import "../css/Whiteboard.css";


interface Props {
  defaultItems?: any[],
  actions?: any[],
  onAction?: (action: any, throttle: any) => void,
}


class Whiteboard extends Component<Props, any> {
  public state: any = {
    tool: 'pen',
  }


  public render() {
    const whiteboardContextValue: WhiteboardContextValue = {
      setTool: (tool: string) => {
        this.setState(() => ({ tool }));
      },
      tool: this.state.tool,
      emitAction: (action: any) => {
        this.props.onAction?.(action, null);
      },
    };

    return <div className='Whiteboard'>

      <WhiteboardProvider value={whiteboardContextValue}>

        <ToolPanel />
        <WhiteboardContent/>

      </WhiteboardProvider>

    </div>;
  }
}

export default Whiteboard;
