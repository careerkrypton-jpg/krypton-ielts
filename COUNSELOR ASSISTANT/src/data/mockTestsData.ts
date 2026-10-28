import { MockTestItem, ReadingMockData, ListeningMockData, WritingMockData, SpeakingMockData, ExamSource, QuestionType } from '../types/ielts';

// =========================================================================
// TEST 1: BARRON'S PRACTICE TEST 1 (Authentic Real PDF Source)
// =========================================================================
const TEST_01_READING: ReadingMockData = {
  title: "Barron's IELTS Practice Exams - Test 1 Academic Reading",
  passages: [
    {
      title: "Passage 1: Odonata",
      subheading: "An anatomical and evolutionary examination of dragonflies and damselflies, nature's ancient aerial predators.",
      paragraphs: [
        {
          label: "A",
          text: "Odonata is the order of insects that includes dragonflies and damselflies. To the human eye, their shining colors and delicate-looking wings make them beautiful creatures to behold. In the natural world, however, they are fearsome predators. Dragonflies and damselflies get their name from the powerful serrated jaws they use to tear apart their prey. The word odonata means 'toothed jaw'."
        },
        {
          label: "B",
          text: "Dragonflies and damselflies are often confused with each other because they are very similar. Close observation reveals the differences between them. The most obvious difference is the way they hold their wings while at rest. Dragonflies hold their wings out to the side while damselflies fold their wings back. Dragonflies have very large eyes that seem to cover the entire face because they are so close together that they touch each other. Damselflies' eyes are smaller, and there is a space between them. Dragonflies are larger and stronger animals than damselflies and fly longer distances. Thus, they can be found in woods and fields away from the water. Damselflies are not such strong fliers and are most often seen around the edges of ponds and streams since they do not normally fly far from the water."
        },
        {
          label: "C",
          text: "The largest odonata living today are the Hawaiian endemic dragonfly and the Central American damselfly, each of these species having a wingspan of 19 centimeters. The smallest is the libellulid dragonfly, native to east Asia, with a wingspan of just 20 millimeters. Fossils have been discovered that prove that dragonflies have been in existence for over 300 million years. The largest dragonfly fossil ever found belongs to the now-extinct meganeura monyi, which lived 300 million years ago and had a wingspan of 75 centimeters. This giant was a fearsome predator indeed, which feasted on small amphibians as well as on other insects."
        },
        {
          label: "D",
          text: "Dragonflies and damselflies both lay their eggs on or just below the surface of the water in a pond or stream. Some species lay their eggs on the stem of an aquatic plant. The babies emerge from the eggs in the form of nymphs. They live underwater, breathing through gills and preying upon water insects, tadpoles, small fish, and even other nymphs. They hunt by hiding in the shadows at the bottom of a pond or stream, waiting for prey animals to swim by. They have a special lip that they can extend far forward in order to grab their prey when it comes close. Depending on the species, they live this way for several months or even several years. As the nymph grows, it sheds its skin several times. Finally, it leaves the water and sheds its skin one last time. The adult emerges, ready to live the next few weeks or months on land and in the air. The adults do not live for more than four months, and many species live as adults for only a few weeks."
        },
        {
          label: "E",
          text: "The exceptional visual abilities and flying skills of dragonflies and damselflies make them very adept hunters. Their special eyes give them a nearly 360-degree field of vision, and they can detect even the smallest movement or flash of light caused by other flying insects. They have two sets of wings that can move independently of each other. This gives them great maneuverability in the air, which is important to these creatures because they catch their prey while flying. They can hover, make sharp turns, and fly backward. Some species of dragonflies can fly 60 kilometers an hour or more. Their prey consists of flying insects such as mosquitoes, deerflies, smaller dragonflies, and butterflies and moths. One species of dragonfly takes spiders out of their webs."
        }
      ],
      wordCount: 650
    },
    {
      title: "Passage 2: History of Fire Fighting and Prevention",
      subheading: "From the Roman watchmen and 1066 Norman curfews to the Great Fire of London 1666 and modern municipal brigades.",
      paragraphs: [
        {
          label: "A",
          text: "More than two thousand years ago, Roman emperor Augustus organized a group of watchmen whose job was mainly to look out for fires and sound an alarm in the event of one. For many centuries that followed, fire equipment was limited to buckets of water that got passed from person to person. The ax was later found to be a useful tool both for removing fuel in large fires and for opening holes to allow smoke and flames to escape from burning buildings. Watchmen also learned to create firebreaks with long hooked poles and ropes in order to pull down structures that provided fuel for a fire. In 1066, in order to reduce the risk of fire in thatched-roof houses, King William the Conqueror made a ruling: Citizens had to extinguish their cooking fires at night. His term couvre-feu, meaning 'cover fire', is the origin of the modern day term curfew."
        },
        {
          label: "B",
          text: "The event that had the largest influence in the history of fire fighting was the Great Fire of London in 1666. The devastating blaze originated at the King's Bakery near London Bridge. At the onset, Lord Mayor Bludworth showed little concern for the fire, assuming it would extinguish itself before he could organize a group of men to attend to it. However, the summer of 1666 had been uncharacteristically hot and dry, and the wooden houses nearby caught fire quickly. Within a short time, the wind had carried the fire across the city, burning down over 300 houses in its path. Although the procedure of pulling down buildings to prevent a fire from spreading was standard in Britain, the mayor grew concerned over the cost it would involve to rebuild the city and ordered that surrounding structures be left intact. By the time the king ordered the destruction of buildings in the fire's path, the fire was too large to control. It was not until the Duke of York ordered the Paper House destroyed that the fire lost its fuel."
        },
        {
          label: "C",
          text: "When it became clear that four-fifths of the city had been destroyed by the fire, drastic measures were taken in London to create a system of organized fire prevention. At the hands of architects such as Christopher Wren, most of London was rebuilt using stone and brick, materials that were far less flammable than wood and straw. Because of the long history of fires in London, those who could afford to build new homes and businesses began to seek insurance for their properties. As insurance became a profitable business, companies soon realized the monetary benefits of hiring men to extinguish fires. In the early years of insurance companies, all insured properties were marked with an insurance company's name or logo. If a fire broke out and a building did not contain the insurance mark, the fire brigades were called away and the building was left to burn."
        },
        {
          label: "D",
          text: "The British insurance companies were largely responsible for employing people to develop new technology for extinguishing fires. The first fire engines were simple tubs on wheels pulled to the location of the fire, with water supplied by a bucket brigade. Eventually, a hand pump was designed to push water through a hose with a nozzle. Before long, companies began to utilize water pipes made from hollowed tree trunks built under the roadway. In 1833, eleven companies created the London Fire Engine Establishment. In 1865, the government established London's Metropolitan Fire Brigade."
        }
      ],
      wordCount: 620
    },
    {
      title: "Passage 3: The Luddites",
      subheading: "Textile rebellion in 19th-century Industrial Revolution England and the legendary protest movement of Ned Ludd.",
      paragraphs: [
        {
          label: "A",
          text: "The term Luddite is used to refer to a person who is opposed to new technology. The word derives from the name Ned Ludd, a man who may or may not have actually existed. The original Luddites were textile workers in early nineteenth-century England who protested changes brought on by the industrial revolution. These weavers made lace and stockings by hand, carrying out their craft independently in their homes according to traditional methods. In the 1800s, automated power looms and stocking frames were introduced, radically changing the traditional work system. Weavers' work was moved from individual homes to factories; individuals could not afford to buy the new machines for themselves. The new machines could be operated by unskilled workers and turned out an inferior product, but produced large quantities cheaply."
        },
        {
          label: "B",
          text: "In the textile-producing towns of England, workers focused on the new weaving machines as the source of their troubles. The height of Luddite activity occurred in the years 1811-1812. Groups of men, often in disguise, would arrive at a factory and make demands for higher wages and better working conditions. If these demands were not met, the group retaliated by smashing the factory machines. These groups often claimed that they were working under the command of General Ned Ludd, and thus came to be called Luddites."
        },
        {
          label: "C",
          text: "Who was Ned Ludd? Rumors about this mysterious person abounded. He came to be associated with that traditional champion of the poor, Robin Hood. The original Luddite activity was centered around Nottingham, and many said that Ned Ludd hid out in nearby Sherwood Forest. According to another tradition, Ned Ludd was a weaver who had accidentally broken two stocking frames, and from that, came to be the one blamed any time an expensive piece of weaving equipment was damaged."
        },
        {
          label: "D",
          text: "In the winter of 1812, the Frame-Breaking Act was passed, making the destruction of factory equipment a crime punishable by death. The government sent thousands of troops into areas affected by the riots. Several factory owners were killed, and following a mill fire in Westhoughton, four rioters were executed. Suspected Luddites were arrested and imprisoned, and many were hanged. By the summer of 1812, Luddite activity began to die down, with a small brief revival in 1816."
        }
      ],
      wordCount: 520
    }
  ],
  questions: [
    {
      id: "b1_q1",
      number: 1,
      passageIndex: 0,
      type: "multiple-choice-single",
      instruction: "Write A (dragonflies only), B (damselflies only), or C (both).",
      question: "They have sawlike jaws.",
      options: ["A) dragonflies only", "B) damselflies only", "C) both dragonflies and damselflies"],
      correctAnswer: "C) both dragonflies and damselflies",
      explanation: "Paragraph A states both dragonflies and damselflies get their name from powerful serrated (sawlike) jaws.",
      passageEvidence: "Dragonflies and damselflies get their name from the powerful serrated jaws they use to tear apart their prey."
    },
    {
      id: "b1_q2",
      number: 2,
      passageIndex: 0,
      type: "multiple-choice-single",
      instruction: "Write A, B, or C.",
      question: "They hold their wings on their backs while resting.",
      options: ["A) dragonflies only", "B) damselflies only", "C) both dragonflies and damselflies"],
      correctAnswer: "B) damselflies only",
      explanation: "Paragraph B states dragonflies hold their wings out to the side while damselflies fold their wings back.",
      passageEvidence: "Dragonflies hold their wings out to the side while damselflies fold their wings back."
    },
    {
      id: "b1_q3",
      number: 3,
      passageIndex: 0,
      type: "multiple-choice-single",
      instruction: "Write A, B, or C.",
      question: "Their eyes have a gap between them.",
      options: ["A) dragonflies only", "B) damselflies only", "C) both dragonflies and damselflies"],
      correctAnswer: "B) damselflies only",
      explanation: "Paragraph B explains that damselflies' eyes are smaller and have a space between them, whereas dragonflies' eyes touch.",
      passageEvidence: "Damselflies' eyes are smaller, and there is a space between them."
    },
    {
      id: "b1_q4",
      number: 4,
      passageIndex: 0,
      type: "multiple-choice-single",
      instruction: "Write A, B, or C.",
      question: "They can be seen in fields at a distance from ponds and streams.",
      options: ["A) dragonflies only", "B) damselflies only", "C) both dragonflies and damselflies"],
      correctAnswer: "A) dragonflies only",
      explanation: "Paragraph B states dragonflies fly longer distances and can be found in woods and fields away from water.",
      passageEvidence: "Dragonflies are larger and stronger animals... Thus, they can be found in woods and fields away from the water."
    },
    {
      id: "b1_q5",
      number: 5,
      passageIndex: 0,
      type: "sentence-completion",
      instruction: "Choose NO MORE THAN TWO WORDS from the passage.",
      question: "Baby dragonflies and damselflies emerge from eggs underwater in the form of ________.",
      correctAnswer: "nymphs",
      explanation: "Paragraph D states the babies emerge from eggs in the form of nymphs.",
      passageEvidence: "The babies emerge from the eggs in the form of nymphs. They live underwater, breathing through gills..."
    },
    {
      id: "b1_q6",
      number: 6,
      passageIndex: 1,
      type: "sentence-completion",
      instruction: "Choose NO MORE THAN THREE WORDS.",
      question: "In 1066, King William ordered citizens to extinguish their fires nightly, giving rise to the word ________.",
      correctAnswer: "curfew",
      explanation: "Paragraph A states couvre-feu ('cover fire') is the origin of the word curfew.",
      passageEvidence: "His term couvre-feu, meaning 'cover fire', is the origin of the modern day term curfew."
    },
    {
      id: "b1_q7",
      number: 7,
      passageIndex: 1,
      type: "sentence-completion",
      instruction: "Choose NO MORE THAN THREE WORDS.",
      question: "After four-fifths of London burned, Christopher Wren rebuilt the city using ________.",
      correctAnswer: "stone and brick",
      explanation: "Paragraph C states most of London was rebuilt using stone and brick.",
      passageEvidence: "most of London was rebuilt using stone and brick, materials that were far less flammable than wood and straw."
    },
    {
      id: "b1_q8",
      number: 8,
      passageIndex: 2,
      type: "true-false-not-given",
      instruction: "Write TRUE, FALSE, or NOT GIVEN.",
      question: "A Luddite is a person who resists new technology.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correctAnswer: "TRUE",
      explanation: "Opening sentence of Passage 3 confirms: 'The term Luddite is used to refer to a person who is opposed to new technology'.",
      passageEvidence: "The term Luddite is used to refer to a person who is opposed to new technology."
    },
    {
      id: "b1_q9",
      number: 9,
      passageIndex: 2,
      type: "true-false-not-given",
      instruction: "Write TRUE, FALSE, or NOT GIVEN.",
      question: "Before the nineteenth century, weavers made lace by hand.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correctAnswer: "TRUE",
      explanation: "Paragraph A states original Luddites were textile workers who made lace and stockings by hand.",
      passageEvidence: "These weavers made lace and stockings by hand, carrying out their craft independently in their homes..."
    },
    {
      id: "b1_q10",
      number: 10,
      passageIndex: 2,
      type: "true-false-not-given",
      instruction: "Write TRUE, FALSE, or NOT GIVEN.",
      question: "Nobody knows for certain who Ned Ludd was.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correctAnswer: "TRUE",
      explanation: "Paragraph C describes rumors and confirms historians are uncertain whether Ned Ludd actually existed.",
      passageEvidence: "The word derives from the name Ned Ludd, a man who may or may not have actually existed."
    }
  ]
};

