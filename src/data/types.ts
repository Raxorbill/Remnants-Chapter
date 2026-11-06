export type StatusChipType = 'STILL TALKING' | 'STILL ANSWERING' | 'SILENT' | 'RETIRED';
export type TruthLabelType = 'FACT' | 'INFERRED' | 'IMAGINED';

export interface Hotspot {
  id: string;
  label: string;
  position: [number, number, number];
  job: string;
  learned: string;
}

export interface Step {
  name: 'Meet it' | 'How it works' | 'What we learned' | 'Where it is now';
  text: string;
  label: TruthLabelType;
  subtext?: string;
}

export interface Discovery {
  title: string;
  finding: string;
  keyNumber: string;
  numberLabel: string;
  label: TruthLabelType;
}

export interface PhotoAsset {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  sourceUrl: string;
}

export interface FactItem {
  claim: string;
  tag: 'V' | 'C';
  source: string;
  checkedOn: string;
  checkedBy?: string;
}

export interface ChapterData {
  id: string;
  chapter: number;
  title: string;
  machine: string;
  bannerIn: string;
  bannerOut: string;
  handOffLine: string;
  status: {
    chip: StatusChipType;
    note: string;
  };
  whereItIs: string;
  distanceKm: number;
  distanceLabel: string;
  modelType: 'retroreflector' | 'seismometer' | 'viking' | 'rover' | 'ingenuity' | 'voyager';
  modelCredit: string;
  hotspots: Hotspot[];
  steps: Step[];
  discovery: Discovery;
  photo: PhotoAsset;
  hardwarePhotos: PhotoAsset[];
  discoveryPhoto: PhotoAsset;
  facts: FactItem[];
  shortAnswer: string;
}

export interface ChatStarter {
  question: string;
  chapterId: string;
}

export interface SourceReference {
  name: string;
  category: 'NASA Mission Archive' | 'Orbiter Imagery' | 'Instrument Data' | 'Deep Space Network';
  description: string;
  url: string;
  tag: 'V' | 'C';
}
