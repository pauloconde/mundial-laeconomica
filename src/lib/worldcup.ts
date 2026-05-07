// src/lib/worldcup.ts
// Data layer for World Cup 2026 – consumes openfootball JSON
// All display text is translated to Spanish via mapping tables.

export const DATA_URL =
  'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json';

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export interface Score {
  ft?: [number, number];  // full-time / tiempo completo
  et?: [number, number];  // extra-time / tiempo extra
  p?:  [number, number];  // penalties / penales
}

export interface Goal {
  name: string;
  minute?: number;
}

export interface Match {
  round: string;
  num?: number;
  date: string;          // "2026-06-11"
  time: string;          // "13:00 UTC-6"
  team1: string;
  team2: string;
  group?: string;
  ground: string;
  score?: Score;
  goals?: { team1?: Goal[]; team2?: Goal[] };
}

export interface WorldCupData {
  name: string;
  matches: Match[];
}

export interface TeamStanding {
  team: string;
  teamEs: string;
  flagCode: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

export interface GroupStanding {
  group: string;
  groupEs: string;
  teams: TeamStanding[];
}

// ──────────────────────────────────────────────
// TRADUCCIÓN: Países / Selecciones
// ──────────────────────────────────────────────

export const TEAM_ES: Record<string, string> = {
  'Mexico':               'México',
  'South Africa':         'Sudáfrica',
  'South Korea':          'Corea del Sur',
  'Czech Republic':       'República Checa',
  'Canada':               'Canadá',
  'Bosnia & Herzegovina': 'Bosnia y Herzegovina',
  'Qatar':                'Catar',
  'Switzerland':          'Suiza',
  'Brazil':               'Brasil',
  'Morocco':              'Marruecos',
  'Haiti':                'Haití',
  'Scotland':             'Escocia',
  'USA':                  'EE. UU.',
  'Paraguay':             'Paraguay',
  'Australia':            'Australia',
  'Turkey':               'Turquía',
  'Germany':              'Alemania',
  'Curaçao':              'Curazao',
  'Ivory Coast':          'Costa de Marfil',
  'Ecuador':              'Ecuador',
  'Netherlands':          'Países Bajos',
  'Japan':                'Japón',
  'Sweden':               'Suecia',
  'Tunisia':              'Túnez',
  'Belgium':              'Bélgica',
  'Egypt':                'Egipto',
  'Iran':                 'Irán',
  'New Zealand':          'Nueva Zelanda',
  'Spain':                'España',
  'Cape Verde':           'Cabo Verde',
  'Saudi Arabia':         'Arabia Saudita',
  'Uruguay':              'Uruguay',
  'France':               'Francia',
  'Senegal':              'Senegal',
  'Iraq':                 'Irak',
  'Norway':               'Noruega',
  'Argentina':            'Argentina',
  'Algeria':              'Argelia',
  'Austria':              'Austria',
  'Jordan':               'Jordania',
  'Portugal':             'Portugal',
  'DR Congo':             'Rep. Dem. del Congo',
  'Uzbekistan':           'Uzbekistán',
  'Colombia':             'Colombia',
  'England':              'Inglaterra',
  'Croatia':              'Croacia',
  'Ghana':                'Ghana',
  'Panama':               'Panamá',
};

/** Devuelve el nombre del equipo en español, o traduce marcadores de posición (W/L) */
export function translateTeam(name: string): string {
  // Traducción directa de país
  if (TEAM_ES[name]) return TEAM_ES[name];

  // Marcadores de fase eliminatoria (ej: "Winner Match 73" -> "Ganador 73")
  if (/^Winner\s+(?:Match\s+)?(\d+)$/i.test(name)) {
    return name.replace(/^Winner\s+(?:Match\s+)?(\d+)$/i, 'Ganador $1');
  }
  if (/^Loser\s+(?:Match\s+)?(\d+)$/i.test(name)) {
    return name.replace(/^Loser\s+(?:Match\s+)?(\d+)$/i, 'Perdedor $1');
  }

  // Formato corto (ej: "W73" -> "G73", "L73" -> "P73")
  if (/^W(\d+)$/i.test(name)) {
    return name.replace(/^W(\d+)$/i, 'G$1');
  }
  if (/^L(\d+)$/i.test(name)) {
    return name.replace(/^L(\d+)$/i, 'P$1');
  }

  // Otros casos (ej: "1A", "2B") se quedan igual
  return name;
}

// ──────────────────────────────────────────────
// TRADUCCIÓN: Ciudades / Sedes
// ──────────────────────────────────────────────

export const GROUND_ES: Record<string, string> = {
  'Mexico City':                                'Ciudad de México',
  'Guadalajara (Zapopan)':                      'Guadalajara',
  'Monterrey (Guadalupe)':                      'Monterrey',
  'Los Angeles (Inglewood)':                    'Los Ángeles',
  'Dallas (Arlington)':                         'Dallas',
  'New York/New Jersey (East Rutherford)':      'Nueva York / Nueva Jersey',
  'Miami (Miami Gardens)':                      'Miami',
  'San Francisco Bay Area (Santa Clara)':       'Área de la Bahía de San Francisco',
  'Houston':                                    'Houston',
  'Philadelphia':                               'Filadelfia',
  'Boston (Foxborough)':                        'Boston',
  'Atlanta':                                    'Atlanta',
  'Seattle':                                    'Seattle',
  'Kansas City':                                'Kansas City',
  'Vancouver':                                  'Vancouver',
  'Toronto':                                    'Toronto',
};

/** Devuelve el nombre de la sede en español. */
export function translateGround(ground: string): string {
  return GROUND_ES[ground] ?? ground;
}

// ──────────────────────────────────────────────
// TRADUCCIÓN: Rondas / Fases
// ──────────────────────────────────────────────

export const ROUND_ES: Record<string, string> = {
  'Matchday 1':            'Fecha 1',
  'Matchday 2':            'Fecha 2',
  'Matchday 3':            'Fecha 3',
  'Matchday 4':            'Fecha 4',
  'Matchday 5':            'Fecha 5',
  'Matchday 6':            'Fecha 6',
  'Matchday 7':            'Fecha 7',
  'Matchday 8':            'Fecha 8',
  'Matchday 9':            'Fecha 9',
  'Matchday 10':           'Fecha 10',
  'Matchday 11':           'Fecha 11',
  'Matchday 12':           'Fecha 12',
  'Matchday 13':           'Fecha 13',
  'Matchday 14':           'Fecha 14',
  'Matchday 15':           'Fecha 15',
  'Matchday 16':           'Fecha 16',
  'Matchday 17':           'Fecha 17',
  'Round of 32':           'Dieciséisavos',
  'Round of 16':           'Octavos de Final',
  'Quarter-final':         'Cuartos de Final',
  'Semi-final':            'Semifinal',
  'Match for third place': 'Tercer Lugar',
  'Final':                 'Gran Final',
};

/** Devuelve el nombre de la ronda en español. */
export function translateRound(round: string): string {
  return ROUND_ES[round] ?? round;
}

// ──────────────────────────────────────────────
// TRADUCCIÓN: Grupos
// ──────────────────────────────────────────────

export const GROUP_ES: Record<string, string> = {
  'Group A': 'Grupo A',
  'Group B': 'Grupo B',
  'Group C': 'Grupo C',
  'Group D': 'Grupo D',
  'Group E': 'Grupo E',
  'Group F': 'Grupo F',
  'Group G': 'Grupo G',
  'Group H': 'Grupo H',
  'Group I': 'Grupo I',
  'Group J': 'Grupo J',
  'Group K': 'Grupo K',
  'Group L': 'Grupo L',
};

/** Devuelve el nombre del grupo en español. */
export function translateGroup(group: string): string {
  return GROUP_ES[group] ?? group;
}

// ──────────────────────────────────────────────
// Country → ISO flag code mapping
// ──────────────────────────────────────────────

const FLAG_CODES: Record<string, string> = {
  'Mexico': 'mx', 'South Africa': 'za', 'South Korea': 'kr',
  'Czech Republic': 'cz', 'Canada': 'ca', 'Bosnia & Herzegovina': 'ba',
  'Qatar': 'qa', 'Switzerland': 'ch', 'Brazil': 'br', 'Morocco': 'ma',
  'Haiti': 'ht', 'Scotland': 'gb-sct', 'USA': 'us', 'Paraguay': 'py',
  'Australia': 'au', 'Turkey': 'tr', 'Germany': 'de', 'Curaçao': 'cw',
  'Ivory Coast': 'ci', 'Ecuador': 'ec', 'Netherlands': 'nl', 'Japan': 'jp',
  'Sweden': 'se', 'Tunisia': 'tn', 'Belgium': 'be', 'Egypt': 'eg',
  'Iran': 'ir', 'New Zealand': 'nz', 'Spain': 'es', 'Cape Verde': 'cv',
  'Saudi Arabia': 'sa', 'Uruguay': 'uy', 'France': 'fr', 'Senegal': 'sn',
  'Iraq': 'iq', 'Norway': 'no', 'Argentina': 'ar', 'Algeria': 'dz',
  'Austria': 'at', 'Jordan': 'jo', 'Portugal': 'pt', 'DR Congo': 'cd',
  'Uzbekistan': 'uz', 'Colombia': 'co', 'England': 'gb-eng', 'Croatia': 'hr',
  'Ghana': 'gh', 'Panama': 'pa',
};

export function getFlagUrl(team: string): string {
  const code = FLAG_CODES[team] ?? team.toLowerCase().replace(/\s+/g, '-').substring(0, 2);
  return `https://flagcdn.com/28x21/${code}.png`;
}

// ──────────────────────────────────────────────
// Time utilities
// ──────────────────────────────────────────────

/**
 * Parsea "13:00 UTC-6" a un objeto Date en UTC, dado "2026-06-11"
 */
export function parseMatchDate(dateStr: string, timeStr: string): Date {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s+UTC([+-]\d+)$/);
  if (!match) return new Date(`${dateStr}T12:00:00Z`);

