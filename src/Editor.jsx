import { useEffect, useRef } from "react";
import p5 from "p5";
import { dataURItoBlob } from "./utils";

function Editor({ imagePath, uploadImage }) {
  const canvasWrap = useRef();
  const options = useRef({});
  console.log("rendering editor");


  function sketch(p) {
    let image;

    p.preload = () => {
      image = p.loadImage(imagePath);
    };

    p.setup = () => {
      p.createCanvas(image.width, image.height);
      p.image(image, 0, 0);
    };

    p.draw = () => {
      if (p.mouseIsPressed) {
        p.stroke(200, 50, 30);
        p.strokeWeight(5);
        p.ellipse(p.mouseX, p.mouseY, 1);
      }
    };

    p.mouseClicked = (evt) => {
      if (evt.target.className === 'Editor-filter-btn') {
        p.filter(p[options.filter]);
      }
    };

    p.onDrag = () => {
      p.stroke(5, 100, 200);
      p.point(p.mouseX, p.mouseY);
    };
  }

  useEffect(function setUpCanvasOnMount() {
    console.log('in editor use effect')
    if (canvasWrap) {
      canvasWrap.current.innerHtml = "";
    }
    new p5(sketch, "canvas-wrap");
  }, []);

  function setFilter(filter) {
    options.filter = filter;
  }

  async function upload() {
    const canvas = document.querySelector('#canvas-wrap canvas');
    const image = canvas.toDataURL('image/png');
    const blob = dataURItoBlob(image);
    uploadImage(blob);
  }

  return (
    <div>
      <div id="canvas-wrap" ref={canvasWrap} ></div>
      <button className="Editor-filter-btn" onClick={() => setFilter('GRAY')}>Grayscale</button>
      <button className="Editor-filter-btn" onClick={() => setFilter('INVERT')}>Invert</button>
      <button className="Editor-filter-btn" onClick={() => setFilter('BLUR')}>Blur</button>
      <button className="Editor-filter-btn" onClick={() => setFilter('BLUR')}>erode</button>

      <button onClick={upload}>Upload</button>
    </div>
  );
}

export default Editor;
