// Exact Academic Content from Reference PPT: "update ppt ).pptx"
// Dr. D. Y. Patil College of Engineering and Innovation, Varale, Talegaon, Pune

export const INSTITUTION_INFO = {
  college: "Dr. D. Y. Patil College of Engineering and Innovation",
  campus: "Varale, Talegaon, Pune Campus",
  department: "Department of Computer Engineering",
  accreditation: "Autonomous Institute Affiliated to Savitribai Phule Pune University | Accredited NAAC 'A' Grade",
  subject: "Computer Architecture and Organization",
  class: "Second Year B.Tech (SE), Div: B",
  topic: "Quantum vs Classical Microprocessor",
  students: [
    { name: "Neha Borkar", roll: "12242" },
    { name: "Mayuri Mundkar", roll: "12234" },
    { name: "Janvhi Patil", roll: "12255" },
    { name: "Vedika Karlekar", roll: "12210" }
  ],
  logo: "/images/image1.jpg"
};

export const CLASSICAL_DATA = {
  title: "Classical Microprocessor",
  shortDesc: "Silicon-based digital processor operating on binary states (0 and 1) following the von Neumann architecture.",
  working: {
    summary: "A classical microprocessor works using binary bits (0 and 1) and follows the fetch–decode–execute cycle continuously to execute the program.",
    steps: [
      {
        id: "fetch",
        name: "Fetch",
        desc: "It fetches an instruction from memory.",
        unit: "Program Counter (PC) & Memory Bus",
        color: "#00E5FF",
        details: "The processor loads the binary instruction located at the memory address specified by the Program Counter into the Instruction Register (IR)."
      },
      {
        id: "decode",
        name: "Decode",
        desc: "The Control Unit decodes the instruction.",
        unit: "Control Unit (CU)",
        color: "#38BDF8",
        details: "The Control Unit interprets the opcode bits, determines the required micro-operations, and prepares data pathways and clock signals."
      },
      {
        id: "execute",
        name: "Execute",
        desc: "The ALU performs the required operation.",
        unit: "Arithmetic Logic Unit (ALU)",
        color: "#22C55E",
        details: "Arithmetic (ADD, SUB) or logical (AND, OR, XOR) operations are executed on operands fetched from the registers."
      },
      {
        id: "store",
        name: "Store",
        desc: "The result is stored in a register or memory.",
        unit: "Registers & Data Bus",
        color: "#F59E0B",
        details: "The computational output is written back to the Accumulator (AC), target destination register, or main RAM memory."
      }
    ]
  },
  architectureComponents: [
    {
      id: "alu",
      name: "Arithmetic Logic Unit (ALU)",
      role: "Mathematical & Logical Engine",
      description: "Carries out basic operations like ADD, SUB, comparison, bit shifts, AND, OR, and NOT on binary integers.",
      stats: "Operations: 64-bit binary, Clock Speed: ~3-5 GHz"
    },
    {
      id: "cu",
      name: "Control Unit (CU)",
      role: "Instruction Orchestrator",
      description: "Directs operation of the processor by decoding machine instructions, generating timing signals, and coordinating the ALU, registers, and buses.",
      stats: "Microcode / Hardwired State Machine"
    },
    {
      id: "registers",
      name: "Processor Registers",
      role: "Ultra-Fast On-Die Storage",
      description: "High-speed temporary storage cells directly inside the CPU: Accumulator, Program Counter (PC), Instruction Register (IR), and General-Purpose Registers (R1-R8).",
      stats: "Access Latency: < 0.5 nanoseconds"
    },
    {
      id: "cache",
      name: "L1 / L2 / L3 Cache",
      role: "SRAM Memory Hierarchy",
      description: "Small, high-speed static RAM caches placed right next to execution cores to eliminate memory latency bottlenecks.",
      stats: "Size: 32KB - 32MB, Latency: 1-10 ns"
    },
    {
      id: "bus",
      name: "System Bus (Data, Address, Control)",
      role: "Interconnect Highway",
      description: "Parallel or high-speed serial trace lines carrying address lines, binary data words, and control strobes across the motherboard.",
      stats: "Bandwidth: Up to 100+ GB/s (PCIe / DDR)"
    }
  ],
  applications: [
    { id: 1, title: "Computers and Laptops", desc: "Processing data and running software.", icon: "Laptop", domain: "General Computing" },
    { id: 2, title: "Embedded Systems", desc: "Used in appliances, machines, and controllers.", icon: "Cpu", domain: "Smart Devices" },
    { id: 3, title: "Automobiles", desc: "Engine control, sensors, and safety systems.", icon: "Car", domain: "Automotive" },
    { id: 4, title: "Industrial Automation", desc: "Controlling machines and production systems.", icon: "Factory", domain: "Manufacturing" },
    { id: 5, title: "Medical Equipment", desc: "Monitoring and controlling medical devices.", icon: "Activity", domain: "Healthcare" },
    { id: 6, title: "Communication Systems", desc: "Used in routers, modems, and other devices.", icon: "Wifi", domain: "Telecom" },
    { id: 7, title: "Consumer Electronics", desc: "TVs, printers, cameras, and smart devices.", icon: "Tv", domain: "Consumer Tech" },
    { id: 8, title: "Robotics", desc: "Controlling motors, sensors, and robotic operations.", icon: "Bot", domain: "Robotics" }
  ],
  advantages: [
    "Simple to understand and use",
    "Low cost",
    "Reliable and stable",
    "Easy to program",
    "Widely available and supported"
  ],
  disadvantages: [
    "Limited processing speed",
    "Consumes more power for complex tasks",
    "Cannot perform quantum-level computations",
    "Performance decreases for very large problems",
    "Limited parallel processing capability"
  ]
};

