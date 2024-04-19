import { useEffect, useRef, useState } from "react";

import { dataURItoBlob } from "./utils";
import { useNavigate } from "react-router-dom";

/** Editor component for image
 *
 * Ref:
 * -canvas
 *
 * props:
 * - objectUrl: image represented as an object
 * - uploadImage: parent function
 *
 * state:
 * - name: string
 * - drawing: boolean
 * - coords: {x: 50, y: 200}
 * - color: HEX value as string
 * - lineWidth: string
 * - filters: { saturation, contrast, ...}
 *
 * ImageUploader -> Editor
 */
function Editor({ objectUrl, uploadImage }) {
  const canvasRef = useRef(null);
  const [name, setName] = useState("");
  const [drawing, setDrawing] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState("5");
  const [filters, setFilters] = useState({
    saturation: 100,
    contrast: 100,
    sepia: 0,
    grayscale: 0,
    hue: 0,
    brightness: 100,
  });
  const maxWidth = 700;
  const maxHeight = 700;

  const navigate = useNavigate("/");

  const handleLineWidthChange = (evt) => setLineWidth(evt.target.value);

  function handleFilterChange(evt) {
    setFilters(filters => ({
      ...filters,
      [evt.target.name]: evt.target.value
    }));
  }

  function handleColorChange(evt) {
    setColor(evt.target.value);
  }

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  /** On mount or on filter change, create a canvas with the max with/height
   * and maintain aspect ratio
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = objectUrl;
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

      const filterString =
        `saturate(${filters.saturation}%)
         contrast(${filters.contrast}%)
         sepia(${filters.sepia}%)
         grayscale(${filters.grayscale}%)
         hue-rotate(${filters.hue}deg)
         brightness(${filters.brightness}%)`;

      ctx.filter = filterString;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, [objectUrl, filters]);


  /** Calls parent function and converts canvas to blob */
  async function upload() {
    const canvas = document.querySelector('.canvas');
    const image = canvas.toDataURL('image/png');
    const blob = dataURItoBlob(image);
    console.log(blob);
    await uploadImage(blob, name);
    navigate("/");
  }

  /** Get position of mouse relative to canvas on screen */
  function getMousePosition(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  /** Set state on mouse down to start drawing */
  function startDraw(evt) {
    const canvas = canvasRef.current;
    const pos = getMousePosition(canvas, evt);
    setDrawing(true);
    setCoords(pos);
  }

  /** on current canvas, draw using mouse coords */
  function draw(evt) {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getMousePosition(canvas, evt);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.filter = `sepia(60%)`;

    setCoords(pos);
  }

  /** on mouse up, stop drawing */
  function stopDraw() {
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
        <input className="form-range" type="range" id="saturation" min="0" max="200" name="saturation" value={filters.saturation} onChange={handleFilterChange} />
        <label className="form-label" htmlFor="contrast">Contrast:</label>
        <input className="form-range" type="range" id="contrast" min="0" max="200" name="contrast" value={filters.contrast} onChange={handleFilterChange} />
        <label className="form-label" htmlFor="sepia">Sepia:</label>
        <input className="form-range" type="range" id="grayscale" min="0" max="200" name="sepia" value={filters.sepia} onChange={handleFilterChange} />
        <label className="form-label" htmlFor="grayscale">Grayscale:</label>
        <input className="form-range" type="range" id="saturation" min="0" max="200" name="grayscale" value={filters.grayscale} onChange={handleFilterChange} />
        <label className="form-label" htmlFor="hue">Hue:</label>
        <input className="form-range" type="range" id="hue" min="0" max="200" name="hue" value={filters.hue} onChange={handleFilterChange} />
        <label className="form-label" htmlFor="brightness">Brightness:</label>
        <input className="form-range" type="range" id="brightness" min="0" max="200" name="brightness" value={filters.brightness} onChange={handleFilterChange} />
        <label className="form-label" htmlFor="lineWidth">Pen Width:</label>
        <input className="form-range" type="range" id="lineWidth" min="2" max="30" value={lineWidth} onChange={handleLineWidthChange} />

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
