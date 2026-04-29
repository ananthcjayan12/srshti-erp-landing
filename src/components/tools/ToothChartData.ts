export type NotationSystem = 'fdi' | 'universal';
export type DentitionType = 'adult' | 'paediatric';
export type ToothGroup = 'incisor' | 'canine' | 'premolar' | 'molar';

export interface ToothData {
  id: string;
  fdi: string;
  universal: string;
  palmer: string;
  name: string;
  type: string;
  group: ToothGroup;
  arch: 'upper' | 'lower';
  quadrant: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  position: number; 
  
  roots: number;
  rootDesc: string;
  cusps?: number;
  cuspDesc?: string;
  crownLengthMm?: number;
  rootLengthMm?: number;
  landmark?: string;
  
  procedures: string[];
  clinicalNote: string;
  mnemonic: string;
  
  eruptionOrder?: number;
  eruptionAge?: string;
  exfoliateAge?: string;
}

const getClinicalInfo = (arch: 'upper'|'lower', pos: number, id: string) => {
    let clinicalNote = '';
    let mnemonic = '';
    let landmark = undefined;
    let crownLengthMm = 0;
    let rootLengthMm = 0;
    let cusps = 0;
    let cuspDesc = '';
    
    if (pos === 1) { // Central Incisors
        clinicalNote = "The most visible teeth in the smile. Maxillary centrals are the widest anterior teeth — their width-to-length ratio guides aesthetic crown proportions. Mandibular centrals are the smallest teeth and the most commonly confused with each other in tooth identification.";
        if (arch === 'upper') {
            crownLengthMm = 10.5; rootLengthMm = 13.0;
            mnemonic = "11/21 dictate the smile. Width is usually 75-80% of length.";
            if (id === '11' || id === '21') {
                landmark = "Shovel-shaped incisors — more prominent in South and East Asian populations";
            }
        } else {
            crownLengthMm = 9.0; rootLengthMm = 12.5;
            mnemonic = "31 and 41 are dental twins — nearly impossible to tell apart. Look at the distal contact — it sits slightly higher on 31.";
        }
    } else if (pos === 2) { // Lateral Incisors
        clinicalNote = "Maxillary laterals show the most anatomical variation of any tooth — they may be peg-shaped, congenitally missing, or have a prominent cingulum. Check for a palatogingival groove on the lingual surface — it is a common path for periodontal infection.";
        if (arch === 'upper') {
            crownLengthMm = 9.0; rootLengthMm = 13.0;
            mnemonic = "12/22 is the wildcard — it changes shape more than any other tooth.";
        } else {
            crownLengthMm = 9.5; rootLengthMm = 14.0;
            mnemonic = "Lower laterals are slightly larger and less symmetrical than lower centrals. Crown twisted on root base.";
        }
    } else if (pos === 3) { // Canines
        clinicalNote = "Canines have the longest roots in the mouth and are the last teeth lost in a dentition. Their position at the arch corners makes them critical for canine guidance in occlusion — the basis of mutually protected occlusion.";
        mnemonic = "Canines = Cornerstones. Last to go, first to anchor the arch.";
        if (arch === 'upper') {
            crownLengthMm = 10.0; rootLengthMm = 17.0;
            landmark = "Longest root in the mouth — canines have the most stable anchorage";
            cusps = 1; cuspDesc = "1 cusp — single prominent pointed cusp";
        } else {
            crownLengthMm = 11.0; rootLengthMm = 16.0;
            cusps = 1; cuspDesc = "1 cusp — single prominent, offset mesially";
        }
    } else if (pos === 4) { // First Premolars
        clinicalNote = "The maxillary first premolar has two roots — the only premolar to do so routinely. Its buccal cusp is the dominant cusp. It is frequently extracted in orthodontic cases due to its central position and space contribution.";
        if (arch === 'upper') {
            crownLengthMm = 8.5; rootLengthMm = 14.0;
            mnemonic = "Upper 4s have 2 roots (buccal & palatal) — beware of the mesial root concavity during extractions.";
            cusps = 2; cuspDesc = "2 cusps — buccal and smaller palatal";
        } else {
            crownLengthMm = 8.5; rootLengthMm = 14.0;
            mnemonic = "Lower 4 functions like a small canine — non-functional lingual cusp.";
            cusps = 2; cuspDesc = "2 cusps — dominant buccal, afunctional small lingual";
        }
    } else if (pos === 5) { // Second Premolars
        clinicalNote = "Mandibular second premolars show the most variation — they can have two or three cusps. The three-cusp form has a Y-shaped groove; the two-cusp form has an H or U groove. Identify the groove pattern to distinguish them from first premolars.";
        if (arch === 'upper') {
            crownLengthMm = 8.5; rootLengthMm = 14.0;
            mnemonic = "Upper 5 has cusps of nearly equal height and a single root.";
            cusps = 2; cuspDesc = "2 cusps — buccal and palatal (nearly equal)";
        } else {
            crownLengthMm = 8.0; rootLengthMm = 14.5;
            mnemonic = "Look for the Y, H, or U occlusal groove pattern on 35/45.";
            cusps = 3; cuspDesc = "2 or 3 cusps — buccal, mesiolingual, distolingual (if 3)";
        }
    } else if (pos === 6) { // First Molars
        clinicalNote = "The first molar is the first permanent tooth to erupt (around age 6) and the most commonly decayed tooth in children. Maxillary first molars have three roots and may have the Cusp of Carabelli. Mandibular first molars have five cusps and two roots — the largest teeth in the mandible.";
        if (arch === 'upper') {
            crownLengthMm = 7.5; rootLengthMm = 12.0;
            mnemonic = "16/26 is always the richest tooth — it has 4 cusps, 3 roots, and sometimes a bonus 5th cusp (Carabelli).";
            cusps = 5; cuspDesc = "4 main cusps + 1 accessory (Cusp of Carabelli)";
            if (id === '16' || id === '26') {
               landmark = id === '16' ? "Cusp of Carabelli — a fifth accessory cusp on the mesiolingual surface" : "Oblique ridge — connects distobuccal and mesiolingual cusps";
            }
        } else {
            crownLengthMm = 7.5; rootLengthMm = 14.0;
            mnemonic = "36/46 have 5 cusps in a Y — think of a five-pointed star sitting in the lower jaw.";
            cusps = 5; cuspDesc = "5 cusps — 3 buccal, 2 lingual";
            if (id === '36' || id === '46') {
               landmark = "Y-shaped groove pattern — distinguishes mandibular first molar from second";
            }
        }
    } else if (pos === 7) { // Second Molars
        clinicalNote = "Second molars erupt around age 12. The maxillary second molar has a heart-shaped or rhomboidal crown. The mandibular second molar has a more rectangular crown with a cross-shaped or Y-shaped groove. Smaller and more tapered than first molars.";
        if (arch === 'upper') {
            crownLengthMm = 7.0; rootLengthMm = 11.5;
            mnemonic = "Upper 7 roots are closer together than Upper 6, often fused.";
            cusps = 4; cuspDesc = "4 cusps — mesiobuccal, distobuccal, mesiolingual, distolingual";
            landmark = "Heart-shaped crown outline — distinguishes upper second molar from first";
        } else {
            crownLengthMm = 7.0; rootLengthMm = 13.0;
            mnemonic = "Lower 7 has a classic + (cross) occlusal groove pattern.";
            cusps = 4; cuspDesc = "4 cusps — 2 buccal, 2 lingual (symmetrical)";
        }
    } else if (pos === 8) { // Third Molars
        clinicalNote = "Third molars show the greatest anatomical variation of any tooth — they can have any number of cusps and fused roots. They are the most commonly impacted teeth. Impaction classification (mesioangular, distoangular, horizontal, vertical) is a common exam topic.";
        mnemonic = "Wisdom teeth = unpredictable. Roots are usually fused, crown is often miniature or distorted.";
        if (arch === 'upper') {
            crownLengthMm = 6.5; rootLengthMm = 11.0;
            cusps = 3; cuspDesc = "3-4 cusps (highly variable)";
        } else {
            crownLengthMm = 7.0; rootLengthMm = 11.0;
            cusps = 4; cuspDesc = "4-5 cusps (highly variable)";
        }
    }
    
    return { clinicalNote, mnemonic, landmark, crownLengthMm, rootLengthMm, cusps, cuspDesc };
}