  const [, h, m, offsetStr] = match;
  const offset    = parseInt(offsetStr, 10);
  const localHour = parseInt(h, 10);
  const localMin  = parseInt(m, 10);

  const utcHour = localHour - offset;
  return new Date(Date.UTC(
    parseInt(dateStr.slice(0, 4)),
    parseInt(dateStr.slice(5, 7)) - 1,
    parseInt(dateStr.slice(8, 10)),
    utcHour,
    localMin
  ));
}

// ──────────────────────────────────────────────
// Data fetching
// ──────────────────────────────────────────────

let _cache: WorldCupData | null = null;

export async function fetchWorldCupData(): Promise<WorldCupData> {
  if (_cache) return _cache;
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    _cache = await res.json() as WorldCupData;
    return _cache;
  } catch (e) {
    console.error('[WorldCup] Error al obtener datos en vivo, usando fallback:', e);
    return { name: 'World Cup 2026', matches: [] };
  }
}

// ──────────────────────────────────────────────
// Derived helpers
// ──────────────────────────────────────────────

export function getGroupMatches(data: WorldCupData): Match[] {
  return data.matches.filter(m => Boolean(m.group));
}

export function getKnockoutMatches(data: WorldCupData): Match[] {
  return data.matches.filter(m => !m.group);
}

