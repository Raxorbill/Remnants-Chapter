import { ChapterData } from './types';

export const chaptersData: ChapterData[] = [
  {
    id: 'ch1-retroreflector',
    chapter: 1,
    title: 'Apollo Laser Mirrors',
    machine: 'Apollo Lunar Ranging Retroreflectors',
    bannerIn: 'How far away is the Moon, exactly?',
    bannerOut: 'What is the Moon like on the inside?',
    handOffLine: "The Moon's distance: measured. But what is inside it?",
    status: {
      chip: 'STILL ANSWERING',
      note: 'Passive corner-cube quartz array. Replies to Earth laser pulses today without battery or computer.'
    },
    whereItIs: 'Moon: Apollo 11 (Sea of Tranquility), 14 (Fra Mauro), and 15 (Hadley Rille)',
    distanceKm: 384400,
    distanceLabel: 'Moon ~384,400 km',
    modelType: 'retroreflector',
    modelCredit: 'Interactive 3D reconstruction of the Apollo 11 Lunar Ranging Retroreflector (LRRR)',
    hotspots: [
      {
        id: 'corner-mirrors',
        label: 'Corner-Cube Prisms',
        position: [0, 0.45, 0.1],
        job: 'Each tiny quartz mirror is shaped like the inside corner of a cube. Any light ray that strikes it bounces directly back where it came from.',
        learned: 'Light returns directly to Earth even if the Moon tilts slightly or the panel is not aimed with perfection.'
      },
      {
        id: 'aluminum-panel',
        label: 'Teflon-Shielded Pallet',
        position: [0, 0.05, 0.25],
        job: 'A precision-machined aluminum pallet holding 100 fused-silica retroreflector prisms in cylindrical cavities.',
        learned: 'Thermal rings protect the silica prisms from the intense +120°C lunar day and -170°C lunar night.'
      },
      {
        id: 'gnomon-mast',
        label: 'Sun Alignment Gnomon',
        position: [-0.35, 0.2, 0.15],
        job: 'A shadow-casting mast and bubble level used by astronauts Neil Armstrong and Buzz Aldrin to orient the array toward Earth.',
        learned: 'A simple mechanical shadow guide allowed astronauts to aim the panel toward Earth in minutes without electricity.'
      },
      {
        id: 'no-electronics',
        label: 'Pure Optical Physics',
        position: [0.35, -0.2, 0.15],
        job: 'Contains zero wires, zero batteries, zero solar cells, and zero chips.',
        learned: 'A machine with no moving parts or electronics never wears out. It has worked continuously for over 50 years.'
      }
    ],
    steps: [
      {
        name: 'Meet it',
        text: 'Apollo astronauts left panels of tiny mirrors on the Moon. No batteries. No wires. No computer. Just one job: send light straight back.',
        label: 'FACT',
        subtext: 'First placed by Apollo 11 in July 1969, followed by Apollo 14 and 15.'
      },
      {
        name: 'How it works',
        text: 'A telescope observatory on Earth fires a short laser pulse at the panel. The corner-cube mirrors send the light right back along the exact same path. An atomic clock times the round trip.',
        label: 'FACT',
        subtext: 'Out of 100 quadrillion photons sent, only a tiny handful return.'
      },
      {
        name: 'What we learned',
        text: 'The round trip takes about 2.56 seconds. Timing this with atomic clocks revealed our exact lunar distance to millimeter precision, and proved the Moon is slowly spiraling outward.',
        label: 'FACT',
        subtext: 'Verified by McDonald Observatory and Observatoire de la Côte d’Azur.'
      },
      {
        name: 'Where it is now',
        text: 'These mirrors still answer lasers today from Earth observatories. While the panel is too small to see directly from lunar orbit, the Apollo 11 and 15 landing sites remain clearly mapped.',
        label: 'FACT',
        subtext: 'Documented by NASA Lunar Reconnaissance Orbiter Camera (LROC).'
      }
    ],
    discovery: {
      title: 'The Moon is Drifting Away',
      finding: 'Over 50 years of laser ranging revealed that tidal friction between Earth oceans and the seabed transfers orbital momentum, pushing the Moon outward.',
      keyNumber: '3.8 cm / year',
      numberLabel: 'Rate of Moon recession',
      label: 'FACT'
    },
    photo: {
      src: 'https://images-assets.nasa.gov/image/6900957/6900957~medium.jpg',
      alt: 'Buzz Aldrin with the Apollo 11 Lunar Ranging Retroreflector on the Moon',
      caption: 'Apollo 11 Lunar Ranging Retroreflector (LRRR) deployed at Tranquility Base in July 1969.',
      credit: 'NASA (6900957 / AS11-40-5952)',
      sourceUrl: 'https://images.nasa.gov/details/6900957'
    },
    hardwarePhotos: [
      {
        src: 'https://images-assets.nasa.gov/image/6900957/6900957~medium.jpg',
        alt: 'Buzz Aldrin with the Apollo 11 Lunar Ranging Retroreflector on the Moon',
        caption: 'Buzz Aldrin carrying the passive laser retroreflector array and solar wind experiment across Tranquility Base.',
        credit: 'NASA (6900957 / AS11-40-5952)',
        sourceUrl: 'https://images.nasa.gov/details/6900957'
      },
      {
        src: 'https://images-assets.nasa.gov/image/6900959/6900959~medium.jpg',
        alt: 'Apollo 11 Retroreflector prism array resting on lunar soil',
        caption: 'The 100 fused-silica corner-cube prisms sitting on the lunar surface, aimed back toward Earth.',
        credit: 'NASA (6900959 / AS11-40-5953)',
        sourceUrl: 'https://images.nasa.gov/details/6900959'
      }
    ],
    discoveryPhoto: {
      src: 'https://images-assets.nasa.gov/image/NGLR Payload EDIT/NGLR Payload EDIT~medium.jpg',
      alt: 'Next-Generation Lunar Retroreflector and Observatory Laser Ranging',
      caption: 'Earth observatories fire laser pulses at lunar corner-cube retroreflectors to track distance down to millimeters.',
      credit: 'NASA / Goddard Space Flight Center',
      sourceUrl: 'https://images.nasa.gov/details/NGLR%20Payload%20EDIT'
    },
    facts: [
      {
        claim: 'Panels placed on the Moon by Apollo 11, 14, and 15 (and Lunokhod 1 & 2)',
        tag: 'V',
        source: 'NASA Lunar Reconnaissance Orbiter (LROC) Science Team',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      },
      {
        claim: 'Round-trip laser travel time is 2.56 seconds at average distance 384,400 km',
        tag: 'V',
        source: 'NASA Lunar Ranging Experiment (LRE) Fact Sheet',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      },
      {
        claim: 'Moon drifts away from Earth at 3.8 cm per year due to tidal friction',
        tag: 'V',
        source: 'Dickey et al., Science / NASA JPL Lunar Laser Ranging',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      }
    ],
    shortAnswer: 'Apollo laser retroreflectors are passive glass prisms left on the Moon. Scientists fire laser pulses from Earth and time the 2.56-second round trip with atomic clocks. This discovered that the Moon is spiraling 3.8 cm further away each year.'
  },
  {
    id: 'ch2-seismometer',
    chapter: 2,
    title: 'Apollo Seismometers',
    machine: 'ALSEP Passive Seismic Experiment (PSE)',
    bannerIn: 'What is the Moon like on the inside?',
    bannerOut: 'Is there life on Mars?',
    handOffLine: 'The Moon turned out to be quiet, layered rock. What about the world next door?',
    status: {
      chip: 'RETIRED',
      note: 'Shut down by NASA command in October 1977 due to budget and power constraints.'
    },
    whereItIs: 'Moon: Ocean of Storms (12), Fra Mauro (14), Hadley (15), Descartes (16), Taurus-Littrow (17)',
    distanceKm: 384400,
    distanceLabel: 'Moon ~384,400 km',
    modelType: 'seismometer',
    modelCredit: 'Interactive 3D reconstruction of the Apollo Lunar Surface Experiments Package (ALSEP) Station',
    hotspots: [
      {
        id: 'seismometer-sensor',
        label: 'Passive Seismometer Drum',
        position: [0.35, 0.1, 0.2],
        job: 'Three orthogonal long-period sensors and one short-period sensor capable of detecting ground vibrations smaller than an atomic nucleus.',
        learned: 'It discovered thousands of natural moonquakes, meteoroid impacts, and thermal tremors caused by sunrise on cold lunar rock.'
      },
      {
        id: 'central-station',
        label: 'Central Station Transmitter',
        position: [-0.05, 0.15, -0.05],
        job: 'The central electronics console containing a command receiver, telemetry processor, and S-band transmitter.',
        learned: 'Transmitted continuous seismic and scientific data directly to Earth round-the-clock for 8 years with zero human presence.'
      },
      {
        id: 'snap-27-rtg',
        label: 'SNAP-27 Nuclear Power Unit',
        position: [-0.45, 0.1, 0.1],
        job: 'A radioisotope thermoelectric generator using plutonium-238 decay heat to produce 70 watts of electricity.',
        learned: 'Surpassed solar panels by operating reliably through the freezing 14-day lunar nights (-170°C) without freezing.'
      },
      {
        id: 'helical-antenna',
        label: 'Helical Antenna Mast',
        position: [0, 0.55, -0.1],
        job: 'A high-gain helical antenna pointed continuously at Earth to beam seismic waveform packets.',
        learned: 'Demonstrated that an automated lunar listening post could broadcast telemetry over 380,000 kilometers with only a 70-watt power supply.'
      }
    ],
    steps: [
      {
        name: 'Meet it',
        text: 'After the astronauts flew home, the science stations they left behind kept working. They sent data to Earth for years, with nobody there to watch.',
        label: 'FACT',
        subtext: 'Apollo 12, 14, 15, and 16 created an interconnected seismic sensor network across the lunar surface.'
      },
      {
        name: 'How it works',
        text: 'A seismometer feels tiny vibrations traveling through the Moon. The central station digitizes the tremors into radio pulses, and the helical antenna beams them directly home.',
        label: 'FACT',
        subtext: 'Sensitive enough to detect footsteps of astronauts walking hundreds of meters away.'
      },
      {
        name: 'What we learned',
        text: 'The Moon has quakes of its own! Studying how shockwaves bent and echoed proved that the Moon is not a dead lump of cold rock, but a layered world with a crust, mantle, and small iron core.',
        label: 'INFERRED',
        subtext: 'Seismic wave velocity reflections confirmed distinct boundary layers.'
      },
      {
        name: 'Where it is now',
        text: 'NASA commanded the stations to shut down on September 30, 1977. The hardware remains undisturbed on the Moon, and recently recovered archival magnetic tapes are yielding new discoveries today.',
        label: 'FACT',
        subtext: 'Lunar Reconnaissance Orbiter (LROC) can clearly photograph the Apollo 17 central station and astronaut pathways.'
      }
    ],
    discovery: {
      title: 'A Layered Moon with Moonquakes',
      finding: 'Deep moonquakes occur down to 1,000 km depth, triggered by Earth gravitational tidal stresses. Sound waves showed a 300 km metallic core surrounded by a semi-molten mantle.',
      keyNumber: '12,000+ moonquakes',
      numberLabel: 'Events recorded 1969–1977',
      label: 'INFERRED'
    },
    photo: {
      src: 'https://images-assets.nasa.gov/image/as12-47-6919/as12-47-6919~medium.jpg',
      alt: 'Apollo 12 Astronaut Alan Bean deploys ALSEP on the Ocean of Storms',
      caption: 'Alan Bean deploying the ALSEP Central Station and Passive Seismic Experiment on the Ocean of Storms in November 1969.',
      credit: 'NASA / Charles Conrad (AS12-47-6919)',
      sourceUrl: 'https://images.nasa.gov/details/as12-47-6919'
    },
    hardwarePhotos: [
      {
        src: 'https://images-assets.nasa.gov/image/as12-47-6919/as12-47-6919~medium.jpg',
        alt: 'Alan Bean deploys ALSEP Station on the Moon',
        caption: 'Astronaut Alan Bean carrying the ALSEP Central Station and Passive Seismic drum on the Moon.',
        credit: 'NASA / Charles Conrad (AS12-47-6919)',
        sourceUrl: 'https://images.nasa.gov/details/as12-47-6919'
      },
      {
        src: 'https://images-assets.nasa.gov/image/as12-47-6918/as12-47-6918~medium.jpg',
        alt: 'Deployed ALSEP station and passive seismometer unit on Ocean of Storms',
        caption: 'The deployed ALSEP seismic station on the lunar regolith, powered by the SNAP-27 nuclear generator.',
        credit: 'NASA (AS12-47-6918)',
        sourceUrl: 'https://images.nasa.gov/details/as12-47-6918'
      }
    ],
    discoveryPhoto: {
      src: 'https://images-assets.nasa.gov/image/S69-59547/S69-59547~medium.jpg',
      alt: 'Seismometer chart record of Apollo 12 lunar module ascent stage impact',
      caption: 'Official NASA seismic telemetry: lunar module impact reverberated for over an hour, revealing a layered lunar interior.',
      credit: 'NASA / Johnson Space Center (S69-59547)',
      sourceUrl: 'https://images.nasa.gov/details/S69-59547'
    },
    facts: [
      {
        claim: 'Four stations operated in network until powered down on September 30, 1977',
        tag: 'V',
        source: 'NASA Planetary Data System (PDS) Geosciences Node ALSEP Archive',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      },
      {
        claim: 'Moon has a distinct crust (~34-43 km), silicate mantle, and small core (~330 km radius)',
        tag: 'V',
        source: 'Weber et al., Science 2011 / Apollo Lunar Seismic Re-analysis',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      },
      {
        claim: 'LROC orbital photography reveals the ALSEP station and trodden lunar trails from Apollo 17',
        tag: 'V',
        source: 'NASA Goddard Space Flight Center / LROC Featured Site Release',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      }
    ],
    shortAnswer: 'Apollo seismometers listened to vibrations on the Moon for eight years. They discovered moonquakes and proved the Moon has an interior structure like Earth with a crust, mantle, and metallic core.'
  },
  {
    id: 'ch3-viking',
    chapter: 3,
    title: 'Viking Landers',
    machine: 'Viking 1 and 2 Martian Landers',
    bannerIn: 'Is there life on Mars?',
    bannerOut: 'Was Mars once wet?',
    handOffLine: 'The Viking labs left a puzzle. To solve it, scientists needed a better clue: water.',
    status: {
      chip: 'SILENT',
      note: 'Viking 1 last contact November 13, 1982; Viking 2 last contact April 11, 1980.'
    },
    whereItIs: 'Mars: Chryse Planitia (Viking 1) and Utopia Planitia (Viking 2)',
    distanceKm: 225000000,
    distanceLabel: 'Mars ~55M–400M km',
    modelType: 'viking',
    modelCredit: 'Interactive 3D reconstruction of the Viking Lander based on NASA JPL archives',
    hotspots: [
      {
        id: 'sampler-arm',
        label: 'Robotic Sampler Arm',
        position: [0.4, -0.05, 0.35],
        job: 'A 3-meter retractable boom and backhoe scoop that dug trenches in Martian soil and delivered samples to onboard test funnels.',
        learned: 'Proved for the first time that an automated robotic scoop could excavate alien planetary soil and sieved dust into sealed test chambers.'
      },
      {
        id: 'mini-labs',
        label: 'Automated Biology & GCMS Labs',
        position: [0.05, 0.2, 0.05],
        job: 'Three biological metabolism experiments (Labeled Release, Pyrolytic Release, Gas Exchange) plus a Gas Chromatograph-Mass Spectrometer (GCMS).',
        learned: 'The soil reacted actively with nutrients, but the GCMS found no organic building blocks down to parts-per-billion.'
      },
      {
        id: 'facsimile-cameras',
        label: 'Stereo Facsimile Cameras',
        position: [-0.25, 0.45, 0.15],
        job: 'Twin mechanical scanning cameras that captured the first panoramic color views of the Martian desert landscape.',
        learned: 'Showed a rust-colored desert of volcanic rocks, dunes, and pink iron-rich skies, helping guide where the arm should dig.'
      },
      {
        id: 'high-gain-dish',
        label: 'High-Gain Dish Antenna',
        position: [0.15, 0.45, -0.2],
        job: 'Steerable S-band dish antenna communicating directly with Earth and relaying data through Viking orbiters.',
        learned: 'Established that combining surface landers with orbital relay satellites dramatically boosts science data return.'
      }
    ],
    steps: [
      {
        name: 'Meet it',
        text: 'In 1976, two Viking landers touched down on Mars. Each carried a robot arm and three miniature automated biology labs. Their goal was monumental: search for signs of alien life.',
        label: 'FACT',
        subtext: 'Viking 1 landed July 20, 1976 on Chryse Planitia; Viking 2 landed September 3, 1976 on Utopia Planitia.'
      },
      {
        name: 'How it works',
        text: 'A robotic arm scooped Martian dirt into tiny sample funnels. Sealed ovens heated the dirt, nutrient soups were added, and gas detectors checked if anything breathed or metabolized.',
        label: 'FACT',
        subtext: 'The biology payload weighed just 15 kg and held tens of thousands of tiny miniature valves.'
      },
      {
        name: 'What we learned',
        text: 'The labs gave puzzling results. The soil released gas like living matter, but the chemical analyzer found no organic molecules at all. Scientists concluded reactive perchlorates fooled the tests. The answer was an open puzzle: Follow the water.',
        label: 'INFERRED',
        subtext: 'Scientists realized that before searching blindly for microbes, they must first find where liquid water once flowed.'
      },
      {
        name: 'Where it is now',
        text: 'Viking 1 sent its final transmission in November 1982. Today, NASA Mars Reconnaissance Orbiter (HiRISE) has re-photographed the lander, its discarded backshell, and nearby rocks like "Big Joe" exactly where they were left.',
        label: 'FACT',
        subtext: 'HiRISE image ESP_013770_2025 captured Viking 1 resting in Chryse Planitia.'
      }
    ],
    discovery: {
      title: 'A Chemical Riddle That Rewrote Mars Science',
      finding: 'The experiments detected rapid oxygen release when moist, but lack of carbon organics suggested reactive inorganic peroxides. This sparked the 21st-century NASA strategy: "Follow the Water".',
      keyNumber: '0 organics',
      numberLabel: 'Carbon compounds detected at test sites',
      label: 'INFERRED'
    },
    photo: {
      src: 'https://images-assets.nasa.gov/image/PIA09703/PIA09703~medium.jpg',
      alt: 'Viking Lander engineering model showing robotic arm and camera masts',
      caption: 'Viking Lander hardware showing the 3-meter retractable soil sampler arm and meteorology mast.',
      credit: 'NASA / JPL (PIA09703)',
      sourceUrl: 'https://images.nasa.gov/details/PIA09703'
    },
    hardwarePhotos: [
      {
        src: 'https://images-assets.nasa.gov/image/PIA09703/PIA09703~medium.jpg',
        alt: 'Viking Lander engineering model showing robotic arm and camera masts',
        caption: 'The Viking Lander automated mechanical backhoe arm and twin facsimile scanning cameras.',
        credit: 'NASA / JPL (PIA09703)',
        sourceUrl: 'https://images.nasa.gov/details/PIA09703'
      },
      {
        src: 'https://images-assets.nasa.gov/image/PIA03165/PIA03165~medium.jpg',
        alt: 'First surface panoramic view returned from Mars Chryse Planitia by Viking 1',
        caption: 'First high-resolution color panoramic photograph returned from Mars, showing the footpad and Martian plains.',
        credit: 'NASA / JPL (PIA03165)',
        sourceUrl: 'https://images.nasa.gov/details/PIA03165'
      }
    ],
    discoveryPhoto: {
      src: 'https://images-assets.nasa.gov/image/PIA00563/PIA00563~medium.jpg',
      alt: 'Viking 1 soil sampler trenches and boulder Big Joe',
      caption: 'Trenches dug into Martian soil by Viking 1 robotic scoop to test for biological carbon compounds.',
      credit: 'NASA / JPL (PIA00563)',
      sourceUrl: 'https://images.nasa.gov/details/PIA00563'
    },
    facts: [
      {
        claim: 'Viking 1 and 2 touched down in July and September 1976',
        tag: 'V',
        source: 'NASA JPL Viking Project Summary',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      },
      {
        claim: 'The GCMS experiment found no organic compounds above parts-per-billion limit',
        tag: 'V',
        source: 'Biemann et al., Journal of Geophysical Research (Viking GCMS)',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      },
      {
        claim: 'HiRISE camera spotted Viking 1, backshell, and heat shield in 2006',
        tag: 'V',
        source: 'NASA/JPL/University of Arizona HiRISE Operations',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      }
    ],
    shortAnswer: 'Viking carried onboard mini-laboratories to test Martian soil for microbes. While the soil released gas when given nutrients, instruments found no organic carbon compounds. Scientists concluded chemical perchlorates caused the reaction, leading NASA to a new guiding rule: "Follow the water".'
  },
  {
    id: 'ch4-mer',
    chapter: 4,
    title: 'Spirit and Opportunity',
    machine: 'Mars Exploration Rovers (MER-A & MER-B)',
    bannerIn: 'Was Mars once wet?',
    bannerOut: 'Could anything fly on Mars?',
    handOffLine: 'Mars once had water. Now, how do we explore it faster and farther?',
    status: {
      chip: 'SILENT',
      note: 'Spirit last signal March 22, 2010; Opportunity last signal June 10, 2018 after planet-wide dust storm.'
    },
    whereItIs: 'Mars: Gusev Crater (Spirit) & Meridiani Planum (Opportunity)',
    distanceKm: 225000000,
    distanceLabel: 'Mars ~55M–400M km',
    modelType: 'rover',
    modelCredit: 'Interactive 3D reconstruction of the MER Twin Rover architecture (Spirit & Opportunity)',
    hotspots: [
      {
        id: 'rock-abrasion-tool',
        label: 'Rock Abrasion Tool (RAT)',
        position: [0.45, 0.05, 0.3],
        job: 'A diamond-tipped grinding head that shaved away outer dust to reveal fresh, unweathered rock interiors.',
        learned: 'Fresh rock revealed sulfate minerals and hematite "blueberries" that only crystallize in ancient liquid water.'
      },
      {
        id: 'pancam-mast',
        label: 'Panoramic Camera (Pancam)',
        position: [0.1, 0.6, 0.15],
        job: 'Multispectral stereo camera sitting at 1.5 m human eye height to spot geological outcrop targets.',
        learned: 'Identified fine sedimentary layers deposited by ancient ripples of salty surface water at Meridiani Planum.'
      },
      {
        id: 'solar-wings',
        label: 'Solar Array Wings',
        position: [-0.05, 0.25, -0.05],
        job: 'Triple-junction solar panels powering batteries during the day.',
        learned: 'Dust accumulation steadily choked sunlight. Wind "cleaning events" extended the 90-sol mission past 5,000 sols.'
      },
      {
        id: 'rocker-bogie',
        label: 'Rocker-Bogie 6-Wheel Drive',
        position: [-0.25, -0.15, 0.35],
        job: 'An unspring rocker-bogie differential linkage allowing six wheels to climb obstacles larger than wheel diameter.',
        learned: 'Drove 45.16 kilometers across Mars, but proved that soft sand dunes can still trap rovers when wheels spin in loose silt.'
      }
    ],
    steps: [
      {
        name: 'Meet it',
        text: 'In January 2004, twin rovers named Spirit and Opportunity bounced onto opposite sides of Mars inside airbags. They were designed as robotic geologists built to survive just 90 Mars days (sols).',
        label: 'FACT',
        subtext: 'A "sol" is a Martian day, lasting 24 hours, 39 minutes, and 35 seconds.'
      },
      {
        name: 'How it works',
        text: 'The rovers scanned horizons with stereo cameras, navigated over boulders with 6-wheel rocker-bogie suspension, and ground into rock crusts using diamond-tipped cutters on a robot arm.',
        label: 'FACT',
        subtext: 'The Rock Abrasion Tool ground 5 mm circular holes into pristine rock.'
      },
      {
        name: 'What we learned',
        text: 'Opportunity discovered gray hematite spherules nicknamed "blueberries" and sulfate salts that form only in standing water. Spirit found hot spring silica. Scientists confirmed parts of ancient Mars were soaking wet and hospitable.',
        label: 'INFERRED',
        subtext: 'Opportunity drove 45.16 kilometers—the all-time distance record for off-world driving.'
      },
      {
        name: 'Where it is now',
        text: 'Spirit became stuck in soft sand in 2009. Opportunity soldiered on until a monster planet-encircling dust storm in June 2018 blotted out the Sun. Orbiter photos show both rovers resting quietly, their tracks erased by the wind.',
        label: 'FACT',
        subtext: 'HiRISE confirmed Opportunity sits in Perseverance Valley on the rim of Endeavour Crater.'
      }
    ],
    discovery: {
      title: 'Mars Was Once a Water World',
      finding: 'Sedimentary rocks, jarosite salt, and hematite concretions at Meridiani Planum confirmed an ancient shallow, acidic sea once flowed across the surface of Mars.',
      keyNumber: '5,111 sols (14.5 yrs)',
      numberLabel: 'Opportunity mission duration (built for 90)',
      label: 'INFERRED'
    },
    photo: {
      src: 'https://images-assets.nasa.gov/image/PIA15114/PIA15114~medium.jpg',
      alt: 'Opportunity Mars Rover self-portrait on Mars',
      caption: 'Opportunity self-portrait showing solar panels and robotic arm on the Martian surface.',
      credit: 'NASA / JPL-Caltech / Cornell (PIA15114)',
      sourceUrl: 'https://images.nasa.gov/details/PIA15114'
    },
    hardwarePhotos: [
      {
        src: 'https://images-assets.nasa.gov/image/PIA15114/PIA15114~medium.jpg',
        alt: 'Opportunity Mars Rover self-portrait on Mars',
        caption: 'Opportunity rover on Mars showing solar panels, rocker-bogie suspension, and camera mast.',
        credit: 'NASA / JPL-Caltech / Cornell (PIA15114)',
        sourceUrl: 'https://images.nasa.gov/details/PIA15114'
      },
      {
        src: 'https://images-assets.nasa.gov/image/PIA20285/PIA20285~small.jpg',
        alt: 'Opportunity Rock Abrasion Tool grinding rock target',
        caption: 'Diamond-tipped Rock Abrasion Tool grinding through outer oxidized crust of Martian rock.',
        credit: 'NASA / JPL-Caltech (PIA20285)',
        sourceUrl: 'https://images.nasa.gov/details/PIA20285'
      }
    ],
    discoveryPhoto: {
      src: 'https://images-assets.nasa.gov/image/PIA21706/PIA21706~medium.jpg',
      alt: 'Sedimentary layers in Orion Crater on Mars photographed by Opportunity',
      caption: 'Finely laminated sedimentary rock layers at Orion Crater, proving ancient liquid water flowed on Mars.',
      credit: 'NASA / JPL-Caltech (PIA21706)',
      sourceUrl: 'https://images.nasa.gov/details/PIA21706'
    },
    facts: [
      {
        claim: 'Spirit landed Jan 4, 2004; Opportunity landed Jan 25, 2004',
        tag: 'V',
        source: 'NASA JPL Mars Exploration Rover Mission Archive',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      },
      {
        claim: 'Opportunity drove 45.16 km (28.06 miles), setting the off-world driving record',
        tag: 'V',
        source: 'NASA JPL Press Release / Guinness World Records',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      },
      {
        claim: 'Hematite spherules and jarosite confirm liquid water in ancient Mars history',
        tag: 'V',
        source: 'Squyres et al., Science / MER Science Team Special Issue',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      }
    ],
    shortAnswer: 'Spirit and Opportunity were twin robotic geologists. By grinding rocks and finding hematite "blueberries" and sulfate minerals, they proved that ancient Mars once had liquid lakes and hot springs.'
  },
  {
    id: 'ch5-ingenuity',
    chapter: 5,
    title: 'Ingenuity Helicopter',
    machine: 'Ingenuity Mars Helicopter ("Ginny")',
    bannerIn: 'Could anything fly on Mars?',
    bannerOut: 'Where does the Sun’s reach end?',
    handOffLine: 'A helicopter proved machines can go new places. How far can they really go?',
    status: {
      chip: 'RETIRED',
      note: 'Mission concluded January 18, 2024 after rotor blade tip damage during flight 72.'
    },
    whereItIs: 'Mars: Jezero Crater, "Valinor Hills"',
    distanceKm: 225000000,
    distanceLabel: 'Mars ~55M–400M km',
    modelType: 'ingenuity',
    modelCredit: 'Interactive 3D reconstruction of the Ingenuity Mars Helicopter (NASA JPL design)',
    hotspots: [
      {
        id: 'coaxial-rotors',
        label: 'Counter-Rotating Carbon Rotors',
        position: [0, 0.45, 0],
        job: 'Two 1.2-meter twin carbon-composite rotors spinning in opposite directions at 2,400 to 2,700 RPM.',
        learned: 'Counter-rotation cancels torque without a tail rotor, biting into Mars atmosphere that is just 1% as dense as Earth’s.'
      },
      {
        id: 'solar-panel-top',
        label: 'Mast Solar Panel',
        position: [0, 0.72, 0],
        job: 'A compact solar panel mounted above the rotors charging six lithium-ion batteries.',
        learned: 'Generates just enough energy each sol to heat the fuselage overnight and fuel a 2-to-3 minute flight burst.'
      },
      {
        id: 'warm-core-box',
        label: 'Insulated Avionics Core',
        position: [0, 0.1, 0],
        job: 'A gold-foiled cube containing smartphone-grade processors, laser altimeter, and internal heaters.',
        learned: 'Withstands nighttime temperatures dropping to -90°C using commercial off-the-shelf Linux computers.'
      },
      {
        id: 'carbon-legs',
        label: 'Carbon Fiber Landing Legs',
        position: [-0.3, -0.3, 0.3],
        job: 'Four ultralight carbon-composite legs with spring dampers that absorb landing touchdown shock.',
        learned: 'Protected the 1.8-kilogram craft across 72 safe landings on sand, gravel, and boulder-strewn slopes.'
      }
    ],
    steps: [
      {
        name: 'Meet it',
        text: 'Ingenuity was a tiny 1.8-kilogram helicopter that hitched a ride beneath the Perseverance rover. It was built as a high-risk test: could anything generate aerodynamic lift in air less than 1% as thick as Earth’s?',
        label: 'FACT',
        subtext: 'Arrived at Jezero Crater in February 2021; carried a swatch of fabric from the Wright Brothers’ 1903 Flyer.'
      },
      {
        name: 'How it works',
        text: 'Because Mars air is whisper-thin, its twin carbon-fiber blades must spin 10 times faster than an Earth helicopter (over 2,400 RPM). A downwards sensor takes 30 photos a second to track drift and steer autonomously.',
        label: 'FACT',
        subtext: 'Radio signals take 5 to 20 minutes to travel from Earth, so every second of flight had to be 100% self-piloted.'
      },
      {
        name: 'What we learned',
        text: 'It achieved the first powered, controlled flight on another celestial body. Planned for only 5 short technology demonstration hops, it flew 72 times, traveled 17 kilometers, and served as an aerial scout for the Perseverance rover.',
        label: 'FACT',
        subtext: 'Logged over 128 minutes in the air, flying up to 24 meters high.'
      },
      {
        name: 'Where it is now',
        text: 'On flight 72 in January 2024, a hard landing in featureless sand damaged rotor blade tips. Its mission concluded, but its computer still wakes up every sol to log weather and test hardware at Valinor Hills.',
        label: 'FACT',
        subtext: 'Ingenuity will remain at its final landing site as a permanent monument to planetary aviation.'
      }
    ],
    discovery: {
      title: 'Powered Aviation is Real on Other Worlds',
      finding: 'Ingenuity proved planetary aerial scouting is feasible, scouting sand traps, mapping cliff outcrops, and paving the way for future Mars helicopters and the Dragonfly Titan rotorcraft.',
      keyNumber: '72 flights',
      numberLabel: 'Flights completed (built for 5)',
      label: 'FACT'
    },
    photo: {
      src: 'https://images-assets.nasa.gov/image/PIA25686/PIA25686~medium.jpg',
      alt: 'Ingenuity Mars Helicopter standing in Jezero Crater',
      caption: 'Ingenuity resting on Martian sand in Jezero Crater, photographed by Perseverance Mastcam-Z.',
      credit: 'NASA / JPL-Caltech / MSSS / ASU (PIA25686)',
      sourceUrl: 'https://images.nasa.gov/details/PIA25686'
    },
    hardwarePhotos: [
      {
        src: 'https://images-assets.nasa.gov/image/PIA25686/PIA25686~medium.jpg',
        alt: 'Ingenuity Mars Helicopter standing in Jezero Crater',
        caption: 'Ingenuity standing on its four carbon-fiber landing legs on the red sands of Jezero Crater.',
        credit: 'NASA / JPL-Caltech / MSSS / ASU (PIA25686)',
        sourceUrl: 'https://images.nasa.gov/details/PIA25686'
      },
      {
        src: 'https://images-assets.nasa.gov/image/PIA25883/PIA25883~medium.jpg',
        alt: 'Ingenuity Helicopter at Airfield Mu on Mars',
        caption: 'Ingenuity at Airfield Mu showing dual counter-rotating carbon blades and top solar collector.',
        credit: 'NASA / JPL-Caltech (PIA25883)',
        sourceUrl: 'https://images.nasa.gov/details/PIA25883'
      }
    ],
    discoveryPhoto: {
      src: 'https://images-assets.nasa.gov/image/PIA24593/PIA24593~medium.jpg',
      alt: 'First Aerial Color Image of Mars taken by Ingenuity during flight',
      caption: 'Historic first color aerial photograph of another planet, taken by Ingenuity from flight altitude.',
      credit: 'NASA / JPL-Caltech (PIA24593)',
      sourceUrl: 'https://images.nasa.gov/details/PIA24593'
    },
    facts: [
      {
        claim: 'First powered, controlled flight on another planet took place April 19, 2021',
        tag: 'V',
        source: 'NASA JPL Ingenuity Mars Helicopter Mission Page',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      },
      {
        claim: 'Completed 72 flights, 128.8 minutes aloft, 17.0 km distance flown',
        tag: 'V',
        source: 'NASA JPL Flight Log Release / Planetary Society',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      },
      {
        claim: 'Rotor blade tips damaged during landing on January 18, 2024',
        tag: 'V',
        source: 'NASA Administrator Bill Nelson announcement, January 25, 2024',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      }
    ],
    shortAnswer: 'Ingenuity proved that machines can fly in the thin atmosphere of Mars. By spinning counter-rotating blades at 2,400 RPM, it completed 72 flights and proved aerial scouting works on alien worlds.'
  },
  {
    id: 'ch6-voyager',
    chapter: 6,
    title: 'Voyager 1',
    machine: 'Voyager 1 Interstellar Spacecraft',
    bannerIn: 'Where does the Sun’s reach end?',
    bannerOut: '',
    handOffLine: 'Voyager is still going. Your turn.',
    status: {
      chip: 'STILL TALKING',
      note: 'Cruising through interstellar space at ~17 km/s (~38,000 mph). Still communicating via the Deep Space Network.'
    },
    whereItIs: 'Interstellar Space: Constellation Ophiuchus (~25.9 billion km from Earth at one light-day)',
    distanceKm: 25902068371,
    distanceLabel: 'Voyager 1 ~25.9 billion km',
    modelType: 'voyager',
    modelCredit: 'Interactive 3D reconstruction of the Voyager 1 spacecraft based on NASA JPL engineering models',
    hotspots: [
      {
        id: 'high-gain-dish',
        label: '3.7-Meter High-Gain Antenna',
        position: [0, 0.35, 0],
        job: 'A giant parabolic dish that must remain locked onto Earth with razor accuracy.',
        learned: 'Radio signals travel at the speed of light, taking over 23 hours to cross deep space to Earth at 160 bits/sec.'
      },
      {
        id: 'rtg-power',
        label: 'Radioisotope Thermoelectric Generators (RTGs)',
        position: [-0.4, 0.1, 0.3],
        job: 'Three radioactive plutonium-238 canisters that turn decaying heat into electricity without solar power.',
        learned: 'Provides continuous power deep beyond the solar system where sunlight is merely a bright star. Fades ~4W per year.'
      },
      {
        id: 'golden-record',
        label: 'The Golden Record',
        position: [0.15, -0.05, 0.25],
        job: 'A 12-inch gold-plated copper phonograph record containing sounds, greetings, and music of Earth.',
        learned: 'Carries humanity’s calling card into the galactic quiet, preserved for billions of years as a cosmic time capsule.'
      },
      {
        id: 'magnetometer-boom',
        label: '13-Meter Magnetometer Boom',
        position: [0.55, -0.2, -0.3],
        job: 'Sensitive detectors that measure magnetic fields and plasma density away from spacecraft electrical interference.',
        learned: 'In August 2012, its instruments detected an abrupt drop in solar particles and a 40x jump in galactic plasma, proving it crossed into interstellar space.'
      }
    ],
    steps: [
      {
        name: 'Meet it',
        text: 'Launched in 1977, Voyager 1 is the farthest human-made object in existence. It has traveled farther than any machine in history, and it is still talking to Earth.',
        label: 'FACT',
        subtext: 'Now traveling at about 38,000 mph (17 kilometers every second).'
      },
      {
        name: 'How it works',
        text: 'Because sunlight is too faint to power solar panels, nuclear batteries turn radioactive decay heat into electricity. A 3.7-meter dish points at Earth to beam radio whispers at a modest 160 bits per second.',
        label: 'FACT',
        subtext: 'Powered by three Radioisotope Thermoelectric Generators (RTGs).'
      },
      {
        name: 'What we learned',
        text: 'Voyager explored Jupiter and Saturn, then in August 2012 became the first spacecraft to leave the Sun’s protective magnetic bubble (the heliosphere) and enter the interstellar ocean between stars.',
        label: 'FACT',
        subtext: 'Instruments measured the undisturbed magnetic field of the Milky Way galaxy.'
      },
      {
        name: 'Where it is now',
        text: 'Voyager 1 is over 24 billion kilometers away. A radio signal traveling at light speed takes almost an entire day to reach it. A command sent on Monday morning gets an answer on Wednesday morning.',
        label: 'FACT',
        subtext: 'Tracked daily by the 70-meter dishes of NASA’s Deep Space Network in Goldstone, Madrid, and Canberra.'
      }
    ],
    discovery: {
      title: 'Humanity Touches the Ocean Between Stars',
      finding: 'Voyager proved where the solar wind ends and interstellar space begins: a dynamic cosmic boundary called the heliopause at 121 AU (18.1 billion km) from the Sun.',
      keyNumber: '25.9 billion km',
      numberLabel: 'Distance at one light-day threshold',
      label: 'FACT'
    },
    photo: {
      src: 'https://images-assets.nasa.gov/image/PIA21741/PIA21741~medium.jpg',
      alt: 'Engineers mounting Golden Record on Voyager 1 at JPL',
      caption: 'Engineers installing the Golden Record onto Voyager 1 before launch in 1977.',
      credit: 'NASA / JPL-Caltech (PIA21741)',
      sourceUrl: 'https://images.nasa.gov/details/PIA21741'
    },
    hardwarePhotos: [
      {
        src: 'https://images-assets.nasa.gov/image/PIA21741/PIA21741~medium.jpg',
        alt: 'Engineers mounting Golden Record on Voyager 1 at JPL',
        caption: 'Engineers mounting the 12-inch gold-plated copper phonograph record onto the Voyager chassis.',
        credit: 'NASA / JPL-Caltech (PIA21741)',
        sourceUrl: 'https://images.nasa.gov/details/PIA21741'
      },
      {
        src: 'https://images-assets.nasa.gov/image/PIA21743/PIA21743~medium.jpg',
        alt: 'Voyager spacecraft assembly with high-gain antenna dish',
        caption: 'Full Voyager spacecraft assembly showing the 3.7-meter parabolic high-gain antenna dish.',
        credit: 'NASA / JPL-Caltech (PIA21743)',
        sourceUrl: 'https://images.nasa.gov/details/PIA21743'
      }
    ],
    discoveryPhoto: {
      src: 'https://images-assets.nasa.gov/image/PIA23645/PIA23645~medium.jpg',
      alt: 'Pale Blue Dot Revisited photographed by Voyager 1 from 6 billion km away',
      caption: 'Pale Blue Dot: Earth as a crescent speck of light caught in a sunbeam from 6 billion kilometers away.',
      credit: 'NASA / JPL-Caltech (PIA23645)',
      sourceUrl: 'https://images.nasa.gov/details/PIA23645'
    },
    facts: [
      {
        claim: 'Entered interstellar space on August 25, 2012 at distance of 121.6 AU',
        tag: 'V',
        source: 'NASA JPL Voyager Interstellar Mission Announcement / Science 2013',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      },
      {
        claim: 'Projected to cross one light-day from Earth (25,902,068,371 km) around Nov 18, 2026 10:16 UTC',
        tag: 'V',
        source: 'NASA / JPL Horizons Ephemeris System',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      },
      {
        claim: 'Speed approximately 38,000 mph (17.0 km/s relative to the Sun)',
        tag: 'V',
        source: 'NASA Voyager Real-Time Telemetry',
        checkedOn: '2026-10-30',
        checkedBy: 'NASA Space Apps Team'
      }
    ],
    shortAnswer: 'Voyager 1 is humanity’s farthest spacecraft. Launched in 1977, it became the first human-made machine to enter interstellar space in 2012. It communicates with Earth at 160 bits/second, taking almost an entire day for a radio signal to reach it.'
  }
];