function generateToothData(fdi: string, uni: string, pos: number, quad: 1|2|3|4, arch: 'upper'|'lower'): ToothData {
  const isUpper = arch === 'upper';
  const types = {
    1: { name: 'Central Incisor', roots: 1, rootDesc: '1 single straight root', group: 'incisor' as ToothGroup },
    2: { name: 'Lateral Incisor', roots: 1, rootDesc: '1 single root, often distally curved', group: 'incisor' as ToothGroup },
    3: { name: 'Canine', roots: 1, rootDesc: '1 stout, longest root', group: 'canine' as ToothGroup },
    4: { name: 'First Premolar', roots: isUpper ? 2 : 1, rootDesc: isUpper ? '2 roots (buccal, palatal)' : '1 single root', group: 'premolar' as ToothGroup },
    5: { name: 'Second Premolar', roots: 1, rootDesc: '1 single root', group: 'premolar' as ToothGroup },
    6: { name: 'First Molar', roots: isUpper ? 3 : 2, rootDesc: isUpper ? '3 roots (2 buccal, 1 palatal)' : '2 roots (mesial, distal)', group: 'molar' as ToothGroup },
    7: { name: 'Second Molar', roots: isUpper ? 3 : 2, rootDesc: isUpper ? '3 roots (often closer/fused)' : '2 roots (mesial, distal)', group: 'molar' as ToothGroup },
    8: { name: 'Third Molar', roots: isUpper ? 3 : 2, rootDesc: 'Variable, often fused', group: 'molar' as ToothGroup },
  };
  
  const archName = isUpper ? 'Maxillary' : 'Mandibular';
  const sideName = (quad === 1 || quad === 4) ? 'Right' : 'Left';
  const t = types[pos as keyof typeof types];
  
  const info = getClinicalInfo(arch, pos, fdi);

  const eruptionOrderList: Record<string, {order: number, age: string}> = {
      '31': {order: 1, age: '6-7 yrs'}, '41': {order: 2, age: '6-7 yrs'},
      '36': {order: 3, age: '6-7 yrs'}, '46': {order: 4, age: '6-7 yrs'},
      '16': {order: 5, age: '6-7 yrs'}, '26': {order: 6, age: '6-7 yrs'},
      '11': {order: 7, age: '7-8 yrs'}, '21': {order: 8, age: '7-8 yrs'},
      '32': {order: 9, age: '7-8 yrs'}, '42': {order: 10, age: '7-8 yrs'},
      '12': {order: 11, age: '8-9 yrs'}, '22': {order: 12, age: '8-9 yrs'},
      '33': {order: 13, age: '9-10 yrs'}, '43': {order: 14, age: '9-10 yrs'},
      '14': {order: 15, age: '10-11 yrs'}, '24': {order: 16, age: '10-11 yrs'},
      '34': {order: 17, age: '10-12 yrs'}, '44': {order: 18, age: '10-12 yrs'},
      '15': {order: 19, age: '10-12 yrs'}, '25': {order: 20, age: '10-12 yrs'},
      '35': {order: 21, age: '11-12 yrs'}, '45': {order: 22, age: '11-12 yrs'},
      '13': {order: 23, age: '11-12 yrs'}, '23': {order: 24, age: '11-12 yrs'},
      '37': {order: 25, age: '11-13 yrs'}, '47': {order: 26, age: '11-13 yrs'},
      '17': {order: 27, age: '12-13 yrs'}, '27': {order: 28, age: '12-13 yrs'},
      '38': {order: 29, age: '17-21 yrs'}, '48': {order: 30, age: '17-21 yrs'},
      '18': {order: 31, age: '17-21 yrs'}, '28': {order: 32, age: '17-21 yrs'},
  };

  return {
    id: fdi,
    fdi,
    universal: uni,
    palmer: `${['┘','└','┌','┐'][quad-1]} ${pos}`,
    name: `${archName} ${sideName} ${t.name}`,
    type: t.name,
    group: t.group,
    roots: t.roots,
    rootDesc: t.rootDesc,
    procedures: ['Composite Filling', 'Root Canal', 'Extraction', 'Crown'],
    arch,
    quadrant: quad,
    position: pos,
    ...info,
    eruptionOrder: eruptionOrderList[fdi]?.order,
    eruptionAge: eruptionOrderList[fdi]?.age,
  };
}

