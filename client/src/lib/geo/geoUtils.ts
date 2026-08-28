export const GEO_BASE =
  "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master";

export type DistrictRow = {
  id: number;
  name: string;
  bnName: string;
};

export type UpazilaRow = {
  id: number;
  districtId: number;
  name: string;
  bnName: string;
};

export type UnionRow = {
  id: number;
  upazilaId: number;
  name: string;
  bnName: string;
};

export type GeoData = {
  districts: DistrictRow[];
  upazilas: UpazilaRow[];
  unions: UnionRow[];
};


function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }

  out.push(cur);

  return out;
}

function parseCsv(text: string): string[][] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parseCsvLine);
}

// ---------------------------------------------------------------------------
// Name normalization / fuzzy matching
// ---------------------------------------------------------------------------

const DISTRICT_NAME_ALIAS: Record<string, string> = {
  barishal: "barisal",
  jhalokati: "jhalakathi",
  coxsbazar: "coxsbazar",
  jeshore: "jashore",
  bogra: "bogura",
  nawabganj: "chapainawabganj",
};

const THANA_NAME_ALIAS: Record<string, string> = {
  cumillaadarshasadar: "comillasadar",
  nawabganjsadar: "chapainawabganjsadar",
  matlabdakshin: "matlabsouth",
  matlabuttar: "matlabnorth",
  dakshinsunamganj: "southsunamganj",
  goalandaghat: "goalanda",
  kawkhalirangamati: "kawkhali",
  nesarabadswarupkathi: "nesarabad",
};

export function normalizeName(raw: string): string {
  let s = raw.toLowerCase();

  s = s.replace(/\(.*?\)/g, "");
  s = s.replace(/[^a-z]/g, "");

  return THANA_NAME_ALIAS[s] ?? DISTRICT_NAME_ALIAS[s] ?? s;
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    const cur = [i];

    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }

    prev = cur;
  }

  return prev[b.length];
}

// ---------------------------------------------------------------------------
// Geo data loading (cached) + upazila matching
// ---------------------------------------------------------------------------

let geoDataPromise: Promise<GeoData> | null = null;

export function loadGeoData(): Promise<GeoData> {
  if (!geoDataPromise) {
    geoDataPromise = Promise.all([
      fetch(`${GEO_BASE}/districts/districts.csv`).then((r) => r.text()),
      fetch(`${GEO_BASE}/upazilas/upazilas.csv`).then((r) => r.text()),
      fetch(`${GEO_BASE}/unions/unions.csv`).then((r) => r.text()),
    ]).then(([districtsCsv, upazilasCsv, unionsCsv]) => {
      const districts: DistrictRow[] = parseCsv(districtsCsv).map((r) => ({
        id: Number(r[0]),
        name: r[2],
        bnName: r[3],
      }));

      const upazilas: UpazilaRow[] = parseCsv(upazilasCsv).map((r) => ({
        id: Number(r[0]),
        districtId: Number(r[1]),
        name: r[2],
        bnName: r[3],
      }));

      const unions: UnionRow[] = parseCsv(unionsCsv).map((r) => ({
        id: Number(r[0]),
        upazilaId: Number(r[1]),
        name: r[2],
        bnName: r[3],
      }));

      return { districts, upazilas, unions };
    });
  }

  return geoDataPromise;
}

export function matchUpazila(
  geo: GeoData,
  districtName: string,
  thanaName: string
): UpazilaRow | null {
  const targetDistrictNorm = normalizeName(districtName);

  const district = geo.districts.find(
    (d) => normalizeName(d.name) === targetDistrictNorm
  );

  if (!district) return null;

  const candidates = geo.upazilas.filter((u) => u.districtId === district.id);

  if (candidates.length === 0) return null;

  const targetThanaNorm = normalizeName(thanaName);

  const exact = candidates.find(
    (u) => normalizeName(u.name) === targetThanaNorm
  );

  if (exact) return exact;

  let best: UpazilaRow | null = null;
  let bestDistance = Infinity;

  for (const u of candidates) {
    const d = levenshtein(targetThanaNorm, normalizeName(u.name));

    if (d < bestDistance) {
      bestDistance = d;
      best = u;
    }
  }

  return bestDistance <= 3 ? best : null;
}
