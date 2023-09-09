import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import mermaid from "mermaid";
import { SearchBox } from "./SearchBox";
import { Heading } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { MermaidCodeModal } from "./mermaid";
import { TemplateEnum } from "@/lib/prompt-by-template";
import axios from "axios";
import ChartDiv from "./ChartDiv";

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  securityLevel: "loose",
  themeCSS: `

  .
  `,
  fontFamily: "Fira Code",
});

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    TemplateEnum.FLOWCHART
  );

  const name = input ? input.replace(/\s/g, "-").toLowerCase() : "";

  const [chart, setChart] = useState("");

  const handleFlow = async (e: any) => {
    e.preventDefault();
    if (!input && !loading) return;
    setLoading(true);

    try {
      const res = await axios.post("/api/ask", {
        input,
        selectedTemplate,
      });

      if (res.data.text) {
        setChart(res.data.text);
      } else {
        setError("Sorry! a small issue occurred");
      }
    } catch (e) {
      console.log(e);
      setError("Sorry! a small issue occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (chart) {
      const base64Code = btoa(unescape(encodeURIComponent(chart)));
      const mermaidLiveEditorURL = `https://mermaid.ink/img/${base64Code}`;
      window.open(mermaidLiveEditorURL, "_blank");
    }
  };

  const [chartSVGDiv, setChartSVGDiv] = useState("");

  const exportSvg = async () => {
    if (!!chart) {
      const svgData = !!chart ? await mermaid.render("text1", chart) : "";

      console.log("svgData.svg: " + JSON.stringify(svgData?.svg));
      setChartSVGDiv(svgData?.svg);

      const svgBlob = new Blob([svgData?.svg], {
        type: "image/svg+xml;charset=utf-8",
      });

      const svgUrl = URL.createObjectURL(svgBlob);

      const downloadLink = document.createElement("a");
      downloadLink.href = svgUrl;
      downloadLink.download = `${name}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  // const generateSVGDiv = async () => {
  //   const svgData = await mermaid.render("text1", chart);

  //   console.log("svgData.svg: " + JSON.stringify(svgData.svg));
  //   setChartSVGDiv(svgData.svg);
  // };

  useEffect(() => {
    exportSvg();
  }, [chart]);

  return (
    <>
      <MermaidCodeModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        chart={chart}
        name={name}
      />
      <nav className="p-4 lg:flex justify-between items-center w-full grid gap-4">
        <h1 className="lg:left-0 text-center logo text-5xl">FlowGen</h1>
        <div className="flex justify-center items-center">
          <SearchBox chart={chart} setChart={setChart} />
        </div>

        <div className={`${!chart ? "invisible" : ""}`}>
          <Menu>
            <MenuButton className="relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
              <a
                href="#_"
                className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group border border-gray-950"
              >
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="flex gap-4 items-center text-lg relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                  Export
                  <DownloadIcon w={5} h={5} />
                </span>
              </a>
            </MenuButton>
            <MenuList border={"1px"}>
              <MenuItem onClick={onOpen}>Copy Mermaid Code</MenuItem>
              <MenuDivider />
              <MenuItem onClick={exportSvg}>Download SVG</MenuItem>
              <MenuItem onClick={handleShare}>Share Url</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </nav>
      <ChartDiv
        chart={chart}
        loading={loading}
        name={name}
        chartSVGDiv={chartSVGDiv}
      />
    </>
  );
};

export default Nav;
