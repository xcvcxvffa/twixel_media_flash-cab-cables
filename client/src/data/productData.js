export const productCategories = [
  {
    id: '11kv-ht-cable',
    name: '11 kv HT cable ( 66 kv / 33 kv )',
    image: '/assets/images/ht_cable_diagram.png',
    image2: '/assets/images/industrial_cable.png',
    subCategories: [],
    specs: {
      cableStandard: 'IS 7098 (Part 2) / IEC 60502-2',
      salientFeatures: [
        'XLPE (Cross Linked Polyethylene) Insulation',
        'Galvanized Steel Wire / Steel Strip Armour',
        'Stranded Class 2 Aluminium / Copper Conductor',
        'By Color Coding Core Identification',
        'Suitable for Indoor, Outdoor, Underground & Duct Installation',
        'Short Circuit Temperature up to 250°C'
      ],
      technicalData: {
        'Voltage Grade': '11 KV',
        'Operating Temp': '-15°C to +90°C',
        'Short Circuit Temp': 'Up to 250°C',
        'Installation': 'Indoor, Outdoor, Underground & Duct'
      },
      standardPacking: {
        'Conductor': 'Aluminium / Copper (Class 2 Stranded)',
        'Insulation': 'XLPE (Cross Linked Polyethylene)',
        'Armour': 'Galvanized Steel Wire / Steel Strip Armour',
        'Core Identification': 'By Color Coding'
      },
      coreColour: 'By Color Coding (Red, Yellow, Blue for 3 Core, or as per standard specifications).',
      application: '11 KV HT Cable is engineered for reliable high-voltage power transmission across industrial, commercial, and infrastructure applications. With advanced XLPE insulation and robust construction, it ensures maximum safety, minimal power loss, and consistent performance over long distances. Suitable for: Industrial Plants, Infrastructure Projects, Renewable & Commercial Installations, Power Distribution.',
      tableData: [
        { size: '3C x 35', wires: 'Stranded', insThick: '3.40', coreOD: '18.5', sheathThick: '1.80', over3Core: '45.0', over4Core: 'N/A', res: '0.868', rating: '110' },
        { size: '3C x 50', wires: 'Stranded', insThick: '3.40', coreOD: '19.8', sheathThick: '1.80', over3Core: '48.2', over4Core: 'N/A', res: '0.641', rating: '130' },
        { size: '3C x 70', wires: 'Stranded', insThick: '3.40', coreOD: '21.6', sheathThick: '2.0', over3Core: '52.5', over4Core: 'N/A', res: '0.443', rating: '160' },
        { size: '3C x 95', wires: 'Stranded', insThick: '3.40', coreOD: '23.8', sheathThick: '2.0', over3Core: '57.8', over4Core: 'N/A', res: '0.320', rating: '190' },
        { size: '3C x 120', wires: 'Stranded', insThick: '3.40', coreOD: '25.4', sheathThick: '2.20', over3Core: '61.5', over4Core: 'N/A', res: '0.253', rating: '220' },
        { size: '3C x 150', wires: 'Stranded', insThick: '3.40', coreOD: '27.0', sheathThick: '2.20', over3Core: '65.2', over4Core: 'N/A', res: '0.206', rating: '250' }
      ]
    }
  },
  {
    id: '11kv-medium-voltage-cable',
    name: '11 Kv Medium Voltage cable',
    image: '/assets/images/cables.png',
    image2: '/assets/images/industrial_cable.png',
    subCategories: []
  },
  {
    id: 'single-multi-flexible-cables',
    name: 'Single Core & Multi Core Flexible Cables',
    image: '/assets/images/cables.png',
    image2: '/assets/images/house_wiring.png',
    subCategories: []
  },
  {
    id: 'industrial-power-control-cables',
    name: 'Industrial Power & Control Cables',
    image: '/assets/images/cables.png',
    image2: '/assets/images/industrial_cable.png',
    subCategories: []
  },
  {
    id: 'submersible-flat-cables',
    name: 'Submersible Flat Cables',
    image: '/assets/images/cables.png',
    image2: '/assets/images/house_wiring.png',
    subCategories: [
      {
        id: '3-core-pvc-flat',
        name: '3 Core PVC Flat Cable',
        image: '/assets/images/cables.png',
        image2: '/assets/images/house_wiring.png',
        specs: {
          cableStandard: 'IS 694:2010, BS 6500, IEC 60227',
          salientFeatures: [
            'Excellent flexibility',
            'Excellent resistant to moisture, abrasion, grease, oil',
            'Long Life',
            'Excellent mechanical & electrical properties'
          ],
          technicalData: {
            'Operating Temp': '-20°C to Max.+90°C',
            'Nominal Voltage': '1.1 KV',
            'Test Voltage': '3.0 KV',
            'Min. Bending Radius': '6x Cable Diameter'
          },
          standardPacking: {
            'Coils': '100, 200, 300, 500, 1000m',
            'Conductor': 'Flexible Bare Bunch Copper as per IS:8130',
            'Insulation': 'PVC As Par IS:5831',
            'Outer Sheath': 'PVC As Par IS:5831'
          },
          coreColour: 'As Par IS:694:2010 - 3C - Red, Yellow, Blue, 4C - Red, Yellow, Blue Or Black. As Par IEC:60227 3C Black, Blue, Brown. 4c - Black, Blue, Brown, Green or Yellow/Green',
          application: 'Ideal For Irrigation Pumps, Drinking Water Supply Pumps, Submersible Pump Motor Power Supply.',
          tableData: [
            { size: '1.0', wires: '14/0.30', insThick: '0.60', coreOD: '2.60', sheathThick: '0.90', over3Core: '9.90 X 4.70', over4Core: '12.50 X 4.80', res: '18.1', rating: '11' },
            { size: '1.5', wires: '22/0.30', insThick: '0.60', coreOD: '2.80', sheathThick: '0.90', over3Core: '10.50 X 4.80', over4Core: '14.20 X 5.10', res: '12.1', rating: '14' },
            { size: '2.5', wires: '36/0.30', insThick: '0.70', coreOD: '3.35', sheathThick: '1.0', over3Core: '12.60 X 5.90', over4Core: '17.50 X 7.0', res: '7.41', rating: '18' },
            { size: '4.0', wires: '56/0.30', insThick: '0.80', coreOD: '4.0', sheathThick: '1.0', over3Core: '14.50 X 6.70', over4Core: '20.0 X 7.90', res: '4.95', rating: '26' },
            { size: '6.0', wires: '84/0.30', insThick: '0.80', coreOD: '5.0', sheathThick: '1.0', over3Core: '17.50 X 7.50', over4Core: '23.50 X 9.0', res: '3.30', rating: '31' },
            { size: '10.0', wires: '140/0.30', insThick: '1.0', coreOD: '6.5', sheathThick: '1.40', over3Core: '22.80 X 9.90', over4Core: '29.0 X 9.90', res: '1.91', rating: '42' },
          ]
        }
      },
      { id: '4-core-pvc-flat', name: '4 Core PVC Flat Cable', image: '/assets/images/cables.png', image2: '/assets/images/house_wiring.png', specs: null },
      { id: '3-core-rubber-flat', name: '3 Core Rubber Flat Cable', image: '/assets/images/cables.png', image2: '/assets/images/house_wiring.png', specs: null },
      { id: '4-core-rubber-flat', name: '4 Core Rubber Flat Cable', image: '/assets/images/cables.png', image2: '/assets/images/house_wiring.png', specs: null }
    ]
  },
  {
    id: 'ariel-bunched-cables',
    name: 'Ariel Bunched Cables',
    image: '/assets/images/cables.png',
    image2: '/assets/images/industrial_cable.png',
    subCategories: []
  },
  {
    id: 'house-wires',
    name: 'House Wires',
    image: '/assets/images/house_wiring.png',
    image2: '/assets/images/cables.png',
    subCategories: []
  },
  {
    id: 'dc-solar-cable',
    name: 'DC Solar cable - (singal core)',
    image: '/assets/images/cables.png',
    image2: '/assets/images/industrial_cable.png',
    subCategories: []
  },
  {
    id: 'round-flexible-cable',
    name: 'Round flexible cable',
    image: '/assets/images/cables.png',
    image2: '/assets/images/house_wiring.png',
    subCategories: []
  },
  {
    id: 'welding-cable',
    name: 'Welding cable',
    image: '/assets/images/cables.png',
    image2: '/assets/images/industrial_cable.png',
    subCategories: []
  },
  {
    id: 'auto-cable',
    name: 'auto cable',
    image: '/assets/images/cables.png',
    image2: '/assets/images/house_wiring.png',
    subCategories: []
  },
  {
    id: 'battery-cable',
    name: 'Battery cable',
    image: '/assets/images/cables.png',
    image2: '/assets/images/industrial_cable.png',
    subCategories: []
  }
];