export function getNextMatch(data: WorldCupData, now = new Date()): Match | null {
  const future = data.matches
    .map(m => ({ m, d: parseMatchDate(m.date, m.time) }))
    .filter(({ d }) => d > now)
    .sort((a, b) => a.d.getTime() - b.d.getTime());
  return future[0]?.m ?? null;
}

export function getMatchesForDate(data: WorldCupData, dateStr: string): Match[] {
  return data.matches.filter(m => {
    const d = parseMatchDate(m.date, m.time);
    const local = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return local === dateStr;
  });
}

export function getRounds(data: WorldCupData): string[] {
  const seen   = new Set<string>();
  const result: string[] = [];
  for (const m of data.matches) {
    if (!seen.has(m.round)) { seen.add(m.round); result.push(m.round); }
  }
  return result;
}

export function getMatchesByRound(data: WorldCupData): Map<string, Match[]> {
  const map = new Map<string, Match[]>();
  for (const m of data.matches) {
    if (!map.has(m.round)) map.set(m.round, []);
    map.get(m.round)!.push(m);
  }
  return map;
}

export function getMatchesByGroup(data: WorldCupData): Map<string, Match[]> {
  const map = new Map<string, Match[]>();
  for (const m of getGroupMatches(data)) {
    const g = m.group!;
    if (!map.has(g)) map.set(g, []);
    map.get(g)!.push(m);
  }
  return map;
}

