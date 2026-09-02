import { useUIStore, type CursorVariant } from "@/store/useUIStore";

export function useCursorTarget(variant: CursorVariant, label = "") {
  const setCursor = useUIStore((s) => s.setCursor);
  return {
    onMouseEnter: () => setCursor(variant, label),
    onMouseLeave: () => setCursor("default"),
  };
}
