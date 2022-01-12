export type KeycapInfoType = {
  searchTerm: string;
  profile: string;
  company: string;
  type: KeycapIdentifier;
};

export enum KeycapIdentifier {
  NoBrand,
  GMK,
  ePBT,
  KAT,
  KAM,
  MW,
  DSA,
  SA,
  DSS,
  DCS,
  MG,
  MDA,
  JTK,
  MT3,
  INFINIKEY,
}

export const KeycapInfo: KeycapInfoType[] = [
  {
    searchTerm: "gmk",
    profile: "cherry",
    company: "gmk",
    type: KeycapIdentifier.GMK,
  },
  {
    searchTerm: "epbt",
    profile: "cherry",
    company: "enjoy pbt",
    type: KeycapIdentifier.ePBT,
  },
  {
    searchTerm: "kat",
    profile: "kat",
    company: "keyreative",
    type: KeycapIdentifier.KAT,
  },
  {
    searchTerm: "kam",
    profile: "kam",
    company: "keyreative",
    type: KeycapIdentifier.KAM,
  },
  {
    searchTerm: "mw",
    profile: "mw",
    company: "milkyway",
    type: KeycapIdentifier.MW,
  },
  {
    searchTerm: "dsa",
    profile: "dsa",
    company: "signature plastics",
    type: KeycapIdentifier.DSA,
  },
  {
    searchTerm: "sa",
    profile: "sa",
    company: "signature plastics",
    type: KeycapIdentifier.SA,
  },
  {
    searchTerm: "dss",
    profile: "dss",
    company: "signature plastics",
    type: KeycapIdentifier.DSS,
  },
  {
    searchTerm: "dcs",
    profile: "dcs",
    company: "signature plastics",
    type: KeycapIdentifier.DCS,
  },
  {
    searchTerm: "mg",
    profile: "mg",
    company: "melgeek",
    type: KeycapIdentifier.MG,
  },
  {
    searchTerm: "mda",
    profile: "mda",
    company: "melgeek",
    type: KeycapIdentifier.MDA,
  },
  {
    searchTerm: "jtk",
    profile: "jtk",
    company: "jtkeycaps",
    type: KeycapIdentifier.JTK,
  },
  {
    searchTerm: "mt3",
    profile: "mt3",
    company: "drop",
    type: KeycapIdentifier.MT3,
  },
  {
    searchTerm: "infinikey",
    profile: "cherry",
    company: "infinikey",
    type: KeycapIdentifier.INFINIKEY,
  },
];
