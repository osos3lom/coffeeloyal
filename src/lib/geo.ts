import { branches, type Branch } from "@/lib/content/branches";
import { branchCoords, type BranchCoords } from "@/lib/content/branch-coords";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface LocatedBranch extends Branch {
  coords: BranchCoords;
  /** Kilometres from the reference point, when one is known. */
  distanceKm?: number;
}

/** Great-circle distance in kilometres. */
export function distanceKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Branches that have coordinates, in source order. */
export const locatedBranches: LocatedBranch[] = branches.flatMap((b) => {
  const coords = branchCoords[b.slug];
  return coords ? [{ ...b, coords }] : [];
});

/**
 * Branches sorted by distance from `from`.
 *
 * Branches whose coordinates are only city-level are ranked last regardless
 * of their computed distance: several of them share a single centroid, so
 * comparing them to each other — or presenting one as "nearest" — would be
 * claiming precision the data does not have.
 */
export function nearestBranches(from: LatLng, limit?: number): LocatedBranch[] {
  const scored = locatedBranches.map((b) => ({
    ...b,
    distanceKm: distanceKm(from, b.coords),
  }));

  scored.sort((a, b) => {
    const aWeak = a.coords.quality === "city";
    const bWeak = b.coords.quality === "city";
    if (aWeak !== bWeak) return aWeak ? 1 : -1;
    return a.distanceKm - b.distanceKm;
  });

  return limit ? scored.slice(0, limit) : scored;
}

/** Locale-aware distance label: metres under 1km, otherwise kilometres. */
export function formatDistance(km: number, lang: "ar" | "en"): string {
  if (km < 1) {
    const m = Math.round(km * 1000);
    return lang === "ar" ? `${m} م` : `${m} m`;
  }
  const v = km < 10 ? km.toFixed(1) : Math.round(km).toString();
  return lang === "ar" ? `${v} كم` : `${v} km`;
}

/** Geographic centre of the whole network — the map's default view. */
export const NETWORK_CENTER: LatLng = { lat: 21.55, lng: 39.6 };