/**
 * Devuelve todos los partidos ordenados cronológicamente, agrupados por
 * fecha UTC (clave: "YYYY-MM-DD"). El Map está ordenado por fecha.
 */
export interface DayGroup {
  dateKey: string;       // "2026-06-11"
  utcDate: Date;         // primer kickoff del día (para el header)
  matches: Match[];      // partidos del día ordenados por hora
}

export function getMatchesByDateChronological(data: WorldCupData): DayGroup[] {
  // 1. Ordenar todos los partidos por timestamp UTC
  const sorted = [...data.matches].sort((a, b) => {
    const da = parseMatchDate(a.date, a.time).getTime();
    const db = parseMatchDate(b.date, b.time).getTime();
    return da - db;
  });

  // 2. Agrupar por fecha UTC (YYYY-MM-DD del timestamp UTC)
  const map = new Map<string, Match[]>();
  for (const m of sorted) {
    const d   = parseMatchDate(m.date, m.time);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(m);
  }

  // 3. Convertir a array de DayGroup (ya ordenado por inserción)
  return Array.from(map.entries()).map(([dateKey, matches]) => ({
    dateKey,
    utcDate: parseMatchDate(matches[0].date, matches[0].time),
    matches,
  }));
}

// ──────────────────────────────────────────────
// Standings calculation
// ──────────────────────────────────────────────

function initTeam(team: string): TeamStanding {
  return {
    team,
    teamEs: translateTeam(team),
    flagCode: FLAG_CODES[team] ?? 'xx',
    played: 0, won: 0, drawn: 0, lost: 0,
    gf: 0, ga: 0, gd: 0, points: 0,
  };
}

export function calculateGroupStandings(data: WorldCupData): GroupStanding[] {
  const matchesByGroup = getMatchesByGroup(data);
  const standings: GroupStanding[] = [];

  for (const [group, matches] of matchesByGroup) {
    const teamMap = new Map<string, TeamStanding>();
    const getOrCreate = (name: string) => {
      if (!teamMap.has(name)) teamMap.set(name, initTeam(name));
      return teamMap.get(name)!;
    };

    for (const match of matches) {
      const t1 = getOrCreate(match.team1);
      const t2 = getOrCreate(match.team2);

      if (match.score?.ft) {
        const [g1, g2] = match.score.ft;
        t1.played++; t2.played++;
        t1.gf += g1; t1.ga += g2; t1.gd = t1.gf - t1.ga;
        t2.gf += g2; t2.ga += g1; t2.gd = t2.gf - t2.ga;

        if (g1 > g2) {
          t1.won++; t1.points += 3; t2.lost++;
        } else if (g1 < g2) {
          t2.won++; t2.points += 3; t1.lost++;
        } else {
          t1.drawn++; t1.points++;
          t2.drawn++; t2.points++;
        }
      }
    }

    const teams = Array.from(teamMap.values()).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.gd !== a.gd) return b.gd - a.gd;
      return b.gf - a.gf;
    });

    standings.push({ group, groupEs: translateGroup(group), teams });
  }

  return standings.sort((a, b) => a.group.localeCompare(b.group));
}

// ──────────────────────────────────────────────
// Venue data (con ciudades y países en español)
// ──────────────────────────────────────────────

export interface Venue {
  name: string;       // nombre oficial del estadio
  cityEn: string;     // clave original del JSON
  cityEs: string;     // nombre de ciudad en español
  countryEn: string;
  countryEs: string;
  capacity: string;
  imageKey: string;
}

