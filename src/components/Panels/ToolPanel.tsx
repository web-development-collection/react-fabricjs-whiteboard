import React, { PureComponent } from 'react';
import ToolButton from "./ToolButton";


interface Props {}


class ToolPanel extends PureComponent<Props> {
  render() {
    return <div className='ToolPanel'>

      <ToolButton name="Select" />
      <ToolButton name="Pen" />
      <ToolButton name="Rectangle" />
      <ToolButton name="Circle" />
      <ToolButton name="Line" />
      <ToolButton name="Arrow" />
      <ToolButton name="Image" />

    </div>;
  }
}

export default ToolPanel;
