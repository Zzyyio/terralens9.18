import { useMemo } from "react";
import { LibreMap, type Overlay } from "./libre-map";

export function MiniMap({
  lat,
  lon,
  zoom = 7,
  label,
  className,
}: {
  lat: number;
  lon: number;
  zoom?: number;
  label?: string;
  className?: string;
}) {
  const overlays = useMemo<Overlay[]>(
    () => [
      {
        id: "halo",
        color: "#3EE0C6",
        circle: true,
        fill: true,
        labels: false,
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { name: label ?? "", kind: "place", note: "" },
              geometry: { type: "Point", coordinates: [lon, lat] },
            },
          ],
        },
      },
    ],
    [lat, lon, label],
  );
  return (
    <LibreMap
      center={[lon, lat]}
      zoom={zoom}
      marker={[lon, lat]}
      overlays={overlays}
      label={label ? `Locator map for ${label}` : "Locator map"}
      className={
        className ??
        "h-[min(52vh,28rem)] w-full min-h-[20rem] overflow-hidden rounded-2xl border border-white/10 bg-trench"
      }
    />
  );
}