export const adultTeeth: ToothData[] = [];
for (let i = 8; i >= 1; i--) adultTeeth.push(generateToothData(`1${i}`, `${9 - i}`, i, 1, 'upper'));
for (let i = 1; i <= 8; i++) adultTeeth.push(generateToothData(`2${i}`, `${8 + i}`, i, 2, 'upper'));
for (let i = 1; i <= 8; i++) adultTeeth.push(generateToothData(`3${i}`, `${24 - i + 1}`, i, 3, 'lower'));
for (let i = 8; i >= 1; i--) adultTeeth.push(generateToothData(`4${i}`, `${24 + i}`, i, 4, 'lower'));


function generatePaedoToothData(fdi: string, uni: string, pos: number, quad: 5|6|7|8, arch: 'upper'|'lower'): ToothData {
  const isUpper = arch === 'upper';
  const types = {
    1: { name: 'Primary Central Incisor', roots: 1, rootDesc: '1 single root', group: 'incisor' as ToothGroup },
    2: { name: 'Primary Lateral Incisor', roots: 1, rootDesc: '1 single root', group: 'incisor' as ToothGroup },
    3: { name: 'Primary Canine', roots: 1, rootDesc: '1 single root', group: 'canine' as ToothGroup },
    4: { name: 'Primary First Molar', roots: isUpper ? 3 : 2, rootDesc: isUpper ? '3 flared roots' : '2 flared roots', group: 'molar' as ToothGroup },
    5: { name: 'Primary Second Molar', roots: isUpper ? 3 : 2, rootDesc: isUpper ? '3 flared roots' : '2 flared roots', group: 'molar' as ToothGroup },
  };
  const archName = isUpper ? 'Maxillary' : 'Mandibular';
  const sideName = (quad === 5 || quad === 8) ? 'Right' : 'Left';
  const t = types[pos as keyof typeof types];
  
  return {
    id: fdi,
    fdi,
    universal: uni,
    palmer: `${['┘','└','┌','┐'][quad-5]} ${['A','B','C','D','E'][pos-1]}`,
    name: `${archName} ${sideName} ${t.name}`,
    type: t.name,
    group: t.group,
    roots: t.roots,
    rootDesc: t.rootDesc,
    procedures: ['Pulpotomy', 'Stainless Steel Crown', 'Extraction'],
    arch,
    quadrant: quad,
    position: pos,
    clinicalNote: `Primary teeth maintain space for permanent successors. Eruption begins around 6 months with lower central incisors.`,
    mnemonic: `Primary roots are highly flared to allow room for the developing permanent tooth bud underneath.`,
    eruptionAge: `${pos * 6} - ${pos * 6 + 4} months`,
    exfoliateAge: `${pos + 5} - ${pos + 6} years`, 
  };
}

