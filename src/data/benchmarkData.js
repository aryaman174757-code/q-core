export const BENCHMARK_PROBLEMS = [
  {
    id: "search",
    name: "Unsorted Database Search",
    classicalAlgo: "Linear Search O(N)",
    quantumAlgo: "Grover's Algorithm O(√N)",
    description: "Finding a unique target item in an unstructured database of N items.",
    speedupType: "Quadratic Speedup",
    dataPoints: [
      { size: "1,000", n: 1000, classicalTime: 0.001, quantumTime: 0.00003, classicalPower: 45, quantumPower: 12 },
      { size: "1,000,000", n: 1000000, classicalTime: 0.85, quantumTime: 0.001, classicalPower: 120, quantumPower: 15 },
      { size: "1 Billion", n: 1000000000, classicalTime: 850, quantumTime: 0.031, classicalPower: 1400, quantumPower: 18 },
      { size: "1 Trillion", n: 1000000000000, classicalTime: 850000, quantumTime: 1.0, classicalPower: 12500, quantumPower: 22 }
    ],
    realWorldImpact: "Accelerates genomic sequencing lookups, pattern matching in cryptography, and massive database queries from months to seconds."
  },
  {
    id: "crypto",
    name: "Integer Factorization (RSA Cryptography)",
    classicalAlgo: "General Number Field Sieve O(exp(N^(1/3)))",
    quantumAlgo: "Shor's Algorithm O((log N)^3)",
    description: "Factoring large composite numbers into prime factors to break public-key encryption.",
    speedupType: "Exponential Speedup",
    dataPoints: [
      { size: "256-bit", n: 256, classicalTime: 0.02, quantumTime: 0.0001, classicalPower: 65, quantumPower: 14 },
      { size: "512-bit", n: 512, classicalTime: 120, quantumTime: 0.002, classicalPower: 350, quantumPower: 16 },
      { size: "1024-bit", n: 1024, classicalTime: 3.15e7, quantumTime: 0.08, classicalPower: 85000, quantumPower: 20 }, // ~1 year classical
      { size: "2048-bit", n: 2048, classicalTime: 9.46e12, quantumTime: 1.2, classicalPower: 1e8, quantumPower: 25 } // Billions of years classical
    ],
    realWorldImpact: "Breaks modern RSA-2048 encryption in hours, mandating the global transition to Post-Quantum Cryptography (PQC) and QKD."
  },
  {
    id: "molecule",
    name: "Molecular Chemistry Simulation",
    classicalAlgo: "Full Configuration Interaction O(2^N)",
    quantumAlgo: "Variational Quantum Eigensolver (VQE)",
    description: "Simulating electron orbital interactions and ground-state energies of complex biomolecules.",
    speedupType: "Exponential Speedup",
    dataPoints: [
      { size: "10 Electrons", n: 10, classicalTime: 0.005, quantumTime: 0.001, classicalPower: 50, quantumPower: 12 },
      { size: "24 Electrons", n: 24, classicalTime: 42, quantumTime: 0.015, classicalPower: 450, quantumPower: 15 },
      { size: "50 Electrons (Caffeine)", n: 50, classicalTime: 8.64e6, quantumTime: 0.12, classicalPower: 25000, quantumPower: 18 },
      { size: "100 Electrons (Penicillin)", n: 100, classicalTime: 1e16, quantumTime: 1.5, classicalPower: 1e9, quantumPower: 24 }
    ],
    realWorldImpact: "Revolutionizes drug discovery, synthetic nitrogen fixation fertilizers, and high-efficiency battery materials."
  },
  {
    id: "optimization",
    name: "Combinatorial Optimization (Logistics & TSP)",
    classicalAlgo: "Branch & Bound / Simulated Annealing",
    quantumAlgo: "Quantum Approximate Optimization (QAOA)",
    description: "Finding optimal routes, resource allocation, and portfolio arbitrage across factorial permutations.",
    speedupType: "Super-Polynomial Advantage",
    dataPoints: [
      { size: "15 Cities", n: 15, classicalTime: 0.01, quantumTime: 0.002, classicalPower: 40, quantumPower: 12 },
      { size: "25 Cities", n: 25, classicalTime: 18.5, quantumTime: 0.04, classicalPower: 380, quantumPower: 16 },
      { size: "50 Cities", n: 50, classicalTime: 3.15e8, quantumTime: 0.35, classicalPower: 75000, quantumPower: 20 },
      { size: "100 Cities", n: 100, classicalTime: 1e15, quantumTime: 2.8, classicalPower: 1e8, quantumPower: 28 }
    ],
    realWorldImpact: "Optimizes global airline scheduling, worldwide supply chains, and power grid balancing with minimal carbon footprint."
  }
];
