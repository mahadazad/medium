import React from "react";
import { commands } from "./commands";
import { IconProps, Icon } from "../../../../components/icon";

export const CommandButton: React.FC<{
  onCommand: (name: string) => void;
  name: IconProps["name"];
}> = React.memo(({ onCommand, name }) => {
  const { label, className = "tooltipped-n" } = commands[name];
  const baseClass = "toolbar-item tooltipped";

  return (
    <div
      className={className ? `${className} ${baseClass}` : baseClass}
      aria-label={label}
      onClick={() => onCommand(name)}
    >
      <Icon size={16} name={name} fill="currentColor" />
    </div>
  );
});
