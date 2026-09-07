/**
 * West Yorkshire commute estimates.
 *
 * The West Yorkshire Combined Authority publishes no open routing API,
 * so this region runs entirely on the reviewed static matrix below, with
 * a straight-line fallback for anything not in it. Nothing here calls
 * out to a live service, and nothing here claims to.
 *
 * The figures are typical weekday-morning door-to-door times using
 * public transport: walking to the stop, waiting, riding, and walking
 * off at the other end. They are not timetable times. Cross Gates to
 * Leeds is nine minutes on the train and fifteen here, because nobody
 * lives on the platform.
 */

/**
 * Average effective public-transport speed across West Yorkshire, used
 * only for the distance fallback.
 *
 * Slightly higher than the figures used for regions with no suburban
 * rail, because West Yorkshire's rail network is genuinely dense — the
 * region has more stations than any English county outside London, and
 * the Airedale, Wharfedale, Calder Valley and Wakefield lines carry a
 * lot of commuting. It is still conservative: the bus network outside
 * Leeds is slow, and the rail frequencies fall away sharply off-peak.
 */
export const WEST_YORKSHIRE_TRANSIT_KMH = 19;

/**
 * Reviewed door-to-door estimates, in minutes, from each area to each of
 * the eight destinations in data/destinations.ts.
 *
 * Read across the Bradford and Huddersfield columns and the region's
 * shape shows itself: the rail network was built to move wool between
 * mill towns, not people between suburbs, and it still does that better
 * than anything else. Halifax reaches Bradford faster than it reaches
 * Leeds, and Dewsbury reaches Huddersfield faster than it reaches its
 * own borough's northern half.
 */
