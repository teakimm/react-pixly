import { useEffect, useRef, useState } from "react";

import { dataURItoBlob } from "./utils";

function Editor({ imagePath, uploadImage }) {
  const canvasRef = useRef(null); //NOTE: apparently useRef needs to be used as manipulating the dom with state will cause issues
  const [saturation, setSaturation] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [sepia, setSepia] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [hue, setHue] = useState(0);
  const [brightness, setBrightness] = useState(100); //FIXME: can probably put this into a single object, would also be work that i don;t want to do
  const [name, setName] = useState("");


  const maxWidth = 700;
  const maxHeight = 700;


  const handleSaturationChange = (event) => setSaturation(event.target.value);
  const handleContrastChange = (event) => setContrast(event.target.value);
  const handleSepiaChange = (event) => setSepia(event.target.value);
  const handleGrayscaleChange = (event) => setGrayscale(event.target.value);
  const handleHueChange = (event) => setHue(event.target.value);
  const handleBrightnessChange = (event) => setBrightness(event.target.value);

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
    uploadImage(blob, name);

  }

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  return (
    <div>
      <canvas className="canvas" ref={canvasRef} />
      <div>
        <label htmlFor="saturation">Saturation:</label>
        <input type="range" id="saturation" min="0" max="200" value={saturation} onChange={handleSaturationChange} />
        <label htmlFor="contrast">Contrast:</label>
        <input type="range" id="contrast" min="0" max="200" value={contrast} onChange={handleContrastChange} />
        <label htmlFor="sepia">Sepia:</label>
        <input type="range" id="grayscale" min="0" max="200" value={sepia} onChange={handleSepiaChange} />
        <label htmlFor="grayscale">Grayscale:</label>
        <input type="range" id="saturation" min="0" max="200" value={grayscale} onChange={handleGrayscaleChange} />
        <label htmlFor="hue">Hue:</label>
        <input type="range" id="hue" min="0" max="200" value={hue} onChange={handleHueChange} />
        <label htmlFor="brightness">Brightness:</label>
        <input type="range" id="brightness" min="0" max="200" value={brightness} onChange={handleBrightnessChange} />


        <input type="text" id="name" value={name} onChange={handleNameChange} required/>


        <button onClick={upload}>Upload</button>
      </div>
    </div>
  );
};

export default Editor;
