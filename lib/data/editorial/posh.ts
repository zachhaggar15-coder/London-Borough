/**
 * Written answers to "Is <area> posh?", for the areas people actually search
 * that question about (Search Console, Sept 2026).
 *
 * Same rules as the neighbourhood profiles: durable character only, no
 * prices or crime figures (the page's "Is it expensive?" and "Is it safe?"
 * answers carry the numbers), and nothing that contradicts the dataset.
 * `short` leads the meta description, so keep it to one sentence.
 */
export const POSH_ANSWERS: Record<string, { short: string; answer: string }> = {
  chiswick: {
    short:
      "Yes: Chiswick is one of west London's most affluent neighbourhoods, posh in a settled, family way rather than a flashy one.",
    answer:
      "Yes, by most people's definition. Chiswick is one of west London's most affluent neighbourhoods: tree-lined streets of Victorian and Edwardian houses, the Georgian riverside at Chiswick Mall and Strand-on-the-Green, Bedford Park's red-brick garden suburb, and a high road of delis, independent shops and restaurants. It is posh in a settled, family way rather than a flashy one. The people who live here are mostly established professionals and families rather than old money, and it is noticeably less expensive and less formal than Kensington or Chelsea. The busy A4 and the Hogarth Roundabout are a reminder that it is still inner-west London, not a country village.",
  },
  putney: {
    short:
      "Fairly posh: Putney is comfortable and well-to-do rather than grand, with a settled professional crowd.",
    answer:
      "Fairly posh, yes, but comfortable rather than grand. Putney's riverside, with its rowing clubs and the start of the Boat Race, and the large houses and mansion blocks on the slopes towards Putney Heath give it an upmarket feel, and its residents tend to be professionals in their late twenties and thirties, couples and families. It is more mixed than its reputation suggests, though: the busy High Street is mostly chains, and towards Roehampton there are large post-war council estates. Think of it as a polished, sporty south-west London suburb, a notch more settled than Clapham and a notch less exclusive than Barnes or Richmond.",
  },
  richmond: {
    short:
      "Yes: Richmond is one of the most affluent parts of outer London, with Georgian houses, a royal park and a riverside town centre.",
    answer:
      "Yes, it is one of the most affluent parts of outer London. Georgian and Victorian houses around Richmond Green and up Richmond Hill, a royal park with herds of deer, the Thames and Kew Gardens next door give it an unmistakably upmarket character, and property prices are among the highest outside central London. It is posh in a relaxed, outdoorsy way: families, established professionals and retirees rather than a party crowd, with pubs and restaurants rather than clubs. The town centre is busy and has plenty of ordinary chain shops, so day to day it feels less exclusive than its reputation.",
  },
  tooting: {
    short:
      "Not especially: Tooting is a diverse, down-to-earth area known for its food, markets and commons, though it has gentrified.",
    answer:
      "Not especially, and that is much of its appeal. Tooting is a diverse, lived-in part of south London, known for its South Asian restaurants and grocers, its two indoor markets, St George's Hospital and a large population of medics and students. It has gentrified as people priced out of Clapham and Balham moved down the Northern line, and the streets of large Victorian and Edwardian houses near Tooting Bec Common and Wandsworth Common are distinctly more upmarket than the main roads. But the high street is busy and practical rather than polished, and the area still costs less than its northern neighbours.",
  },
};
