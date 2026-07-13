export const PRODUCTS = [
  {
    id: 1,
    name: 'Kannauj Jasmine Absolute',
    tagline: 'High-altitude mogra distilled in copper deg',
    price: 4200,
    sizes: ['Discovery 5ml — ₹850', '30ml — ₹4,200', '50ml — ₹6,800'],
    sizePrice: [850, 4200, 6800],
    topNotes: ['Jasmine', 'Green Fig', 'Morning Dew'],
    family: 'Soft Floral',
    intensity: 'Moderate',
    longevity: '7–9 hrs',
    batchCode: 'KJA-2024-0311',
    harvestDate: 'March 2024',
    origin: 'Kannauj, U.P.',
    image:
      'https://images.unsplash.com/photo-1726758004519-7ccecda8b076?w=600&h=800&fit=crop&auto=format',
    timeline: {
      opening: {
        time: '0–90 min',
        notes: ['Jasmine Sambac', 'Green Fig Leaf', 'Bergamot'],
        icons: ['jasmine', 'leaf', 'citrus'],
        description:
          'Luminous, slightly green floral burst — dewy and almost watery at first spray.',
      },
      heart: {
        time: '90 min–5 hrs',
        notes: ['Mogra Absolute', 'White Musk', 'Ylang Ylang'],
        icons: ['flower', 'musk', 'flower'],
        description: 'Full bloom — warm, indolic, unmistakably Indian mogra.',
      },
      drydown: {
        time: '5–9 hrs',
        notes: ['Sandalwood', 'Benzoin', 'Ambrette Seed'],
        icons: ['sandalwood', 'resin', 'musk'],
        description:
          'Creamy base, skin-close finish with a woody powdery trail.',
      },
    },
    humidityNote:
      'Runs 15% louder in humidity — a single spray on the wrist is enough in monsoon conditions.',
    goodFor: ['Special occasions', 'Gift', 'Monsoon'],
    pairedWith: [2, 3],
    reviews: [
      {
        name: 'Priya M.',
        climate: 'Humid coastal',
        skin: 'Warm/oily',
        rating: 5,
        note: 'Lasts all day in Mumbai heat, never goes sharp or sour on me.',
      },
      {
        name: 'Aditi R.',
        climate: 'Dry northern',
        skin: 'Normal',
        rating: 4,
        note: 'The heart is everything. Wore beautifully for 6 solid hours in Delhi winter.',
      },
    ],
    provenance:
      "Kannauj has been India's perfume capital for over 3,000 years. Our jasmine cooperative involves 40 families across three villages in the district. Harvest happens in pre-dawn hours — flowers picked after sunrise lose 30% of their aromatic yield as the indole compound dissipates with heat. Traditional deg-bhapka hydro-distillation, unchanged for centuries, takes 10–12 hours per batch and cannot be rushed without quality loss.",
  },
  {
    id: 2,
    name: 'Mysore Sandalwood Reserve',
    tagline: 'Old-growth heartwood, direct steam-distilled',
    price: 6800,
    sizes: ['Discovery 5ml — ₹1,200', '30ml — ₹6,800', '50ml — ₹10,500'],
    sizePrice: [1200, 6800, 10500],
    topNotes: ['Sandalwood', 'Cardamom', 'Vetiver'],
    family: 'Warm & Woody',
    intensity: 'Rich',
    longevity: '10–12 hrs',
    batchCode: 'MSR-2023-1104',
    harvestDate: 'November 2023',
    origin: 'Mysore, Karnataka',
    image:
      'https://images.unsplash.com/photo-1643797517590-c44cb552ddcc?w=600&h=800&fit=crop&auto=format',
    timeline: {
      opening: {
        time: '0–60 min',
        notes: ['Green Cardamom', 'Pink Pepper', 'Cedar Tip'],
        icons: ['spice', 'pepper', 'leaf'],
        description:
          'Spiced, resinous entry — dry and slightly medicinal before the wood opens.',
      },
      heart: {
        time: '60 min–6 hrs',
        notes: ['Sandalwood Heartwood', 'Hindi Oud', 'Orris Root'],
        icons: ['sandalwood', 'oud', 'root'],
        description:
          'The core — milky, deep, faintly smoky. The alpha-santalol in full expression.',
      },
      drydown: {
        time: '6–12 hrs',
        notes: ['Vetiver', 'Ambergris', 'Pale Vanilla'],
        icons: ['vetiver', 'resin', 'musk'],
        description:
          'Earthy, animalic, indefinitely skin-close. Wears until you wash it off.',
      },
    },
    humidityNote:
      'Performs best in dry or temperate climates. In high humidity, apply 30 min before heading out — it needs the opening to settle.',
    goodFor: ['Daily wear', 'Special occasions', 'Winter evenings', 'Gift'],
    pairedWith: [1, 3],
    reviews: [
      {
        name: 'Rohan S.',
        climate: 'Temperate hill station',
        skin: 'Dry',
        rating: 5,
        note: 'The most honest sandalwood I have worn. No synthetic sweetness anywhere.',
      },
      {
        name: 'Aarav K.',
        climate: 'Arid',
        skin: 'Normal',
        rating: 5,
        note: 'Lasts 11 hours on me. The dry-down is why I bought the full bottle.',
      },
    ],
    provenance:
      'Mysore sandalwood (Santalum album) is protected under the Karnataka Forest Act. Only heartwood from trees aged 30+ years yields the full alpha-santalol concentration that defines the Mysore character. Our distillery partner operates under a Karnataka government license. No solvent extraction — direct steam only. Each batch is GC/MS verified for alpha-santalol content above 46%.',
  },
  {
    id: 3,
    name: 'Kashmir Saffron Oud',
    tagline: 'Pampore stigmas cold-macerated in Hindi oud',
    price: 8500,
    sizes: ['Discovery 5ml — ₹1,500', '30ml — ₹8,500', '50ml — ₹13,200'],
    sizePrice: [1500, 8500, 13200],
    topNotes: ['Saffron', 'Oud', 'Leather'],
    family: 'Deep Amber',
    intensity: 'Bold',
    longevity: '12+ hrs',
    batchCode: 'KSO-2024-0109',
    harvestDate: 'October 2023',
    origin: 'Pampore, Kashmir & Assam',
    image:
      'https://images.unsplash.com/photo-1772191399367-91ed8d95664b?w=600&h=800&fit=crop&auto=format',
    timeline: {
      opening: {
        time: '0–30 min',
        notes: ['Kashmir Saffron', 'Leather', 'Black Pepper'],
        icons: ['saffron', 'resin', 'pepper'],
        description:
          'Rich, metallic, immediately complex — the saffron hits before anything else.',
      },
      heart: {
        time: '30 min–7 hrs',
        notes: ['Hindi Oud', 'Damascena Rose', 'Labdanum'],
        icons: ['oud', 'rose', 'resin'],
        description:
          'The oud opens fully — barnyard, rose, wood smoke in equal measure.',
      },
      drydown: {
        time: '7–12+ hrs',
        notes: ['Labdanum Resin', 'Civet', 'Saffron Accord'],
        icons: ['resin', 'musk', 'saffron'],
        description:
          'Skin-close amber — almost medicinal, hypnotic, impossible to place.',
      },
    },
    humidityNote:
      'Runs 20% stronger and shorter in humid climates — reapply after 4–5 hrs in coastal cities.',
    goodFor: ['Special occasions', 'Winter evenings', 'Gift'],
    pairedWith: [2, 1],
    reviews: [
      {
        name: 'Meera K.',
        climate: 'Arid / dry interior',
        skin: 'Warm/dry',
        rating: 5,
        note: 'Wore it to a wedding, got more compliments than I expected. It is a special occasion scent.',
      },
      {
        name: 'Vikram P.',
        climate: 'Humid coastal',
        skin: 'Oily',
        rating: 4,
        note: 'One spray is enough and I mean it. Extraordinary longevity in the dry-down.',
      },
    ],
    provenance:
      'Kashmir saffron (Crocus sativus) from Pampore is the only Indian saffron producing ISO Grade I stigmas. Harvest window is three weeks in October. Each flower yields three stigmas removed by hand within hours of blooming. We cold-macerate the dried threads directly in Hindi oud oil for six weeks, then filter. No dilution, no synthetic safranal — something you cannot replicate with flavour industry material.',
  },
  {
    id: 4,
    name: 'Raat ki Rani',
    tagline: 'Night-blooming jasmine from Coorg hillsides',
    price: 3600,
    sizes: ['Discovery 5ml — ₹750', '30ml — ₹3,600', '50ml — ₹5,800'],
    sizePrice: [750, 3600, 5800],
    topNotes: ['Night Jasmine', 'Tuberose', 'Vetiver'],
    family: 'Soft Floral',
    intensity: 'Moderate',
    longevity: '6–8 hrs',
    batchCode: 'RKR-2024-0514',
    harvestDate: 'May 2024',
    origin: 'Coorg, Karnataka',
    image:
      'https://images.unsplash.com/photo-1605463967516-b73a52062ab0?w=600&h=800&fit=crop&auto=format',
    timeline: {
      opening: {
        time: '0–60 min',
        notes: ['Parijata', 'Green Tuberose', 'Lemon Verbena'],
        icons: ['jasmine', 'flower', 'citrus'],
        description:
          'Dewy, nocturnal, almost watery floral — the Coorg morning mist in a bottle.',
      },
      heart: {
        time: '60 min–4 hrs',
        notes: ['Tuberose Absolute', 'Mogra', 'Sandalwood'],
        icons: ['flower', 'jasmine', 'sandalwood'],
        description:
          'Lush and narcotic — classic Indian florals layered and warm.',
      },
      drydown: {
        time: '4–8 hrs',
        notes: ['Vetiver Root', 'Pale Musk', 'Benzoin'],
        icons: ['vetiver', 'musk', 'resin'],
        description:
          'Earthy base, damp-earth vetiver, quiet finish that barely leaves.',
      },
    },
    humidityNote:
      'Opens beautifully in monsoon humidity — this scent was made for rain and wet earth.',
    goodFor: ['Daily wear', 'Monsoon', 'Special occasions'],
    pairedWith: [1, 2, 3],
    reviews: [
      {
        name: 'Ananya S.',
        climate: 'Humid coastal',
        skin: 'Normal',
        rating: 5,
        note: "This is what my grandmother's garden smelled like at midnight. Exact.",
      },
      {
        name: 'Riya D.',
        climate: 'Hill station',
        skin: 'Dry',
        rating: 4,
        note: 'The tuberose heart is extraordinary. Soft and full without being heavy.',
      },
    ],
    provenance:
      "Parijata (Nyctanthes arbor-tristis) flowers open only at dusk and fall by dawn. Harvest is by hand, in darkness, before 5 AM — flowers picked after sunrise smell completely different. Coorg's altitude and morning mist create a unique terroir: the same species picked on plains reads sharper and less complex. Solvent-extracted concrete, then absolute — no steam, which would damage the delicate lactones.",
  },
  {
    id: 5,
    name: 'Vetiver Noir',
    tagline: 'Khus root smoke-cured at source, Rajasthan',
    price: 3900,
    sizes: ['Discovery 5ml — ₹780', '30ml — ₹3,900', '50ml — ₹6,200'],
    sizePrice: [780, 3900, 6200],
    topNotes: ['Vetiver', 'Smoked Wood', 'Grapefruit'],
    family: 'Warm & Woody',
    intensity: 'Moderate',
    longevity: '8–10 hrs',
    batchCode: 'VTN-2024-0602',
    harvestDate: 'June 2024',
    origin: 'Kota, Rajasthan',
    image:
      'https://images.unsplash.com/photo-1637257073432-8da762a87b36?w=600&h=800&fit=crop&auto=format',
    timeline: {
      opening: {
        time: '0–45 min',
        notes: ['Grapefruit Zest', 'Black Pepper', 'Juniper Berry'],
        icons: ['citrus', 'pepper', 'leaf'],
        description:
          'Bright and dry — a citrus-led entrance before the earth takes over.',
      },
      heart: {
        time: '45 min–5 hrs',
        notes: ['Smoked Vetiver', 'Cedarwood', 'Guaiac Wood'],
        icons: ['vetiver', 'sandalwood', 'leaf'],
        description:
          'The heart is smoke and earth — campfire-dry, complex, deeply rooted.',
      },
      drydown: {
        time: '5–10 hrs',
        notes: ['Khus Absolute', 'Oakmoss', 'Pale Amber'],
        icons: ['vetiver', 'resin', 'musk'],
        description:
          'Mineral, mossy, lingering — the smell of dry Rajasthani soil at dusk.',
      },
    },
    humidityNote:
      'Performs best in dry, arid climates. In humidity it can turn musty — apply lightly and let it breathe.',
    goodFor: ['Daily wear', 'Winter evenings', 'Travel / new cities'],
    pairedWith: [2, 3],
    reviews: [
      {
        name: 'Kabir T.',
        climate: 'Arid desert',
        skin: 'Dry',
        rating: 5,
        note: 'Wore it in Jaisalmer at 42°C. It got better as the day went on.',
      },
      {
        name: 'Suman R.',
        climate: 'Temperate',
        skin: 'Normal',
        rating: 4,
        note: 'Unusual and arresting. Takes courage to wear but worth it.',
      },
    ],
    provenance:
      'Rajasthani khus (Vetiveria zizanioides) is harvested in the pre-monsoon heat when roots reach peak oil content. Our cooperative uses smoke-curing over neem wood fires before distillation — introducing the distinctive smoky facet not present in Haitian or Sri Lankan vetiver. Steam-distilled over 18 hours. GC/MS oil content verified at minimum 47% khusimol.',
  },
  {
    id: 6,
    name: 'Marigold & Mitti',
    tagline: 'Petrichor accord with Kannauj mitti attar',
    price: 2800,
    sizes: ['Discovery 5ml — ₹580', '30ml — ₹2,800', '50ml — ₹4,400'],
    sizePrice: [580, 2800, 4400],
    topNotes: ['Marigold', 'Wet Earth', 'Rain'],
    family: 'Bright & Citrus',
    intensity: 'Light',
    longevity: '4–6 hrs',
    batchCode: 'MMT-2024-0706',
    harvestDate: 'July 2024',
    origin: 'Kannauj, U.P.',
    image:
      'https://images.unsplash.com/photo-1602070945737-067cfd04174c?w=600&h=800&fit=crop&auto=format',
    timeline: {
      opening: {
        time: '0–30 min',
        notes: ['Marigold Absolute', 'Petrichor', 'Green Tomato Leaf'],
        icons: ['flower', 'leaf', 'leaf'],
        description:
          'Vivid, vegetal, alive — exactly what India smells like the second before rain.',
      },
      heart: {
        time: '30 min–3 hrs',
        notes: ['Mitti Attar', 'Wet Clay', 'Galbanum'],
        icons: ['root', 'resin', 'leaf'],
        description:
          'The mitti opens — warm baked-earth absolute, unmistakably Indian.',
      },
      drydown: {
        time: '3–6 hrs',
        notes: ['White Sandalwood', 'Cardamom', 'Ambrette'],
        icons: ['sandalwood', 'spice', 'musk'],
        description: 'Warm, gentle, skin-like. Fades softly without abruptness.',
      },
    },
    humidityNote:
      'Made for monsoon season — wear it when it rains and thank us later.',
    goodFor: ['Daily wear', 'Monsoon', 'Travel / new cities', 'Gift'],
    pairedWith: [1, 4],
    reviews: [
      {
        name: 'Deepa K.',
        climate: 'Humid coastal',
        skin: 'Normal',
        rating: 5,
        note: 'Smells like the first rain on hot tar. Pure nostalgia in a bottle.',
      },
      {
        name: 'Arnav P.',
        climate: 'Temperate',
        skin: 'Warm/oily',
        rating: 4,
        note: 'Light but distinctive. Perfect for every day without being boring.',
      },
    ],
    provenance:
      'Mitti attar is one of the rarest materials in Indian perfumery — baked earth clay from Kannauj kilns steam-distilled with vapour absorbed into sandalwood oil over 24 hours. No synthetic geosmin substitutes. Marigold absolute sourced from Rajasthan winter harvest.',
  },
  {
    id: 7,
    name: 'Darjeeling Oolong',
    tagline: 'First-flush Darjeeling tea absolute, bergamot, cedar',
    price: 3200,
    sizes: ['Discovery 5ml — ₹650', '30ml — ₹3,200', '50ml — ₹5,100'],
    sizePrice: [650, 3200, 5100],
    topNotes: ['Darjeeling Tea', 'Bergamot', 'Lemon Verbena'],
    family: 'Bright & Citrus',
    intensity: 'Light',
    longevity: '5–7 hrs',
    batchCode: 'DJO-2024-0403',
    harvestDate: 'April 2024',
    origin: 'Darjeeling, West Bengal',
    image:
      'https://images.unsplash.com/photo-1760920250029-36af9369a0bb?w=600&h=800&fit=crop&auto=format',
    timeline: {
      opening: {
        time: '0–60 min',
        notes: ['First-flush Tea', 'Bergamot', 'Lemon Verbena'],
        icons: ['leaf', 'citrus', 'citrus'],
        description:
          'Crisp and aromatic — muscatel-forward, the scent of a fresh-poured Darjeeling.',
      },
      heart: {
        time: '60 min–4 hrs',
        notes: ['Tea Absolute', 'White Pepper', 'Iris Root'],
        icons: ['leaf', 'pepper', 'root'],
        description:
          'Powdery-tea heart — iris adds a cool, almost violet nuance.',
      },
      drydown: {
        time: '4–7 hrs',
        notes: ['Cedarwood', 'White Musk', 'Cashmeran'],
        icons: ['sandalwood', 'musk', 'resin'],
        description:
          'Soft woody-clean base — unisex, easy, wears without demanding attention.',
      },
    },
    humidityNote:
      'Works in all climates. In dry heat the bergamot holds longer; in humidity it leans more powdery-tea.',
    goodFor: ['Daily wear', 'Travel / new cities', 'Gift'],
    pairedWith: [1, 6],
    reviews: [
      {
        name: 'Nandini G.',
        climate: 'Temperate hill station',
        skin: 'Normal',
        rating: 5,
        note: 'Unmistakably Darjeeling. Got stopped twice on a trek to be asked what I was wearing.',
      },
      {
        name: 'Ishan M.',
        climate: 'Arid',
        skin: 'Dry',
        rating: 4,
        note: "Subtle but long-lasting. A thinking person's everyday fragrance.",
      },
    ],
    provenance:
      'First-flush Darjeeling tea produces the lowest-yield, highest-price leaves with the signature muscatel character. We solvent-extract the absolute directly from dry-leaf material at a specialist facility in Siliguri. No synthetic tea shortcut. Bergamot cold-pressed from Calabrian peel.',
  },
  {
    id: 8,
    name: 'Amber & Cardamom',
    tagline: 'Warm spice accord, Keralan black cardamom base',
    price: 4600,
    sizes: ['Discovery 5ml — ₹920', '30ml — ₹4,600', '50ml — ₹7,300'],
    sizePrice: [920, 4600, 7300],
    topNotes: ['Black Cardamom', 'Clove', 'Orange Peel'],
    family: 'Deep Amber',
    intensity: 'Rich',
    longevity: '9–11 hrs',
    batchCode: 'ACK-2023-1210',
    harvestDate: 'December 2023',
    origin: 'Idukki, Kerala',
    image:
      'https://images.unsplash.com/photo-1635796353041-9215878d903e?w=600&h=800&fit=crop&auto=format',
    timeline: {
      opening: {
        time: '0–45 min',
        notes: ['Black Cardamom', 'Clove Bud', 'Blood Orange'],
        icons: ['spice', 'spice', 'citrus'],
        description:
          'Warm and spiced — the smoke of black cardamom with a bright citrus top.',
      },
      heart: {
        time: '45 min–6 hrs',
        notes: ['Labdanum Amber', 'Davana', 'Cinnamon Bark'],
        icons: ['resin', 'flower', 'spice'],
        description:
          'Ambered-spice core — rich, resinous, golden without being sweet.',
      },
      drydown: {
        time: '6–11 hrs',
        notes: ['Benzoin', 'Musk', 'Vanilla Pod'],
        icons: ['resin', 'musk', 'musk'],
        description:
          'Balsamic and warm — comfort-scent without the cliché sweetness.',
      },
    },
    humidityNote:
      'In high humidity, the spice reads louder. A lighter application is recommended for coastal wearing.',
    goodFor: ['Special occasions', 'Winter evenings', 'Gift'],
    pairedWith: [3, 2],
    reviews: [
      {
        name: 'Pooja L.',
        climate: 'Dry temperate',
        skin: 'Warm/dry',
        rating: 5,
        note: 'The most wearable warm spice I have tried. Not a single sharp moment.',
      },
      {
        name: 'Rahul V.',
        climate: 'Cold winter',
        skin: 'Normal',
        rating: 5,
        note: 'Winter evenings scent. The amber in the drydown is extraordinary.',
      },
    ],
    provenance:
      'Keralan black cardamom from Idukki district grows at 1,200–1,800m altitude with a distinctive smoky camphor character absent in green cardamom. Hand-selected pods, shade-dried, steam-distilled whole. Labdanum absolute sourced from Cistus labdaniferus resin — hand-gathered from wild plants in Andalusia, not synthetic amber accord.',
  },
]
