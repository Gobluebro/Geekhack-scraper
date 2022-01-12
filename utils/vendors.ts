import { Region } from "./regions";

export type Vendors = {
  names: string[];
  urls: string[];
  locations: Region[];
};

export const VendorsList: Vendors[] = [
  {
    names: ["mekibo", "txkeyboards", "tx keyboards"],
    urls: ["mekibo.com", "us.txkeyboards.com", "txkeyboards.com/en"],
    locations: [Region.NorthAmerica, Region.UnitedStates],
  },
  {
    names: ["mykeyboard.eu", "mykeyboard", "my keyboard"],
    urls: ["mykeyboard.eu"],
    locations: [Region.Europe],
  },
  {
    names: ["deskhero"],
    urls: ["deskhero.ca"],
    locations: [Region.Canada],
  },
  {
    names: ["dailyclack", "daily clack"],
    urls: ["dailyclack.com"],
    locations: [Region.Oceania, Region.Australia],
  },
  {
    names: ["proto[typist]", "prototypist", "proto"],
    urls: ["prototypist.net"],
    locations: [Region.WorldWide, Region.Europe, Region.UnitedKingdom],
  },
  {
    names: ["keyspresso"],
    urls: ["keyspresso.ca"],
    locations: [Region.NorthAmerica, Region.Canada],
  },
  {
    names: ["kbdfans"],
    urls: ["kbdfans.com"],
    locations: [Region.WorldWide, Region.Asia, Region.China],
  },
  {
    names: ["ilumkb"],
    urls: ["ilumkb.com"],
    locations: [
      Region.Asia,
      Region.SouthEastAsia,
      Region.Singapore,
      Region.China,
    ],
  },
  {
    names: ["basekeys"],
    urls: ["basekeys.jp"],
    locations: [Region.Japan],
  },
  {
    names: ["swagkeys"],
    urls: ["swagkeys.com"],
    locations: [Region.SouthKorea],
  },
  {
    names: ["space cables", "space"],
    urls: ["spaceholdings.net"],
    locations: [Region.UnitedStates],
  },
  {
    names: ["ashkeebs"],
    urls: ["ashkeebs.com"],
    locations: [Region.Canada, Region.NorthAmerica],
  },
  {
    names: ["candykeys"],
    urls: ["candykeys.com"],
    locations: [Region.Europe, Region.Germany],
  },
  {
    names: ["switchkeys", "switchkeys.au"],
    urls: ["switchkeys.com.au"],
    locations: [Region.Oceania, Region.Australia],
  },
  {
    names: [
      "zfrontier",
      "zfrontier en",
      "zfrontier-en",
      "zfrontier-cn",
      "en.zfrontier",
      "zFrontier Intl",
    ],
    urls: [
      "www.zfrontier.com",
      "en.zfrontier.com",
      "https://zfrontier.com",
      "http://zfrontier.com",
    ],
    locations: [Region.WorldWide, Region.Asia, Region.China],
  },
  {
    names: ["funkeys"],
    urls: ["funkeys.com.ua"],
    locations: [Region.Ukraine, Region.Russia, Region.Belarus],
  },
  {
    names: ["hex keyboards", "hexkeyboards"],
    urls: ["hexkeyboards.com"],
    locations: [Region.SouthEastAsia, Region.Singapore],
  },
  {
    names: ["kono", "kono store"],
    urls: ["kono.store"],
    locations: [Region.UnitedStates],
  },
  {
    names: ["3dkeebs"],
    urls: ["3dkeebs.com"],
    locations: [Region.UnitedStates],
  },
  {
    names: ["alphakeys"],
    urls: ["alphakeys.ca"],
    locations: [Region.Canada],
  },
  {
    names: ["fancy customs", "fancycustoms"],
    urls: ["fancycustoms.com"],
    locations: [Region.SouthAmerica, Region.Chile],
  },
  {
    names: ["rheset"],
    urls: ["rheset.mx"],
    locations: [Region.Mexico],
  },
  {
    names: ["rectangles", "rectangles.store"],
    urls: ["rectangles.store"],
    locations: [Region.India],
  },
  {
    names: ["zionstudios", "zion studios", "zion studios ph"],
    urls: ["zionstudios.ph"],
    locations: [Region.Philippines, Region.SouthEastAsia],
  },
  {
    names: ["mechs & co", "mechs and co", "mechs&co"],
    urls: ["mechsandco.com"],
    locations: [Region.NorthAmerica, Region.UnitedStates],
  },
  {
    names: ["kanatakeys"],
    urls: ["kanatakeys.co"],
    locations: [Region.Canada],
  },
  {
    names: ["protozoa studio", "protozoa"],
    urls: ["protozoa.studio"],
    locations: [Region.UnitedKingdom],
  },
  {
    names: ["qwertyqop"],
    urls: ["qwertyqop.com"],
    locations: [Region.Singapore],
  },
  {
    names: ["milkyway", "milkywaykeys"],
    urls: ["milkywaykeys.com"],
    locations: [Region.China],
  },
  {
    names: ["mechboards"],
    urls: ["mechboards.co.uk"],
    locations: [Region.UnitedKingdom],
  },
  {
    names: ["valasupply", "vala supply", "vala"],
    urls: ["vala.supply"],
    locations: [Region.NorthAmerica, Region.UnitedStates],
  },
  {
    names: ["apexkeyboards"],
    urls: ["apexkeyboards.com", "apexkeyboards.ca"],
    locations: [Region.Canada],
  },
  {
    names: ["monokei", "monokei.co"],
    urls: ["monokei.co"],
    locations: [Region.SouthEastAsia],
  },
  {
    names: ["yusha kobo", "yushakobo"],
    urls: ["yushakobo.jp"],
    locations: [Region.Japan],
  },
  {
    names: ["novelkeys"],
    urls: ["novelkeys.com", "novelkeys.xyz"],
    locations: [Region.NorthAmerica, Region.UnitedStates],
  },
  {
    names: ["mkultra", "mkultra corporation"],
    urls: ["mkultra.click"],
    locations: [Region.UnitedStates],
  },
  {
    names: ["thic thock", "thicthock"],
    urls: ["thicthock.com"],
    locations: [Region.Asia, Region.SouthEastAsia, Region.WorldWide],
  },
  {
    names: ["the key company", "the key dot co"],
    urls: ["thekey.company"],
    locations: [Region.UnitedStates],
  },
  {
    names: ["cannon keys"],
    urls: ["cannonkeys.com"],
    locations: [Region.UnitedStates, Region.NorthAmerica],
  },
  {
    names: ["monstargear", "monstargears", "monstagear"],
    urls: ["monstargears.com"],
    locations: [Region.Asia, Region.SouthKorea],
  },
  {
    names: ["keyboardarcade"],
    urls: ["keyboardarcade.xyz"],
    locations: [Region.WorldWide, Region.UnitedStates],
  },
  {
    names: ["kibou"],
    urls: ["kibou.store"],
    locations: [Region.SouthEastAsia],
  },
  {
    names: ["omnitype", "dixie mech"],
    urls: ["omnitype.com", "dixiemech.com", "dixiemech.store"],
    locations: [Region.UnitedStates, Region.NorthAmerica],
  },
  {
    names: ["oblotzky industries"],
    urls: ["oblotzky.industries"],
    locations: [Region.Europe],
  },
  {
    names: ["keebcats"],
    urls: ["keebcats.co.uk"],
    locations: [Region.UnitedKingdom],
  },
  {
    names: ["originative", "originativeco"],
    urls: ["originativeco.com"],
    locations: [Region.UnitedStates],
  },
  {
    names: ["the right pc"],
    urls: ["therightpc.tech"],
    locations: [Region.UnitedStates],
  },
  {
    names: ["shockport keyboards"],
    urls: ["shockport.com"],
    locations: [Region.Canada],
  },
  {
    names: ["eloquent clicks", "eloquentclicks"],
    urls: ["eloquentclicks.com"],
    locations: [Region.Europe],
  },
  {
    names: ["stackskb"],
    urls: ["stackskb.com"],
    locations: [Region.India],
  },
  {
    names: ["rebultkeyboards"],
    urls: ["rebultkeyboards.com"],
    locations: [Region.SouthEastAsia, Region.Malaysia],
  },
  {
    names: ["thockeys"],
    urls: ["thockeys.com"],
    locations: [Region.UnitedStates],
  },
  {
    names: ["handengineering"],
    urls: ["hand.engineering"],
    locations: [Region.UnitedKingdom],
  },
  {
    names: ["keygem"],
    urls: ["keygem.store"],
    locations: [Region.Europe],
  },
  {
    names: ["letsgetit", "letsgetit.io"],
    urls: ["letsgetit.io"],
    locations: [Region.SouthKorea],
  },
  {
    names: ["captus keycaps"],
    urls: ["captus.io"],
    locations: [Region.UnitedStates],
  },
  {
    names: ["project keyboard"],
    urls: ["projectkeyboard.com"],
    locations: [Region.UnitedStates],
  },
  {
    names: ["dangkeebs, dang keebs"],
    urls: ["dangkeebs.com"],
    locations: [Region.UnitedStates],
  },
  {
    names: ["deskeys"],
    urls: ["deskeys.io"],
    locations: [Region.Asia],
  },
  {
    names: ["aeternus"],
    urls: ["aeternus.co"],
    locations: [
      Region.NorthAmerica,
      Region.UnitedStates,
      Region.Canada,
      Region.Mexico,
    ],
  },
  {
    names: ["thock co"],
    urls: ["thock.co"],
    locations: [Region.WorldWide],
  },
  {
    names: ["tastatur"],
    urls: ["tastatur.no"],
    locations: [Region.Norway],
  },
  // template
  // {
  //   names: [""],
  //   urls: [""],
  //   locations: [Region.NoRegion],
  // },
];
