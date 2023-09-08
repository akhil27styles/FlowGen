import React, { FC, useEffect } from "react";
import mermaid from "mermaid";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  securityLevel: "loose",
  themeCSS: `

  .
  `,
  fontFamily: "Fira Code",
  flowchart: {
    useMaxWidth: true,
  },
});

interface IMermaid {
  chart: string;
  name: string;
}
interface MermaidCodeModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  chart: string;
  name: string;
}
export const Mermaid: FC<IMermaid> = ({ chart, name }) => {
  useEffect(() => {
    if (chart) mermaid.contentLoaded();
  }, [chart]);

  const exportSvg = async () => {
    const svgData = await mermaid.render("text1", chart);

    console.log("svgData: " + JSON.stringify(svgData));

    const svgBlob = new Blob([svgData.svg], {
      type: "image/svg+xml;charset=utf-8",
    });

    const svgUrl = URL.createObjectURL(svgBlob);
    console.log("svgUrl: " + svgUrl);

    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `${name}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const copyMermaidCode = async () => {
    await navigator.clipboard.writeText(chart);
    alert("Mermaid Code" + chart);
  };

  return (
    <div className="relative w-full flex justify-center">
      <div className="absolute right-1 bottom-1 m-2 z-50 dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-success m-1">
          Export
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-gray-700 rounded-box w-52"
        >
          <li>
            <button onClick={copyMermaidCode}>Copy Mermaid Code</button>
          </li>
          <li>
            <button onClick={exportSvg}>SVG</button>
          </li>
        </ul>
      </div>

      <TransformWrapper>
        <TransformComponent contentClass="w-full" wrapperClass="w-full h-full">
          <div className="mermaid w-full mb-100">{chart}</div>
        </TransformComponent>{" "}
      </TransformWrapper>
    </div>
  );
};

type ScrollBehavior = "inside" | "outside";
export const MermaidCodeModal: FC<MermaidCodeModalProps> = (props: any) => {
  const { chart, name } = props;
  const [scroll, setScroll] = React.useState<ScrollBehavior>("inside");
  useEffect(() => {
    if (chart) mermaid.contentLoaded();
  }, [chart]);

  const exportSvg = async () => {
    const svgData = await mermaid.render("text1", chart);

    const svgBlob = new Blob([svgData.svg], {
      type: "image/svg+xml;charset=utf-8",
    });

    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `${name}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const copyMermaidCode = async () => {
    await navigator.clipboard.writeText(chart);
  };

  const { isOpen, onClose, onOpen } = props;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={scroll}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{chart}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={copyMermaidCode}>
              Copy Mermaid code
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
