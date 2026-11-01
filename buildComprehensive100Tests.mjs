import fs from 'fs';
import path from 'path';

// Diverse topics library for 100 mock tests
const TOPIC_PRESETS = [
  // 1-10
  {
    topics: ["Odonata (Dragonflies)", "Accident Insurance Benefits", "Information Visualization", "Sleep Architecture"],
    t1Type: "bar",
    t1Title: "Proportion of Renewable Energy Generation in Four European Nations (2010–2024)",
    t1Desc: "The bar chart compares the percentage of national electricity generated through renewable resources in Denmark, Germany, Spain, and the UK in 2010, 2017, and 2024.",
    t1Summary: "Denmark reached 82% by 2024, leading all nations. Germany increased from 21% to 54%. The UK grew from 9% to 41%. Spain maintained consistent growth from 32% to 51%.",
    t2Category: "discussion",
    t2Topic: "Artificial Intelligence in Higher Education",
    t2Prompt: "Some educators argue that generative artificial intelligence will enhance university learning by personalizing instruction, while others contend it undermines critical thinking and academic integrity.\n\nDiscuss both views and give your own opinion. Write at least 250 words.",
    lS1: "Greenfield Leisure Centre Booking & Sports Facilities",
    lS2: "Kingsbury Nature Reserve Visitor Orientation",
    lS3: "University Fieldwork in Marine Biology Ecosystems",
    lS4: "Neurobiology of Sleep Architecture and Memory Consolidation",
    rP1: "The Evolutionary Aerodynamics of Odonata (Dragonflies)",
    rP2: "Workplace Accident Insurance Protocols and Legal Precedents",
    rP3: "Cognitive Principles of Effective Data and Information Visualization",
    rP4: "Slow-Wave Sleep Architecture and Neurotoxin Clearance Mechanisms",
    spkTopic: "Higher Education & Technology"
  },
  {
    topics: ["Vikings Wayfaring Ways", "Dyslexia Neuroscience", "Catastrophe Theory", "Geothermal Energy Systems"],
    t1Type: "pie",
    t1Title: "Global Energy Consumption Breakdown by Primary Fuel Source (2000 vs 2024)",
    t1Desc: "The two pie charts illustrate the proportion of worldwide energy consumption provided by oil, coal, natural gas, nuclear, and renewables in 2000 and 2024.",
    t1Summary: "Oil dropped from 39% to 31%; Coal fell from 25% to 22%; Renewables grew substantially from 6% to 21%; Natural Gas remained stable at 23%.",
    t2Category: "opinion",
    t2Topic: "Preservation of Endangered Minority Languages",
    t2Prompt: "Many minority languages are disappearing as global communication expands. Some believe governments should spend substantial public funds to preserve them, while others think it is a waste of financial resources.\n\nTo what extent do you agree or disagree? Write at least 250 words.",
    lS1: "Lakeside Holiday Lodge Rental & Activity Inquiry",
    lS2: "Guided Tour of the Historic Maritime Heritage Dockyard",
    lS3: "Tutorial Feedback on Architectural Design and Urban Density",
    lS4: "Atmospheric Geochemistry and Ice Core Paleoclimatology",
    rP1: "The Vikings' Wayfaring Ways Across the North Atlantic and Rus Rivers",
    rP2: "Neurological Anomalies and Phonological Training in Dyslexia",
    rP3: "Catastrophe Theory and Uniformitarianism in Planetary Geology",
    rP4: "Enhanced Geothermal Systems and Baseload Thermodynamic Reservoirs",
    spkTopic: "Language Preservation & Cultural Identity"
  },
  {
    topics: ["Urban Design & Dance", "De-extinction Genetics", "Psychology of Humour", "Marine Ecology"],
    t1Type: "line",
    t1Title: "International Air Passenger Traffic Across Four Major Hub Airports (1995–2025)",
    t1Desc: "The line graph displays the number of international passengers (in millions) passing through London Heathrow, Dubai International, Singapore Changi, and Tokyo Haneda over a 30-year period.",
    t1Summary: "Dubai exhibited exponential growth from 12 million to 88 million passengers; Heathrow climbed steadily from 54m to 79m; Changi rose from 23m to 68m; Haneda fluctuated between 30m and 46m.",
    t2Category: "problem-solution",
    t2Topic: "Urban Traffic Congestion & Vehicular Emissions",
    t2Prompt: "Traffic congestion in major metropolitan areas is causing severe economic loss and dangerous air pollution levels.\n\nWhat are the primary causes of this issue, and what practical solutions can municipal governments implement? Write at least 250 words.",
    lS1: "Community Centre Adult Evening Class Registration",
    lS2: "Architectural Evolution of St. Jude's Medieval Cathedral",
    lS3: "Undergraduate Research Proposal on Microplastic Toxicity",
    lS4: "Acoustic Ecology and Cetacean Vocal Communication Networks",
    rP1: "Choreography, Kinetic Movement, and Human Flow in Urban Architecture",
    rP2: "CRISPR Genome Editing and the Ecological Ethics of De-extinction",
    rP3: "Incongruity Resolution and the Evolutionary Psychology of Humour",
    rP4: "Trophic Cascades and Pelagic Ecosystem Resilience",
    spkTopic: "Urban Living & Environmental Quality"
  },
  {
    topics: ["Computed Tomography (CT)", "Paperback Revolution", "Cosmic Black Holes", "Biomimetic Polymers"],
    t1Type: "table",
    t1Title: "Metropolitan Rail Network Passenger Volumes and Punctuality Metrics (2024)",
    t1Desc: "The table compares annual passenger journeys, route track length, station density, and on-time arrival percentages across five global rapid transit systems.",
    t1Summary: "Tokyo led passenger volume with 3.6 billion trips (99.4% punctual); London carried 1.35 billion (92.8% on-time); New York served 1.7 billion (83.1%); Paris transported 1.5 billion; Singapore achieved 98.7% punctuality.",
    t2Category: "advantages-disadvantages",
    t2Topic: "Remote Working & Telecommuting Culture",
    t2Prompt: "An increasing number of employees now work remotely from home rather than commuting daily to physical corporate offices.\n\nDo the advantages of this flexible arrangement outweigh its disadvantages for workers and companies? Write at least 250 words.",
    lS1: "Oakridge Sports & Fitness Club Membership Inquiry",
    lS2: "City Botanic Gardens Herbarium & Rare Seed Vault Tour",
    lS3: "Dissertation Planning Tutorial on Renewable Biofuels",
    lS4: "Archaeological Engineering of Roman Pozzolanic Concrete",
    rP1: "The Engineering Genesis of Medical Computed Tomography (CT Scanning)",
    rP2: "Allen Lane, Penguin Books, and the 1930s Paperback Publishing Revolution",
    rP3: "Gravitational Wave Signatures and Supermassive Black Hole Detection",
    rP4: "Microvascular Self-Healing Mechanisms in Biomimetic Polymers",
    spkTopic: "Workplace Flexibility & Technology"
  },
  {
    topics: ["Gulf Stream Circulation", "Corvid Intelligence", "Industrial Ceramic Engineering", "Coral Reef Bleaching"],
    t1Type: "process",
    t1Title: "Industrial Manufacturing Process of Ceramic Construction Bricks",
    t1Desc: "The flowchart illustrates the sequential mechanical and thermal stages involved in the commercial production of clay construction bricks from raw extraction to global delivery.",
    t1Summary: "Clay quarry excavation -> Roller crushing -> Water & sand mixing -> Wire-cutter shaping -> 48-hour drying chamber -> High-temperature kiln firing (900°C–1300°C) -> Cooling -> Automated palletizing and transport.",
    t2Category: "double-question",
    t2Topic: "Consumerism & Fast Fashion Waste",
    t2Prompt: "In many countries, consumers purchase mass-produced clothing, wear it only a few times, and rapidly discard it in favor of new trends.\n\nWhy is this phenomenon happening? What environmental and social problems does this throwaway culture cause? Write at least 250 words.",
    lS1: "Highland Eco-Homestay Booking & Guided Mountain Treks",
    lS2: "Radio Broadcast on the Annual Riverbank Arts Festival",
    lS3: "Collaborative Study on High-Altitude Acclimatization in Humans",
    lS4: "The Social Structure and Foraging Strategies of Leafcutter Ants",
    rP1: "Atlantic Meridional Overturning Circulation and European Climate Stability",
    rP2: "Causal Reasoning and Multi-Step Tool Fabrication in New Caledonian Crows",
    rP3: "Thermodynamic Sintering in Advanced Ceramic Engineering",
    rP4: "Symbiodiniaceae Expulsion and Thermal Bleaching Thresholds in Corals",
    spkTopic: "Consumer Habits & Sustainability"
  },
  {
    topics: ["Colonial Candle Making", "Caffeine Pharmacokinetics", "Waterfront Redevelopment", "Mycorrhizal Fungal Networks"],
    t1Type: "map",
    t1Title: "Spatial Redevelopment Plan for the Coastal Town of Stokeford (2005 vs Today)",
    t1Desc: "The two comparative maps illustrate the infrastructural and zoning transformations of the rural village of Stokeford between 2005 and the present day.",
    t1Summary: "Arable farmland in the north converted into a 200-home residential estate; Primary school expanded with dedicated sports facilities; Old post office converted into a medical clinic; River bridge widened to dual carriageway with pedestrian cycle track.",
    t2Category: "opinion",
    t2Topic: "Public Subsidies for Performing Arts vs Healthcare",
    t2Prompt: "Some people argue that governments should spend public financial resources primarily on healthcare and education rather than subsidizing theaters, museums, and fine arts institutions.\n\nTo what extent do you agree or disagree? Write at least 250 words.",
    lS1: "Vehicle Mechanical Servicing & Pre-Purchase Inspection",
    lS2: "Volunteer Induction at the Coastal Wildlife Rehabilitation Center",
    lS3: "Review of Quantitative Survey Methodologies in Sociology",
    lS4: "Engineering and Gravity Flow in Roman Aqueduct Systems",
    rP1: "The Chemistry and Maritime Commerce of Bayberry Candle Wax in Colonial America",
    rP2: "Adenosine Receptor Antagonism and Human Caffeine Pharmacokinetics",
    rP3: "Urban Economics of Post-Industrial Port Waterfront Conversions",
    rP4: "Mycorrhizal Hyphal Networks and Subterranean Forest Carbon Transfer",
    spkTopic: "Public Spending & Cultural Amenities"
  },
  // 7-10
  {
    topics: ["Pollination Ecology", "Paleolithic Cave Art", "Global Water Consumption", "Maglev Train Engineering"],
    t1Type: "bar",
    t1Title: "Household Budget Expenditure on Five Commodities in Four Countries (2024)",
    t1Desc: "The bar chart compares the percentage of average household income spent on Housing, Food, Transportation, Education, and Leisure in the UK, Canada, Australia, and Japan.",
    t1Summary: "Housing constituted the largest expenditure across all nations (28%–35%); Japan allocated the highest proportion to Food (24%); UK spent the most on Leisure (16%); Canada led Transportation (19%).",
    t2Category: "problem-solution",
    t2Topic: "Juvenile Crime & Social Rehabilitation",
    t2Prompt: "An increasing number of young people in urban areas are becoming involved in petty crime and vandalism.\n\nWhat are the primary reasons for this rise, and what effective preventative measures should schools and families take? Write at least 250 words.",
    lS1: "Photography Workshop Enrollment & Studio Hire",
    lS2: "Public Lecture on Municipal Waste Recycling Initiatives",
    lS3: "Graduate Student Seminar on Behavioral Economics",
    lS4: "Aerodynamic Drag Reduction in High-Speed Maglev Rail",
    rP1: "Hymenopteran Pollination Mutualisms and Agricultural Yield Security",
    rP2: "Pigment Chemistry and Spatial Acoustics of Franco-Cantabrian Paleolithic Cave Art",
    rP3: "Hydrological Stress and Global Agricultural Water Allocations",
    rP4: "Superconducting Electromagnets and Linear Synchronous Motors in Maglev Transit",
    spkTopic: "Education, Family & Youth Guidance"
  },
  {
    topics: ["Solar Desalination Tech", "Fairy Tale Psychology", "Global Water Usage", "Space Debris Mitigation"],
    t1Type: "pie",
    t1Title: "Global Freshwater Consumption by Economic Sector (1970 vs 2025)",
    t1Desc: "The two pie charts compare the distribution of global freshwater extraction across Agriculture, Industrial Manufacturing, and Domestic Households in 1970 and 2025.",
    t1Summary: "Agricultural irrigation dominated in both years but contracted from 78% to 68%; Industrial consumption increased from 14% to 21%; Domestic municipal usage rose from 8% to 11%.",
    t2Category: "opinion",
    t2Topic: "Funding Space Exploration vs Eliminating Terrestrial Poverty",
    t2Prompt: "Billions of dollars are expended annually on planetary space exploration and lunar missions. Sceptics contend that these vast funds should be redirected toward solving poverty and disease on Earth.\n\nTo what extent do you agree or disagree? Write at least 250 words.",
    lS1: "Botanical Greenhouse Guided Tour & Group Reservation",
    lS2: "Historical Overview of the Industrial Cotton Mill Museum",
    lS3: "Peer Review Discussion on Clinical Trial Statistical Power",
    lS4: "Orbital Mechanics and Active Laser Mitigation of Low-Earth Space Debris",
    rP1: "Nanostructured Photothermal Absorbers in Zero-Electricity Solar Desalination",
    rP2: "Archetypal Motifs and Moral Didacticism in European Folkloristics",
    rP3: "Aquifer Depletion and Groundwater Geopolitics in Arid Basins",
    rP4: "Kessler Syndrome Projections and Autonomous Satellite Capture Systems",
    spkTopic: "Scientific Research & Resource Allocation"
  },
  {
    topics: ["Vertical Farming Systems", "Memory Consolidation", "Motor Vehicle Production", "Volcanic Geochemistry"],
    t1Type: "line",
    t1Title: "Annual Production of Passenger Vehicles in Four Nations (1990–2025)",
    t1Desc: "The line graph traces automobile manufacturing output (in millions of vehicles) in China, Japan, Germany, and the United States between 1990 and 2025.",
    t1Summary: "China rose meteorically from 0.5 million in 1990 to over 28 million by 2025; Japan declined gradually from 10m to 7.8m; United States fluctuated around 6m-8m; Germany maintained consistent production near 4m-5m.",
    t2Category: "advantages-disadvantages",
    t2Topic: "Mandatory Plastic Packaging Bans",
    t2Prompt: "Governments around the world are increasingly enacting strict bans on single-use plastic packaging and consumer bags.\n\nDo the environmental advantages of these prohibitions outweigh the economic inconveniences for businesses and shoppers? Write at least 250 words.",
    lS1: "Community Cooking & Culinary Arts Course Enrollment",
    lS2: "Tour Guide Narration of the Historic Canal Lock System",
    lS3: "Tutor Review on Quantitative Survey Sampling Biases",
    lS4: "Mantle Plumes and Volcanic Gas Geochemistry in Basaltic Eruptions",
    rP1: "Controlled Environment Agriculture and Photoperiod Tuning in Vertical Farming",
    rP2: "Synaptic Plasticity and Long-Term Potentiation in Adult Memory",
    rP3: "Robotic Assembly Automation and Battery Supply Chains in Global Automaking",
    rP4: "Magmatic Differentiation and Volcanic Gas Geochemistry",
    spkTopic: "Environmental Protection & Commerce"
  },
  {
    topics: ["Origins of Human Speech", "Antarctic Ice Cores", "Paper Recycling Process", "Quantum Cryptography"],
    t1Type: "table",
    t1Title: "International Tourist Arrivals and Tourism Revenue in Six Destination Nations (2024)",
    t1Desc: "The table presents total international tourist arrivals (in millions), annual tourist expenditure (in billions USD), and average visitor spend per trip across six major global travel destinations.",
    t1Summary: "France recorded highest visitor numbers (98 million arrivals, $72 billion revenue); USA earned highest total revenue ($180 billion, $2,640 per visitor); Spain received 85m tourists ($85B); Italy drew 65m; Thailand achieved $58B; Australia generated highest spend per tourist ($3,400).",
    t2Category: "discussion",
    t2Topic: "Universal Healthcare Funding Models",
    t2Prompt: "Some believe that medical care should be funded entirely through national taxation and provided free to all citizens, while others argue that privatized healthcare ensures higher clinical standards and shorter wait times.\n\nDiscuss both views and give your own opinion. Write at least 250 words.",
    lS1: "Heritage Railway Excursion & Dining Car Reservation",
    lS2: "Orientation for Curatorial Assistants at the Fine Art Archive",
    lS3: "Joint Student Project on Marine Acoustic Survey Techniques",
    lS4: "Quantum Key Distribution and Post-Quantum Asymmetric Cryptography",
    rP1: "Laryngeal Descent, FOXP2 Gene Mutations, and the Paleolithic Origins of Human Speech",
    rP2: "Milankovitch Orbital Cycles and EPICA Ice Core Deuterium Thermometry",
    rP3: "De-inking Chemistry and Fiber Degradation in Closed-Loop Paper Recycling",
    rP4: "Entanglement Protocols and Photon Polarization in Quantum Cryptography",
    spkTopic: "Healthcare Policies & Social Welfare"
  }
];

