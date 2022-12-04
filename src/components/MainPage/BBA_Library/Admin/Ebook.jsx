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
import {
  pageNavigationPlugin,
  RenderGoToPageProps,
} from "@react-pdf-viewer/page-navigation";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import disableScrollPlugin from "./disableScrollPlugin";
import { ReactReader } from "react-reader";
import { useState } from "react";
import { useRef } from "react";

const Ebook = ({ fileUrl }) => {
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
        <div style={{ height: "100vh" }}>
          <ReactReader
            url="http://localhost:3000/12.epub"
            getRendition={(rendition) => {
              renditionRef.current = rendition;
              renditionRef.current.themes.fontSize(`${size}%`);
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            left: "1rem",
            textAlign: "center",
            zIndex: 1,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Ebook;