export const paedoTeeth: ToothData[] = [];
const uniUpper = ['E','D','C','B','A', 'F','G','H','I','J'];
const uniLower = ['T','S','R','Q','P', 'K','L','M','N','O'];
for (let i = 5; i >= 1; i--) paedoTeeth.push(generatePaedoToothData(`5${i}`, uniUpper[5 - i], i, 5, 'upper'));
for (let i = 1; i <= 5; i++) paedoTeeth.push(generatePaedoToothData(`6${i}`, uniUpper[4 + i], i, 6, 'upper'));
for (let i = 1; i <= 5; i++) paedoTeeth.push(generatePaedoToothData(`7${i}`, uniLower[10 - i], i, 7, 'lower'));
for (let i = 5; i >= 1; i--) paedoTeeth.push(generatePaedoToothData(`8${i}`, uniLower[i - 1], i, 8, 'lower'));

// Charting Simulator Scenarios
export const simulatorScenarios = [
  {
    id: 's1',
    name: 'Scenario 1 — Routine Adult Recall',
    dentition: 'adult',
    description: 'Patient has existing amalgam fillings on 36 (MO), 46 (DO), and 16 (MOD). New caries on 17 (O) and 37 (O). Chart the existing restorations in blue and new caries in red.',
    correctMarkings: {
      '36': { surfaces: ['M', 'O'], condition: 'restoration' },
      '46': { surfaces: ['D', 'O'], condition: 'restoration' },
      '16': { surfaces: ['M', 'O', 'D'], condition: 'restoration' },
      '17': { surfaces: ['O'], condition: 'caries' },
      '37': { surfaces: ['O'], condition: 'caries' },
    }
  },
  {
    id: 's2',
    name: 'Scenario 2 — Orthodontic Extraction Case',
    dentition: 'adult',
    description: 'Patient has completed RCT on 16. Missing teeth 14 and 24 (extracted for orthodontics). Crown on 11. Chart these correctly.',
    correctMarkings: {
      '16': { surfaces: [], condition: 'rct' },
      '14': { surfaces: [], condition: 'missing' },
      '24': { surfaces: [], condition: 'missing' },
      '11': { surfaces: [], condition: 'crown' },
    }
  },
  {
    id: 's3',
    name: 'Scenario 3 — Paediatric Patient',
    dentition: 'paediatric',
    description: 'Switch to primary (deciduous) dentition view. Patient has caries on tooth 54 (O) and 64 (MO). Tooth 75 is missing. Sealant on 55.',
    correctMarkings: {
      '54': { surfaces: ['O'], condition: 'caries' },
      '64': { surfaces: ['M', 'O'], condition: 'caries' },
      '75': { surfaces: [], condition: 'missing' },
      '55': { surfaces: ['O'], condition: 'sealant' },
    }
  },
  {
    id: 's4',
    name: 'Scenario 4 — Geriatric Patient',
    dentition: 'adult',
    description: 'Multiple missing teeth (18, 17, 27, 28, 38, 48 all missing). RCT and crown on 11. Implant on 36. Caries on 46 (MO) and 45 (DO).',
    correctMarkings: {
      '18': { surfaces: [], condition: 'missing' },
      '17': { surfaces: [], condition: 'missing' },
      '27': { surfaces: [], condition: 'missing' },
      '28': { surfaces: [], condition: 'missing' },
      '38': { surfaces: [], condition: 'missing' },
      '48': { surfaces: [], condition: 'missing' },
      '11': { surfaces: [], condition: 'rct-crown' }, // Combined or separate
      '36': { surfaces: [], condition: 'implant' },
      '46': { surfaces: ['M', 'O'], condition: 'caries' },
      '45': { surfaces: ['D', 'O'], condition: 'caries' },
    }
  },
  {
    id: 's5',
    name: 'Scenario 5 — Blank Chart',
    dentition: 'adult',
    description: 'Empty chart for free practice.',
    correctMarkings: {}
  }
];