export const VENUES: Venue[] = [
  { name: 'Estadio Azteca',          cityEn: 'Mexico City',                               cityEs: 'Ciudad de México',                      countryEn: 'Mexico',  countryEs: 'México',        capacity: '87,523', imageKey: 'mexico-city' },
  { name: 'Estadio Akron',           cityEn: 'Guadalajara (Zapopan)',                      cityEs: 'Guadalajara',                           countryEn: 'Mexico',  countryEs: 'México',        capacity: '49,850', imageKey: 'guadalajara' },
  { name: 'Estadio BBVA',            cityEn: 'Monterrey (Guadalupe)',                      cityEs: 'Monterrey',                             countryEn: 'Mexico',  countryEs: 'México',        capacity: '53,500', imageKey: 'monterrey' },
  { name: 'SoFi Stadium',            cityEn: 'Los Angeles (Inglewood)',                    cityEs: 'Los Ángeles',                           countryEn: 'USA',     countryEs: 'EE. UU.',       capacity: '70,240', imageKey: 'los-angeles' },
  { name: 'AT&T Stadium',            cityEn: 'Dallas (Arlington)',                         cityEs: 'Dallas',                                countryEn: 'USA',     countryEs: 'EE. UU.',       capacity: '80,000', imageKey: 'dallas' },
  { name: 'MetLife Stadium',         cityEn: 'New York/New Jersey (East Rutherford)',      cityEs: 'Nueva York / Nueva Jersey',             countryEn: 'USA',     countryEs: 'EE. UU.',       capacity: '82,500', imageKey: 'new-york' },
  { name: 'Hard Rock Stadium',       cityEn: 'Miami (Miami Gardens)',                      cityEs: 'Miami',                                 countryEn: 'USA',     countryEs: 'EE. UU.',       capacity: '64,767', imageKey: 'miami' },
  { name: "Levi's Stadium",          cityEn: 'San Francisco Bay Area (Santa Clara)',       cityEs: 'Área de la Bahía de San Francisco',     countryEn: 'USA',     countryEs: 'EE. UU.',       capacity: '68,500', imageKey: 'san-francisco' },
  { name: 'NRG Stadium',             cityEn: 'Houston',                                    cityEs: 'Houston',                               countryEn: 'USA',     countryEs: 'EE. UU.',       capacity: '72,220', imageKey: 'houston' },
  { name: 'Lincoln Financial Field', cityEn: 'Philadelphia',                               cityEs: 'Filadelfia',                            countryEn: 'USA',     countryEs: 'EE. UU.',       capacity: '69,796', imageKey: 'philadelphia' },
  { name: 'Gillette Stadium',        cityEn: 'Boston (Foxborough)',                        cityEs: 'Boston',                                countryEn: 'USA',     countryEs: 'EE. UU.',       capacity: '65,878', imageKey: 'boston' },
  { name: 'Mercedes-Benz Stadium',   cityEn: 'Atlanta',                                    cityEs: 'Atlanta',                               countryEn: 'USA',     countryEs: 'EE. UU.',       capacity: '71,000', imageKey: 'atlanta' },
  { name: 'Lumen Field',             cityEn: 'Seattle',                                    cityEs: 'Seattle',                               countryEn: 'USA',     countryEs: 'EE. UU.',       capacity: '68,740', imageKey: 'seattle' },
  { name: 'Arrowhead Stadium',       cityEn: 'Kansas City',                                cityEs: 'Kansas City',                           countryEn: 'USA',     countryEs: 'EE. UU.',       capacity: '76,416', imageKey: 'kansas-city' },
  { name: 'BC Place',                cityEn: 'Vancouver',                                  cityEs: 'Vancouver',                             countryEn: 'Canada',  countryEs: 'Canadá',        capacity: '54,500', imageKey: 'vancouver' },
  { name: 'BMO Field',               cityEn: 'Toronto',                                    cityEs: 'Toronto',                               countryEn: 'Canada',  countryEs: 'Canadá',        capacity: '45,736', imageKey: 'toronto' },
];

export function getUniqueVenues(data: WorldCupData): string[] {
  return [...new Set(data.matches.map(m => m.ground))];
}

// ──────────────────────────────────────────────
// Format helpers (español)
// ──────────────────────────────────────────────

/** Formatea la hora local (ej: "15:00") */
export function formatLocalTime(match: Match): string {
  try {
    return parseMatchDate(match.date, match.time)
      .toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return match.time;
  }
}

/** Formatea la fecha en español (ej: "jue., 11 jun.") */
export function formatDate(match: Match): string {
  try {
    return parseMatchDate(match.date, match.time)
      .toLocaleDateString('es', { weekday: 'short', day: 'numeric', month: 'short' });
  } catch {
    return match.date;
  }
}

/** Devuelve el ISO string UTC del partido (para usar en data-utc del cliente). */
export function getMatchUTC(match: Match): string {
  return parseMatchDate(match.date, match.time).toISOString();
}

export function hasScore(match: Match): boolean {
  return Boolean(match.score?.ft);
}

export function getScoreString(match: Match): string | null {
  if (!match.score?.ft) return null;
  return `${match.score.ft[0]} - ${match.score.ft[1]}`;
}
