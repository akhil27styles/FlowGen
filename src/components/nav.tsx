import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useState } from "react";
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

  return (
    <>
      {/* /////////////////// */}
      {/* {loading ? (
        <div className="flex flex-col justify-center animate-pulse">
          <h1 className="text-7xl font-black">Loading...</h1>
        </div>
      ) : (
        <>
          {!!chart ? (
            <Mermaid chart={chart} name={name} />
          ) : (
            <div className="flex flex-col justify-center">
              <h1 className="text-7xl font-black">Generate</h1>
              <h3 className="text-8xl font-black text-success">Flowchart</h3>
              <h2 className="text-5xl font-black">with AI</h2>
            </div>
          )}
        </>
      )} */}
      {/* /////////////////////////// */}

      <MermaidCodeModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        chart={chart}
        name={name}
      />
      <nav className="p-4 flex justify-between items-center w-full">
        <Heading className="left-0">FlowGen</Heading>
        <div className="flex justify-center items-center">
          <SearchBox chart={chart} setChart={setChart} />
        </div>
        {!!chart && (
          <div className="">
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
                <MenuItem>SVG</MenuItem>
              </MenuList>
            </Menu>
          </div>
        )}
      </nav>
      <ChartDiv chart={chart} loading={loading} name={name} />
    </>
  );
};

export default Nav;
