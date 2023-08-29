import { useState } from "react";
import { GoTriangleDown, GoTriangleLeft } from "react-icons/go";

export default function ExpandablePanel({ children, header }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded((prevState) => !prevState);
  };

  const icon = expanded ? (
    <GoTriangleLeft className="text-lg" />
  ) : (
    <GoTriangleDown className="text-lg" />
  );

  return (
    <div className="mb-2 border rounded">
      <div
        onClick={handleExpandClick}
        className="flex p-2 items-center justify-between cursor-pointer"
      >
        <div className="flex justify-between items-center">{header}</div>
        {icon}
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
}
