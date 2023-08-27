import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mermaid } from "@/components/mermaid";
import SelectTemplate from "@/components/select-template";
import { TemplateEnum } from "@/lib/prompt-by-template";
import Image from "next/image";
import Nav from "@/components/nav";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { ChartDiv } from "@/components/chartDiv";

const Index = (props: any) => {
  const { chart, loading } = props;
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    TemplateEnum.FLOWCHART
  );

  const name = input ? input.replace(/\s/g, "-").toLowerCase() : "";

  // const [chart, setChart] = useState("");

  const handleFlow = async (e: any) => {
    e.preventDefault();
    if (!input && !loading) return;
    // setLoading(true);

    // try {
    //   const res = await axios.post("/api/ask", {
    //     input,
    //     selectedTemplate,
    //   });

    //   if (res.data.text) {
    //     setChart(res.data.text);
    //   } else {
    //     setError("Sorry! a small issue occurred");
    //   }
    // } catch (e) {
    //   console.log(e);
    //   setError("Sorry! a small issue occurred");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex justify-end items-center flex-col h-screen">
      <Nav />

      {/* <ChartDiv /> */}

      {/* // To be refactored */}
      {/* <div className="flex">
        <form onSubmit={handleFlow} className="form-control">
          <div className="input-group">
            <input
              className="input input-lg input-bordered input-success w-96 "
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="What the flowchart is about"
              autoFocus="on"
            />
            <button
              type="submit"
              className={`btn btn-grad btn-lg ${loading ? "loading" : ""}`}
            >
              {error ? "Retry" : "Generate Flowchart"}
            </button>
          </div>
          <SelectTemplate
            onChange={(e) => setSelectedTemplate(e.target.value)}
          />
        </form>
      </div> */}
    </div>
  );
};

export default Index;
