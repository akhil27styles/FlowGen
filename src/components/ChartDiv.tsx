import React, { useRef } from "react";
import { Mermaid } from "@/components/mermaid";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

export default function ChartDiv(props: any) {
  const { chart, loading, name, chartSVGDiv } = props;

  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  const zoomToImage = () => {
    if (transformComponentRef.current) {
      const { zoomToElement } = transformComponentRef.current;
      zoomToElement("text1");
    }
  };

  return (
    <div className="flex-1 flex justify-center border-2 border-dashed w-full mb-2 overflow-scroll">
      {loading ? (
        <div className="flex flex-col justify-center animate-pulse">
          <h1 className="text-7xl font-black">Loading...</h1>
        </div>
      ) : (
        <>
          {!!chart ? (
            <TransformWrapper
              initialScale={1}
              initialPositionX={200}
              initialPositionY={100}
              ref={transformComponentRef}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment>
                  {/* <div className="tools">
                    <button onClick={zoomIn}>+</button>
                    <button onClick={zoomOut}>-</button>
                    <button onClick={resetTransform}>x</button>
                  </div> */}
                  <TransformComponent>
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: chartSVGDiv.replace(
                          'width="100%"',
                          'style="width: 100vw; height: 100vh;"'
                        ),
                      }}
                    />
                  </TransformComponent>
                </React.Fragment>
              )}
            </TransformWrapper>
          ) : (
            // <Mermaid chart={chart} name={name} />
            <div className="flex flex-col justify-center">
              <h1 className="text-7xl font-black">Generate</h1>
              <h3 className="text-8xl font-black text-success">Flowchart</h3>
              <h2 className="text-5xl font-black">with AI</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}
