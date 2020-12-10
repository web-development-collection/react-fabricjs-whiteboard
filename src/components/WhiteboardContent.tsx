import React, {Component, createRef, ReactNode} from 'react';
import {fabric} from "fabric";
import {WhiteboardContext, WhiteboardContextValue} from "./Context/WhiteboardContext";


interface Props {}


class WhiteboardContent extends Component<Props, any> {
  private canvasRef = createRef<HTMLCanvasElement>();
  private fabricCanvas: fabric.Canvas;
  public static contextType = WhiteboardContext;
  public context: WhiteboardContextValue;

  public dragging: boolean = false;
  public shape: any;
  public start: {x: number, y: number};

  public isMouseDown = {
    LEFT: false,
    MIDDLE: false,
    RIGHT: false,
  };


  public componentDidMount() {
    const canvas = document.getElementById('fc') as HTMLCanvasElement;

    this.fabricCanvas = new fabric.Canvas(canvas, {
      width: canvas.clientWidth,
      height: canvas.clientHeight,
      backgroundColor: '#ffffff',
      // isDrawingMode: true,
      selection: false,
      fireMiddleClick: true,
      fireRightClick: true,
      stopContextMenu: true,
    });


    fabric.util.addListener(document.body, 'keyup', (event: any) => {
      const shortcuts = {
        'v': 'select',
        's': 'select',
        'r': 'rectangle',
        'p': 'pen',
        'c': 'circle',
        'l': 'line',
        'a': 'arrow',
        'i': 'image',
      };

      for (const [key, tool] of Object.entries(shortcuts)) {
        console.log(`TextTool: ${this.context.tool === 'text'}`)
        if (this.context.tool === 'text')
          return;

        if (event.key === key) {
          this.context.setTool(tool);
          break;
        }
      }
    });


    this.fabricCanvas.on('mouse:down', (event) => {
      this.dragging = true;

      const tool = this.context.tool;
      const {x, y} = this.fabricCanvas.getPointer(event.e);
      this.start = {x, y};

      if (tool === 'rectangle') {

        const action = {
          name: 'CREATE',
          payload: {
            top: y,
            left: x,
            width: 0,
            height: 0,
            fill: 'white',
            stroke: 'black',
            selectable: false,
          }
        };
        this.shape = new fabric.Rect(action.payload);

        this.context.emitAction(action);
        this.fabricCanvas.add(this.shape);
      }

      if (tool === 'circle') {
        this.shape = new fabric.Ellipse({
          top: y,
          left: x,
          rx: 0,
          ry: 0,
          fill: 'white',
          stroke: 'black',
          selectable: false,
        });

        this.fabricCanvas.add(this.shape);
      }

    });

    this.fabricCanvas.on('mouse:move', (event) => {
      if (!this.dragging)
        return;

      const tool = this.context.tool;
      const {x, y} = this.fabricCanvas.getPointer(event.e);

      if (tool === 'rectangle') {

        if (this.start.x > x) {
          this.shape.set({ left: Math.abs(x) });
        }
        if (this.start.y > y) {
          this.shape.set({ top: Math.abs(y) });
        }

        this.shape.set({ width: Math.abs(this.start.x - x) });
        this.shape.set({ height: Math.abs(this.start.y - y) });

        this.fabricCanvas.renderAll();
      }

      if (tool === 'circle') {

        if (this.start.x > x) {
          this.shape.set({ left: Math.abs(x) });
        }
        if (this.start.y > y) {
          this.shape.set({ top: Math.abs(y) });
        }

        this.shape.set({ rx: Math.abs(this.start.x - x) / 2 });
        this.shape.set({ ry: Math.abs(this.start.y - y) / 2 });

        this.fabricCanvas.renderAll();
      }

    });

    this.fabricCanvas.on('mouse:up', (event) => {
      this.dragging = false;

      this.shape?.setCoords();

      if (this.context.tool === 'text') {
        const {x, y} = this.fabricCanvas.getPointer(event.e);


        const text = new fabric.Textbox('', {
          top: y,
          left: x,
          width: 100,
          selectable: true,
          evented: true,

        });


        this.fabricCanvas.add(text);

        this.fabricCanvas.setActiveObject(text);
        text.enterEditing();
        this.fabricCanvas.renderAll();



        text.on('deselected', (options: any) => {

          if (text.text === '') {
            this.fabricCanvas.remove(text);
            this.fabricCanvas.renderAll();
          }

        })
      }
    });

    this.componentDidUpdate(this.props, this.state);
  }


  public componentWillUnmount() {
    this.fabricCanvas.dispose();
  }


  public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>) {

    // Handle set selection
    // console.log(`Update: ${this.context.tool === 'select'}`);
    console.log(`Update: ${this.context.tool}`);

    this.fabricCanvas.selection = this.context.tool === 'select';
    this.fabricCanvas.forEachObject(obj => {
      obj.selectable = this.context.tool === 'select';
    });

    this.fabricCanvas.isDrawingMode = this.context.tool === 'pen';

    this.fabricCanvas.renderAll();

  }


  public render(): ReactNode {
    return <canvas
      id={'fc'}
      ref={this.canvasRef}
      className='WhiteboardContent'
    />;
  }
}

export default WhiteboardContent;