export const LEEDS_COMMUTE_TIMES: Record<string, Record<string, number>> = {
  // ── Leeds: central ──
  "city-centre":      { "leeds-station": 5,  "wellington-place": 8,  "university-leeds": 15, "st-james": 20, "thorpe-park": 25, "white-rose": 25, "bradford-centre": 25, huddersfield: 40 },
  holbeck:            { "leeds-station": 10, "wellington-place": 8,  "university-leeds": 20, "st-james": 28, "thorpe-park": 30, "white-rose": 20, "bradford-centre": 30, huddersfield: 45 },

  // ── Leeds: inner ──
  headingley:         { "leeds-station": 22, "wellington-place": 20, "university-leeds": 12, "st-james": 30, "thorpe-park": 40, "white-rose": 35, "bradford-centre": 35, huddersfield: 50 },
  "hyde-park":        { "leeds-station": 20, "wellington-place": 18, "university-leeds": 8,  "st-james": 25, "thorpe-park": 38, "white-rose": 35, "bradford-centre": 35, huddersfield: 50 },
  burley:             { "leeds-station": 18, "wellington-place": 15, "university-leeds": 12, "st-james": 28, "thorpe-park": 35, "white-rose": 32, "bradford-centre": 30, huddersfield: 48 },
  kirkstall:          { "leeds-station": 25, "wellington-place": 22, "university-leeds": 20, "st-james": 35, "thorpe-park": 40, "white-rose": 35, "bradford-centre": 30, huddersfield: 50 },
  "chapel-allerton":  { "leeds-station": 22, "wellington-place": 25, "university-leeds": 20, "st-james": 20, "thorpe-park": 35, "white-rose": 40, "bradford-centre": 45, huddersfield: 55 },
  meanwood:           { "leeds-station": 25, "wellington-place": 25, "university-leeds": 18, "st-james": 25, "thorpe-park": 40, "white-rose": 40, "bradford-centre": 45, huddersfield: 55 },
  armley:             { "leeds-station": 20, "wellington-place": 18, "university-leeds": 22, "st-james": 32, "thorpe-park": 35, "white-rose": 28, "bradford-centre": 28, huddersfield: 45 },
  beeston:            { "leeds-station": 20, "wellington-place": 22, "university-leeds": 28, "st-james": 35, "thorpe-park": 35, "white-rose": 15, "bradford-centre": 40, huddersfield: 45 },
  harehills:          { "leeds-station": 20, "wellington-place": 25, "university-leeds": 20, "st-james": 12, "thorpe-park": 30, "white-rose": 40, "bradford-centre": 45, huddersfield: 55 },

  // ── Leeds: outer ──
  roundhay:           { "leeds-station": 30, "wellington-place": 32, "university-leeds": 28, "st-james": 20, "thorpe-park": 35, "white-rose": 45, "bradford-centre": 50, huddersfield: 60 },
  horsforth:          { "leeds-station": 25, "wellington-place": 28, "university-leeds": 30, "st-james": 40, "thorpe-park": 45, "white-rose": 45, "bradford-centre": 35, huddersfield: 55 },
  guiseley:           { "leeds-station": 35, "wellington-place": 38, "university-leeds": 40, "st-james": 50, "thorpe-park": 55, "white-rose": 55, "bradford-centre": 30, huddersfield: 60 },
  "cross-gates":      { "leeds-station": 15, "wellington-place": 20, "university-leeds": 28, "st-james": 25, "thorpe-park": 15, "white-rose": 40, "bradford-centre": 40, huddersfield: 55 },
  garforth:           { "leeds-station": 20, "wellington-place": 25, "university-leeds": 32, "st-james": 30, "thorpe-park": 20, "white-rose": 45, "bradford-centre": 45, huddersfield: 60 },
  morley:             { "leeds-station": 18, "wellington-place": 22, "university-leeds": 30, "st-james": 38, "thorpe-park": 35, "white-rose": 20, "bradford-centre": 35, huddersfield: 30 },

  // ── Leeds: fringe ──
  otley:              { "leeds-station": 55, "wellington-place": 58, "university-leeds": 55, "st-james": 65, "thorpe-park": 70, "white-rose": 70, "bradford-centre": 45, huddersfield: 75 },
  wetherby:           { "leeds-station": 55, "wellington-place": 58, "university-leeds": 60, "st-james": 55, "thorpe-park": 55, "white-rose": 70, "bradford-centre": 75, huddersfield: 85 },

  // ── Bradford ──
  "bradford-centre":  { "leeds-station": 25, "wellington-place": 28, "university-leeds": 35, "st-james": 40, "thorpe-park": 45, "white-rose": 45, "bradford-centre": 5,  huddersfield: 25 },
  saltaire:           { "leeds-station": 30, "wellington-place": 33, "university-leeds": 38, "st-james": 45, "thorpe-park": 50, "white-rose": 50, "bradford-centre": 15, huddersfield: 40 },
  bingley:            { "leeds-station": 35, "wellington-place": 38, "university-leeds": 42, "st-james": 50, "thorpe-park": 55, "white-rose": 55, "bradford-centre": 20, huddersfield: 45 },
  ilkley:             { "leeds-station": 40, "wellington-place": 43, "university-leeds": 45, "st-james": 55, "thorpe-park": 60, "white-rose": 60, "bradford-centre": 35, huddersfield: 65 },
  keighley:           { "leeds-station": 45, "wellington-place": 48, "university-leeds": 52, "st-james": 60, "thorpe-park": 65, "white-rose": 65, "bradford-centre": 30, huddersfield: 55 },

  // ── Wakefield ──
  "wakefield-centre": { "leeds-station": 25, "wellington-place": 28, "university-leeds": 35, "st-james": 40, "thorpe-park": 40, "white-rose": 30, "bradford-centre": 45, huddersfield: 40 },
  horbury:            { "leeds-station": 35, "wellington-place": 38, "university-leeds": 45, "st-james": 50, "thorpe-park": 50, "white-rose": 35, "bradford-centre": 55, huddersfield: 45 },
  castleford:         { "leeds-station": 30, "wellington-place": 33, "university-leeds": 40, "st-james": 45, "thorpe-park": 30, "white-rose": 45, "bradford-centre": 55, huddersfield: 60 },

  // ── Kirklees ──
  "huddersfield-centre": { "leeds-station": 35, "wellington-place": 38, "university-leeds": 45, "st-james": 50, "thorpe-park": 55, "white-rose": 45, "bradford-centre": 25, huddersfield: 5 },
  "marsh-lindley":    { "leeds-station": 42, "wellington-place": 45, "university-leeds": 50, "st-james": 58, "thorpe-park": 62, "white-rose": 52, "bradford-centre": 32, huddersfield: 12 },
  holmfirth:          { "leeds-station": 60, "wellington-place": 63, "university-leeds": 68, "st-james": 75, "thorpe-park": 80, "white-rose": 70, "bradford-centre": 50, huddersfield: 30 },
  dewsbury:           { "leeds-station": 20, "wellington-place": 23, "university-leeds": 30, "st-james": 35, "thorpe-park": 40, "white-rose": 30, "bradford-centre": 30, huddersfield: 20 },

  // ── Calderdale ──
  halifax:            { "leeds-station": 40, "wellington-place": 43, "university-leeds": 48, "st-james": 55, "thorpe-park": 60, "white-rose": 55, "bradford-centre": 25, huddersfield: 30 },
  "hebden-bridge":    { "leeds-station": 55, "wellington-place": 58, "university-leeds": 62, "st-james": 70, "thorpe-park": 75, "white-rose": 70, "bradford-centre": 40, huddersfield: 45 },
  "sowerby-bridge":   { "leeds-station": 45, "wellington-place": 48, "university-leeds": 52, "st-james": 60, "thorpe-park": 65, "white-rose": 60, "bradford-centre": 30, huddersfield: 35 },
  brighouse:          { "leeds-station": 30, "wellington-place": 33, "university-leeds": 40, "st-james": 45, "thorpe-park": 50, "white-rose": 40, "bradford-centre": 30, huddersfield: 20 },
};
