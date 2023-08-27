import React, { ReactElement, ReactNode, useState, useEffect } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { TemplateEnum } from "@/lib/prompt-by-template";
import axios from "axios";
import SelectTemplate from "./select-template";

export const SearchBox = (props: any) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    TemplateEnum.FLOWCHART
  );

  const name = input ? input.replace(/\s/g, "-").toLowerCase() : "";

  const { chart, setChart } = props;

  const handleFlow = async (e: any) => {
    e.preventDefault();
    if (!input && !loading) return;
    setLoading(true);
    // setTimeout(() => {
    //   console.log("input: " + input + " " + selectedTemplate);
    //   setLoading(false);
    // }, 2000);

    try {
      const res = await axios.post("/api/ask", {
        input,
        selectedTemplate,
      });
      if (res.data.text) {
        console.log("res.data.text" + res.data.text);
        setChart(res.data.text);
      } else {
        setError("Sorry! a small issue occurred");
      }
    } catch (e) {
      console.log(e);
      setError("Sorry! a small issue occurred");
    } finally {
    }
  };

  useEffect(() => {
    console.log("selectedTemplate: " + selectedTemplate);
    console.log("chart" + chart);
  }, [selectedTemplate, chart]);

  return (
    <div>
      <InputGroup borderRadius={5} size="lg">
        <InputLeftAddon
          pointerEvents="visible"
          children={
            <>
              <Search2Icon color="gray.600" />
              <SelectTemplate
                onChange={(e) => setSelectedTemplate(e.target.value)}
              />
            </>
          }
        />

        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What the flowchart is about"
          _placeholder={{ opacity: 1, color: "gray.400" }}
          border="1px solid #949494"
          width={400}
        />
        <InputRightAddon p={0} border="none">
          <Button
            size="lg"
            // borderLeftRadius={0}
            // borderRightRadius={3.3}
            // border="1px solid #949494"
            p={loading ? 8 : 0}
            isLoading={loading}
            loadingText="Generating"
            onClick={handleFlow}
          >
            <a
              href="#_"
              className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded-r-md hover:pl-10 hover:pr-6 bg-gray-50 group border border-gray-500"
            >
              <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
              <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                {error ? "Retry" : "Generate Flowchart"}
              </span>
            </a>
          </Button>
        </InputRightAddon>
      </InputGroup>
    </div>
  );
};