export const QUANTUM_DATA = {
  title: "Quantum Microprocessor",
  shortDesc: "Quantum Processing Unit (QPU) exploiting quantum mechanical principles—superposition and entanglement—for exponential speed-ups.",
  working: {
    summary: "Unlike classical bits, quantum processors operate on qubits that exist in linear combinations of states. Operations are applied via quantum logic gates before final projective measurement collapses the wavefunction into classical bits.",
    flowchart: [
      { step: 1, title: "Input Data", desc: "Classical binary problem data is translated into quantum state initialization parameters." },
      { step: 2, title: "Qubits", desc: "Quantum two-level systems (e.g. superconducting transmon circuits, trapped ions) initialized to ground state |0⟩." },
      { step: 3, title: "Superposition & Entanglement", desc: "Hadamard gates create equal superpositions, while multi-qubit gates establish entangled non-local states across qubits." },
      { step: 4, title: "Quantum Gates", desc: "Unitary quantum microwave pulses apply logic transformations: Hadamard (H), Pauli-X (NOT), Pauli-Z (Phase), and CNOT (Controlled-NOT)." },
      { step: 5, title: "Processing", desc: "Constructive quantum interference amplifies the probability amplitudes of the correct solution while cancelling incorrect paths." },
      { step: 6, title: "Measurement", desc: "Wavefunction collapse via readout resonators projects the quantum state into classical binary values according to Born's rule." },
      { step: 7, title: "Output", desc: "High-probability classical solution bitstring extracted for interpretation." }
    ]
  },
  layers: [
    {
      id: "cryostat",
      name: "Dilution Refrigerator (Cryostat)",
      role: "Extreme Thermal Isolation",
      temp: "15 mK (-273.135°C)",
      desc: "Multi-stage gold-plated cooling chandelier utilizing Helium-3 / Helium-4 dilution to reach colder than deep space, eliminating thermal noise."
    },
    {
      id: "microwave",
      name: "Microwave Coaxial Lines & Attenuators",
      role: "Control Pulse Transmission",
      freq: "4 - 8 GHz",
      desc: "Superconducting coaxial lines that deliver precise microwave pulses to manipulate the quantum state of individual qubits without adding thermal heat."
    },
    {
      id: "chip",
      name: "Superconducting Quantum Chip Die",
      role: "Core QPU Substrate",
      material: "Silicon / Sapphire + Niobium / Aluminum",
      desc: "Planar lithographic chip housing transmon qubits fabricated with sub-micron precision."
    },
    {
      id: "qubits",
      name: "Transmon Qubits (Josephson Junctions)",
      role: "Quantum Bit Nodes",
      count: "Multi-Qubit Array",
      desc: "Non-linear LC oscillators formed by superconducting loops interrupted by insulating oxide barriers, behaving as artificial atoms with discrete energy levels |0⟩ and |1⟩."
    },
    {
      id: "readout",
      name: "Resonators & Quantum Amplifiers",
      role: "State Measurement System",
      desc: "Dispersive microwave cavities coupled to qubits. The shift in cavity resonance frequency indicates whether the qubit is in state |0⟩ or |1⟩."
    }
  ],
  applications: [
    {
      id: 1,
      title: "Artificial Intelligence and Machine Learning",
      desc: "Quantum neural networks, accelerated kernel methods, and exponential speedup in processing massive multi-dimensional training matrices.",
      icon: "Brain",
      domain: "Advanced AI"
    },
    {
      id: 2,
      title: "Cryptography and Cybersecurity",
      desc: "Executing Shor's algorithm for prime factorization of RSA keys, alongside Quantum Key Distribution (QKD) for mathematically unbreakable communication.",
      icon: "ShieldCheck",
      domain: "Security"
    },
    {
      id: 3,
      title: "Drug and Medical Research",
      desc: "Simulating complex molecular interactions, protein folding, and chemical enzymatic catalysts with exact quantum chemical accuracy.",
      icon: "Dna",
      domain: "Bio-Medicine"
    },
    {
      id: 4,
      title: "Weather and Climate Simulation",
      desc: "Simulating chaotic fluid dynamics, global atmospheric atmospheric models, and greenhouse gas thermodynamics beyond classical supercomputer limits.",
      icon: "CloudRain",
      domain: "Climate Science"
    },
    {
      id: 5,
      title: "Optimization of Complex Problems",
      desc: "Solving NP-hard problems like global supply chain routing, financial portfolio arbitrage, grid management, and traffic optimization.",
      icon: "TrendingUp",
      domain: "Operations Research"
    }
  ],
  advantages: [
    "Very high processing power",
    "Solves some complex problems faster",
    "Can process multiple possibilities",
    "Useful for advanced scientific research",
    "Can improve optimization and simulation"
  ],
  disadvantages: [
    "Very expensive to build",
    "Difficult to develop and maintain",
    "Requires special operating conditions",
    "Qubits are highly sensitive to errors",
    "Limited practical applications currently"
  ]
};

