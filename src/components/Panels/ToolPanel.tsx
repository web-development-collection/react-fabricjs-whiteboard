import React, {Component} from 'react';
import ToolButton from "./ToolButton";
import {WhiteboardContext, WhiteboardContextValue} from "../Context/WhiteboardContext";


interface Props {}


class ToolPanel extends Component<Props, any> {
  public static contextType = WhiteboardContext;
  public context: WhiteboardContextValue;


  public render() {
    const buttons = [
      'select',
      'pen',
      'text',
      'rectangle',
      'circle',
      'line',
      'arrow',
      'image',
    ];

    return <div className='ToolPanel'>

      {buttons.map(button => {
        return <ToolButton
          className={this.context.tool === button ? 'Active' : ''}
          key={button}
          name={button}
          onClick={() => this.context.setTool(button)}
        />;
      })}

    </div>;
  }
}

export default ToolPanel;