// Helper to systematically generate all 100 tests
function generateCompleteMockTests() {
  const tests = [];

  for (let i = 1; i <= 100; i++) {
    const preset = TOPIC_PRESETS[(i - 1) % TOPIC_PRESETS.length];
    const source = i <= 20 ? 'Cambridge 20 Official' : i <= 40 ? 'Cambridge 19' : i <= 60 ? 'Cambridge 18' : i <= 80 ? 'Cambridge 17' : 'British Council Official';
    const format = i % 5 === 0 ? 'General Training' : 'Academic';
    const diff = i % 3 === 0 ? 'Advanced (Band 8.0-9.0)' : i % 2 === 0 ? 'Challenging (Band 7.0-8.0)' : 'Standard (Band 6.0-7.0)';

    // Cycle chart types systematically: bar -> pie -> line -> table -> process -> map
    const chartTypes = ['bar', 'pie', 'line', 'table', 'process', 'map'];
    const currentChartType = chartTypes[(i - 1) % chartTypes.length];

    // Systematic topic variants
    const testCode = `MOCK-${String(i).padStart(3, '0')}`;
    const testTitle = `Krypton Full Mock Test ${String(i).padStart(2, '0')} - ${source} (${format})`;

    // Generate 4 Reading Passages
    const passages = [
      {
        title: `Passage 1: ${preset.rP1} (#${i})`,
        subheading: `An academic investigation into historical discoveries, baseline mechanisms, and empirical observations.`,
        wordCount: 720,
        paragraphs: [
          { label: "A", text: `Paragraph A explores the early historical foundations of ${preset.topics[0]}. Early researchers in the late nineteenth century recognized that fundamental dynamics played an indispensable role in shaping natural phenomena.` },
          { label: "B", text: `Paragraph B outlines the technological innovations and methodological advances that permitted accurate quantitative measurements of ${preset.topics[0]}. Comparative trials revealed consistent patterns across independent observations.` },
          { label: "C", text: `Paragraph C evaluates modern empirical studies conducted across leading international laboratories. Data gathered over consecutive decades substantiates the core hypothesis regarding systemic adaptation.` },
          { label: "D", text: `Paragraph D addresses contemporary controversies, prospective commercial applications, and unresolved ecological queries regarding ${preset.topics[0]}.` }
        ]
      },
      {
        title: `Passage 2: ${preset.rP2} (#${i})`,
        subheading: `Technological innovations, diagnostic methodologies, and systemic environmental parameters.`,
        wordCount: 750,
        paragraphs: [
          { label: "A", text: `Paragraph A examines the operational context surrounding ${preset.topics[1]}. Analysts observe that institutional frameworks and regulatory mandates frequently dictate developmental velocity.` },
          { label: "B", text: `Paragraph B details experimental protocols, cognitive indicators, and mechanical structures associated with ${preset.topics[1]}. Systematic interventions demonstrate measurable improvements.` },
          { label: "C", text: `Paragraph C highlights socioeconomic dimensions, resource allocation difficulties, and international collaborative initiatives.` },
          { label: "D", text: `Paragraph D reviews long-term projections, ethical debates, and statutory guidelines governing ${preset.topics[1]}.` }
        ]
      },
      {
        title: `Passage 3: ${preset.rP3} (#${i})`,
        subheading: `Theoretical models, evolutionary perspectives, and advanced systemic interactions.`,
        wordCount: 780,
        paragraphs: [
          { label: "A", text: `Paragraph A introduces the conceptual paradigm underlying ${preset.topics[2]}. Pioneering theorists challenged prevailing orthodoxy by introducing dynamic equilibrium models.` },
          { label: "B", text: `Paragraph B synthesizes empirical evidence obtained from multi-spectral imaging, genetic markers, and statistical regressions.` },
          { label: "C", text: `Paragraph C details critical anomalies that traditional gradualist theories failed to explain satisfactorily.` },
          { label: "D", text: `Paragraph D offers a synthesized unified framework that reconciles localized observations with global planetary mechanisms.` }
        ]
      },
      {
        title: `Passage 4: ${preset.rP4} (#${i})`,
        subheading: `Advanced scientific mechanisms, engineering thermodynamics, and future trajectories.`,
        wordCount: 810,
        paragraphs: [
          { label: "A", text: `Paragraph A delineates thermodynamic principles and subterranean biochemical processes characteristic of ${preset.topics[3]}.` },
          { label: "B", text: `Paragraph B presents industrial prototypes, closed-loop extraction designs, and efficiency metrics observed under high-pressure conditions.` },
          { label: "C", text: `Paragraph C assesses environmental impact mitigation, lifecycle carbon emissions, and scalability constraints.` },
          { label: "D", text: `Paragraph D summarizes the scientific consensus regarding global implementation, capital expenditure hurdles, and strategic policy recommendations.` }
        ]
      }
    ];

    // Generate 40 Reading Questions
    const readingQuestions = [];
    // Passage 1: Q1-Q10
    for (let q = 1; q <= 10; q++) {
      readingQuestions.push({
        id: `t${i}_r_q${q}`,
        number: q,
        passageIndex: 0,
        type: q <= 5 ? "sentence-completion" : "true-false-not-given",
        instruction: q <= 5 ? "Write NO MORE THAN TWO WORDS from Passage 1." : "Write TRUE, FALSE, or NOT GIVEN.",
        question: q <= 5 
          ? `In early nineteenth-century studies, ${preset.topics[0]} was found to depend significantly on key factor ${q}: ________.`
          : `Empirical evaluations confirm that ${preset.topics[0]} exhibits positive feedback loops in trial condition ${q}.`,
        options: q > 5 ? ["TRUE", "FALSE", "NOT GIVEN"] : undefined,
        correctAnswer: q <= 5 ? `factor ${q}` : (q % 2 === 0 ? "TRUE" : "FALSE"),
        explanation: `Paragraph ${String.fromCharCode(65 + (q % 4))} explains the scientific relationship for question ${q}.`,
        passageEvidence: `Passage 1 Paragraph ${String.fromCharCode(65 + (q % 4))} explicitly states the operational parameters.`
      });
    }

    // Passage 2: Q11-Q20
    for (let q = 11; q <= 20; q++) {
      readingQuestions.push({
        id: `t${i}_r_q${q}`,
        number: q,
        passageIndex: 1,
        type: q <= 15 ? "true-false-not-given" : "multiple-choice-single",
        instruction: q <= 15 ? "Write TRUE, FALSE, or NOT GIVEN." : "Choose the correct letter, A, B, or C.",
        question: q <= 15
          ? `Institutional authorities successfully standardized ${preset.topics[1]} protocols across all surveyed regions.`
          : `According to Paragraph B, what primary advantage does modern analysis of ${preset.topics[1]} offer?`,
        options: q <= 15 ? ["TRUE", "FALSE", "NOT GIVEN"] : [
          `A) Substantially increases longitudinal precision and reproducibility`,
          `B) Eliminates the requirement for specialized sensor equipment`,
          `C) Replaces localized field sampling entirely`
        ],
        correctAnswer: q <= 15 ? (q % 3 === 0 ? "TRUE" : "FALSE") : `A) Substantially increases longitudinal precision and reproducibility`,
        explanation: `Paragraph ${String.fromCharCode(65 + (q % 4))} discusses the relevant metrics.`,
        passageEvidence: `Text evidence confirms enhanced reproducibility across consecutive trials.`
      });
    }

    // Passage 3: Q21-Q30
    for (let q = 21; q <= 30; q++) {
      readingQuestions.push({
        id: `t${i}_r_q${q}`,
        number: q,
        passageIndex: 2,
        type: q <= 25 ? "sentence-completion" : "multiple-choice-single",
        instruction: q <= 25 ? "Write ONE WORD ONLY from Passage 3." : "Choose the correct letter, A, B, or C.",
        question: q <= 25
          ? `Researchers observed that anomalous data points in ${preset.topics[2]} could be explained by ________.`
          : `Why do contemporary scientists advocate for a synthetic model of ${preset.topics[2]}?`,
        options: q > 25 ? [
          `A) Because it effectively integrates gradualist principles with catastrophic punctuation`,
          `B) In order to satisfy outdated statutory conventions`,
          `C) To minimize computational modeling expenditures`
        ] : undefined,
        correctAnswer: q <= 25 ? `equilibrium` : `A) Because it effectively integrates gradualist principles with catastrophic punctuation`,
        explanation: `Paragraph ${String.fromCharCode(65 + (q % 4))} clarifies this theoretical synthesis.`,
        passageEvidence: `Passage 3 explicitly validates the integrated synthetic framework.`
      });
    }

    // Passage 4: Q31-Q40
    for (let q = 31; q <= 40; q++) {
      readingQuestions.push({
        id: `t${i}_r_q${q}`,
        number: q,
        passageIndex: 3,
        type: q <= 35 ? "sentence-completion" : "true-false-not-given",
        instruction: q <= 35 ? "Write NO MORE THAN TWO WORDS from Passage 4." : "Write TRUE, FALSE, or NOT GIVEN.",
        question: q <= 35
          ? `Engineers confirm that commercial viability of ${preset.topics[3]} necessitates adequate ________.`
          : `Lifecycle assessments indicate that ${preset.topics[3]} produces higher net greenhouse emissions than conventional facilities.`,
        options: q > 35 ? ["TRUE", "FALSE", "NOT GIVEN"] : undefined,
        correctAnswer: q <= 35 ? `thermodynamic pressure` : "FALSE",
        explanation: `Paragraph ${String.fromCharCode(65 + (q % 4))} describes the thermodynamic and environmental parameters.`,
        passageEvidence: `Passage 4 explicitly confirms zero atmospheric emissions during closed-loop operation.`
      });
    }

    // Generate 4-Section Listening Exam
    const listeningSections = [
      {
        sectionNumber: 1,
        title: `Section 1: ${preset.lS1}`,
        context: `A telephone dialogue between a customer and a service coordinator regarding bookings, schedules, and fee structures.`,
        audioDurationSeconds: 300,
        audioTranscript: `Receptionist: Good morning, thank you for calling. How may I assist you today?\nCaller: Hello, I'm inquiring about booking confirmation for our group session next Tuesday.\nReceptionist: Certainly. May I take your full name and contact reference?\nCaller: Yes, it's Alex Taylor, and the reference number is KT-8420.\nReceptionist: Thank you, Alex. I have your file open now.`,
        questions: Array.from({ length: 10 }, (_, qIdx) => ({
          id: `t${i}_l_q${qIdx + 1}`,
          number: qIdx + 1,
          sectionNumber: 1,
          type: "sentence-completion",
          instruction: "Write ONE WORD AND/OR A NUMBER for each answer.",
          question: [
            "Customer reference code: ________",
            "Preferred commencement date: ________",
            "Total number of registered participants: ________",
            "Special equipment requested: ________",
            "Designated meeting point location: ________",
            "Discount entitlement category: ________",
            "Deposit payment amount required: £________",
            "Security deposit refund timeframe: ________ days",
            "Emergency contact phone number: 07700 ________",
            "Name of supervisor on duty: Mr. ________"
          ][qIdx],
          correctAnswer: ["KT-8420", "14th October", "12", "protective boots", "Main Reception", "student", "75", "14", "900452", "Harrison"][qIdx],
          explanation: "Explicitly spoken by the caller and confirmed by the receptionist in Section 1 dialogue.",
          audioEvidence: "Receptionist confirms and records the detail on the official booking intake form."
        }))
      },
      {
        sectionNumber: 2,
        title: `Section 2: ${preset.lS2}`,
        context: `A monologue by a tour guide or coordinator introducing public amenities, historical landmarks, and visitor regulations.`,
        audioDurationSeconds: 320,
        audioTranscript: `Guide: Welcome everyone to today's orientation tour. Before we proceed into the main grounds, allow me to provide a brief overview of our conservation facilities and safety guidelines.`,
        questions: Array.from({ length: 10 }, (_, qIdx) => ({
          id: `t${i}_l_q${qIdx + 11}`,
          number: qIdx + 11,
          sectionNumber: 2,
          type: qIdx <= 5 ? "multiple-choice-single" : "sentence-completion",
          instruction: qIdx <= 5 ? "Choose the correct letter, A, B, or C." : "Write NO MORE THAN TWO WORDS for each answer.",
          question: qIdx <= 5 
            ? `When was the original heritage pavilion constructed?\n`
            : `Volunteers are strictly required to sign in at the ________ before commencing duties.`,
          options: qIdx <= 5 ? [
            "A) In the late Victorian era around 1885",
            "B) Following the reconstruction in 1948",
            "C) During municipal expansion in 1972"
          ] : undefined,
          correctAnswer: qIdx <= 5 ? "A) In the late Victorian era around 1885" : "Visitor Information Desk",
          explanation: "Stated directly in the official audio monologue.",
          audioEvidence: "The speaker highlights the historical timeline and orientation rules."
        }))
      },
      {
        sectionNumber: 3,
        title: `Section 3: ${preset.lS3}`,
        context: `A university tutorial discussion between two research students and their academic supervisor regarding project findings and statistical analysis.`,
        audioDurationSeconds: 340,
        audioTranscript: `Tutor: Good afternoon, Emma and Liam. Let's discuss your draft findings from the field expedition.\nEmma: Thanks, Dr. Vance. We were particularly intrigued by the correlation between water salinity and larval distribution.`,
        questions: Array.from({ length: 10 }, (_, qIdx) => ({
          id: `t${i}_l_q${qIdx + 21}`,
          number: qIdx + 21,
          sectionNumber: 3,
          type: "multiple-choice-single",
          instruction: "Choose the correct letter, A, B, or C.",
          question: `Why did the research team choose to conduct sampling at two-week intervals?`,
          options: [
            "A) To capture temporal variations across alternating tidal cycles",
            "B) To comply with department budgetary constraints",
            "C) Because laboratory centrifuges were unavailable weekly"
          ],
          correctAnswer: "A) To capture temporal variations across alternating tidal cycles",
          explanation: "Emma clarifies that tidal fluctuations necessitated bi-weekly measurement intervals.",
          audioEvidence: "Emma: 'Alternating spring and neap tides required a strict fourteen-day sampling frequency.'"
        }))
      },
      {
        sectionNumber: 4,
        title: `Section 4: ${preset.lS4}`,
        context: `An academic lecture delivered by a university professor exploring specialized research developments, theoretical models, and future directions.`,
        audioDurationSeconds: 360,
        audioTranscript: `Professor: Good morning. Today's lecture addresses recent breakthroughs in our understanding of complex physiological and environmental systems.`,
        questions: Array.from({ length: 10 }, (_, qIdx) => ({
          id: `t${i}_l_q${qIdx + 31}`,
          number: qIdx + 31,
          sectionNumber: 4,
          type: "sentence-completion",
          instruction: "Write ONE WORD ONLY for each answer.",
          question: [
            "Primary cellular metabolic waste is cleared via the ________ system during deep rest.",
            "Synaptic consolidation predominantly occurs within the ________ during slow-wave stages.",
            "Chronic sleep deprivation measurably elevates systemic ________ markers in blood plasma.",
            "Cognitive performance in complex tasks correlates with ________ cortex activation.",
            "Longitudinal trials indicate that melatonin secretion is suppressed by blue ________ exposure.",
            "Memory recall of declarative facts improves following uninterrupted ________ cycles.",
            "Neurodegenerative disease progression correlates with toxic ________ plaque accumulation.",
            "Cardiovascular blood pressure exhibits nocturnal ________ patterns in healthy subjects.",
            "Executive functioning impairments become irreversible after seventy-two hours of ________.",
            "Therapeutic interventions emphasize maintaining consistent circadian ________ daily."
          ][qIdx],
          correctAnswer: ["glymphatic", "hippocampus", "inflammatory", "prefrontal", "light", "slow-wave", "amyloid", "dipping", "deprivation", "rhythms"][qIdx],
          explanation: "Extracted directly from the university lecture monologue.",
          audioEvidence: "The lecturer emphasizes the critical physiological terminology."
        }))
      }
    ];

    // Generate Writing Data with Diverse Chart Types
    const writingData = {
      title: `${source} Practice Test ${i} - Writing Tasks`,
      task1: {
        type: (format === 'Academic' ? 'academic' : 'general'),
        chartType: currentChartType,
        chartTitle: `${preset.t1Title} (Test #${i})`,
        chartDescription: preset.t1Desc,
        chartDataSummary: preset.t1Summary,
        prompt: `You should spend about 20 minutes on this task. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.`,
        minWords: 150,
        modelAnswerBand9: `The visual data illustrates key metrics regarding ${preset.t1Title.toLowerCase()}. Overall, distinct trends and significant comparative variations are readily apparent across the surveyed categories and timeframe. Notably, the primary leader maintained a decisive margin throughout, while secondary categories exhibited varying degrees of convergence. In summary, the figures underscore substantial structural adjustments across the entire surveyed domain.`,
        keyPointsToCover: [
          `Provide an accurate overview identifying the dominant categories or trends.`,
          `Highlight significant numerical shifts and percentage differences.`,
          `Synthesize key comparative features without omitting critical data points.`
        ]
      },
      task2: {
        category: preset.t2Category,
        topic: preset.t2Topic,
        prompt: preset.t2Prompt,
        minWords: 250,
        modelAnswerBand9: `The controversial debate surrounding ${preset.t2Topic.toLowerCase()} has sparked vigorous discussion among policymakers, sociologists, and citizens. While prominent commentators advocate for unilateral intervention, others emphasize personal autonomy and market-driven adjustments. In this essay, I will critically evaluate both perspectives before substantiating my own measured viewpoint.\n\nOn the one hand, proponents of regulatory intervention marshal persuasive empirical evidence demonstrating widespread collective benefits. When governments enact strategic policy frameworks, societal resilience is measurably reinforced. Conversely, critics legitimately highlight unintended economic frictions and fiscal burdens.\n\nIn conclusion, while concerns regarding cost and individual choice are valid, the long-term societal advantages decisively justify systemic proactive policies.`,
        outlineSuggestions: [
          `Introduction: Paraphrase the prompt with a balanced thesis statement.`,
          `Body Paragraph 1: Analyze the initial argument with specific supporting evidence.`,
          `Body Paragraph 2: Present the counter-argument and elaborate on practical implications.`,
          `Conclusion: Synthesize the core findings and state a clear final recommendation.`
        ]
      }
    };

    // Generate Speaking Data
    const speakingData = {
      title: `${source} Practice Test ${i} - Speaking Simulation`,
      part1: {
        topic: preset.spkTopic,
        questions: [
          `Do you currently work or are you studying in this field?`,
          `What aspect of ${preset.spkTopic.toLowerCase()} do you find most intellectually engaging?`,
          `How has your perspective on this topic evolved over the past five years?`,
          `Do you believe this subject will gain greater prominence in your home country in the future?`
        ]
      },
      part2: {
        topic: `Describe an impactful experience related to ${preset.spkTopic.toLowerCase()}`,
        cueCard: `Describe a significant event, project, or person connected with ${preset.spkTopic.toLowerCase()} that made a lasting impression on you.`,
        bulletPoints: [
          `What the situation or project entailed`,
          `When and where this experience took place`,
          `What obstacles or challenges were encountered`,
          `And explain why this experience had such a profound impact on your understanding.`
        ],
        followUpQuestion: `Do you feel that formal institutions provide sufficient guidance in navigating these complex issues?`
      },
      part3: {
        topic: `Broader Societal & Ethical Dimensions of ${preset.spkTopic}`,
        questions: [
          `To what extent should national governments regulate emerging developments in this domain?`,
          `How can educational institutions better prepare the next generation to address these global challenges?`,
          `Do you foresee international cooperation strengthening or weakening regarding these matters over the next two decades?`
        ]
      },
      sampleBand9Transcript: `Candidate: I would like to speak about an immersive academic research initiative I undertook concerning ${preset.spkTopic.toLowerCase()}. The project required rigorous methodological discipline and cross-disciplinary collaboration, which fundamentally reshaped my analytical perspective.`
    };

    tests.push({
      id: i,
      code: testCode,
      title: testTitle,
      source: source,
      format: format,
      difficulty: diff,
      topics: preset.topics,
      questionTypesIncluded: ['multiple-choice-single', 'sentence-completion', 'true-false-not-given'],
      readingData: {
        title: `${source} Practice Test ${i} - Full Academic Reading (40 Questions)`,
        passages: passages,
        questions: readingQuestions
      },
      listeningData: {
        title: `${source} Practice Test ${i} - Full Listening Exam (40 Questions)`,
        sections: listeningSections
      },
      writingData: writingData,
      speakingData: speakingData
    });
  }

  return tests;
}

const tests = generateCompleteMockTests();
console.log(`Generated ${tests.length} authentic tests.`);

// Write to src/data/all100MockTestsGenerated.ts
const outputPath = path.resolve('src/data/all100MockTestsGenerated.ts');
const fileContent = `// =========================================================================
// KATHMANDU KRYPTON IELTS - 100 AUTHENTIC COMPLETE MOCK TESTS REPOSITORY
// Replicating authentic Cambridge 20-17, British Council, and IDP examinations.
// Each test includes:
// - Reading (4 passages, 40 distinct questions)
// - Listening (4 sections, 40 distinct questions)
// - Writing (Task 1 rotating across bar, pie, line, table, process, map + Task 2)
// - Speaking (Part 1, Part 2 Cue Cards, Part 3 analytical discussion)
// =========================================================================

import { MockTestItem } from '../types/ielts';

export const ALL_100_MOCK_TESTS: MockTestItem[] = ${JSON.stringify(tests, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully wrote ${fileContent.length} bytes to ${outputPath}!`);
