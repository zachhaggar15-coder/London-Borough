/**
 * Written profiles of what living in each London area is actually like.
 *
 * This is the part of a neighbourhood page that is not derived from the
 * dataset. Everything else on the page — rents, commute tables, lifestyle
 * scores, council tax — is computed, and is shared in shape with the
 * other 94 pages. Without this the pages are one template with the names
 * swapped, which is what AdSense rejected three times.
 *
 * Rules, the same as lib/data/guides.ts:
 *  - Write each one. No two profiles share a skeleton or an opening move.
 *  - Durable character only: housing stock, streets, parks, how the
 *    transport really behaves, who lives there, what gets missed. Nothing
 *    that goes stale in a year (named restaurants, prices, crime figures).
 *  - Never contradict the dataset. Rents, zones and scores live elsewhere
 *    and are not repeated here.
 *  - 250–350 words, two to four paragraphs. A test holds the floor and
 *    fails if two profiles share an eight-word run.
 *
 * Written in batches by borough, each checked by a person who knows the
 * area before it ships.
 */
export const NEIGHBOURHOOD_PROFILES: Record<string, string[]> = {
  // ── Lambeth ─────────────────────────────────────────────────────────

  brixton: [
    "Brixton is the southern end of the Victoria line, and that single fact shapes daily life more than any other. Heading north in the morning you board an empty train and usually get a seat, which almost nobody else in Zone 2 can say; you are at Oxford Circus in around a quarter of an hour and King's Cross not long after. Southeastern trains from the overground station add a second route into Victoria.",
    "The centre is loud, crowded and genuinely mixed. Brixton Village and Market Row, the covered arcades off Coldharbour Lane, hold the food that made the area's reputation, and Electric Avenue and the street market still sell yams, fish and phone cases side by side. The Caribbean community that arrived with the Windrush generation remains central to the area's identity — the Black Cultural Archives sit on Windrush Square — even as rents have pushed many long-standing residents further out.",
    "Housing splits sharply. Victorian terraces on the streets towards Brockwell Park and up Brixton Hill are mostly converted into flats and house shares; large post-war estates sit alongside them. New-build blocks near the station are the priciest rentals.",
    "The trade-off is noise and intensity. Friday and Saturday nights spill onto the streets around the Academy and the bars on Atlantic Road, and the Night Tube runs through. If you want late nights on your doorstep that is the point; if you want quiet, look at the streets south of Brockwell Park instead, which are ten minutes' walk and a different mood.",
  ],

  clapham: [
    "Clapham is organised around the Common, a large, flat, open space criss-crossed by paths, with ponds, sports pitches and a bandstand. On a warm weekend it fills with picnics, five-a-side and running clubs, and that outdoor sociability is the area's whole appeal. The people who move here tend to be in their twenties and early thirties, often sharing, often in their first or second London job.",
    "The area straddles the Lambeth–Wandsworth border, and the name is used loosely. Clapham Junction, the busy rail interchange, is actually in Battersea a mile to the west; Clapham High Street, Clapham Old Town and the streets around Clapham North are the Lambeth side. Housing is overwhelmingly Victorian terraces and mansion blocks, split into flats and house shares, with larger family houses in the roads off the Common.",
    "Transport is good but crowded. The Northern line stations at Clapham North, Common and South are narrow and crowded, and at rush hour trains towards the City can arrive already full. Clapham High Street on the Overground and the Junction's mainline services give real alternatives, and many residents walk or cycle to Clapham Junction for faster trains to Waterloo and Victoria.",
    "Nightlife centres on the High Street and is loud, predictable and busy from Thursday onwards. People who stay past thirty often drift towards the quieter roads nearer Clapham South or Abbeville Village, or across to Balham, rather than leaving the area entirely. The Common stays the constant: it is where the neighbourhood actually happens, in every season.",
  ],

  stockwell: [
    "Stockwell is mostly passed through rather than talked about, which is exactly why it is worth a look. The station is an interchange for both the Victoria and Northern lines, so from one stop you can be in the West End, at King's Cross or in the City without changing, and Brixton, Clapham and Vauxhall are each a short walk or a single stop away.",
    "The area has one of London's largest Portuguese-speaking communities, concentrated along South Lambeth Road towards Vauxhall, and the cafés, bakeries and grocers there are its most distinctive feature. Away from the main roads, the Stockwell Park conservation area holds handsome early-Victorian villas and squares that surprise people who only know the traffic junction at the station. Vincent van Gogh lodged on Hackford Road as a young man, and there are quiet streets like it all around.",
    "Housing is a real mix: those conservation-area houses, mostly split into flats; Victorian terraces; and several large council estates, which make up a big share of the homes. That mix is why rents here often undercut Clapham and Kennington for similar travel times.",
    "The trade-off is that Stockwell has no real centre. There is no high street to speak of, few restaurants that draw people in, and the big roads that meet at the station — Clapham Road, Stockwell Road, South Lambeth Road — are noisy and heavy with buses. Most residents treat it as a well-connected base and go elsewhere to eat and drink, and the few who stay for years usually do so for the conservation-area streets, where a quiet square can sit two minutes from the station crowds.",
  ],

  kennington: [
    "Kennington is central London that behaves like a residential neighbourhood. Westminster and the South Bank are a walk away, yet the streets behind Kennington Road are Georgian and early-Victorian terraces with little through traffic, and Cleaver Square, with its single pub and gravel pétanque ground, feels a long way from the river.",
    "The Oval cricket ground dominates the south end of the area, and on match days the streets around Oval station fill with spectators; otherwise it is a quiet presence. Kennington Park provides the main green space, with a café, sports courts and a flower garden, and the Imperial War Museum sits in its own park on the northern edge, towards Lambeth North.",
    "On the Northern line, Kennington is where the Charing Cross and Bank branches meet and where the extension to Nine Elms and Battersea Power Station begins. That gives residents a choice of routes into the West End or the City, though it also means the station is a place people change trains, and the platforms can be busy. Buses up Kennington Road reach Waterloo in minutes.",
    "The housing stock is split between those period terraces, many of them listed and expensive, and substantial council estates, which is why the area feels mixed rather than exclusive. The practical limitations are shops and food: there is no single high street, so most weekly shopping means Elephant and Castle, Vauxhall or an online order. People move here for the location and the quiet streets, not for things to do on the doorstep.",
  ],

  vauxhall: [
    "Vauxhall is the part of Lambeth that changed fastest. The riverside between Vauxhall and Battersea Power Station, known as Nine Elms, has filled with glass residential towers over the past fifteen years, alongside the US Embassy and the long-established New Covent Garden Market. Much of the rental stock here is in those blocks: concierge desks, gyms and river views, at prices to match.",
    "Behind the towers is an older, scruffier Vauxhall. The road junction at Vauxhall Cross, one of south London's busiest bus interchanges, is loud and slow to cross on foot however it is rearranged, and the railway viaducts carry trains into Waterloo right through the middle of the area. The arches beneath them hold clubs, gyms and workshops.",
    "Vauxhall has been one of the centres of London's LGBTQ+ nightlife for decades. The Royal Vauxhall Tavern, a listed Victorian pub, is its best-known venue, and several late-licence clubs operate under the arches. On weekend nights the area is busy until the morning; during the week it can feel empty once the office workers leave.",
    "Transport is excellent. The Victoria line reaches Victoria and Oxford Circus in a few stops, South Western Railway trains are two minutes from Waterloo, and buses fan out from Vauxhall Cross across south London. Cycling along the river is straightforward. Green space is limited to Vauxhall Pleasure Gardens, Spring Gardens and the small city farm; for anything larger, Kennington Park and Battersea Park are both within reach. Vauxhall suits people who want to be close to Westminster and the river and who value a modern flat over a neighbourhood feel.",
  ],

  "herne-hill": [
    "Herne Hill sits on the Lambeth–Southwark border, where Brixton starts to give way to Dulwich, and it has the feel of a small town inside Zone 2. The centre is a short parade of shops, cafés and pubs around the railway bridge, with a Sunday market on Railton Road that draws people from well beyond the area.",
    "Brockwell Park is the reason most people choose it. The park is large, hilly and well used, with views towards the City from the top, walled gardens, a miniature railway, and Brockwell Lido, a 1930s open-air pool that is busy from early spring. The Herne Hill Velodrome, one of the oldest cycle tracks in the world and a venue at the 1948 Olympics, is just to the south-east. Dulwich Park and the woods beyond are close.",
    "The housing is mainly Victorian and Edwardian terraces, many still whole houses rather than conversions, which is why the area leans towards couples and families and why the rental market is relatively small. Flats that do come up tend to be in converted houses or small purpose-built blocks.",
    "There is no tube. Herne Hill station has Southeastern trains to Victoria and Thameslink services through Blackfriars and the City, both quick but less frequent than a tube line, especially in the evening. Many residents walk or cycle fifteen minutes to Brixton for the Victoria line. Nightlife is limited to pubs and a few bars, which suits most of the people who live here: Brixton's late nights are close enough to reach and far enough to avoid.",
  ],

  streatham: [
    "Streatham stretches along one very long road. Streatham High Road runs for well over a mile from Streatham Hill down to Streatham Common, and it is often described as one of the longest high streets in the country. It is practical rather than pretty: supermarkets, independent restaurants from a wide range of cuisines, chain shops, and a steadily growing number of bars and cafés, especially around Streatham Hill.",
    "Housing is the main attraction. Edwardian terraces, large interwar mansion blocks and 1930s flats line the side streets, and a one-bed here usually costs noticeably less than in Clapham, Brixton or Balham. Pullman Court on Streatham Hill, a listed modernist block by Frederick Gibberd, is the best-known example of the area's interwar flats, and there are many plainer relatives of it.",
    "Green space is a real strength. Streatham Common rises steeply to the Rookery, a formal garden near the mineral wells that briefly made Streatham a fashionable spa in the eighteenth century, and Tooting Bec Common borders the western side. Streatham also has an ice rink and leisure centre, which is rare in London.",
    "Transport is the catch. There is no tube, and the three stations — Streatham Hill, Streatham and Streatham Common — are served by Southern and Thameslink trains to Victoria, London Bridge and the City, which are fine at peak times and thinner in the evening. Many people take a bus to Brixton for the Victoria line, which adds time and uncertainty. Streatham suits people who want more space for their rent and who can work around a rail timetable.",
  ],
};
