/**
 * Edinburgh and Lothian commute estimates.
 *
 * Transport for Edinburgh publishes no open routing API, so this region
 * runs entirely on the reviewed static matrix below, with a
 * straight-line fallback for anything not in it. Nothing here calls out
 * to a live service, and nothing here claims to.
 *
 * The figures are typical weekday-morning door-to-door times using
 * public transport: walking to the stop, waiting, riding, and walking
 * off at the other end. They are not timetable times. Musselburgh to
 * Waverley is eight minutes on the train and twenty here, because nobody
 * lives on the platform.
 */

/**
 * Average effective public-transport speed across Edinburgh and the
 * Lothians, used only for the distance fallback.
 *
 * Higher than the figures used for Bristol or Greater Manchester,
 * because Edinburgh genuinely is better served: Lothian Buses is
 * municipally owned, runs at high frequency across the whole city and
 * is consistently rated among the best bus networks in the UK, and the
 * tram now links the airport, the West End, the New Town and Leith on
 * its own alignment. The city is also small — five kilometres covers
 * most of it.
 */
export const EDINBURGH_TRANSIT_KMH = 17;

/**
 * Reviewed door-to-door estimates, in minutes, from each area to each of
 * the eight destinations in data/destinations.ts.
 *
 * Read across the Edinburgh Park column and the shape of the city shows
 * itself. The western employment cluster is well served from the west
 * and the tram corridor, and awkward from everywhere else: Portobello to
 * Edinburgh Park is twelve kilometres and three-quarters of an hour,
 * because the journey crosses the entire city centre to get there.
 */
