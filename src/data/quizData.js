export const QUIZ_LEVELS = [
  {
    level: 1,
    name: "Level 1: Academic Fundamentals (Easy)",
    description: "Multiple choice questions based on the core definitions, working, advantages, and applications from the reference curriculum.",
    type: "mcq",
    questions: [
      {
        id: "q1",
        question: "What basic unit does a classical microprocessor use, and what states can it hold?",
        options: [
          "Qubit – holds 0, 1, or both simultaneously",
          "Bit – holds either 0 or 1",
          "Trit – holds -1, 0, or 1",
          "Byte – holds 8 states simultaneously"
        ],
        correct: 1,
        explanation: "As stated in Slide 2 & 8: A classical microprocessor works using binary bits that hold either 0 or 1."
      },
      {
        id: "q2",
        question: "What is the correct execution cycle continuously followed by a classical microprocessor?",
        options: [
          "Superposition → Entanglement → Measurement",
          "Fetch → Decode → Execute → Store",
          "Read → Compile → Link → Run",
          "Encode → Transmit → Decrypt → Verify"
        ],
        correct: 1,
        explanation: "Slide 2: The classical microprocessor follows the continuous Fetch → Decode → Execute → Store cycle."
      },
      {
        id: "q3",
        question: "Which component of the classical microprocessor decodes the instruction?",
        options: [
          "Arithmetic Logic Unit (ALU)",
          "Control Unit (CU)",
          "Instruction Register only",
          "System Bus"
        ],
        correct: 1,
        explanation: "Slide 2: 'Decode: The Control Unit decodes the instruction.'"
      },
      {
        id: "q4",
        question: "What quantum mechanical principles allow quantum microprocessors to process multiple possibilities at once?",
        options: [
          "Silicon doping & pipelining",
          "Superposition & Entanglement",
          "Von Neumann memory caching",
          "Overclocking & liquid metal cooling"
        ],
        correct: 1,
        explanation: "Slide 7 & 8: Quantum microprocessors utilize superposition and entanglement to represent 2^N states simultaneously."
      },
      {
        id: "q5",
        question: "Under what operating conditions do superconducting quantum microprocessors typically function?",
        options: [
          "Room temperature (20°C - 25°C)",
          "Dry desert heat (50°C)",
          "Near absolute zero (extreme cryogenic cooling, ~15 mK)",
          "Sub-zero household freezer (-18°C)"
        ],
        correct: 2,
        explanation: "Slide 8: Quantum microprocessors require extreme cooling near absolute zero (15 milliKelvin) to prevent qubit decoherence."
      },
      {
        id: "q6",
        question: "Which of the following is a primary disadvantage of classical microprocessors mentioned in the academic curriculum?",
        options: [
          "Very expensive to build",
          "Cannot perform quantum-level computations & slows on very large problems",
          "Requires dilution refrigerators to operate",
          "High sensitivity to room temperature noise"
        ],
        correct: 1,
        explanation: "Slide 4: Disadvantages of classical microprocessors include limited processing speed, power consumption for complex tasks, and inability to perform quantum-level computations."
      }
    ]
  },
  {
    level: 2,
    name: "Level 2: Component Architecture Match (Medium)",
    description: "Pair each architectural component to its exact physical function in classical and quantum microprocessors.",
    type: "matching",
    pairs: [
      {
        id: "m1",
        component: "ALU (Arithmetic Logic Unit)",
        match: "Performs arithmetic (ADD/SUB) and logical (AND/OR) operations",
        type: "classical"
      },
      {
        id: "m2",
        component: "Control Unit (CU)",
        match: "Decodes instructions and orchestrates execution timing",
        type: "classical"
      },
      {
        id: "m3",
        component: "Transmon Qubit",
        match: "Superconducting Josephson junction storing quantum state α|0⟩ + β|1⟩",
        type: "quantum"
      },
      {
        id: "m4",
        component: "Dilution Refrigerator",
        match: "Cools the quantum chip to 15 mK to eliminate thermal decoherence",
        type: "quantum"
      },
      {
        id: "m5",
        component: "Hadamard Gate (H)",
        match: "Puts a base qubit (|0⟩) into an equal superposition (|0⟩+|1⟩)/√2",
        type: "quantum"
      },
      {
        id: "m6",
        component: "Processor Registers",
        match: "Ultra-fast on-die memory for temporary storage of operands and results",
        type: "classical"
      }
    ]
  },
  {
    level: 3,
    name: "Level 3: Micro-Architecture & Circuit Construction (Hard)",
    description: "Assemble the classical instruction cycle in correct sequence and configure the quantum circuit to generate an entangled Bell state.",
    type: "interactive",
    challenges: [
      {
        id: "c1",
        title: "Challenge A: Sequence the Classical CPU Cycle",
        prompt: "Drag or click the operational steps to order the 4-phase classical microprocessor cycle correctly according to Slide 2.",
        correctOrder: ["Fetch", "Decode", "Execute", "Store"],
        scrambled: ["Execute", "Store", "Fetch", "Decode"],
        hints: "1. Load instruction from memory, 2. Control unit decodes, 3. ALU calculates, 4. Result saved to register/memory."
      },
      {
        id: "c2",
        title: "Challenge B: Synthesize a Quantum Bell State",
        prompt: "Configure a 2-qubit circuit to produce the maximally entangled Bell state: (|00⟩ + |11⟩) / √2.",
        targetState: "(|00⟩ + |11⟩) / √2",
        qubit0GatesRequired: ["H"],
        qubit1GatesRequired: [],
        multiQubitGateRequired: "CNOT(q0 -> q1)",
        explanation: "Applying a Hadamard gate on q0 creates (|0⟩+|1⟩)/√2. Then a CNOT with q0 as control and q1 as target creates the entangled state (|00⟩+|11⟩)/√2."
      }
    ]
  }
];
