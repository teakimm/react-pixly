import { useEffect, useRef } from "react";
import p5 from "p5";
import { dataURItoBlob } from "./utils";

function Editor({ imagePath, uploadImage }) {
  const canvasWrap = useRef();
  let options = useRef({});
  console.log("rendering editor");

  function sketch(p) {
    let image;
    let pixelSizeSlider;

    console.log(p);

    p.preload = () => {
      image = p.loadImage(imagePath);
    };

    p.setup = () => {
      p.createCanvas(image.width, image.height);
      p.image(image, 0, 0);
      pixelSizeSlider = p.createSlider(1, 20, 1);
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
      } else if (evt.target.id === 'Editor-pixelate-btn') {
        pixelate();
      }
    };

    function pixelate() {
      let pixelSize = pixelSizeSlider.value();
      p.noStroke();
      p.loadPixels();
      for (let i = 0; i < image.width; i+=pixelSize) {
        for (let j = 0; j < image.height; j+=pixelSize) {
          const color = image.get(i, j);
          p.fill(color);
          p.rect(i, j, pixelSize, pixelSize);
        }
      }
    }
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

  function handleChange(evt) {
    options = {
      ...options,
      [evt.target.name]: evt.target.value
    }
    console.log(options.pixelSize);
  }

  return (
    <div>
      <div id="canvas-wrap" ref={canvasWrap} ></div>
      <button className="Editor-filter-btn" onClick={() => setFilter('GRAY')}>Grayscale</button>
      <button className="Editor-filter-btn" onClick={() => setFilter('INVERT')}>Invert</button>
      <button className="Editor-filter-btn" onClick={() => setFilter('BLUR')}>Blur</button>
      <button className="Editor-filter-btn" onClick={() => setFilter('BLUR')}>erode</button>
      <button id="Editor-pixelate-btn" >Pixelate</button>
      <button onClick={upload}>Upload</button>
    </div>
  );
}

export default Editor;
