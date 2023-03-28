import { useEffect, useRef } from "react";
import tippy, { Instance } from "tippy.js";
import "tippy.js/dist/tippy.css";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip = ({ content, children }: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const instance = useRef<Instance | null>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      instance.current = tippy(tooltipRef.current, {
        content,
        placement: "top",
        animation: "scale",
      });

      return () => {
        instance.current?.destroy();
      };
    }
  }, [content]);

  return <div ref={tooltipRef}>{children}</div>;
};

export default Tooltip;