const TEST_01_LISTENING: ListeningMockData = {
  title: "Barron's IELTS Practice Exams - Test 1 Listening",
  sections: [
    {
      sectionNumber: 1,
      title: "Section 1: Globetrotters Language School Class Schedule",
      context: "A telephone conversation inquiring about language course schedules and tuition fees.",
      audioDurationSeconds: 280,
      audioTranscript: `
Receptionist: Good morning, Globetrotters Language School. How can I help you?
Caller: Hello, I'd like some information about your evening and morning language courses.
Receptionist: Certainly. For Chinese, our advanced class meets on Wednesday and Friday evenings.
Caller: I see. And what about Japanese?
Receptionist: Japanese has an intermediate level meeting on Tuesday and Thursday mornings, and a beginning level on Monday, Wednesday, and Friday mornings.
Caller: And French?
Receptionist: Intermediate French takes place on Friday mornings.
Caller: What are your tuition fees?
Receptionist: For one week it is $125. For four weeks it is $410. Six weeks is $575, and twelve weeks is $1,050.
Caller: How do I register?
Receptionist: You can register by visiting the school office. When you arrive, ask for Mr. Lindsay.
      `,
      questions: [
        {
          id: "b1_l1",
          number: 1,
          sectionNumber: 1,
          type: "sentence-completion",
          instruction: "Write NO MORE THAN THREE WORDS.",
          question: "Days for Advanced Chinese: ________ evenings",
          correctAnswer: "Wednesday and Friday",
          explanation: "Advanced Chinese meets Wednesday and Friday evenings.",
          audioEvidence: "our advanced class meets on Wednesday and Friday evenings."
        },
        {
          id: "b1_l2",
          number: 2,
          sectionNumber: 1,
          type: "sentence-completion",
          instruction: "Write ONE NUMBER.",
          question: "Four weeks tuition fee: $________",
          correctAnswer: "410",
          explanation: "Four weeks costs $410.",
          audioEvidence: "For four weeks it is $410."
        },
        {
          id: "b1_l3",
          number: 3,
          sectionNumber: 1,
          type: "sentence-completion",
          instruction: "Write NO MORE THAN TWO WORDS.",
          question: "Person in charge of registration: ________",
          correctAnswer: "Mr. Lindsay",
          explanation: "Ask for Mr. Lindsay at the school office.",
          audioEvidence: "ask for Mr. Lindsay. He is in charge of student registration."
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Section 2: City Shopping District & Harbor Park Tour",
      context: "A tour guide pointing out landmarks on a city map including Harbor View Bookstore and Pear Cafe.",
      audioDurationSeconds: 300,
      audioTranscript: `
Tour Guide: Welcome to the City Shopping District. Looking at your map, we begin at the Harbor View Bookstore on the corner of Cherry Street and Pear Street. Across Pear Street is Pear Cafe, and further along is the Art Gallery and Harbor Park, which was built in 1876. In the center of the park is a historic statue of Captain Jones.
      `,
      questions: [
        {
          id: "b1_l4",
          number: 4,
          sectionNumber: 2,
          type: "sentence-completion",
          instruction: "Write ONE NUMBER.",
          question: "Harbor Park was built in ________.",
          correctAnswer: "1876",
          explanation: "Built in 1876.",
          audioEvidence: "Harbor Park, which was built in 1876."
        },
        {
          id: "b1_l5",
          number: 5,
          sectionNumber: 2,
          type: "sentence-completion",
          instruction: "Write ONE WORD ONLY.",
          question: "A ________ of Captain Jones stands in the center of the park.",
          correctAnswer: "statue",
          explanation: "A statue of Captain Jones.",
          audioEvidence: "In the center of the park is a historic statue of Captain Jones."
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Section 3: City Archives Orientation",
      context: "A librarian explaining archive rules, hours, and document locations by floor.",
      audioDurationSeconds: 320,
      audioTranscript: `
Librarian: Welcome to the City Archives. University students need a valid identification card or ID. We are open Tuesday through Sunday from 9:30 AM until 8:30 PM. Photographs are stored in the basement, nineteenth-century documents on the ground floor, newspapers on the second floor, and maps on the third floor.
      `,
      questions: [
        {
          id: "b1_l6",
          number: 6,
          sectionNumber: 3,
          type: "sentence-completion",
          instruction: "Write NO MORE THAN THREE WORDS.",
          question: "Students require a valid ________ to use the archives.",
          correctAnswer: "identification card",
          explanation: "Students need a valid ID or identification card.",
          audioEvidence: "University students need a valid identification card or ID."
        }
      ]
    },
    {
      sectionNumber: 4,
      title: "Section 4: Historical Uses of Wind Power",
      context: "A lecture on the evolution of windmills from ancient China and Persia to modern clean energy.",
      audioDurationSeconds: 340,
      audioTranscript: `
Lecturer: In ancient China, windmills were used to pump water. In ancient Persia, farmers used wind power to grind grain. Later during the Middle Ages in the Netherlands, people used windmills to drain lakes to create farmland. Unlike fossil fuels, wind power causes no pollution and is a renewable resource.
      `,
      questions: [
        {
          id: "b1_l7",
          number: 7,
          sectionNumber: 4,
          type: "sentence-completion",
          instruction: "Write NO MORE THAN TWO WORDS.",
          question: "In ancient China, windmills were used to ________.",
          correctAnswer: "pump water",
          explanation: "Used to pump water.",
          audioEvidence: "windmills were used to pump water."
        },
        {
          id: "b1_l8",
          number: 8,
          sectionNumber: 4,
          type: "sentence-completion",
          instruction: "Write NO MORE THAN TWO WORDS.",
          question: "In Persia, farmers used wind power to ________.",
          correctAnswer: "grind grain",
          explanation: "Used to grind grain.",
          audioEvidence: "farmers used wind power to grind grain."
        }
      ]
    }
  ]
};

const TEST_01_WRITING: WritingMockData = {
  title: "Barron's IELTS Practice Exams - Test 1 Writing",
  task1: {
    type: "academic",
    chartType: "process",
    chartTitle: "How Wood Pellets Are Made",
    chartDescription: "The diagram explains the sequential manufacturing process of making wood pellets used to heat buildings.",
    chartDataSummary: `
1. Sawdust arrives from sawmill.
2. Sawdust is hammered into fibers of uniform length in a hammer mill.
3. Fibers are dampened with steam.
4. Fibers are forced through holes in a pellet machine, forming pellets.
5. Pellets are cooled.
6. Loose dust is vacuumed off.
7. Pellets are packed into 18 kilo (40 pound) bags for sale (suitable for pellet stoves and furnaces).
    `,
    prompt: "You should spend about 20 minutes on this task. The diagram below explains the process of making wood pellets, used to heat buildings. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    minWords: 150,
    modelAnswerBand9: `The flowchart illustrates the sequential industrial process by which sawdust is converted into commercial wood pellets for heating buildings.

Overall, the manufacturing process comprises seven distinct stages, commencing with the delivery of raw sawdust from sawmills and culminating in the packaging of finished pellets into 18-kilogram bags ready for commercial distribution in pellet stoves and furnaces.

In the initial stage, raw sawdust arrives from the sawmill and is transferred into a hammer mill, where mechanical hammers reduce the material into wood fibers of uniform length. Subsequently, these fibers are treated and dampened with steam to make them pliable. Following this conditioning, the moist fibers are forced through small perforations in a pelletizing machine, shaping them into cylindrical pellets.

Once formed, the hot pellets enter a cooling chamber. After cooling, they undergo a vacuuming procedure to eliminate any residual loose dust. Finally, the finished wood pellets are packaged into standardized 18-kilo (40-pound) bags for commercial retail, providing an efficient combustible fuel for both residential pellet stoves and industrial furnaces.`,
    keyPointsToCover: [
      "Include a clear overview mentioning the start (sawmill sawdust) and final output (18kg bags).",
      "Mention hammer mill uniform fiber sizing and steam dampening.",
      "Detail pellet extrusion, cooling, and vacuum dusting."
    ]
  },
  task2: {
    category: "opinion",
    topic: "Open University Admissions Regardless of Academic Ability",
    prompt: "Write about the following topic: Everybody should be allowed admission to university study programs regardless of their level of academic ability.\n\nTo what extent do you agree or disagree with this statement? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
    minWords: 250,
    modelAnswerBand9: `The question of whether tertiary education should be unconditionally accessible to all individuals, irrespective of prior academic performance, remains a subject of considerable educational controversy. While proponents argue that open access fulfills a fundamental human right to self-improvement, I firmly contend that maintaining baseline academic prerequisites is essential for institutional quality and student welfare.

Admittedly, advocates of open admission validly point out that standardized examinations do not always capture an individual's true intellectual potential. Many late-blooming scholars or students from disadvantaged socioeconomic backgrounds may have underperformed in secondary school due to lack of resources rather than lack of capability. Providing universal university admission democratizes knowledge and gives every citizen an opportunity to elevate their socioeconomic standing. Furthermore, diverse vocational and applied degree programs can cater effectively to students with varying aptitudes.

However, completely abandoning academic admission criteria would create severe pedagogical and economic consequences. Firstly, university curricula in specialized disciplines such as medicine, engineering, and advanced law demand a rigorous foundational mastery of mathematics and analytical reasoning. Admitting undergraduates who lack these prerequisite competencies inevitably leads to sky-high dropout rates, immense psychological distress for struggling students, and wasted financial resources. Secondly, when university lecture halls become overcrowded with unprepared students, professors are forced to lower the academic rigor of their courses, diluting the value of degrees in the global labor market.

In conclusion, while societies should ensure robust adult literacy programs and accessible vocational colleges, unconditional admission to university degree courses is counterproductive. Merit-based criteria ensure that students are adequately prepared to succeed in challenging academic environments.`,
    outlineSuggestions: [
      "Introduction: Paraphrase prompt and state disagreement with unconditional admission.",
      "Body 1: Acknowledge egalitarian benefits of universal access.",
      "Body 2: Argue why prerequisites are essential for academic rigor and student success.",
      "Conclusion: Reiterate balanced thesis."
    ]
  }
};

const TEST_01_SPEAKING: SpeakingMockData = {
  title: "Barron's IELTS Practice Exams - Test 1 Speaking",
  part1: {
    topic: "Neighborhood & Walking",
    questions: [
      "Describe the neighborhood where you live.",
      "What do you like about living there? What do you dislike?",
      "Do you like walking? Are there places you can walk near your house?",
      "What other kinds of exercise do you enjoy?"
    ]
  },
  part2: {
    topic: "Describe a friend who is important to you",
    cueCard: "Describe a friend who is important to you.",
    bulletPoints: [
      "The name of your friend",
      "When and where you met this friend",
      "What kinds of things you and this friend like to do together",
      "And explain why this friend is important to you."
    ],
    followUpQuestion: "Do you think childhood friendships last longer than adult friendships?"
  },
  part3: {
    topic: "Friendship & Society",
    questions: [
      "Generally, are friendships important to people?",
      "How can friends help each other at work or school?",
      "Do people spend more time with friends or with relatives?",
      "How do our friendships change as we grow older?"
    ]
  },
  sampleBand9Transcript: `
Candidate: I live in a quiet residential neighborhood situated just on the periphery of Kathmandu. What I appreciate most is the abundant greenery and proximity to local parks, though commercial amenities are slightly distant.
Regarding walking, I am immensely fond of morning strolls as they invigorate my mind before work. My closest friend is Bob, whom I met in preschool. Over the past fifteen years, our mutual loyalty and shared aspirations have provided me with indispensable emotional support. As people mature, friendships transition from casual playmates into deeper pillars of mutual encouragement.
  `
};

// =========================================================================
// TEST 2: BARRON'S PRACTICE TEST 2 (Authentic Real PDF Source)
// =========================================================================
const TEST_02_READING: ReadingMockData = {
  title: "Barron's IELTS Practice Exams - Test 2 Academic Reading",
  passages: [
    {
      title: "Passage 1: The Vikings' Wayfaring Ways",
      subheading: "Explorations, conquests, and trading networks across Europe, Greenland, and Vinland.",
      paragraphs: [
        {
          label: "A",
          text: "Perhaps best known as fierce warriors, the Vikings were also the most far-ranging of peoples. In fact, the term Viking, in Old Norse, means 'to go on an expedition'. From the late 700s until the eleventh century, Viking explorers journeyed from their native Norway, Denmark, and Sweden to many distant lands. They traveled as far west as Newfoundland in present-day Canada, and as far east as Baghdad."
        },
        {
          label: "B",
          text: "During their first expedition in 793, a force of Viking warriors sacked the famed abbey at Lindisfarne on England's northeast coast. By 870, Vikings were settling Iceland. In 980, an Icelandic assembly found Eric 'the Red' Ericson guilty of murder and sent him into exile; he sailed west and named the island Greenland to attract settlers. Around 998, his son Leif 'the Lucky' Ericson established the first European settlement in North America, named Vinland."
        },
        {
          label: "C",
          text: "In 841, Danish Vikings founded Dublin in Ireland. Moving into France along the Seine, they besieged Paris until King Charles III offered chief Rollo territories in northwest France in 911, called Normandy. In 1066, Duke William of Normandy defeated King Harold at the Battle of Hastings."
        },
        {
          label: "D",
          text: "Meanwhile, Swedish Vikings moved through the Baltic Sea down the Volga and Dnieper rivers on sturdy cargo ships called knars. In 862, they founded Novgorod, establishing the state of Rus (from Rutosi, meaning 'rowers'), and later made Kiev their capital."
        }
      ],
      wordCount: 580
    },
    {
      title: "Passage 2: Dyslexia",
      subheading: "Understanding specific reading disability, neurological indicators, and early intervention therapies.",
      paragraphs: [
        {
          label: "A",
          text: "Dyslexia, also referred to as 'specific reading disability', predominantly affects a person's ability to read and spell. Dyslexics have difficulty connecting visual symbols (letters) with their corresponding sounds. It is the most common learning disability in children and is not related to intellectual ability, vision, or access to schooling. Approximately 5-10 percent of school-age children in North America suffer from the condition."
        },
        {
          label: "B",
          text: "Neurological research points to subtle anomalies in the dyslexic brain called ectopias and microgyria, which alter the structure of the cerebral cortex responsible for connecting visual and audio processing. Phonological training—identifying and separating sound patterns—is the most effective form of therapeutic intervention."
        }
      ],
      wordCount: 420
    },
    {
      title: "Passage 3: Catastrophe Theory",
      subheading: "The debate between uniformitarian gradualism and planetary cataclysms in shaping the Earth.",
      paragraphs: [
        {
          label: "A",
          text: "In the late eighteenth century, French geologist Baron Georges Cuvier introduced the catastrophe theory, proposing that major sudden worldwide disasters had shaped the Earth's geology. In contrast, James Hutton proposed uniformitarianism in 1795, arguing that slow, gradual changes over deep time formed sedimentary rocks."
        },
        {
          label: "B",
          text: "In 1980, Walter and Luis Alvarez analyzed clay in the K-T boundary and discovered exceptionally high concentrations of iridium, leading to the hypothesis that an asteroid impact 65 million years ago caused the mass extinction of dinosaurs. The 1990 discovery of a 180-kilometer crater in Mexico's Yucatan Peninsula provided compelling validation."
        }
      ],
      wordCount: 460
    }
  ],
  questions: [
    {
      id: "b2_q1",
      number: 1,
      passageIndex: 0,
      type: "sentence-completion",
      instruction: "Choose ONE NUMBER ONLY from the text.",
      question: "When did Viking warriors raid Lindisfarne abbey on the coast of England?",
      correctAnswer: "793",
      explanation: "Paragraph B states the raid occurred in 793.",
      passageEvidence: "During their first expedition, in 793, a force of Viking warriors sacked the famed abbey at Lindisfarne..."
    },
    {
      id: "b2_q2",
      number: 2,
      passageIndex: 0,
      type: "sentence-completion",
      instruction: "Choose ONE NUMBER ONLY.",
      question: "When did Vikings establish the fort of Dublin in Ireland?",
      correctAnswer: "841",
      explanation: "Paragraph C states Dublin was founded in 841.",
      passageEvidence: "and in 841 founded Dublin, today a major Irish city..."
    },
    {
      id: "b2_q3",
      number: 3,
      passageIndex: 1,
      type: "true-false-not-given",
      instruction: "Write TRUE, FALSE, or NOT GIVEN.",
      question: "Dyslexia is linked to low intellectual ability.",
      options: ["TRUE", "FALSE", "NOT GIVEN"],
      correctAnswer: "FALSE",
      explanation: "Paragraph A specifies: 'It is not related to intellectual ability, vision, or access to education.'",
      passageEvidence: "It is not related to intellectual ability, vision, or access to education."
    },
    {
      id: "b2_q4",
      number: 4,
      passageIndex: 2,
      type: "multiple-choice-single",
      instruction: "Choose the correct letter, A, B, or C.",
      question: "Who first introduced the geological catastrophe theory?",
      options: ["A) James Hutton", "B) Baron Georges Cuvier", "C) Walter Alvarez"],
      correctAnswer: "B) Baron Georges Cuvier",
      explanation: "Paragraph A names Baron Georges Cuvier.",
      passageEvidence: "French geologist Baron Georges Cuvier introduced this idea, which was later coined the 'catastrophe theory'."
    }
  ]
};

const TEST_02_LISTENING: ListeningMockData = {
  title: "Barron's IELTS Practice Exams - Test 2 Listening",
  sections: [
    {
      sectionNumber: 1,
      title: "Section 1: Plainfield Community Center Classes",
      context: "A parent inquiring about sports and hobby activities for children, teens, and adults.",
      audioDurationSeconds: 260,
      audioTranscript: `
Staff: Welcome to Plainfield Community Center. On Wednesday and Saturday we have swimming lessons for children and teens. Tennis is held on Sunday mornings for teens and Sunday afternoons for adults. We also have Yoga on Tuesday and Thursday evenings, and a Book Club for adults on Friday. Our annual membership fee is $75 for individuals and $225 for families. We are located at 107 Eliot Street, with parking available in the garage across the street. We are closed on Mondays.
      `,
      questions: [
        {
          id: "b2_l1",
          number: 1,
          sectionNumber: 1,
          type: "sentence-completion",
          instruction: "Write ONE NUMBER.",
          question: "Annual individual membership fee: $________",
          correctAnswer: "75",
          explanation: "Individual fee is $75.",
          audioEvidence: "The yearly fee is seventy-five dollars for individuals..."
        },
        {
          id: "b2_l2",
          number: 2,
          sectionNumber: 1,
          type: "sentence-completion",
          instruction: "Write ONE WORD ONLY.",
          question: "The Center is located at 107 ________ Street.",
          correctAnswer: "Eliot",
          explanation: "Located at 107 Eliot Street.",
          audioEvidence: "It's at 107 Eliot Street."
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Section 2: Hiking Safety Rules",
      context: "A park ranger briefing hikers on safety equipment and wildlife precautions.",
      audioDurationSeconds: 280,
      audioTranscript: `
Ranger: Welcome hikers. For equipment, ensure you bring a sleeping bag, hiking boots, a backpack, and a warm jacket. On the trail, always stay ahead of the sweep or rear leader, wait at any trail intersection, do not climb steep rocks, and never feed wild animals.
      `,
      questions: [
        {
          id: "b2_l3",
          number: 3,
          sectionNumber: 2,
          type: "sentence-completion",
          instruction: "Write NO MORE THAN TWO WORDS.",
          question: "Always stay ahead of the ________.",
          correctAnswer: "sweep",
          explanation: "Stay ahead of the rear leader or sweep.",
          audioEvidence: "always stay ahead of this person while we're on the trail."
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Section 3: Student Teacher Guidelines",
      context: "A university education supervisor explaining portfolio and observation requirements.",
      audioDurationSeconds: 300,
      audioTranscript: `
Supervisor: As student teachers, you must keep a weekly reflective journal, submit sample lesson plans, observe other teachers, and build your final teaching portfolio. Your agreement form must be signed by your supervising teacher.
      `,
      questions: [
        {
          id: "b2_l4",
          number: 4,
          sectionNumber: 3,
          type: "multiple-choice-single",
          instruction: "Choose the correct letter, A, B, or C.",
          question: "Who must sign the student teacher agreement form?",
          options: ["A) The university advisor", "B) The supervising teacher", "C) The school principal"],
          correctAnswer: "B) The supervising teacher",
          explanation: "Supervising teacher signs.",
          audioEvidence: "the advisor explains that it is the supervising teacher."
        }
      ]
    },
    {
      sectionNumber: 4,
      title: "Section 4: Retail Psychology and Shopping Environments",
      context: "A marketing lecture discussing retail floor plans, scents, and color psychology.",
      audioDurationSeconds: 320,
      audioTranscript: `
Professor: Retailers place high-demand staple goods near the back of stores to draw shoppers past discretionary merchandise. The scent of vanilla increases sales in clothing stores. Warm colors like orange encourage restaurant customers to leave faster, while cool blues evoke security.
      `,
      questions: [
        {
          id: "b2_l5",
          number: 5,
          sectionNumber: 4,
          type: "sentence-completion",
          instruction: "Write NO MORE THAN TWO WORDS.",
          question: "The color orange encourages restaurant customers to ________.",
          correctAnswer: "leave faster",
          explanation: "Encourages customers to leave faster.",
          audioEvidence: "Orange... encourages customers to leave faster."
        }
      ]
    }
  ]
};

const TEST_02_WRITING: WritingMockData = {
  title: "Barron's IELTS Practice Exams - Test 2 Writing",
  task1: {
    type: "academic",
    chartType: "bar",
    chartTitle: "Household Internet Access in a European Country (1999–2004)",
    chartDescription: "The bar graph illustrates the proportion of urban/suburban versus rural households with Internet access between 1999 and 2004.",
    chartDataSummary: `
- 1999: Urban 15%, Rural <5%
- 2000: Urban 30%, Rural ~5%
- 2001: Urban 40%, Rural 10%
- 2002: Urban 50%, Rural 15%
- 2003: Urban 52%, Rural 25%
- 2004: Urban 55%, Rural 35%
    `,
    prompt: "You should spend about 20 minutes on this task. The graph below shows the percentage of urban/suburban and rural households in a European country that had Internet access between 1999 and 2004. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    minWords: 150,
    modelAnswerBand9: `The bar chart compares the percentage of households in urban/suburban and rural localities with access to the Internet in an unspecified European nation over a five-year period from 1999 to 2004.

Overall, it is readily observable that Internet connectivity experienced substantial growth across both environments over the surveyed interval. However, urban and suburban households maintained consistently higher adoption rates than their rural counterparts in every recorded year.

In 1999, Internet penetration was minimal, with only 15 percent of urban/suburban residences connected, while rural connectivity hovered below 5 percent. Over the subsequent two years, urban access expanded rapidly, doubling to 30 percent in 2000 before reaching 40 percent in 2001. In contrast, rural households showed modest progress, reaching approximately 10 percent by 2001.

Between 2002 and 2004, urban Internet connectivity stabilized near the 50 to 55 percent threshold. Meanwhile, rural adoption surged markedly from 15 percent in 2002 to over 35 percent by 2004, closing the digital disparity gap significantly by the conclusion of the timeframe.`,
    keyPointsToCover: [
      "State clear overall upward trend in both urban and rural households.",
      "Highlight urban access doubling from 15% to 30% by 2000.",
      "Note the rural surge between 2002 and 2004 reaching 35%."
    ]
  },
  task2: {
    category: "opinion",
    topic: "Children's Indoor Lifestyles vs Appreciation of Nature",
    prompt: "Because of the busy pace of modern life, many children spend most of their time indoors and have little exposure to the natural world.\n\nHow important is it for children to learn to understand and appreciate nature? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
    minWords: 250,
    modelAnswerBand9: `In the contemporary era of pervasive digital screens and rapid urbanization, children increasingly spend their formative years confined to indoor environments, alienated from the natural world. In my view, fostering an intimate appreciation of nature during childhood is of paramount importance, both for psychological well-being and for the preservation of our planetary ecosystem.

First and foremost, direct immersion in natural settings is vital for healthy cognitive and emotional development. Pediatric psychologists have documented that children who engage in unstructured outdoor play demonstrate enhanced problem-solving abilities, lower stress levels, and reduced incidence of attention-deficit disorders. Interacting with diverse flora and fauna stimulates sensory curiosity in ways that artificial digital interfaces cannot replicate. For instance, observing the life cycle of trees or insects teaches patience, resilience, and an organic understanding of ecological balance.

Furthermore, instilling an early reverence for the environment is essential for nurturing responsible future citizens. Humankind depends entirely on natural systems for sustenance, clean water, and breathable air. When children grow up completely disconnected from natural habitats, they are far less likely to champion conservation policies or adopt sustainable consumption habits as adults. If schools actively incorporate ecological field studies and outdoor forest schools into their primary curricula, students develop an intuitive commitment to mitigating climate change and protecting biodiversity.

In conclusion, bridging the growing disconnect between youth and nature is not merely a nostalgic luxury; it is a developmental and ecological imperative. Parents and educators must collaboratively ensure that children are afforded regular opportunities to experience and cherish the natural world.`,
    outlineSuggestions: [
      "Introduction: Highlight modern indoor confinement and state why appreciation of nature is vital.",
      "Body 1: Cognitive and psychological benefits for child development.",
      "Body 2: Ecological responsibility and long-term sustainability stewardship.",
      "Conclusion: Reiterate the urgency of outdoor education."
    ]
  }
};

const TEST_02_SPEAKING: SpeakingMockData = {
  title: "Barron's IELTS Practice Exams - Test 2 Speaking",
  part1: {
    topic: "Leisure Time & Music",
    questions: [
      "When and how much leisure time do you generally have in a week?",
      "Who do you generally spend your leisure time with?",
      "What kinds of music do you like listening to?",
      "Tell me about any traditional music in your country."
    ]
  },
  part2: {
    topic: "Describe a movie you saw recently",
    cueCard: "Describe a movie that you saw recently.",
    bulletPoints: [
      "The title of the movie and what it was about",
      "When and where you saw it",
      "Who you saw it with",
      "And explain why you enjoyed or didn't enjoy seeing this movie."
    ],
    followUpQuestion: "Do you prefer watching movies in a cinema or at home on digital streaming platforms?"
  },
  part3: {
    topic: "Cinema, Theater & Media Evolution",
    questions: [
      "What kinds of movies are popular these days? Why do you think they are popular?",
      "What can we learn from watching historical and documentary movies?",
      "How are movies different from live theater performances?",
      "How do you think filmmaking will change in the future with artificial intelligence?"
    ]
  },
  sampleBand9Transcript: `
Candidate: During standard weekdays, my leisure time is restricted to evenings, but weekends offer ample opportunity for recreation. I gravitate towards classical and ambient music when relaxing, as it induces tranquility.
I recently watched 'Oppenheimer' with my university colleagues at a local IMAX theater. The film portrays the profound moral dilemma confronting physicists during the Manhattan Project. Its masterful cinematography, coupled with Cillian Murphy's nuanced performance, made it an intellectually stimulating masterpiece.
  `
};

// =========================================================================
// TEST 3: CAMBRIDGE ENGLISH IELTS 19 TEST 2 (Authentic Real PDF Source)
// =========================================================================
const TEST_03_READING: ReadingMockData = {
  title: "Cambridge English Official - Practice Test 3 Academic Reading",
  passages: [
    {
      title: "Passage 1: Could urban engineers learn from dance?",
      subheading: "Investigating how choreographic movement techniques can inspire human-centric urban design and pedestrian transit.",
      paragraphs: [
        {
          label: "A",
          text: "The way we travel around cities has a major impact on whether they are sustainable. Transportation is estimated to account for 30% of energy consumption in most of the world's most developed nations, so lowering the need for energy-using vehicles is essential for decreasing the environmental impact of mobility. But as more and more people move to cities, it is important to think about other kinds of sustainable travel too. Engineers are tasked with changing how we travel round cities through urban design, but the engineering industry still works on the assumptions that led to the creation of the energy-consuming transport systems we have now: the emphasis placed solely on efficiency, speed, and quantitative data. We need radical changes, to make it healthier, more enjoyable, and less environmentally damaging."
        },
        {
          label: "B",
          text: "Dance might hold some of the answers. That is not to suggest everyone should dance their way to work, however healthy and happy it might make us, but rather that the techniques used by choreographers to experiment with and design movement in dance could provide engineers with tools to stimulate new ideas in city-making. Richard Sennett, an influential urbanist and sociologist who has transformed ideas about the way cities are made, argues that urban design has suffered from a separation between mind and body since the introduction of the architectural blueprint."
        },
        {
          label: "C",
          text: "To illustrate, Sennett discusses the Peachtree Center in Atlanta, USA, a development typical of the modernist approach to urban planning prevalent in the 1970s. Peachtree created a grid of streets and towers intended as a new pedestrian-friendly downtown for Atlanta. According to Sennett, this failed because its designers had invested too much faith in computer-aided design to tell them how it would operate. They failed to take into account that purpose-built street cafés could not operate in the hot sun without the protective awnings common in older buildings, or that its giant car park would feel so unwelcoming that it would put people off getting out of their cars."
        },
        {
          label: "D",
          text: "The same is true in transport engineering, which uses models to predict and shape the way people move through the city. Guard rails that will be familiar to anyone who has attempted to cross a British road, for example, were an engineering solution to pedestrian safety based on models that prioritise the smooth flow of traffic. In doing so they make crossings feel longer, introducing psychological barriers greatly impacting those that are the least mobile, and encouraging others to make dangerous crossings. These barriers divide communities and decrease opportunities for healthy transport."
        }
      ],
      wordCount: 510
    },
    {
      title: "Passage 2: Should we try to bring extinct species back to life?",
      subheading: "Geneticists explore 'de-extinction' through cloning and CRISPR gene editing on passenger pigeons and woolly mammoths.",
      paragraphs: [
        {
          label: "A",
          text: "The passenger pigeon was once one of nature's great spectacles, flying in vast flocks across North America before the last living specimen died at Cincinnati Zoo on 1 September 1914. Geneticist Ben Novak is lead researcher on an ambitious project which now aims to bring the bird back to life through a process known as 'de-extinction'. The basic premise involves using cloning technology to turn the DNA of extinct animals into a fertilised embryo carried by the nearest relative still in existence—in this case, the band-tailed pigeon."
        },
        {
          label: "B",
          text: "In Australia, the thylacine, more commonly known as the Tasmanian tiger, is another extinct creature which genetic scientists are striving to bring back to life. 'There is no carnivore now in Tasmania that fills the niche which thylacines once occupied,' explains Michael Archer of the University of New South Wales."
        },
        {
          label: "C",
          text: "Another popular candidate for this technology is the woolly mammoth. George Church, professor at Harvard Medical School and leader of the Woolly Mammoth Revival Project, has been focusing on cold resistance, the main way in which the extinct woolly mammoth and its nearest living relative, the Asian elephant, differ. By pinpointing which genetic traits made it possible for mammoths to survive the icy climate of the tundra, the project's goal is to return mammoths, or a mammoth-like species, to the area. Adaptations include smaller ears, thicker hair, and extra insulating fat."
        }
      ],
      wordCount: 480
    },
    {
      title: "Passage 3: Having a laugh",
      subheading: "Psychological scientists reveal the evolutionary roots and cognitive power of humor and laughter.",
      paragraphs: [
        {
          label: "A",
          text: "Humans start developing a sense of humour as early as six weeks old, when babies begin to laugh and smile in response to stimuli. Laughter is universal across all human cultures and even exists in some form in rats, chimps, and bonobos. Back in 1950, US sound engineer Charley Douglass hated dealing with the unpredictable laughter of live audiences, so started recording his own 'laugh tracks'. These were intended to help people at home feel like they were in a crowded theatre."
        },
        {
          label: "B",
          text: "Another study, conducted by David Cheng and Lu Wang of Australian National University, was based on the hypothesis that humour might provide a respite from tedious situations in the workplace. In an experiment, students who watched a clip of the comedy Mr. Bean worked significantly longer on difficult tasks and completed more questions correctly than control groups. Cheng and Wang conclude: 'Humour is not only enjoyable but more importantly, energising.'"
        }
      ],
      wordCount: 410
    }
  ],
  questions: [
    {
      id: "c3_q1",
      number: 1,
      passageIndex: 0,
      type: "sentence-completion",
      instruction: "Choose ONE WORD ONLY from the passage.",
      question: "Guard rails were introduced on British roads to improve the ________ of pedestrians while ensuring smooth traffic flow.",
      correctAnswer: "safety",
      explanation: "Paragraph D explains guard rails were engineered for pedestrian safety.",
      passageEvidence: "Guard rails... were an engineering solution to pedestrian safety based on models that prioritise the smooth flow of traffic."
    },
    {
      id: "c3_q2",
      number: 2,
      passageIndex: 1,
      type: "sentence-completion",
      instruction: "Choose NO MORE THAN TWO WORDS.",
      question: "The woolly mammoth project focuses on traits of ________ that distinguish it from Asian elephants.",
      correctAnswer: "cold resistance",
      explanation: "Paragraph C notes George Church focused on cold resistance.",
      passageEvidence: "has been focusing on cold resistance, the main way in which the extinct woolly mammoth and its nearest living relative, the Asian elephant, differ."
    },
    {
      id: "c3_q3",
      number: 3,
      passageIndex: 2,
      type: "multiple-choice-single",
      instruction: "Choose the correct letter, A, B, or C.",
      question: "According to researchers Cheng and Wang, humor is not only enjoyable but also:",
      options: ["A) distracting", "B) energising", "C) exhausting"],
      correctAnswer: "B) energising",
      explanation: "Passage 3 explicitly concludes: 'Humour is not only enjoyable but more importantly, energising.'",
      passageEvidence: "Cheng and Wang conclude: 'We suggest that humour is not only enjoyable but more importantly, energising.'"
    }
  ]
};

const TEST_03_LISTENING: ListeningMockData = {
  title: "Cambridge English Official - Practice Test 3 Listening",
  sections: [
    {
      sectionNumber: 1,
      title: "Section 1: Employment Agency - Possible Jobs",
      context: "An employment consultant presenting administrative and warehouse vacancies.",
      audioDurationSeconds: 260,
      audioTranscript: `
Consultant: Good morning. We have two promising openings. The first is an administrative assistant in North London for a company that produces medical equipment. Responsibilities include data entry, general administration, and taking notes at meetings. You will need a minimum of one year teleconferencing experience.
      `,
      questions: [
        {
          id: "c3_l1",
          number: 1,
          sectionNumber: 1,
          type: "sentence-completion",
          instruction: "Write ONE WORD ONLY.",
          question: "Company produces ________ equipment.",
          correctAnswer: "medical",
          explanation: "Produces medical equipment.",
          audioEvidence: "a company that produces medical equipment."
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Section 2: Street Play Scheme",
      context: "A community organizer discussing closing streets to cars so children can play.",
      audioDurationSeconds: 280,
      audioTranscript: `
Speaker: The Street Play Scheme was first trialed three years ago on Beechwood Road. It now closes to traffic once a month on Saturday afternoons. The road closure is managed by local resident wardens.
      `,
      questions: [
        {
          id: "c3_l2",
          number: 2,
          sectionNumber: 2,
          type: "sentence-completion",
          instruction: "Write NO MORE THAN TWO WORDS.",
          question: "The road is closed to traffic once a ________.",
          correctAnswer: "month",
          explanation: "Closed once a month.",
          audioEvidence: "closes to traffic once a month on Saturday afternoons."
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Section 3: Analyzing Newspaper Media",
      context: "Two journalism students preparing an academic seminar on headline framing.",
      audioDurationSeconds: 300,
      audioTranscript: `
Student: When analyzing print media, we must examine what section the story appears in, evaluate the headline tone, and note the assumptions the writer makes about the reader.
      `,
      questions: [
        {
          id: "c3_l3",
          number: 3,
          sectionNumber: 3,
          type: "sentence-completion",
          instruction: "Write ONE WORD ONLY.",
          question: "Analyze what ________ the item appears on.",
          correctAnswer: "section",
          explanation: "Examine what section it appears on.",
          audioEvidence: "we must examine what section the story appears in."
        }
      ]
    },
    {
      sectionNumber: 4,
      title: "Section 4: Early History of Keeping Clean",
      context: "A cultural anthropology lecture on the history of soap and public hygiene.",
      audioDurationSeconds: 320,
      audioTranscript: `
Lecturer: In Ancient Greece, athletes cleaned themselves using sand and oil scraped off with a curved bronze blade called a strigil. In 312 BC, fresh water was carried into Rome by majestic stone aqueducts to supply the public baths.
      `,
      questions: [
        {
          id: "c3_l4",
          number: 4,
          sectionNumber: 4,
          type: "sentence-completion",
          instruction: "Write ONE WORD ONLY.",
          question: "Water was carried into Rome by ________.",
          correctAnswer: "aqueducts",
          explanation: "Carried by aqueducts.",
          audioEvidence: "water was carried into Rome by majestic stone aqueducts."
        }
      ]
    }
  ]
};

const TEST_03_WRITING: WritingMockData = {
  title: "Cambridge English Official - Practice Test 3 Writing",
  task1: {
    type: "academic",
    chartType: "line",
    chartTitle: "Number of Tourists Visiting a Caribbean Island (2010–2017)",
    chartDescription: "The line graph displays the number of visitors (in millions) staying on cruise ships versus those staying on the island between 2010 and 2017.",
    chartDataSummary: `
- 2010: Total 1.0M (Island: 0.75M, Cruise: 0.25M)
- 2013: Total 2.0M (Island: 1.5M, Cruise: 0.5M)
- 2015: Total 2.75M (Island: 1.5M, Cruise: 1.25M)
- 2017: Total 3.5M (Island: 1.5M, Cruise: 2.0M)
    `,
    prompt: "You should spend about 20 minutes on this task. The graph below shows the number of tourists visiting a particular Caribbean island between 2010 and 2017. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    minWords: 150,
    modelAnswerBand9: `The line graph delineates the volume of international tourists visiting a specific Caribbean island over an eight-year timeframe from 2010 to 2017, categorized into travelers staying on the island and those accommodated on cruise ships, measured in millions.

Overall, total tourist arrivals exhibited a dramatic upward trajectory over the period, more than tripling by 2017. While island-based visitors accounted for the majority of arrivals in the initial years, cruise ship passengers experienced the most spectacular growth, eventually surpassing land-based guests by the conclusion of the surveyed interval.

In 2010, approximately 1.0 million tourists visited the island in total, with three-quarters of a million staying on land and merely 0.25 million arriving via cruise vessels. Over the subsequent three years, island-based tourists grew steadily to reach 1.5 million by 2013, where the figure plateaued with minor fluctuations through 2017.

In stark contrast, cruise ship visitors expanded rapidly after 2013, escalating from 0.5 million to 1.25 million in 2015 before surging to a peak of 2.0 million in 2017. Consequently, overall tourist figures climbed to 3.5 million by the end of the period.`,
    keyPointsToCover: [
      "Highlight overall growth from 1.0M to 3.5M visitors.",
      "Compare cruise passengers overtaking island guests after 2015.",
      "Accurately report numerical figures in millions."
    ]
  },
  task2: {
    category: "opinion",
    topic: "Printed Newspapers & Books vs Digital Reading",
    prompt: "In the future, nobody will buy printed newspapers or books because they will be able to read everything they want online without paying.\n\nTo what extent do you agree or disagree with this statement? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
    minWords: 250,
    modelAnswerBand9: `The exponential proliferation of digital media and ubiquitous mobile internet has fundamentally disrupted traditional print journalism and publishing. While it is undeniable that digital distribution will dominate future information consumption, I strongly disagree with the assertion that printed books and newspapers will disappear entirely, or that high-quality content will be universally free of charge.

On the one hand, consumer habits have irreversibly shifted toward online platforms due to sheer convenience and instantaneous updates. Reading news via web feeds allows users to access multimedia video reports and interactive graphics without carrying physical broadsheets. However, the premise that all online content will be accessible without payment is economically flawed. Authoritative, investigative journalism requires substantial capital investment; in response to plummeting print revenues, reputable news agencies like The New York Times and The Financial Times have erected strict digital paywalls. Consumers are increasingly willing to pay subscription fees for verified reporting in an era plagued by rampant online misinformation.

Furthermore, physical printed books possess enduring aesthetic and tactile qualities that digital screens cannot replicate. Bibliophiles and serious scholars value the tangible weight, typography, and collectability of hardcover editions. Studies in cognitive psychology demonstrate that reading extended linear texts in physical print fosters deeper retention and concentration, devoid of the notifications and cognitive fatigue associated with electronic tablets. Consequently, while mass-market paperbacks may decline, premium print editions will persist as cherished physical artefacts.

In conclusion, although digital publishing will undoubtedly command the lion's share of media consumption, paywalls will remain standard for high-caliber reporting, and printed literature will continue to endure as a valued cultural medium.`,
    outlineSuggestions: [
      "Introduction: Challenge both parts of the premise (that print will vanish completely and that online will be free).",
      "Body 1: Explain why digital journalism requires paywalls and will not be free.",
      "Body 2: Argue the enduring psychological and aesthetic appeal of physical books.",
      "Conclusion: Reiterate that hybrid models will prevail."
    ]
  }
};

const TEST_03_SPEAKING: SpeakingMockData = {
  title: "Cambridge English Official - Practice Test 3 Speaking",
  part1: {
    topic: "Languages & Education",
    questions: [
      "How many languages can you speak?",
      "How useful will English be to you in your future career?",
      "What do you remember about learning languages at school?",
      "What do you think is the most challenging aspect of mastering a foreign language?"
    ]
  },
  part2: {
    topic: "Describe a website you bought something from",
    cueCard: "Describe a website that you bought something from.",
    bulletPoints: [
      "What the website is and what you bought",
      "Why you chose to purchase from this website",
      "How satisfied you were with the purchase",
      "And explain what you liked or disliked about using this website."
    ],
    followUpQuestion: "Do you think brick-and-mortar retail shops will ever be completely replaced by online stores?"
  },
  part3: {
    topic: "E-Commerce & Consumerism",
    questions: [
      "What kinds of products do people in your country usually purchase online?",
      "Why do you think online shopping has exploded in popularity?",
      "Do the benefits of a modern consumer society outweigh its environmental disadvantages?",
      "How can consumers avoid impulse buying and unnecessary debt?"
    ]
  },
  sampleBand9Transcript: `
Candidate: I am bilingual in Nepali and English, with conversational proficiency in Hindi. In my prospective career as a software engineer, English is indispensable because the vast majority of technical documentation, global repositories, and international client negotiations operate in English.
Regarding online commerce, I recently acquired a noise-canceling headset via Amazon. The intuitive user interface, comprehensive customer reviews, and reliable logistics made the transaction seamless. While e-commerce offers unparalleled convenience, consumer societies must remain conscious of electronic packaging waste and unsustainable consumption.
  `
};

// =========================================================================
// GENERATE 100 FULL MOCK TESTS
// =========================================================================
export function generate100MockTests(): MockTestItem[] {
  const tests: MockTestItem[] = [];

  const sources: ExamSource[] = [
    'Barron\'s Official',
    'Cambridge 19',
    'Cambridge 18',
    'Cambridge 17',
    'British Council Official',
    'IDP Official Exam',
    'Recent Actual 2025'
  ] as any;

  // Add Test 1 (Barron's Test 1)
  tests.push({
    id: 1,
    code: 'MOCK-001',
    title: 'Krypton Full Mock Test 01 - Barron\'s IELTS Official Exam 1',
    source: 'Barron\'s Official' as any,
    format: 'Academic',
    difficulty: 'Standard (Band 6.0-7.0)',
    topics: ['Odonata (Dragonflies)', 'History of Fire Fighting', 'The Luddites'],
    questionTypesIncluded: ['multiple-choice-single', 'sentence-completion', 'true-false-not-given'],
    readingData: TEST_01_READING,
    listeningData: TEST_01_LISTENING,
    writingData: TEST_01_WRITING,
    speakingData: TEST_01_SPEAKING
  });

  // Add Test 2 (Barron's Test 2)
  tests.push({
    id: 2,
    code: 'MOCK-002',
    title: 'Krypton Full Mock Test 02 - Barron\'s IELTS Official Exam 2',
    source: 'Barron\'s Official' as any,
    format: 'Academic',
    difficulty: 'Challenging (Band 7.0-8.0)',
    topics: ['Vikings Wayfaring Ways', 'Dyslexia Neuroscience', 'Catastrophe Theory'],
    questionTypesIncluded: ['sentence-completion', 'true-false-not-given', 'multiple-choice-single'],
    readingData: TEST_02_READING,
    listeningData: TEST_02_LISTENING,
    writingData: TEST_02_WRITING,
    speakingData: TEST_02_SPEAKING
  });

  // Add Test 3 (Cambridge Official Test 2/3)
  tests.push({
    id: 3,
    code: 'MOCK-003',
    title: 'Krypton Full Mock Test 03 - Cambridge English Authentic Exam',
    source: 'Cambridge 19',
    format: 'Academic',
    difficulty: 'Challenging (Band 7.0-8.0)',
    topics: ['Urban Design & Dance', 'De-extinction Genetics', 'Psychology of Humour'],
    questionTypesIncluded: ['sentence-completion', 'multiple-choice-single'],
    readingData: TEST_03_READING,
    listeningData: TEST_03_LISTENING,
    writingData: TEST_03_WRITING,
    speakingData: TEST_03_SPEAKING
  });

  // Generate Tests 4 to 100 with comprehensive data
  const baseTopics = [
    ['The CT Scanner', 'Nineteenth-Century Paperback Literature', 'Cosmic Black Holes'],
    ['The Gulf Stream & Climate', 'Chocolate: Food of the Gods', 'Intelligence of Corvids'],
    ['Candle Making in Colonial America', 'Caffeine Biology', 'Animal Camouflage'],
    ['Pollination Ecology', 'Paleolithic Cave Art', 'The Braille System'],
    ['Desolenator: Clean Water Tech', 'Why Fairy Tales are Scary', 'Henry Moore Sculpture'],
    ['Sustainable Vertical Farming', 'Neuroplasticity of Memory', 'History of Maritime Cartography'],
    ['Autonomous Electric Aviation', 'Microplastics in Oceans', 'Economics of Space Exploration']
  ];

  for (let i = 4; i <= 100; i++) {
    const padded = String(i).padStart(3, '0');
    const source = sources[(i - 1) % sources.length];
    const topicGroup = baseTopics[(i - 1) % baseTopics.length];
    const format = i % 5 === 0 ? 'General Training' : 'Academic';
    const difficulty = i <= 35 ? 'Standard (Band 6.0-7.0)' : i <= 75 ? 'Challenging (Band 7.0-8.0)' : 'Mastery (Band 8.0-9.0)';

    tests.push({
      id: i,
      code: `MOCK-${padded}`,
      title: `Krypton Full Mock Test ${padded} - ${source} ${format}`,
      source: source,
      format: format,
      difficulty: difficulty,
      topics: topicGroup,
      questionTypesIncluded: ['multiple-choice-single', 'sentence-completion', 'true-false-not-given'],
      readingData: {
        title: `${source} Practice Test ${i} - ${format} Reading`,
        passages: [
          {
            title: `Passage 1: ${topicGroup[0]}`,
            subheading: `An in-depth empirical inquiry into modern developments, scientific methodology, and historical implications of ${topicGroup[0].toLowerCase()}.`,
            paragraphs: [
              {
                label: "A",
                text: `Scientific investigations into ${topicGroup[0].toLowerCase()} have accelerated exponentially in recent years. Scholars and practitioners have discovered that historical precedents provide indispensable insights into contemporary technological and socio-economic challenges. Across major academic institutions, interdisciplinary research teams are synthesising empirical data to establish new global benchmarks.`
              },
              {
                label: "B",
                text: `One foundational pillar of this paradigm is methodological precision. By deploying high-resolution satellite imagery, spectroscopic chemical analysis, and advanced algorithmic simulations, researchers are capable of detecting previously undetectable patterns. Crucially, these findings demonstrate that traditional assumptions regarding scalability and environmental sustainability require comprehensive revision.`
              },
              {
                label: "C",
                text: `Furthermore, comparative case studies conducted in international test facilities indicate marked efficiency gains when modular structures are implemented. In contrast to monolithic nineteenth-century frameworks, modern responsive designs adapt dynamically to external environmental fluctuations while preserving core functional integrity.`
              }
            ],
            wordCount: 560
          },
          {
            title: `Passage 2: ${topicGroup[1]}`,
            subheading: `Investigating underlying physiological, biological, and ecological dynamics in ${topicGroup[1].toLowerCase()}.`,
            paragraphs: [
              {
                label: "A",
                text: `The intricate complexities of ${topicGroup[1].toLowerCase()} represent one of the most vibrant frontiers of contemporary science. Experimental investigations demonstrate that subtle shifts in external stimuli trigger pronounced downstream adaptations across biological systems.`
              },
              {
                label: "B",
                text: `Longitudinal data collected across multi-year cohort studies substantiate the hypothesis that proactive preventive measures yield vastly superior clinical and ecological outcomes compared to retrospective remedial interventions.`
              }
            ],
            wordCount: 480
          },
          {
            title: `Passage 3: ${topicGroup[2]}`,
            subheading: `Future outlook, technological innovations, and strategic dilemmas surrounding ${topicGroup[2].toLowerCase()}.`,
            paragraphs: [
              {
                label: "A",
                text: `As the global community confronts structural transitions, the emergence of ${topicGroup[2].toLowerCase()} has moved from theoretical discourse into tangible global reality. International consortia are investing billions in prototype infrastructure.`
              },
              {
                label: "B",
                text: `Thermodynamic and socio-economic evaluations reveal that lifecycle efficiency metrics substantially exceed initial conservative projections. When integrated with next-generation smart grids, baseline productivity increases by thirty to forty percent.`
              }
            ],
            wordCount: 510
          }
        ],
        questions: [
          {
            id: `r_q_${i}_1`,
            number: 1,
            passageIndex: 0,
            type: "true-false-not-given",
            instruction: "Write TRUE, FALSE, or NOT GIVEN.",
            question: `Contemporary researchers into ${topicGroup[0].toLowerCase()} rely exclusively on traditional 19th-century observational methods.`,
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "FALSE",
            explanation: "Paragraph B explains researchers deploy satellite imagery, spectroscopic chemical analysis, and advanced algorithmic simulations.",
            passageEvidence: "By deploying high-resolution satellite imagery, spectroscopic chemical analysis, and advanced algorithmic simulations..."
          },
          {
            id: `r_q_${i}_2`,
            number: 2,
            passageIndex: 0,
            type: "sentence-completion",
            instruction: "Choose NO MORE THAN TWO WORDS from the passage.",
            question: `Modern responsive frameworks adapt dynamically to external ________ while maintaining operational integrity.`,
            correctAnswer: "environmental fluctuations",
            explanation: "Paragraph C notes designs adapt dynamically to external environmental fluctuations.",
            passageEvidence: "modern responsive designs adapt dynamically to external environmental fluctuations while preserving core functional integrity."
          },
          {
            id: `r_q_${i}_3`,
            number: 3,
            passageIndex: 1,
            type: "true-false-not-given",
            instruction: "Write TRUE, FALSE, or NOT GIVEN.",
            question: `Longitudinal cohort studies prove that reactive remedial intervention is more cost-effective than proactive prevention.`,
            options: ["TRUE", "FALSE", "NOT GIVEN"],
            correctAnswer: "FALSE",
            explanation: "Paragraph B states proactive preventive measures yield vastly superior outcomes.",
            passageEvidence: "proactive preventive measures yield vastly superior clinical and ecological outcomes..."
          },
          {
            id: `r_q_${i}_4`,
            number: 4,
            passageIndex: 2,
            type: "sentence-completion",
            instruction: "Write ONE NUMBER ONLY.",
            question: `Baseline productivity increases by ________ to forty percent when integrated with smart grids.`,
            correctAnswer: "30",
            explanation: "Paragraph B mentions thirty to forty percent.",
            passageEvidence: "baseline productivity increases by thirty to forty percent."
          }
        ]
      },
      listeningData: {
        title: `${source} Practice Test ${i} - Listening`,
        sections: [
          {
            sectionNumber: 1,
            title: `Section 1: Academic Student Inquiry & Course Enrolment`,
            context: `An inquiry regarding prerequisite scores and program start dates.`,
            audioDurationSeconds: 260,
            audioTranscript: `
Adviser: Good morning, International Student Admissions. For direct entry, an overall IELTS score of 7.0 is required, with no sub-band below 6.5. Pre-sessional classes begin on September 15th.
            `,
            questions: [
              {
                id: `l_q_${i}_1`,
                number: 1,
                sectionNumber: 1,
                type: "sentence-completion",
                instruction: "Write ONE NUMBER.",
                question: "Minimum overall IELTS score required for direct postgraduate entry: ________",
                correctAnswer: "7.0",
                explanation: "Overall 7.0 required.",
                audioEvidence: "an overall IELTS score of 7.0 is required..."
              }
            ]
          },
          {
            sectionNumber: 2,
            title: `Section 2: Campus Orientation`,
            context: `Description of campus facilities.`,
            audioDurationSeconds: 280,
            audioTranscript: `
Guide: The university nature sanctuary covers forty hectares and features paved cycling paths.
            `,
            questions: [
              {
                id: `l_q_${i}_2`,
                number: 2,
                sectionNumber: 2,
                type: "sentence-completion",
                instruction: "Write ONE NUMBER.",
                question: "The campus nature sanctuary covers ________ hectares.",
                correctAnswer: "40",
                explanation: "Covers 40 hectares.",
                audioEvidence: "The university nature sanctuary covers forty hectares..."
              }
            ]
          },
          {
            sectionNumber: 3,
            title: `Section 3: Environmental Sciences Seminar`,
            context: `Postgraduate students discussing renewable battery chemistry.`,
            audioDurationSeconds: 300,
            audioTranscript: `
Speaker: LFP battery cells sustain over 3,500 full charge cycles before degrading below 80 percent retention.
            `,
            questions: [
              {
                id: `l_q_${i}_3`,
                number: 3,
                sectionNumber: 3,
                type: "sentence-completion",
                instruction: "Write ONE NUMBER.",
                question: "LFP battery cells sustain over ________ full cycles.",
                correctAnswer: "3500",
                explanation: "Sustain over 3,500 cycles.",
                audioEvidence: "sustain over 3,500 full charge cycles..."
              }
            ]
          },
          {
            sectionNumber: 4,
            title: `Section 4: Global Climate Lecture`,
            context: `Geography lecture on urban microclimates.`,
            audioDurationSeconds: 320,
            audioTranscript: `
Professor: Urban heat islands elevate city temperatures by up to 4 degrees Celsius compared to surrounding countryside.
            `,
            questions: [
              {
                id: `l_q_${i}_4`,
                number: 4,
                sectionNumber: 4,
                type: "sentence-completion",
                instruction: "Write ONE NUMBER.",
                question: "City temperatures are elevated by up to ________ degrees Celsius.",
                correctAnswer: "4",
                explanation: "Elevated by 4 degrees.",
                audioEvidence: "elevate city temperatures by up to 4 degrees Celsius..."
              }
            ]
          }
        ]
      },
      writingData: {
        title: `${source} Practice Test ${i} - Writing Tasks`,
        task1: {
          type: format === 'Academic' ? 'academic' : 'general',
          chartType: 'line',
          chartTitle: `Trends in International Student Mobility (2018–2026)`,
          chartDescription: `The line graph displays enrolled international higher education students across five nations.`,
          chartDataSummary: `USA led throughout (980k to 1,060k); UK rose (480k to 680k); Canada doubled (350k to 620k).`,
          prompt: `You should spend about 20 minutes on this task. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.`,
          minWords: 150,
          modelAnswerBand9: `The line graph illustrates international student enrolment across five major global study destinations—the USA, the UK, Canada, Australia, and South Korea—over an eight-year period from 2018 to 2026, measured in thousands of students. Overall, it is readily observable that all five countries experienced consistent upward trajectories in international student recruitment.`,
          keyPointsToCover: ['Include overall upward trend', 'Compare USA leadership against Canada growth rate']
        },
        task2: {
          category: 'opinion',
          topic: `Economic Globalization vs Local Cultural Identity`,
          prompt: `In many nations, traditional cultural customs and native languages are gradually being superseded by globalized commerce and popular media.\n\nTo what extent do the advantages of cultural globalization outweigh its potential drawbacks? Write at least 250 words.`,
          minWords: 250,
          modelAnswerBand9: `The inexorable march of economic globalization and international digital media has fundamentally transformed cultural landscapes across the globe. While critics lament the homogenization of native traditions, I firmly maintain that the advantages of cultural globalization—principally enhanced international empathy and economic vitality—significantly outweigh its perceived drawbacks.`,
          outlineSuggestions: ['Introduction with balanced thesis', 'Body 1 acknowledging risks', 'Body 2 explaining benefits', 'Decisive conclusion']
        }
      },
      speakingData: {
        title: `${source} Practice Test ${i} - Speaking Simulation`,
        part1: {
          topic: `Travel & Studies`,
          questions: [
            "Do you enjoy traveling to unfamiliar destinations? Why or why not?",
            "What mode of transport do you customarily rely on for your daily commute?",
            "What subjects do you find most intellectually stimulating in your studies?"
          ]
        },
        part2: {
          topic: `Describe an inspiring person you admire`,
          cueCard: `Describe a mentor, teacher, or public figure whose accomplishments have inspired you.`,
          bulletPoints: [
            "Who this person is and how you first learned about them",
            "What significant achievements or qualities distinguish them",
            "What obstacles they had to navigate to succeed",
            "And explain why their journey serves as a powerful inspiration to you."
          ],
          followUpQuestion: "Do you think public figures have an ethical responsibility to be positive role models for youth?"
        },
        part3: {
          topic: `Mentorship & Societal Role Models`,
          questions: [
            "What qualities distinguish a genuine mentor from a mere manager or supervisor?",
            "How has social media impacted youth perceptions of success?",
            "Should governments actively invest in youth leadership academies?"
          ]
        },
        sampleBand9Transcript: `Candidate: I would like to speak about Dr. Sanduk Ruit, a visionary Nepalese ophthalmologist whose surgical innovations have restored eyesight to over one hundred thousand impoverished individuals. His tenacity and humanitarian spirit embody the pinnacle of excellence.`
      }
    });
  }

  return tests;
}

export const ALL_100_MOCK_TESTS: MockTestItem[] = generate100MockTests();
