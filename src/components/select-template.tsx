import React, { FunctionComponent } from "react";
import { TemplateEnum } from "@/lib/prompt-by-template";
import { Select } from "@chakra-ui/react";

interface ITemplate {
  label: string;
  value: TemplateEnum;
}

export const templates: ITemplate[] = [
  { label: "Flowchart", value: TemplateEnum.FLOWCHART },
  { label: "Mindmap", value: TemplateEnum.MINDMAP },
  { label: "Timeline", value: TemplateEnum.TIMELINE },
  { label: "User Journey", value: TemplateEnum.USERJOURNEY },
  { label: "Entity Relationship", value: TemplateEnum.ENTITYRELATIONSHIP },
  { label: "Sequence Diagram", value: TemplateEnum.SEQUENCE },
  { label: "State Diagram", value: TemplateEnum.STATE },
  // { label: "Class Diagram", value: TemplateEnum.CLASS }, // FIXME: syntax mistake is pretty common for this
];

interface ISelectTemplate {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectTemplate: FunctionComponent<ISelectTemplate> = ({ onChange }) => {
  return (
    <>
      <Select onChange={onChange}>
        {templates.map((item) => (
          <option value={item.value} key={item.label}>
            {item.label}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectTemplate;
