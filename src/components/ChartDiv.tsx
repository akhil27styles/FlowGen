import React from "react";
import { Mermaid } from "@/components/mermaid";

export default function ChartDiv(props: any) {
  const { chart, loading, name, chartSVGDiv } = props;
  return (
    <div className="flex-1 flex justify-center border-2 border-dashed w-full mb-2 overflow-scroll">
      {loading ? (
        <div className="flex flex-col justify-center animate-pulse">
          <h1 className="text-7xl font-black">Loading...</h1>
        </div>
      ) : (
        <>
          {!!chart ? (
            <div
              className="container lg:w-3/4"
              dangerouslySetInnerHTML={{
                __html: chartSVGDiv.replace(
                  'width="100%"',
                  'style="width: 100%"'
                ),
              }}
            />
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
