export type PresetType = 
  | 'full-diagnostic' 
  | 'anti-clog-daily' 
  | 'nozzle-check-stairs' 
  | 'heavy-purge' 
  | 'black-pigment-text'
  | 'single-color-target'
  | 'photo-grayscale'
  | 'eco-quad-card'
  | 'custom';

export type ColorMode = 'cmyk' | 'cmyk-photo'; // 4-color vs 6-color (CMYK + LC + LM)

export type ColorProfile = 'pure-driver' | 'iso-press';

export type PaperSize = 'a4' | 'letter' | 'a5';

export type MarginType = '0' | '5' | '10';

export interface ModuleConfig {
  showSolidBlocks: boolean;
  showGradients: boolean;
  showNozzleCheck: boolean;
  showMicroText: boolean;
  showAlignmentTargets: boolean;
  showMixRgb: boolean;
  showMaintenanceLog: boolean;
  showRegistrationMarks: boolean;
  showResolutionRuler: boolean;
}

export type StripDensity = 'eco' | 'standard' | 'heavy';
export type StripLayout = 'single-full' | 'triple-strips';

export type SingleTargetColor = 'C' | 'M' | 'Y' | 'K' | 'LC' | 'LM';

export interface TestSheetConfig {
  preset: PresetType;
  colorMode: ColorMode;
  colorProfile: ColorProfile;
  paperSize: PaperSize;
  marginMm: MarginType;
  printerModel: string;
  testDate: string;
  notes: string;
  modules: ModuleConfig;
  stripDensity: StripDensity;
  stripLayout: StripLayout;
  targetColor: SingleTargetColor; // for single-color-target mode
}

export interface ColorDefinition {
  name: string;
  code: string;
  rgb: string;
  hex: string;
  cmykLabel: string;
  description: string;
}

