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

import disableScrollPlugin from "./disableScrollPlugin";
import { ReactReader } from "react-reader";
import { useState } from "react";
import { useRef } from "react";

const Ebook = ({ fileUrl }) => {
  const [page, setPage] = useState("");
  const renditionRef = useRef(null);
  const tocRef = useRef(null);
  const [size, setSize] = useState(100);

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
        {/* <div
          className="rpv-core__viewer"
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              left: 0,
              position: "absolute",
              top: "50%",
              transform: "translate(24px, -50%)",
              zIndex: 1,
            }}
          >
            <GoToPreviousPage>
              {(props: RenderGoToPageProps) => (
                <Tooltip
                  position={Position.BottomCenter}
                  target={
                    <MinimalButton onClick={props.onClick}>
                      <Icon size={16}>
                        <path d="M18.4.5,5.825,11.626a.5.5,0,0,0,0,.748L18.4,23.5" />
                      </Icon>
                    </MinimalButton>
                  }
                  content={() => "Previous page"}
                  offset={{ left: 0, top: 8 }}
                />
              )}
            </GoToPreviousPage>
          </div>

          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translate(-24px, -50%)",
              zIndex: 1,
            }}
          >
            <GoToNextPage>
              {(props: RenderGoToPageProps) => (
                <Tooltip
                  position={Position.BottomCenter}
                  target={
                    <MinimalButton onClick={props.onClick}>
                      <Icon size={16}>
                        <path d="M5.651,23.5,18.227,12.374a.5.5,0,0,0,0-.748L5.651.5" />
                      </Icon>
                    </MinimalButton>
                  }
                  content={() => "Next page"}
                  offset={{ left: 0, top: 8 }}
                />
              )}
            </GoToNextPage>
          </div>

          <Viewer
            fileUrl={`http://localhost:3000/13.pdf`}
            plugins={[
              disableScrollPluginInstance,
              pageNavigationPluginInstance,
            ]}
            defaultScale={SpecialZoomLevel.PageFit}
          />
        </div> */}
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
        >
          <button onClick={() => changeSize(Math.max(80, size - 10))}>-</button>
          <span>Current size: {size}%</span>
          <button onClick={() => changeSize(Math.min(130, size + 10))}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ebook;
