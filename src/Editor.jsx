import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import miffy from "/miffy.jpeg";

function Editor() {
  const [options, setOptions] = useState({});
  const [myp5, setMyp5] = useState();
  const [image, setImage] = useState();
  const canvasWrap = useRef();
  console.log("rendering editor");

  function sketch(p) {
    let image;
    let pixels;

    p.preload = () => {
      image = p.loadImage(miffy);
    };

    p.setup = () => {
      p.createCanvas(image.width, image.height);
      p.image(image, 0, 0);
      p.loadPixels();
      // if (p.options.filter) {
      //   console.log('invert')
      //   p.filter(p[p.options.filter]);
      // }
      // console.log(image.pixels);
    };

    p.draw = () => {
      if (p.mouseIsPressed) {
        p.stroke(200, 50, 30);
        p.strokeWeight(5);
        p.ellipse(p.mouseX, p.mouseY, 1);
      }
    };

    p.mouseClicked = () => {
      console.log('in mouse clicked');
      image = p.loadImage(miffy);
      p.filter(p[p.options.filter]);
    }

    p.onDrag = () => {
      console.log("in on drag");
      p.stroke(5, 100, 200);
      p.point(p.mouseX, p.mouseY);
    };
  }

  useEffect(function setUpCanvasOnMount() {
    if (canvasWrap) {
      console.log("canvaswrap defined");
      canvasWrap.current.innerHtml = "";
    }
    setMyp5(() => {
      const newp5 = new p5(sketch, "canvas-wrap");
      newp5.options = options;
      return newp5;
    });
  }, []);

  function grayscale() {
    console.log("calling grayscale");
    // setOptions({ filter: "GRAY" });
    myp5.options = { filter: "GRAY" };
  }

  function negative() {
    // setOptions({ filter: "INVERT" });
    myp5.options = { filter: "INVERT" };
  }

  function blur() {
    // setOptions({ filter: "INVERT" });
    myp5.options = { filter: "BLUR" };
  }

  function erode() {
    // setOptions({ filter: "INVERT" });
    myp5.options = { filter: "DILATE" };
  }

  return (
    <div>
      <div id="canvas-wrap" ref={canvasWrap}></div>
      <button onClick={grayscale}>Grayscale</button>
      <button onClick={negative}>Negative</button>
      <button onClick={blur}>Blur</button>
      <button onClick={erode}>erode</button>
    </div>
  );
}

export default Editor;
