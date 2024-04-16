import { useState } from "react";

const INITIAL_DATA = {
  grayscale: 0,
  sepia: 0,
  size: 1,
  border: 0,
};

function Editor({ imagePath }) {
  const [formData, setFormData] = useState(INITIAL_DATA);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }


  return (
    <>
      <img src={imagePath} alt="" />
      <form>
        <label htmlFor="grayscale">Grayscale</label>
        <input
          type="range"
          min="0"
          max="100"
          name="grayscale"
          value={formData.grayscale}
          onChange={handleChange}
        />
      <label htmlFor="sepia">Sepia</label>
        <input
          type="range"
          min="0"
          max="100"
          name="sepia"
          value={formData.sepia}
          onChange={handleChange}
        />
        <label htmlFor="size">Size</label>
        <input
          type="range"
          min="0"
          max="100"
          name="size"
          value={formData.size}
          onChange={handleChange}
        />
        <label htmlFor="border">Border</label>
        <input
          type="range"
          min="0"
          max="100"
          name="border"
          value={formData.border}
          onChange={handleChange}
        />
      </form>
    </>
  );
}

export default Editor;
