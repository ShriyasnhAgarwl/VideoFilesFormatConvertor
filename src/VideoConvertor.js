// src/VideoConverter.js

import React, { useState } from "react";
import axios from "axios";

function VideoConverter() {
  const [inputFiles, setInputFiles] = useState([]);
  const [sourceFormat, setSourceFormat] = useState("mp4");
  const [targetFormat, setTargetFormat] = useState("webm");
  const [conversionStatus, setConversionStatus] = useState(null);
  const [convertedFiles, setConvertedFiles] = useState([]);

  const handleFileChange = (e) => {
    setInputFiles(e.target.files);
  };

  const handleConvert = async () => {
    const formData = new FormData();
    formData.append("targetFormat", targetFormat);

    // Append all selected files to the form data
    Array.from(inputFiles).forEach((file) => {
      formData.append("videos", file);
    });

    try {
      setConversionStatus("Converting...");
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setConvertedFiles(response.data.files);
      setConversionStatus("Conversion complete");
    } catch (error) {
      setConversionStatus("Error during conversion");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Video Converter</h2>
      <form>
        <label>
          Source Format:
          <select
            value={sourceFormat}
            onChange={(e) => setSourceFormat(e.target.value)}
          >
            <option value="mp4">MP4</option>
            <option value="webm">WebM</option>
            <option value="avi">AVI</option>
            <option value="mov">MOV</option>
          </select>
        </label>
        <label>
          Target Format:
          <select
            value={targetFormat}
            onChange={(e) => setTargetFormat(e.target.value)}
          >
            <option value="mp4">MP4</option>
            <option value="webm">WebM</option>
            <option value="avi">AVI</option>
            <option value="mov">MOV</option>
          </select>
        </label>
        <input
          type="file"
          multiple
          accept="video/*"
          onChange={handleFileChange}
        />
        <button type="button" onClick={handleConvert}>
          Convert Videos
        </button>
      </form>

      {conversionStatus && <p>{conversionStatus}</p>}

      {convertedFiles.length > 0 && (
        <div>
          <h3>Converted Files:</h3>
          <ul>
            {convertedFiles.map((file, index) => (
              <li key={index}>
                <a href={`http://localhost:5000/${file}`} download>
                  Download Converted Video
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default VideoConverter;
