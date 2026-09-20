export const TIMELINE_MILESTONES = [
  {
    year: "1940s",
    title: "Vacuum Tubes",
    era: "First Generation Computing",
    subtitle: "Thermionic Valves & ENIAC",
    color: "#F59E0B",
    icon: "Radio",
    description: "Computing began with glass vacuum tubes controlling electrical current through a thermionic vacuum. Massive machines like ENIAC required thousands of tubes, consumed kilowatts of power, and generated intense heat.",
    specs: [
      { label: "Switching Speed", value: "Kilohertz (kHz)" },
      { label: "Size per bit", value: "~10-15 cm" },
      { label: "Failure Rate", value: "Tubes burned out every few hours" },
      { label: "Key Example", value: "ENIAC (1945), 18,000 tubes" }
    ],
    breakthrough: "Proved that electronic binary logic calculation was possible without mechanical gears."
  },
  {
    year: "1947 - 1950s",
    title: "Discrete Transistors",
    era: "Second Generation Computing",
    subtitle: "Solid-State Silicon Revolution",
    color: "#22C55E",
    icon: "Zap",
    description: "Invented at Bell Labs by Bardeen, Brattain, and Shockley. Transistors replaced delicate glass tubes with solid semiconductor crystals (Germanium and Silicon), dramatically shrinking computers and boosting reliability.",
    specs: [
      { label: "Switching Speed", value: "Megahertz (MHz)" },
      { label: "Size per bit", value: "~1 cm" },
      { label: "Power Draw", value: "Milliwatts per switch" },
      { label: "Key Example", value: "IBM 7090 Transistor Mainframe" }
    ],
    breakthrough: "Eliminated vacuum tube warm-up times, burnout, and extreme power waste."
  },
  {
    year: "1958 - 1960s",
    title: "Integrated Circuits",
    era: "Third Generation Computing",
    subtitle: "Planar Silicon Monoliths",
    color: "#00E5FF",
    icon: "Layers",
    description: "Jack Kilby (Texas Instruments) and Robert Noyce (Fairchild) placed multiple interconnected transistors, resistors, and capacitors onto a single piece of semiconductor silicon wafer.",
    specs: [
      { label: "Transistor Count", value: "Tens to thousands per chip" },
      { label: "Integration", value: "SSI to MSI (Small/Medium Scale)" },
      { label: "Significance", value: "Gave birth to Silicon Valley" },
      { label: "Key Example", value: "Apollo Guidance Computer (AGC)" }
    ],
    breakthrough: "Enabled miniaturized guidance systems that navigated the Apollo moon landings."
  },
  {
    year: "1971 - 1990s",
    title: "Microprocessors",
    era: "Fourth Generation Computing",
    subtitle: "Single-Chip CPU Architecture",
    color: "#38BDF8",
    icon: "Cpu",
    description: "The entire Central Processing Unit (ALU, Control Unit, Registers) was condensed onto a single silicon die. Led by Federico Faggin, Ted Hoff, and Stan Mazor at Intel with the iconic 4004 and 8086.",
    specs: [
      { label: "Clock Frequency", value: "740 kHz (4004) to 300+ MHz" },
      { label: "Data Width", value: "4-bit to 32-bit architecture" },
      { label: "Transistors", value: "2,300 (4004) to millions (Pentium)" },
      { label: "Key Example", value: "Intel 4004 (1971), 8086 (1978)" }
    ],
    breakthrough: "Standardized the Fetch-Decode-Execute von Neumann pipeline on personal computers."
  },
  {
    year: "2000s - 2020s",
    title: "Multi-Core & Supercomputing",
    era: "Modern Classical Peak",
    subtitle: "Gigahertz Parallelism & FinFETs",
    color: "#6366F1",
    icon: "Server",
    description: "Thermal limits (the 'Power Wall' and breakdown of Dennard scaling) forced architects to transition from raw clock frequency increases to multi-core parallelism, hyperthreading, and advanced 3nm EUV lithography.",
    specs: [
      { label: "Transistor Count", value: "Over 100 Billion transistors" },
      { label: "Clock Frequency", value: "3.5 GHz to 5.8 GHz" },
      { label: "Bottleneck", value: "Von Neumann Memory Wall & Heat" },
      { label: "Key Example", value: "AMD EPYC, Apple M-Series, Intel Core" }
    ],
    breakthrough: "Billions of nanometer-scale transistors running billions of calculations per second."
  },
  {
    year: "Present - Future",
    title: "Quantum Computing",
    era: "Fifth Generation & Beyond",
    subtitle: "Superconducting Qubits & Entanglement",
    color: "#7C4DFF",
    icon: "Atom",
    description: "Transcending binary bits entirely. Quantum processors harness non-classical phenomena—superposition of states and quantum entanglement—operating at 15 milliKelvin to solve previously intractable problems in seconds.",
    specs: [
      { label: "Fundamental Unit", value: "Qubit (|0⟩, |1⟩, or superposition)" },
      { label: "Parallelism", value: "2^N states computed simultaneously" },
      { label: "Operating Temp", value: "~15 mK (Colder than deep space)" },
      { label: "Key Example", value: "IBM Quantum Condor, Google Sycamore" }
    ],
    breakthrough: "Exponential speed-up on quantum chemistry, prime factorization, and optimization."
  }
];