export const COMPARISON_MATRIX = [
  {
    category: "Basic Unit",
    classical: "Bit – holds either 0 or 1",
    quantum: "Qubit – holds 0, 1, or both at once",
    classicalDetail: "Binary switches (transistors) represent discrete high (1) or low (0) voltage states.",
    quantumDetail: "Quantum two-level system represented by state vector |ψ⟩ = α|0⟩ + β|1⟩ on the Bloch sphere.",
    icon: "Binary"
  },
  {
    category: "State Principle",
    classical: "Definite binary states",
    quantum: "Superposition & entanglement",
    classicalDetail: "Each bit is deterministic and independent. N bits represent exactly 1 state at any given microsecond.",
    quantumDetail: "Superposition allows simultaneous exploration; entanglement links N qubits to represent 2^N states simultaneously in Hilbert space.",
    icon: "Atom"
  },
  {
    category: "Processing Style",
    classical: "Sequential / limited parallelism",
    quantum: "Massive inherent parallelism",
    classicalDetail: "Executes micro-operations step-by-step per core clock cycle, even with pipelining and hyper-threading.",
    quantumDetail: "Quantum interference evaluates all combinations in parallel through unitary matrix transformations.",
    icon: "Cpu"
  },
  {
    category: "Speed on Hard Problems",
    classical: "Slows sharply as complexity grows",
    quantum: "Exponential speed-up for specific problems",
    classicalDetail: "Exponential time complexity O(2^N) makes factorizing 2048-bit RSA keys take billions of years.",
    quantumDetail: "Shor's algorithm can factorize in polynomial time O(N^3); Grover's search provides quadratic speedup O(√N).",
    icon: "Zap"
  },
  {
    category: "Error Rate",
    classical: "Very low, highly stable",
    quantum: "High – sensitive to noise & decoherence",
    classicalDetail: "Bit-flip error rates are negligible (less than 1 in 10^18 operations).",
    quantumDetail: "Qubit states are fragile and decohere in microseconds due to cosmic rays, electromagnetic and thermal noise.",
    icon: "AlertTriangle"
  },
  {
    category: "Operating Conditions",
    classical: "Room temperature",
    quantum: "Near absolute zero (extreme cooling)",
    classicalDetail: "Silicon operates reliably from 0°C to 85°C using conventional heat sinks and fan cooling.",
    quantumDetail: "Superconducting QPUs require dilution refrigerators operating at ~15 milliKelvin (-273.135°C).",
    icon: "ThermometerSnowflake"
  },
  {
    category: "Maturity",
    classical: "Fully commercial, mainstream",
    quantum: "Experimental, early-stage research",
    classicalDetail: "Over 50 years of commercial fabrication and software ecosystems (billions of devices in daily use).",
    quantumDetail: "Noisy Intermediate-Scale Quantum (NISQ) era; active pursuit of Fault-Tolerant Quantum Computing (FTQC).",
    icon: "Clock"
  }
];
