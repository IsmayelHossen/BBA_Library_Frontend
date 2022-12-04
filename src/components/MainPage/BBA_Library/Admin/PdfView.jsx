import * as React from "react";
import {
  Icon,
  MinimalButton,
  Position,
  SpecialZoomLevel,
  Tooltip,
  Viewer,
  Worker,
} from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";

import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ReactReader } from "react-reader";
import { useState } from "react";
import { useRef } from "react";

const PdfView = ({ fileUrl }) => {
  const [page, setPage] = useState("");
  const renditionRef = useRef(null);
  const tocRef = useRef(null);
  const [size, setSize] = useState(100);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const changeSize = (newSize) => {
    setSize(newSize);
  };
  React.useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${size}%`);
    }
  }, [size]);
  const locationChanged = (epubcifi) => {
    if (renditionRef.current && tocRef.current) {
      const { displayed, href } = renditionRef.current.location.start;
      const chapter = tocRef.current.find((item) => item.href === href);
      setPage(
        `Page ${displayed.page} of ${displayed.total} in chapter ${
          chapter ? chapter.label : "n/a"
        }`
      );
    }
  };

  return (
    <div className="page-wrapper">
      {/* Page Content */}
      <div className="content container-fluid">
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "750px",
          }}
        >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
            <Viewer
              fileUrl={`http://localhost:3000/13.pdf`}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={SpecialZoomLevel.PageFit}
            />
          </Worker>
        </div>
      </div>
    </div>
  );
};

export default PdfView;
