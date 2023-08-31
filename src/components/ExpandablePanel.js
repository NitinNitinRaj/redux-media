import { useState } from "react";
import { GoTriangleDown, GoTriangleLeft } from "react-icons/go";

export default function ExpandablePanel({ children, header }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded((prevState) => !prevState);
  };

  const icon = expanded ? (
    <GoTriangleLeft
      onClick={handleExpandClick}
      className="text-lg  cursor-pointer"
    />
  ) : (
    <GoTriangleDown
      onClick={handleExpandClick}
      className="text-lg  cursor-pointer"
    />
  );

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 items-center justify-between">
        <div className="flex justify-between items-center">{header}</div>
        {icon}
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
}
