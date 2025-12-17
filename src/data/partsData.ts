export interface PartDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  priceKZT: number;
  image?: string;
}

export const partsData: PartDetail[] = [
  // Engine
  {
    id: "engine-turbo",
    name: "Turbocharger",
    category: "engine",
    description: "A turbocharged gasoline engine is an internal combustion engine equipped with a turbocharger. The turbocharger is located in the exhaust system, creating increased pressure that extracts exhaust gases and forces extra air into the combustion chambers, increasing power and efficiency.",
    priceKZT: 350000,
    image:"https://www.toyota-industries.com/products/items/f33a_turbo_2021.jpg"
  },
  {
    id: "engine-air-filter",
    name: "Air Filter",
    category: "engine",
    description: "High-performance air filter that ensures optimal air flow to the engine while filtering out contaminants. Improves engine efficiency and longevity by preventing dust and debris from entering the combustion chamber.",
    priceKZT: 15000,
    image:"https://i.ebayimg.com/images/g/HqcAAOSwd~JnXReG/s-l1600.jpg"
  },
  {
    id: "engine-exhaust",
    name: "Exhaust System",
    category: "engine",
    description: "Complete exhaust system including manifold, catalytic converter, and muffler. Designed to efficiently remove combustion gases while reducing noise and emissions, meeting environmental standards.",
    priceKZT: 180000,
    image:"https://www.carid.com/images/articles/exhaust-system/exhaust-system-diagram.jpg"
  },
  {
    id: "engine-fuel-system",
    name: "Fuel System",
    category: "engine",
    description: "Comprehensive fuel delivery system including fuel pump, injectors, and pressure regulator. Ensures precise fuel delivery for optimal combustion, performance, and fuel efficiency.",
    priceKZT: 95000,
    image:"https://www.land-cruiser.ru/uploads/post-303-1174445812.jpg"
  },
  
  // Transmission
  {
    id: "transmission-clutch",
    name: "Clutch Kit",
    category: "transmission",
    description: "Complete clutch assembly including pressure plate, disc, and release bearing. Provides smooth power transfer from engine to transmission with enhanced durability for high-performance applications.",
    priceKZT: 120000,
    image:"https://i2.wp.com/www.carid.com/images/aisin/items/ckt-074-lb.jpg"
  },
  {
    id: "transmission-gearbox",
    name: "Gearbox",
    category: "transmission",
    description: "Precision-engineered transmission unit with synchronized gears for smooth shifting. Features reinforced internals for improved reliability and power handling capacity.",
    priceKZT: 450000,
    image:"https://avatars.mds.yandex.net/i?id=67eae1ad62a5f5ac686a12fbe71d4cc34a012555-5888509-images-thumbs&n=13"
  },
  {
    id: "transmission-differential",
    name: "Differential",
    category: "transmission",
    description: "Limited-slip differential that optimally distributes power between wheels, improving traction and handling. Essential for performance driving and challenging road conditions.",
    priceKZT: 280000,
    image:"https://maktrans.net/image/cache/catalog/vadim2/U760DIFF/IMG_8670-800x600-800x800.jpg"
  },
  
  // Wheels
  {
    id: "wheels-rims",
    name: "Alloy Rims",
    category: "wheels",
    description: "Lightweight forged aluminum wheels that reduce unsprung weight while providing superior strength. Improves handling, acceleration, and braking performance with stylish design.",
    priceKZT: 320000,
    image:"https://m.media-amazon.com/images/I/61KR6MnSQmL._AC_UY654_QL65_.jpg"
  },
  {
    id: "wheels-tires",
    name: "Performance Tires",
    category: "wheels",
    description: "High-grip performance tires with advanced compound and tread pattern. Delivers exceptional traction in various conditions while maintaining durability and comfort.",
    priceKZT: 240000,
    image:"https://i.pinimg.com/736x/d7/c7/42/d7c74281553fd9a4a1d062b8eff90020.jpg"

  },
  {
    id: "wheels-brakes",
    name: "Brake System",
    category: "wheels",
    description: "High-performance brake kit with ventilated rotors and multi-piston calipers. Provides superior stopping power with fade resistance for safe and confident braking.",
    priceKZT: 195000,
    image:"https://motor.ru/imgs/2021/10/29/12/4992086/36e642e2cdfd66cb60b22609f3731cdf4db4b0ae.jpg"
  },
  
  // Suspension
  {
    id: "suspension-springs",
    name: "Coil Springs",
    category: "suspension",
    description: "Performance lowering springs that reduce body roll and improve handling response. Maintains ride comfort while enhancing vehicle stability and cornering capability.",
    priceKZT: 65000,
    image:"https://avatars.mds.yandex.net/i?id=e4c0d99fe6a2a8a501090d477bf37057_sr-5339847-images-thumbs&n=13"
  },
  {
    id: "suspension-dampers",
    name: "Shock Absorbers",
    category: "suspension",
    description: "Adjustable dampers with multiple compression and rebound settings. Allows fine-tuning of suspension characteristics for optimal balance between comfort and performance.",
    priceKZT: 140000,
    image:"https://www.titansuspension.com/wp-content/uploads/2020/05/FJcruiser-2.jpg"
    

  },
  {
    id: "suspension-anti-roll-bars",
    name: "Anti-Roll Bars",
    category: "suspension",
    description: "Reinforced stabilizer bars that reduce body roll during cornering. Improves handling precision and driver confidence through enhanced lateral stability.",
    priceKZT: 45000,
  },
  
  // Body
  {
    id: "body-hood",
    name: "Carbon Fiber Hood",
    category: "body",
    description: "Lightweight carbon fiber hood that reduces front-end weight while adding aggressive styling. Features functional vents for improved engine cooling and heat dissipation.",
    priceKZT: 210000,
  },
  {
    id: "body-bumpers",
    name: "Sport Bumpers",
    category: "body",
    description: "Aerodynamic front and rear bumper set with integrated splitters and diffusers. Enhances vehicle aesthetics while improving aerodynamic efficiency and downforce.",
    priceKZT: 175000,
  },
  {
    id: "body-side-skirts",
    name: "Side Skirts",
    category: "body",
    description: "Aerodynamic side skirts that smooth airflow along the vehicle sides. Reduces lift and improves high-speed stability while giving a lowered, aggressive appearance.",
    priceKZT: 85000,
  },
  {
    id: "body-spoiler",
    name: "Rear Spoiler",
    category: "body",
    description: "Adjustable rear wing designed to generate downforce at high speeds. Improves rear-end stability and traction while adding distinctive racing-inspired styling.",
    priceKZT: 125000,
  },
  
  // Paint
  {
    id: "paint-base-color",
    name: "Base Color Paint",
    category: "paint",
    description: "Premium automotive paint with superior durability and color retention. Features multi-layer protection against UV rays, scratches, and environmental damage.",
    priceKZT: 380000,
  },
  {
    id: "paint-finish",
    name: "Clear Coat Finish",
    category: "paint",
    description: "High-gloss clear coat with ceramic-enhanced formula for maximum protection. Provides deep shine and long-lasting protection against weathering and chemicals.",
    priceKZT: 95000,
  },
  {
    id: "paint-decals",
    name: "Custom Decals",
    category: "paint",
    description: "Professional-grade vinyl graphics and racing stripes. Weather-resistant material with easy application and removal without paint damage.",
    priceKZT: 42000,
  },
  
  // Aero
  {
    id: "aero-front-splitter",
    name: "Front Splitter",
    category: "aero",
    description: "Carbon fiber front splitter that generates front-end downforce. Reduces lift and improves high-speed stability while enhancing aggressive front-end appearance.",
    priceKZT: 115000,
  },
  {
    id: "aero-rear-wing",
    name: "Rear Wing",
    category: "aero",
    description: "Adjustable GT-style rear wing with multiple angle settings. Optimizes aerodynamic balance for track or street use with maximum downforce capability.",
    priceKZT: 165000,
  },
  {
    id: "aero-diffuser",
    name: "Rear Diffuser",
    category: "aero",
    description: "Underbody diffuser that accelerates airflow beneath the vehicle. Reduces drag and generates ground effect downforce for improved stability and efficiency.",
    priceKZT: 98000,
  },
  
  // Interior
  {
    id: "interior-seats",
    name: "Racing Seats",
    category: "interior",
    description: "FIA-approved bucket seats with deep bolsters and integrated harness mounting. Provides superior lateral support during aggressive driving while reducing overall weight.",
    priceKZT: 285000,
  },
  {
    id: "interior-steering-wheel",
    name: "Sport Steering Wheel",
    category: "interior",
    description: "Alcantara-wrapped flat-bottom steering wheel with thumb grips. Features reduced diameter for improved response and racing-inspired ergonomics.",
    priceKZT: 75000,
  },
  {
    id: "interior-dashboard",
    name: "Custom Dashboard",
    category: "interior",
    description: "Carbon fiber dashboard panel with integrated digital display cluster. Modernizes interior aesthetics while reducing weight and improving visibility.",
    priceKZT: 195000,
  },
  
  // Electronics
  {
    id: "electronics-ecu",
    name: "Performance ECU",
    category: "electronics",
    description: "Programmable engine control unit with advanced tuning capabilities. Optimizes fuel mapping, ignition timing, and boost control for maximum performance and reliability.",
    priceKZT: 220000,
  },
  {
    id: "electronics-sensors",
    name: "Performance Sensors",
    category: "electronics",
    description: "Wideband oxygen sensor kit with boost, oil pressure, and temperature monitoring. Provides real-time data for optimal tuning and engine protection.",
    priceKZT: 68000,
  },
  {
    id: "electronics-lighting",
    name: "LED Lighting Kit",
    category: "electronics",
    description: "Complete LED headlight and taillight conversion kit. Provides superior illumination with reduced power consumption and modern, distinctive appearance.",
    priceKZT: 145000,
  },
];

export const getPartById = (categoryId: string, partName: string): PartDetail | undefined => {
  return partsData.find(
    (part) => part.category === categoryId && part.name === partName
  );
};

export const getPartsByCategory = (categoryId: string): PartDetail[] => {
  return partsData.filter((part) => part.category === categoryId);
};
