import { useEffect, useRef, useState } from "react";

import { dataURItoBlob } from "./utils";
import { Navigate, useNavigate } from "react-router-dom";

function Editor({ imagePath, uploadImage }) {
  const canvasRef = useRef(null); //NOTE: apparently useRef needs to be used as manipulating the dom with state will cause issues
  const [saturation, setSaturation] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [sepia, setSepia] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [hue, setHue] = useState(0);
  const [brightness, setBrightness] = useState(100); //FIXME: can probably put this into a single object, would also be work that i don;t want to do
  const [name, setName] = useState("");
  const [drawing, setDrawing] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#000000");

  const navigate = useNavigate("/");


  const maxWidth = 700;
  const maxHeight = 700;


  const handleSaturationChange = (evt) => setSaturation(evt.target.value);
  const handleContrastChange = (evt) => setContrast(evt.target.value);
  const handleSepiaChange = (evt) => setSepia(evt.target.value);
  const handleGrayscaleChange = (evt) => setGrayscale(evt.target.value);
  const handleHueChange = (evt) => setHue(evt.target.value);
  const handleBrightnessChange = (evt) => setBrightness(evt.target.value);


  function handleColorChange(evt) {
    setColor(evt.target.value);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imagePath;
    image.onload = () => {
      let width = image.naturalWidth;
      let height = image.naturalHeight;

      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;
        if (width > height) {
          width = maxWidth;
          height = width / aspectRatio;
        } else {
          height = maxHeight;
          width = height * aspectRatio;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const filterString = `saturate(${saturation}%) contrast(${contrast}%) sepia(${sepia}%) grayscale(${grayscale}%) hue-rotate(${hue}deg) brightness(${brightness}%)`;
      ctx.filter = filterString;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, [imagePath, saturation, contrast, sepia, grayscale, hue, brightness]);



  async function upload() {
    const canvas = document.querySelector('.canvas');
    const image = canvas.toDataURL('image/png');
    const blob = dataURItoBlob(image);
    console.log(blob);
    await uploadImage(blob, name);
    navigate("/");
  }

  function getMousePosition(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function startDraw(evt) {
    const canvas = canvasRef.current;
    const pos = getMousePosition(canvas, evt);
    setDrawing(true);
    setCoords(pos);
  }

  function draw(evt) {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getMousePosition(canvas, evt);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = color;
    ctx.stroke();
    setCoords(pos);
  }

  function stopDraw(evt) {
    setDrawing(false);
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <canvas className="canvas"
        ref={canvasRef}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw} />
      <div className="p-4" style={{ maxWidth: "30rem" }}>
        <label className="form-label" htmlFor="saturation">Saturation:</label>
        <input className="form-range" type="range" id="saturation" min="0" max="200" value={saturation} onChange={handleSaturationChange} />
        <label className="form-label" htmlFor="contrast">Contrast:</label>
        <input className="form-range" type="range" id="contrast" min="0" max="200" value={contrast} onChange={handleContrastChange} />
        <label className="form-label" htmlFor="sepia">Sepia:</label>
        <input className="form-range" type="range" id="grayscale" min="0" max="200" value={sepia} onChange={handleSepiaChange} />
        <label className="form-label" htmlFor="grayscale">Grayscale:</label>
        <input className="form-range" type="range" id="saturation" min="0" max="200" value={grayscale} onChange={handleGrayscaleChange} />
        <label className="form-label" htmlFor="hue">Hue:</label>
        <input className="form-range" type="range" id="hue" min="0" max="200" value={hue} onChange={handleHueChange} />
        <label className="form-label" htmlFor="brightness">Brightness:</label>
        <input className="form-range" type="range" id="brightness" min="0" max="200" value={brightness} onChange={handleBrightnessChange} />

        <div className="d-flex gap-2 my-3">
          <label htmlFor="color">Color:</label>
          <input type="color" id="color" name="color" onChange={handleColorChange} />
        </div>

        <label htmlFor="name">Name your image:</label>
        <input className="form-control" type="text" id="name" value={name} onChange={handleNameChange} required />

        <button className="btn btn-primary mt-3" onClick={upload}>Upload</button>
      </div>
    </div>
  );
};

export default Editor;
