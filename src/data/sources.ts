import { SourceReference } from './types';

export const sourcesList: SourceReference[] = [
  {
    name: 'NASA Lunar Reconnaissance Orbiter Camera (LROC)',
    category: 'Orbiter Imagery',
    description: 'High-resolution lunar surface imagery capturing the Apollo 11, 14, 15, and 17 landing sites, retroreflectors, and ALSEP scientific stations.',
    url: 'https://www.lroc.asu.edu/featured_sites',
    tag: 'V'
  },
  {
    name: 'NASA Mars Reconnaissance Orbiter (HiRISE)',
    category: 'Orbiter Imagery',
    description: 'Sub-meter orbital imagery of Mars locating Viking 1, Viking 2 backshell/heat shield, Spirit at Home Plate, and Opportunity at Endeavour Crater.',
    url: 'https://uahirise.org/ESP_050177_1780',
    tag: 'V'
  },
  {
    name: 'Apollo Lunar Surface Experiments Package (ALSEP) - PDS Geosciences',
    category: 'Instrument Data',
    description: 'Archival magnetic tapes from Apollo 12, 14, 15, and 16 seismic networks recovered and published in the NASA Planetary Data System.',
    url: 'https://pds-geosciences.wustl.edu/missions/apollo/index.htm',
    tag: 'V'
  },
  {
    name: 'NASA JPL Horizons Ephemeris System',
    category: 'Deep Space Network',
    description: 'High-precision solar system dynamics and ephemeris tables tracking Voyager 1 trajectory, heliocentric velocity, and one light-day threshold.',
    url: 'https://ssd.jpl.nasa.gov/horizons/',
    tag: 'V'
  },
  {
    name: 'NASA Jet Propulsion Laboratory (JPL) Mission Archives',
    category: 'NASA Mission Archive',
    description: 'Official mission records, engineering documentation, and telemetry logs for Viking 1 & 2, Mars Exploration Rovers (Spirit & Opportunity), and Ingenuity.',
    url: 'https://www.jpl.nasa.gov/missions',
    tag: 'V'
  },
  {
    name: 'NASA Lunar Laser Ranging Experiment (LLRE)',
    category: 'Instrument Data',
    description: 'McDonald Observatory and Côte d’Azur Observatory photon time-of-flight measurements confirming lunar orbital recession of 3.8 cm/year.',
    url: 'https://science.nasa.gov/moon/apollo-laser-reflectors/',
    tag: 'V'
  },
  {
    name: 'NASA Catalogue of Manmade Material on the Moon',
    category: 'NASA Mission Archive',
    description: 'NASA inventory of historical hardware, descent stages, and scientific instruments resting on the lunar surface (796 items cataloged).',
    url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/moon_act.html',
    tag: 'V'
  }
];
