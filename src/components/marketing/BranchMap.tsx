"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mapsUrl } from "@/lib/content/branches";
import type { LatLng, LocatedBranch } from "@/lib/geo";
import { formatDistance } from "@/lib/geo";
import { NETWORK_CENTER } from "@/lib/geo";

/**
 * Leaflet over OpenStreetMap tiles — no API key, no billing account, and no
 * third-party script beyond the tile requests.
 *
 * Pins are built as divIcons rather than Leaflet's default PNG marker: the
 * default asset paths break under bundlers, and hand-drawn pins let the map
 * carry the brand's olive and gold instead of stock blue.
 */

function pin({
  selected,
  nearest,
}: {
  selected: boolean;
  nearest: boolean;
}) {
  const fill = nearest ? "#C5A869" : selected ? "#2C3627" : "#53634B";
  const ring = nearest ? "#53634B" : "#FFFFFF";
  const size = nearest || selected ? 34 : 26;

  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 4],
    html: `
      <span style="
        display:block;width:${size}px;height:${size}px;
        transform:translateY(-2px);
        filter:drop-shadow(0 3px 6px rgba(24,21,18,.35));
      ">
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">
          <path fill="${fill}" stroke="${ring}" stroke-width="1.4"
            d="M12 1.8c-4 0-7.2 3.2-7.2 7.2 0 5.1 6.4 12.4 6.7 12.7a.7.7 0 0 0 1 0c.3-.3 6.7-7.6 6.7-12.7 0-4-3.2-7.2-7.2-7.2Z"/>
          <circle cx="12" cy="9" r="2.6" fill="${ring}"/>
        </svg>
      </span>`,
  });
}

const userPin = () =>
  L.divIcon({
    className: "",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    html: `
      <span style="
        display:block;width:18px;height:18px;border-radius:9999px;
        background:#2F6FED;border:3px solid #fff;
        box-shadow:0 0 0 2px rgba(47,111,237,.35), 0 2px 6px rgba(24,21,18,.3);
      "></span>`,
  });

/** Re-frames the map whenever the focus point changes. */
function Recenter({ center, zoom }: { center: LatLng | null; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (!center) return;
    map.flyTo([center.lat, center.lng], zoom, { duration: 0.8 });
  }, [center, zoom, map]);
  return null;
}

/** Leaflet mis-measures its container when it mounts inside a layout that
 *  is still settling; nudge it once on mount. */
function InvalidateOnMount() {
  const map = useMap();
  useEffect(() => {
    const id = window.setTimeout(() => map.invalidateSize(), 120);
    return () => window.clearTimeout(id);
  }, [map]);
  return null;
}

export default function BranchMap({
  branches,
  userPos,
  accuracyM,
  nearestSlug,
  selectedSlug,
  onSelect,
  focus,
  lang,
  labels,
}: {
  branches: LocatedBranch[];
  userPos: LatLng | null;
  accuracyM?: number | null;
  nearestSlug?: string | null;
  selectedSlug?: string | null;
  onSelect?: (slug: string) => void;
  focus: LatLng | null;
  lang: "ar" | "en";
  labels: { directions: string; approximate: string; you: string };
}) {
  const isAr = lang === "ar";
  const initial = focus ?? userPos ?? NETWORK_CENTER;

  const icons = useMemo(
    () => ({
      base: pin({ selected: false, nearest: false }),
      selected: pin({ selected: true, nearest: false }),
      nearest: pin({ selected: false, nearest: true }),
      user: userPin(),
    }),
    [],
  );

  return (
    <MapContainer
      center={[initial.lat, initial.lng]}
      zoom={userPos ? 12 : 8}
      scrollWheelZoom={false}
      className="h-full w-full"
      // The map is a supporting view, not the page's main content.
      attributionControl
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={19}
      />
      <InvalidateOnMount />
      <Recenter center={focus} zoom={focus ? 13 : 8} />

      {userPos && (
        <>
          {typeof accuracyM === "number" && accuracyM > 0 && (
            <Circle
              center={[userPos.lat, userPos.lng]}
              radius={Math.min(accuracyM, 5000)}
              pathOptions={{
                color: "#2F6FED",
                weight: 1,
                fillColor: "#2F6FED",
                fillOpacity: 0.08,
              }}
            />
          )}
          <Marker position={[userPos.lat, userPos.lng]} icon={icons.user}>
            <Popup>{labels.you}</Popup>
          </Marker>
        </>
      )}

      {branches.map((b) => {
        const isNearest = b.slug === nearestSlug;
        const isSelected = b.slug === selectedSlug;
        return (
          <Marker
            key={b.slug}
            position={[b.coords.lat, b.coords.lng]}
            icon={isNearest ? icons.nearest : isSelected ? icons.selected : icons.base}
            eventHandlers={onSelect ? { click: () => onSelect(b.slug) } : undefined}
            zIndexOffset={isNearest ? 1000 : isSelected ? 500 : 0}
          >
            <Popup>
              <span className="block text-[0.875rem] font-semibold text-[#181512]">
                {isAr ? b.ar : b.en}
              </span>
              <span className="mt-0.5 block text-[0.75rem] leading-snug text-[#675E54]">
                {isAr ? b.addressAr : b.addressEn}
              </span>
              {typeof b.distanceKm === "number" && (
                <span className="mt-1 block text-[0.75rem] font-semibold text-[#53634B]">
                  {formatDistance(b.distanceKm, lang)}
                </span>
              )}
              {b.coords.quality === "city" && (
                <span className="mt-1 block text-[0.6875rem] text-[#A18548]">
                  {labels.approximate}
                </span>
              )}
              <a
                href={mapsUrl(b)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[0.75rem] font-semibold text-[#53634B] underline"
              >
                {labels.directions}
              </a>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