export const EDINBURGH_COMMUTE_TIMES: Record<string, Record<string, number>> = {
  // ── Edinburgh: central ──
  "old-town":         { waverley: 5,  "st-andrew-square": 8,  haymarket: 15, "edinburgh-park": 35, bioquarter: 25, "george-square": 8,  "leith-shore": 25, "livingston-centre": 55 },
  "new-town":         { waverley: 8,  "st-andrew-square": 5,  haymarket: 12, "edinburgh-park": 30, bioquarter: 30, "george-square": 12, "leith-shore": 20, "livingston-centre": 55 },
  tollcross:          { waverley: 12, "st-andrew-square": 12, haymarket: 10, "edinburgh-park": 30, bioquarter: 25, "george-square": 8,  "leith-shore": 25, "livingston-centre": 50 },

  // ── Edinburgh: inner ──
  leith:              { waverley: 20, "st-andrew-square": 18, haymarket: 25, "edinburgh-park": 40, bioquarter: 35, "george-square": 25, "leith-shore": 5,  "livingston-centre": 65 },
  "leith-walk":       { waverley: 15, "st-andrew-square": 12, haymarket: 20, "edinburgh-park": 35, bioquarter: 30, "george-square": 20, "leith-shore": 10, "livingston-centre": 60 },
  marchmont:          { waverley: 15, "st-andrew-square": 18, haymarket: 18, "edinburgh-park": 35, bioquarter: 25, "george-square": 8,  "leith-shore": 30, "livingston-centre": 55 },
  newington:          { waverley: 12, "st-andrew-square": 15, haymarket: 20, "edinburgh-park": 35, bioquarter: 20, "george-square": 5,  "leith-shore": 28, "livingston-centre": 55 },
  stockbridge:        { waverley: 15, "st-andrew-square": 10, haymarket: 15, "edinburgh-park": 32, bioquarter: 35, "george-square": 18, "leith-shore": 20, "livingston-centre": 55 },
  morningside:        { waverley: 20, "st-andrew-square": 22, haymarket: 18, "edinburgh-park": 30, bioquarter: 28, "george-square": 15, "leith-shore": 35, "livingston-centre": 50 },
  "gorgie-dalry":     { waverley: 15, "st-andrew-square": 15, haymarket: 8,  "edinburgh-park": 22, bioquarter: 30, "george-square": 18, "leith-shore": 25, "livingston-centre": 45 },
  abbeyhill:          { waverley: 10, "st-andrew-square": 12, haymarket: 20, "edinburgh-park": 38, bioquarter: 25, "george-square": 15, "leith-shore": 15, "livingston-centre": 60 },

  // ── Edinburgh: outer ──
  portobello:         { waverley: 25, "st-andrew-square": 28, haymarket: 32, "edinburgh-park": 45, bioquarter: 25, "george-square": 28, "leith-shore": 25, "livingston-centre": 70 },
  corstorphine:       { waverley: 25, "st-andrew-square": 25, haymarket: 15, "edinburgh-park": 12, bioquarter: 40, "george-square": 28, "leith-shore": 35, "livingston-centre": 40 },
  granton:            { waverley: 25, "st-andrew-square": 20, haymarket: 25, "edinburgh-park": 35, bioquarter: 40, "george-square": 28, "leith-shore": 15, "livingston-centre": 55 },
  cramond:            { waverley: 35, "st-andrew-square": 32, haymarket: 30, "edinburgh-park": 30, bioquarter: 50, "george-square": 38, "leith-shore": 30, "livingston-centre": 50 },
  colinton:           { waverley: 30, "st-andrew-square": 32, haymarket: 25, "edinburgh-park": 25, bioquarter: 35, "george-square": 25, "leith-shore": 45, "livingston-centre": 45 },
  liberton:           { waverley: 25, "st-andrew-square": 28, haymarket: 30, "edinburgh-park": 40, bioquarter: 12, "george-square": 20, "leith-shore": 40, "livingston-centre": 60 },
  craigmillar:        { waverley: 25, "st-andrew-square": 28, haymarket: 32, "edinburgh-park": 45, bioquarter: 8,  "george-square": 22, "leith-shore": 30, "livingston-centre": 65 },
  sighthill:          { waverley: 25, "st-andrew-square": 25, haymarket: 15, "edinburgh-park": 8,  bioquarter: 35, "george-square": 28, "leith-shore": 35, "livingston-centre": 35 },

  // ── East Lothian ──
  musselburgh:        { waverley: 20, "st-andrew-square": 22, haymarket: 28, "edinburgh-park": 45, bioquarter: 25, "george-square": 25, "leith-shore": 25, "livingston-centre": 70 },
  prestonpans:        { waverley: 25, "st-andrew-square": 28, haymarket: 32, "edinburgh-park": 50, bioquarter: 35, "george-square": 30, "leith-shore": 35, "livingston-centre": 75 },
  haddington:         { waverley: 55, "st-andrew-square": 55, haymarket: 60, "edinburgh-park": 70, bioquarter: 55, "george-square": 55, "leith-shore": 65, "livingston-centre": 90 },
  "north-berwick":    { waverley: 45, "st-andrew-square": 45, haymarket: 50, "edinburgh-park": 65, bioquarter: 55, "george-square": 48, "leith-shore": 55, "livingston-centre": 85 },
  dunbar:             { waverley: 40, "st-andrew-square": 40, haymarket: 45, "edinburgh-park": 60, bioquarter: 50, "george-square": 43, "leith-shore": 50, "livingston-centre": 80 },

  // ── Midlothian ──
  dalkeith:           { waverley: 30, "st-andrew-square": 32, haymarket: 38, "edinburgh-park": 50, bioquarter: 20, "george-square": 30, "leith-shore": 45, "livingston-centre": 65 },
  bonnyrigg:          { waverley: 35, "st-andrew-square": 38, haymarket: 42, "edinburgh-park": 52, bioquarter: 25, "george-square": 35, "leith-shore": 50, "livingston-centre": 65 },
  penicuik:           { waverley: 50, "st-andrew-square": 52, haymarket: 48, "edinburgh-park": 50, bioquarter: 40, "george-square": 45, "leith-shore": 60, "livingston-centre": 55 },

  // ── West Lothian ──
  linlithgow:         { waverley: 35, "st-andrew-square": 32, haymarket: 28, "edinburgh-park": 25, bioquarter: 50, "george-square": 40, "leith-shore": 45, "livingston-centre": 20 },
  livingston:         { waverley: 40, "st-andrew-square": 38, haymarket: 33, "edinburgh-park": 25, bioquarter: 55, "george-square": 45, "leith-shore": 50, "livingston-centre": 5 },
  bathgate:           { waverley: 45, "st-andrew-square": 43, haymarket: 38, "edinburgh-park": 30, bioquarter: 60, "george-square": 50, "leith-shore": 55, "livingston-centre": 15 },
  broxburn:           { waverley: 40, "st-andrew-square": 38, haymarket: 32, "edinburgh-park": 22, bioquarter: 52, "george-square": 45, "leith-shore": 50, "livingston-centre": 15 },
};
