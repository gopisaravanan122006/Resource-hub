// Comprehensive initial dataset for ECE Department Resource Portal (Pixel Pioneers)

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export const CATEGORIES = [
  { id: 'all', label: 'All Categories', icon: 'Layers' },
  { id: 'Notes', label: 'Lecture Notes', icon: 'FileText' },
  { id: 'PYQ', label: 'Previous Year Questions (PYQs)', icon: 'HelpCircle' },
  { id: 'Lab Manual', label: 'Lab Manuals & Code', icon: 'Cpu' },
  { id: 'Video Lecture', label: 'Video Lectures', icon: 'Video' },
  { id: 'Reference Book', label: 'Reference Books', icon: 'BookOpen' },
  { id: 'Simulation', label: 'Simulation & Schematics', icon: 'Activity' },
  { id: 'Syllabus', label: 'Syllabus & Course Plans', icon: 'CheckSquare' },
];

export const FORMATS = ['PDF', 'DOCX', 'ZIP', 'MP4', 'LINK', 'MATLAB/SIM', 'CODE'];

export const SUBJECTS = [
  // Semester 1
  {
    id: 'ece-101',
    code: 'EC101',
    name: 'Basic Electrical & Electronics Engineering',
    semester: 1,
    credits: 4,
    leadFaculty: 'Dr. Ramesh Sharma',
    department: 'Electronics & Communication',
    description: 'Fundamentals of DC/AC circuit analysis, semiconductor diodes, BJTs, op-amps, and basic instrumentation.',
    modules: [
      'Module 1: DC Circuit Analysis & Network Theorems',
      'Module 2: AC Circuits, Phasors & Resonance',
      'Module 3: Semiconductor Diodes & Rectifiers',
      'Module 4: BJT Characteristics & Biasing',
      'Module 5: Operational Amplifiers & Digital Basics'
    ],
    icon: 'Zap',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'ece-102',
    code: 'MA101',
    name: 'Engineering Mathematics - I (Calculus & Linear Algebra)',
    semester: 1,
    credits: 4,
    leadFaculty: 'Prof. Ananya Sen',
    department: 'Applied Mathematics',
    description: 'Matrices, Eigenvalues, multivariable calculus, partial derivatives, and series expansions for engineering problems.',
    modules: [
      'Module 1: Matrices, Rank & System of Linear Equations',
      'Module 2: Eigenvalues, Eigenvectors & Diagonalization',
      'Module 3: Differential Calculus & Taylor Series',
      'Module 4: Multivariable Calculus & Jacobians',
      'Module 5: Vector Calculus & Integrals'
    ],
    icon: 'Activity',
    color: 'from-indigo-500 to-blue-500'
  },

  // Semester 2
  {
    id: 'ece-201',
    code: 'EC201',
    name: 'Electronic Devices & Circuits (EDC)',
    semester: 2,
    credits: 4,
    leadFaculty: 'Dr. Preeti Iyer',
    department: 'Electronics & Communication',
    description: 'PN junctions, Zener diodes, BJT amplifiers, JFET/MOSFET device physics, frequency response and power amplifiers.',
    modules: [
      'Module 1: Energy Bands & Carrier Transport in Semiconductors',
      'Module 2: PN Junction Diode & Special Diodes (Zener, Schottky)',
      'Module 3: BJT Transistor Models & Small-Signal Amplifiers',
      'Module 4: Field Effect Transistors (JFET, MOSFET) & Biasing',
      'Module 5: Multistage & Frequency Response of Amplifiers'
    ],
    icon: 'Cpu',
    color: 'from-cyan-500 to-teal-500'
  },
  {
    id: 'ece-202',
    code: 'EC202',
    name: 'Network Analysis & Synthesis',
    semester: 2,
    credits: 4,
    leadFaculty: 'Prof. K. Venkatesh',
    department: 'Electronics & Communication',
    description: 'Transient analysis, Laplace transform in circuits, two-port networks, synthesis of LC/RC networks and filters.',
    modules: [
      'Module 1: Mesh and Nodal Analysis with Dependent Sources',
      'Module 2: Transient Analysis in First and Second Order Circuits',
      'Module 3: Laplace Transform Circuit Solutions & Transfer Functions',
      'Module 4: Two-Port Network Parameters (Z, Y, ABCD, h)',
      'Module 5: Network Synthesis & Foster/Cauer Realizations'
    ],
    icon: 'Share2',
    color: 'from-sky-500 to-indigo-500'
  },

  // Semester 3
  {
    id: 'ece-301',
    code: 'EC301',
    name: 'Digital System Design (Digital Logic)',
    semester: 3,
    credits: 4,
    leadFaculty: 'Dr. Arjun Mehta',
    department: 'Electronics & Communication',
    description: 'Boolean algebra, K-maps, combinational logic design, flip-flops, synchronous state machines, and introduction to Verilog HDL.',
    modules: [
      'Module 1: Number Systems, Boolean Algebra & Logic Simplification',
      'Module 2: Combinational Circuits: Adders, MUX, Decoders & ALU',
      'Module 3: Sequential Circuits: Latches, Flip-Flops, Counters & Registers',
      'Module 4: Synchronous Finite State Machines (Mealy & Moore)',
      'Module 5: Verilog HDL Modeling & Programmable Logic (FPGA/CPLD)'
    ],
    icon: 'Binary',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'ece-302',
    code: 'EC302',
    name: 'Signals & Systems',
    semester: 3,
    credits: 4,
    leadFaculty: 'Dr. Sunita Rao',
    department: 'Electronics & Communication',
    description: 'Continuous and discrete-time signals, LTI systems, Fourier series, Fourier transform, Laplace and Z-transforms.',
    modules: [
      'Module 1: Continuous & Discrete Time Signal Classifications & Properties',
      'Module 2: Linear Time-Invariant (LTI) Systems & Convolution',
      'Module 3: Fourier Series & Continuous-Time Fourier Transform (CTFT)',
      'Module 4: Laplace Transform & ROC for Stability Analysis',
      'Module 5: Z-Transform, DTFT & Discrete System Analysis'
    ],
    icon: 'Radio',
    color: 'from-amber-500 to-orange-500'
  },

  // Semester 4
  {
    id: 'ece-401',
    code: 'EC401',
    name: 'Analog Circuits (Linear Integrated Circuits)',
    semester: 4,
    credits: 4,
    leadFaculty: 'Prof. Sandeep Kulkarni',
    department: 'Electronics & Communication',
    description: 'Op-amp internal stages, feedback topologies, oscillators, 555 timers, active filters, voltage regulators and PLL.',
    modules: [
      'Module 1: Differential Amplifiers & Op-Amp Internal Architecture',
      'Module 2: Feedback Amplifiers & Stability (Nyquist & Bode)',
      'Module 3: Sinusoidal & Non-Sinusoidal Waveform Generators',
      'Module 4: Active Filters (Butterworth, Chebyshev) & 555 Timer Applications',
      'Module 5: Phase Locked Loops (IC 565), DAC/ADC Converters'
    ],
    icon: 'Maximize2',
    color: 'from-emerald-500 to-green-600'
  },
  {
    id: 'ece-402',
    code: 'EC402',
    name: 'Electromagnetic Waves & Transmission Lines',
    semester: 4,
    credits: 4,
    leadFaculty: 'Dr. Rajeshwari N.',
    department: 'Electronics & Communication',
    description: 'Maxwell’s equations, wave propagation in lossy and lossless media, Poynting vector, Smith Chart and transmission line impedance matching.',
    modules: [
      'Module 1: Electrostatics, Magnetostatics & Maxwell’s Equations in Differential/Integral Forms',
      'Module 2: EM Wave Propagation in Conductors, Dielectrics & Plasma',
      'Module 3: Reflection, Refraction & Poynting Vector Power Flow',
      'Module 4: Transmission Line Theory, Characteristic Impedance & VSWR',
      'Module 5: Smith Chart Applications & Stub Matching Techniques'
    ],
    icon: 'Waves',
    color: 'from-blue-600 to-violet-600'
  },

  // Semester 5
  {
    id: 'ece-501',
    code: 'EC501',
    name: 'Microprocessors & Microcontrollers (8086 & ARM)',
    semester: 5,
    credits: 4,
    leadFaculty: 'Dr. Vivek Nair',
    department: 'Electronics & Communication',
    description: '8086 architecture, assembly language, memory interfacing, 8051 & ARM Cortex-M architecture, timers, interrupts, and serial protocols.',
    modules: [
      'Module 1: 8086 CPU Architecture, Addressing Modes & Instruction Set',
      'Module 2: 8086 Interrupts, Memory Interfacing & Peripheral Chips (8255, 8254)',
      'Module 3: 8051 Microcontroller Architecture & Embedded C Programming',
      'Module 4: ARM Cortex-M Architecture, Pipeline & Registers',
      'Module 5: Serial Communication (UART, SPI, I2C) & Sensor Interfacing'
    ],
    icon: 'Cpu',
    color: 'from-rose-500 to-red-600'
  },
  {
    id: 'ece-502',
    code: 'EC502',
    name: 'Analog & Digital Communication Systems',
    semester: 5,
    credits: 4,
    leadFaculty: 'Prof. S. Balasubramanian',
    department: 'Electronics & Communication',
    description: 'AM/FM modulation, superheterodyne receivers, sampling theorem, PCM, DPCM, ASK, FSK, PSK, QAM, and BER calculation.',
    modules: [
      'Module 1: Amplitude Modulation (DSB-SC, SSB-SC, VSB) & Demodulators',
      'Module 2: Frequency & Phase Modulation (NBFM, WBFM) & FM Receivers',
      'Module 3: Sampling Theorem, Pulse Modulation (PAM, PWM, PPM) & PCM/DM',
      'Module 4: Digital Bandpass Modulation (BPSK, QPSK, QAM, BFSK)',
      'Module 5: Noise in Communication Systems & Bit Error Rate Analysis'
    ],
    icon: 'Wifi',
    color: 'from-teal-500 to-emerald-600'
  },

  // Semester 6
  {
    id: 'ece-601',
    code: 'EC601',
    name: 'VLSI Design & Technology',
    semester: 6,
    credits: 4,
    leadFaculty: 'Dr. Madhavan Joshi',
    department: 'Electronics & Communication',
    description: 'MOSFET physics, CMOS inverter DC/transient analysis, stick diagrams, Euler path layout, dynamic logic, static timing analysis and ASIC flow.',
    modules: [
      'Module 1: MOS Transistor Theory & CMOS Inverter Characteristics',
      'Module 2: CMOS Layout Rules, Stick Diagrams & Euler Paths',
      'Module 3: Combinational and Dynamic CMOS Logic Families',
      'Module 4: Sequential Circuit Design, Setup/Hold Time & Clock Distribution',
      'Module 5: FPGA Architecture, Synthesis & ASIC Physical Design Flow'
    ],
    icon: 'Layers',
    color: 'from-violet-600 to-purple-700'
  },
  {
    id: 'ece-602',
    code: 'EC602',
    name: 'Digital Signal Processing (DSP)',
    semester: 6,
    credits: 4,
    leadFaculty: 'Dr. Sunita Rao',
    department: 'Electronics & Communication',
    description: 'DFT, FFT radix-2 algorithms, IIR filter design (Butterworth/Chebyshev bilinear), FIR filter design (windowing), and TMS320 DSP processor.',
    modules: [
      'Module 1: Discrete Fourier Transform (DFT) & Properties',
      'Module 2: Fast Fourier Transform (FFT) Decimation-in-Time & Frequency',
      'Module 3: IIR Digital Filter Design (Impulse Invariance & Bilinear Transform)',
      'Module 4: FIR Digital Filter Design (Rectangular, Hamming, Kaiser Windows)',
      'Module 5: Finite Wordlength Effects & Fixed-Point DSP Processors'
    ],
    icon: 'Sliders',
    color: 'from-amber-600 to-yellow-500'
  },

  // Semester 7
  {
    id: 'ece-701',
    code: 'EC701',
    name: 'Embedded Systems & IoT',
    semester: 7,
    credits: 3,
    leadFaculty: 'Dr. Vivek Nair',
    department: 'Electronics & Communication',
    description: 'Real-time operating systems (RTOS), FreeRTOS task scheduling, MQTT/HTTP IoT protocols, ESP32/NodeMCU, and Edge AI deployment.',
    modules: [
      'Module 1: Embedded System Architecture & Hardware-Software Co-design',
      'Module 2: Real-Time Operating Systems (RTOS), Schedulers & Semaphores',
      'Module 3: IoT Architecture, MQTT, CoAP, HTTP & WebSockets',
      'Module 4: Wireless Sensor Networks, BLE, LoRaWAN & ZigBee',
      'Module 5: Cloud Platforms (AWS IoT / ThingsBoard) & Edge ML'
    ],
    icon: 'Smartphone',
    color: 'from-green-500 to-teal-700'
  },
  {
    id: 'ece-702',
    code: 'EC702',
    name: 'Microwave & Radar Engineering',
    semester: 7,
    credits: 3,
    leadFaculty: 'Dr. Preeti Iyer',
    department: 'Electronics & Communication',
    description: 'Waveguides, cavity resonators, microwave passive components (Magic Tee, Isolators, Circulators), Klystrons, Magnetrons, and Radar range equations.',
    modules: [
      'Module 1: Rectangular & Circular Waveguides Modal Analysis (TE/TM)',
      'Module 2: Microwave Passive Devices & S-Matrix Representation',
      'Module 3: Microwave Tubes (Klystron, TWT, Magnetron) & Solid-State Gunn Diodes',
      'Module 4: Radar Range Equation, CW & Pulsed Radar Systems',
      'Module 5: MTI Radar, Doppler Radar & Modern Phased Array Antennas'
    ],
    icon: 'RadioTower',
    color: 'from-pink-600 to-rose-700'
  },

  // Semester 8
  {
    id: 'ece-801',
    code: 'EC801',
    name: 'Optical Fiber Communications & Photonics',
    semester: 8,
    credits: 3,
    leadFaculty: 'Dr. Ramesh Sharma',
    department: 'Electronics & Communication',
    description: 'Fiber attenuation, dispersion, LASER/LED optical sources, PIN/APD detectors, WDM systems, and optical link budget calculations.',
    modules: [
      'Module 1: Optical Fiber Physics, Step/Graded Index & Mode Propagation',
      'Module 2: Signal Degradation: Attenuation, Chromatic & Polarization Mode Dispersion',
      'Module 3: Optical Sources (DFB Lasers, LEDs) & Photodetectors (PIN, APD)',
      'Module 4: Optical Amplifiers (EDFA) & Wavelength Division Multiplexing (WDM)',
      'Module 5: Optical Link Power Budget & Rise-Time Dispersion Budget'
    ],
    icon: 'Sun',
    color: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'ece-802',
    code: 'EC802',
    name: 'Wireless & 5G Cellular Networks',
    semester: 8,
    credits: 3,
    leadFaculty: 'Prof. S. Balasubramanian',
    department: 'Electronics & Communication',
    description: 'Cellular frequency reuse, handoff, fading channels, OFDM, Massive MIMO, beamforming, and 5G NR architecture.',
    modules: [
      'Module 1: Cellular Concepts: Frequency Reuse, Handoff & Channel Assignment',
      'Module 2: Wireless Propagation: Large-Scale Path Loss & Small-Scale Rayleigh Fading',
      'Module 3: Multiple Access: CDMA, OFDMA & SC-FDMA Principles',
      'Module 4: Massive MIMO, Space-Time Block Codes & Beamforming',
      'Module 5: 5G NR Architecture, Network Slicing & Millimeter Wave Comms'
    ],
    icon: 'Signal',
    color: 'from-indigo-600 to-purple-800'
  }
];

export const INITIAL_RESOURCES = [
  // Semester 3 Digital Logic Resources
  {
    id: 'res-1',
    title: 'Complete Handwritten Lecture Notes: Boolean Algebra & K-Maps',
    subjectId: 'ece-301',
    subjectCode: 'EC301',
    subjectName: 'Digital System Design (Digital Logic)',
    semester: 3,
    category: 'Notes',
    format: 'PDF',
    size: '14.2 MB',
    author: 'Dr. Arjun Mehta & Student Council',
    uploadDate: '2026-02-10',
    description: 'High-quality comprehensive handwritten lecture notes covering 2-variable to 5-variable Karnaugh Maps, Quine-McCluskey method, SOP/POS realization, and Prime Implicant tables with step-by-step solved examples.',
    url: 'https://archive.org/details/digital-logic-handwritten-notes',
    downloadUrl: '#',
    tags: ['K-Maps', 'Boolean Algebra', 'Logic Gates', 'Prime Implicants', 'SOP/POS'],
    isFeatured: true,
    rating: 4.9,
    ratingCount: 42,
    downloads: 380,
    comments: [
      { id: 'c1', user: 'Rohan Deshmukh (ECE 3rd Yr)', text: 'The K-map grouping shortcuts in Module 1 saved me during mid-sem exams!', rating: 5, date: '2026-02-14' },
      { id: 'c2', user: 'Sneha Patel', text: 'Clean handwriting and color coded circuit diagrams. 10/10.', rating: 5, date: '2026-02-18' }
    ]
  },
  {
    id: 'res-2',
    title: 'Verilog HDL Lab Manual & ModelSim / Quartus Simulation Code',
    subjectId: 'ece-301',
    subjectCode: 'EC301',
    subjectName: 'Digital System Design (Digital Logic)',
    semester: 3,
    category: 'Lab Manual',
    format: 'CODE',
    size: '4.8 MB',
    author: 'ECE Dept Lab Committee',
    uploadDate: '2026-01-20',
    description: 'Complete laboratory manual featuring 12 experiments including 4-bit ALU, Synchronous BCD Counter, Traffic Light Controller FSM, and FIFO memory with full Verilog testbenches.',
    url: 'https://github.com/ece-resources/verilog-lab-suite',
    downloadUrl: '#',
    tags: ['Verilog', 'ModelSim', 'FSM', 'Testbench', 'FPGA', 'ALU'],
    isFeatured: true,
    rating: 4.8,
    ratingCount: 35,
    downloads: 295,
    comments: [
      { id: 'c3', user: 'Aditya Gupta', text: 'The testbench code has complete stimulus vectors. Very handy for lab exam viva.', rating: 5, date: '2026-02-01' }
    ]
  },
  {
    id: 'res-3',
    title: 'EC301 End-Semester Exam Question Papers (2020-2025 Solved)',
    subjectId: 'ece-301',
    subjectCode: 'EC301',
    subjectName: 'Digital System Design (Digital Logic)',
    semester: 3,
    category: 'PYQ',
    format: 'PDF',
    size: '8.6 MB',
    author: 'Department Academic Cell',
    uploadDate: '2026-01-15',
    description: 'Five years of solved previous year examination papers with marking schemes and model answers for Mealy/Moore state machine conversions.',
    url: 'https://drive.google.com/open?id=ece301-pyqs-archive',
    downloadUrl: '#',
    tags: ['PYQ', 'Exam Papers', 'Solutions', 'Question Bank'],
    isFeatured: false,
    rating: 4.7,
    ratingCount: 68,
    downloads: 620,
    comments: []
  },

  // Semester 3 Signals & Systems
  {
    id: 'res-4',
    title: 'Signals & Systems Formula Cheat Sheet & Fourier Transform Pairs',
    subjectId: 'ece-302',
    subjectCode: 'EC302',
    subjectName: 'Signals & Systems',
    semester: 3,
    category: 'Notes',
    format: 'PDF',
    size: '3.1 MB',
    author: 'Dr. Sunita Rao',
    uploadDate: '2026-02-05',
    description: 'A 6-page high density formula sheet containing all continuous & discrete Fourier Transform pairs, Z-transform properties, ROC tables, and convolution shortcuts.',
    url: 'https://archive.org/details/signals-systems-cheat-sheet',
    downloadUrl: '#',
    tags: ['Fourier Transform', 'Z-Transform', 'ROC', 'Formula Sheet', 'Convolution'],
    isFeatured: true,
    rating: 5.0,
    ratingCount: 89,
    downloads: 890,
    comments: [
      { id: 'c4', user: 'Priya Nair', text: 'Must-have sheet for GATE ECE preparation and semester finals.', rating: 5, date: '2026-02-08' }
    ]
  },
  {
    id: 'res-5',
    title: 'MATLAB Simulation Scripts for LTI Convolution & Pole-Zero Plots',
    subjectId: 'ece-302',
    subjectCode: 'EC302',
    subjectName: 'Signals & Systems',
    semester: 3,
    category: 'Simulation',
    format: 'MATLAB/SIM',
    size: '1.2 MB',
    author: 'Prof. K. Venkatesh',
    uploadDate: '2026-01-28',
    description: 'Interactive MATLAB GUI and .m scripts demonstrating continuous convolution, discrete DTFT frequency response, pole-zero stability mapping, and Gibbs phenomenon.',
    url: 'https://matlabcentral.com/ece-signals-gui-demos',
    downloadUrl: '#',
    tags: ['MATLAB', 'Convolution', 'Pole Zero', 'GUI', 'Simulation'],
    isFeatured: false,
    rating: 4.6,
    ratingCount: 22,
    downloads: 180,
    comments: []
  },

  // Semester 2 EDC
  {
    id: 'res-6',
    title: 'LTspice Simulation Circuit Files: BJT & MOSFET Amplifier Analysis',
    subjectId: 'ece-201',
    subjectCode: 'EC201',
    subjectName: 'Electronic Devices & Circuits (EDC)',
    semester: 2,
    category: 'Simulation',
    format: 'ZIP',
    size: '6.4 MB',
    author: 'Dr. Preeti Iyer',
    uploadDate: '2026-02-02',
    description: 'Collection of 18 pre-built `.asc` LTspice simulation schematics for Common Emitter, Common Collector, Cascode amplifiers, and MOSFET small-signal AC frequency response.',
    url: 'https://github.com/ece-lab/ltspice-edc-circuits',
    downloadUrl: '#',
    tags: ['LTspice', 'BJT', 'MOSFET', 'Amplifier', 'AC Sweep', 'Schematics'],
    isFeatured: true,
    rating: 4.9,
    ratingCount: 54,
    downloads: 410,
    comments: [
      { id: 'c5', user: 'Varun K.', text: 'Helped me verify my hardware lab readings right before submission.', rating: 5, date: '2026-02-12' }
    ]
  },
  {
    id: 'res-7',
    title: 'Electronic Devices & Circuits Comprehensive Lecture Slides (Ch 1-8)',
    subjectId: 'ece-201',
    subjectCode: 'EC201',
    subjectName: 'Electronic Devices & Circuits (EDC)',
    semester: 2,
    category: 'Notes',
    format: 'PDF',
    size: '22.5 MB',
    author: 'Dr. Preeti Iyer',
    uploadDate: '2026-01-18',
    description: 'Complete slide deck covering semiconductor energy bands, Fermi levels, diode equation derivations, high frequency hybrid-pi model, and push-pull class B amplifiers.',
    url: 'https://archive.org/details/ece-edc-lecture-slides',
    downloadUrl: '#',
    tags: ['Semiconductor', 'Energy Bands', 'Hybrid Pi', 'Amplifiers', 'Slides'],
    isFeatured: false,
    rating: 4.7,
    ratingCount: 31,
    downloads: 275,
    comments: []
  },

  // Semester 4 Analog Circuits
  {
    id: 'res-8',
    title: 'Op-Amp Applications Lab Manual (Active Filters, Schmitt Trigger, 555)',
    subjectId: 'ece-401',
    subjectCode: 'EC401',
    subjectName: 'Analog Circuits (Linear Integrated Circuits)',
    semester: 4,
    category: 'Lab Manual',
    format: 'PDF',
    size: '7.8 MB',
    author: 'Prof. Sandeep Kulkarni',
    uploadDate: '2026-02-11',
    description: 'Detailed laboratory experiments with circuit diagrams, component pinouts (IC 741, IC 555, LM324, IC 565), calculation formulas, and expected CRO waveform graphs.',
    url: 'https://archive.org/details/opamp-lic-lab-manual',
    downloadUrl: '#',
    tags: ['Op-Amp', 'IC 741', 'IC 555', 'Schmitt Trigger', 'Active Filters', 'Lab'],
    isFeatured: true,
    rating: 4.9,
    ratingCount: 76,
    downloads: 540,
    comments: []
  },
  {
    id: 'res-9',
    title: 'Linear Integrated Circuits - NPTEL Video Lecture Curated Playlist',
    subjectId: 'ece-401',
    subjectCode: 'EC401',
    subjectName: 'Analog Circuits (Linear Integrated Circuits)',
    semester: 4,
    category: 'Video Lecture',
    format: 'LINK',
    size: 'External',
    author: 'Prof. Nagendra Krishnapura (IIT Madras / NPTEL)',
    uploadDate: '2026-01-10',
    description: 'Curated 40-lecture masterclass on analog circuit design, op-amp stability, feedback, Miller compensation, and precision rectifiers.',
    url: 'https://nptel.ac.in/courses/117106030',
    downloadUrl: '#',
    tags: ['NPTEL', 'Video', 'Analog Design', 'IIT Madras', 'Lectures'],
    isFeatured: false,
    rating: 4.8,
    ratingCount: 43,
    downloads: 320,
    comments: []
  },

  // Semester 5 Microprocessors & ARM
  {
    id: 'res-10',
    title: 'ARM Cortex-M4 Microcontroller Programming in Embedded C Guide',
    subjectId: 'ece-501',
    subjectCode: 'EC501',
    subjectName: 'Microprocessors & Microcontrollers (8086 & ARM)',
    semester: 5,
    category: 'Notes',
    format: 'PDF',
    size: '11.4 MB',
    author: 'Dr. Vivek Nair',
    uploadDate: '2026-02-04',
    description: 'Hands-on guide to bare-metal embedded C programming for STM32 / ARM Cortex-M4 boards. Covers GPIO registers, SysTick timer, NVIC interrupts, DMA, and I2C OLED display driver.',
    url: 'https://github.com/ece-dept/stm32-baremetal-guide',
    downloadUrl: '#',
    tags: ['ARM Cortex', 'STM32', 'Embedded C', 'Registers', 'NVIC', 'I2C'],
    isFeatured: true,
    rating: 4.9,
    ratingCount: 63,
    downloads: 512,
    comments: [
      { id: 'c6', user: 'Harish R.', text: 'The register explanation for SysTick and NVIC is clearer than the reference manual.', rating: 5, date: '2026-02-15' }
    ]
  },
  {
    id: 'res-11',
    title: '8086 Assembly Language Programming Suite (Emu8086 Code Examples)',
    subjectId: 'ece-501',
    subjectCode: 'EC501',
    subjectName: 'Microprocessors & Microcontrollers (8086 & ARM)',
    semester: 5,
    category: 'Lab Manual',
    format: 'CODE',
    size: '2.1 MB',
    author: 'Dr. Vivek Nair',
    uploadDate: '2026-01-22',
    description: 'Tested assembly language source files for 16-bit arithmetic, bubble sorting, string palindrome checking, matrix addition, and 8255 PPI stepper motor control.',
    url: 'https://github.com/ece-dept/emu8086-programs',
    downloadUrl: '#',
    tags: ['8086', 'Assembly', 'Emu8086', 'Sorting', '8255 PPI'],
    isFeatured: false,
    rating: 4.5,
    ratingCount: 29,
    downloads: 340,
    comments: []
  },

  // Semester 6 VLSI Design
  {
    id: 'res-12',
    title: 'CMOS Digital VLSI Design: Stick Diagrams & Magic Layout Tutorial',
    subjectId: 'ece-601',
    subjectCode: 'EC601',
    subjectName: 'VLSI Design & Technology',
    semester: 6,
    category: 'Notes',
    format: 'PDF',
    size: '16.8 MB',
    author: 'Dr. Madhavan Joshi',
    uploadDate: '2026-02-09',
    description: 'Step-by-step tutorial on drawing Euler graphs, stick diagrams for complex CMOS logic gates, lambda-based design rules, and running DRC/LVS in open-source Magic VLSI layout editor.',
    url: 'https://archive.org/details/cmos-vlSI-stick-diagrams',
    downloadUrl: '#',
    tags: ['VLSI', 'CMOS', 'Stick Diagram', 'Euler Path', 'Magic Layout', 'DRC'],
    isFeatured: true,
    rating: 4.8,
    ratingCount: 51,
    downloads: 430,
    comments: []
  },
  {
    id: 'res-13',
    title: 'Cadence Virtuoso / OpenLane ASIC Flow Quick Reference Guide',
    subjectId: 'ece-601',
    subjectCode: 'EC601',
    subjectName: 'VLSI Design & Technology',
    semester: 6,
    category: 'Simulation',
    format: 'PDF',
    size: '5.2 MB',
    author: 'Dr. Madhavan Joshi',
    uploadDate: '2026-01-30',
    description: 'Command cheatsheet and workflow checklist for RTL-to-GDSII ASIC design flow using open-source OpenLane / SkyWater 130nm PDK.',
    url: 'https://github.com/the-openlane-quickguide',
    downloadUrl: '#',
    tags: ['ASIC', 'OpenLane', 'SkyWater 130nm', 'Cadence', 'Synthesis'],
    isFeatured: false,
    rating: 4.7,
    ratingCount: 38,
    downloads: 290,
    comments: []
  },

  // Semester 6 DSP
  {
    id: 'res-14',
    title: 'DSP Filter Design Workbook: Bilinear Transformation & FIR Windows',
    subjectId: 'ece-602',
    subjectCode: 'EC602',
    subjectName: 'Digital Signal Processing (DSP)',
    semester: 6,
    category: 'Notes',
    format: 'PDF',
    size: '9.3 MB',
    author: 'Dr. Sunita Rao',
    uploadDate: '2026-02-07',
    description: 'Solved step-by-step problems for Butterworth and Chebyshev IIR filter design via Bilinear Transformation (with frequency warping calculations) and FIR filter design using Rectangular, Hamming, and Blackman windows.',
    url: 'https://archive.org/details/dsp-filter-design-workbook',
    downloadUrl: '#',
    tags: ['DSP', 'IIR Filter', 'FIR Filter', 'Bilinear Transform', 'Hamming Window'],
    isFeatured: true,
    rating: 4.9,
    ratingCount: 47,
    downloads: 380,
    comments: []
  },

  // Semester 7 Embedded & IoT
  {
    id: 'res-15',
    title: 'ESP32 IoT Cloud Dashboard Starter Kit (MQTT & FreeRTOS Code)',
    subjectId: 'ece-701',
    subjectCode: 'EC701',
    subjectName: 'Embedded Systems & IoT',
    semester: 7,
    category: 'Lab Manual',
    format: 'ZIP',
    size: '8.9 MB',
    author: 'Pixel Pioneers Dev Team & Dr. Vivek Nair',
    uploadDate: '2026-02-12',
    description: 'Production-ready ESP32 Arduino / ESP-IDF project with FreeRTOS multi-threading, sensor readings (DHT22, BMP280, MPU6050), TLS MQTT publisher, and real-time web telemetry dashboard.',
    url: 'https://github.com/pixel-pioneers/esp32-iot-hub',
    downloadUrl: '#',
    tags: ['ESP32', 'FreeRTOS', 'MQTT', 'IoT', 'Telemetry', 'C++'],
    isFeatured: true,
    rating: 5.0,
    ratingCount: 65,
    downloads: 610,
    comments: [
      { id: 'c7', user: 'Tanvi Shah', text: 'Used this code as the backbone for my final year capstone project. Incredible resource!', rating: 5, date: '2026-02-16' }
    ]
  },

  // Semester 8 Wireless & 5G
  {
    id: 'res-16',
    title: '5G NR Physical Layer & Massive MIMO Technical Overview',
    subjectId: 'ece-802',
    subjectCode: 'EC802',
    subjectName: 'Wireless & 5G Cellular Networks',
    semester: 8,
    category: 'Reference Book',
    format: 'PDF',
    size: '13.1 MB',
    author: 'Prof. S. Balasubramanian',
    uploadDate: '2026-01-25',
    description: 'In-depth reference notes on 5G New Radio numerology, subcarrier spacing, beamforming algorithms, millimeter wave propagation models, and Open-RAN architecture.',
    url: 'https://archive.org/details/5g-nr-phy-layer-overview',
    downloadUrl: '#',
    tags: ['5G', 'Massive MIMO', 'Beamforming', 'Wireless', 'Open RAN'],
    isFeatured: false,
    rating: 4.6,
    ratingCount: 19,
    downloads: 145,
    comments: []
  },

  // Semester 1 Basics
  {
    id: 'res-17',
    title: 'Network Theorems Solved Problem Bank (Thevenin, Norton, Superposition)',
    subjectId: 'ece-101',
    subjectCode: 'EC101',
    subjectName: 'Basic Electrical & Electronics Engineering',
    semester: 1,
    category: 'PYQ',
    format: 'PDF',
    size: '6.7 MB',
    author: 'Dr. Ramesh Sharma',
    uploadDate: '2026-01-12',
    description: 'Over 50 step-by-step solved numericals on Thevenin, Norton, Maximum Power Transfer, and Superposition theorems with independent and dependent DC sources.',
    url: 'https://archive.org/details/network-theorems-solved-bank',
    downloadUrl: '#',
    tags: ['Thevenin', 'Norton', 'Max Power', 'Superposition', 'Circuits'],
    isFeatured: false,
    rating: 4.7,
    ratingCount: 39,
    downloads: 420,
    comments: []
  },

  // Semester 4 EM Waves
  {
    id: 'res-18',
    title: 'Smith Chart Calculation Guide & Impedance Matching Solved Examples',
    subjectId: 'ece-402',
    subjectCode: 'EC402',
    subjectName: 'Electromagnetic Waves & Transmission Lines',
    semester: 4,
    category: 'Notes',
    format: 'PDF',
    size: '8.4 MB',
    author: 'Dr. Rajeshwari N.',
    uploadDate: '2026-02-08',
    description: 'Visual step-by-step tutorial on plotting normalized impedance on the Smith Chart, calculating VSWR circles, single-stub and double-stub matching solutions.',
    url: 'https://archive.org/details/smith-chart-handbook',
    downloadUrl: '#',
    tags: ['Smith Chart', 'Transmission Lines', 'VSWR', 'Stub Matching', 'EM Waves'],
    isFeatured: true,
    rating: 4.8,
    ratingCount: 45,
    downloads: 360,
    comments: []
  }
];

export const IMPORTANT_LINKS = [
  {
    id: 'link-1',
    title: 'NPTEL ECE Video Courses & Certifications',
    category: 'Online Learning',
    description: 'Official Ministry of Education portal featuring full semester-long video lecture series taught by IIT and IISc professors.',
    url: 'https://nptel.ac.in/courses',
    badge: 'Govt / IITs',
    icon: 'GraduationCap'
  },
  {
    id: 'link-2',
    title: 'Virtual Labs (Ministry of Education, Govt of India)',
    category: 'Virtual Labs',
    description: 'Interactive online remote laboratories for Digital Electronics, Analog Circuits, Microprocessors, Signals, and DSP.',
    url: 'https://vlab.co.in',
    badge: 'Free Simulators',
    icon: 'FlaskConical'
  },
  {
    id: 'link-3',
    title: 'IEEE Xplore Digital Library',
    category: 'Research & Papers',
    description: 'World-renowned repository of peer-reviewed journal papers, transactions, and conference proceedings in electronics and telecom.',
    url: 'https://ieeexplore.ieee.org',
    badge: 'Academic Research',
    icon: 'BookOpen'
  },
  {
    id: 'link-4',
    title: 'Falstad Circuit Simulator Online',
    category: 'Simulation Tools',
    description: 'In-browser interactive animated schematic simulator for RLC circuits, op-amps, 555 timers, logic gates, and transistors.',
    url: 'https://www.falstad.com/circuit/',
    badge: 'Interactive Web App',
    icon: 'Activity'
  },
  {
    id: 'link-5',
    title: 'EDA Playground (Online Verilog & SystemVerilog IDE)',
    category: 'EDA / VLSI',
    description: 'Web-based simulation and waveform viewer for Verilog HDL, VHDL, and SystemVerilog supporting multiple industry simulators.',
    url: 'https://edaplayground.com',
    badge: 'Verilog / FPGA',
    icon: 'Binary'
  },
  {
    id: 'link-6',
    title: 'All About Circuits (Textbook & Calculator Tools)',
    category: 'Reference & Community',
    description: 'Extensive free electrical engineering tutorials, component datasheets, technical articles, and circuit design calculators.',
    url: 'https://www.allaboutcircuits.com',
    badge: 'Tutorials & Guides',
    icon: 'Layers'
  },
  {
    id: 'link-7',
    title: 'Texas Instruments Education & TI E2E Forum',
    category: 'Hardware & Chips',
    description: 'Official TI development tools, analog & embedded design guides, reference designs, and engineering community forums.',
    url: 'https://e2e.ti.com',
    badge: 'Hardware Support',
    icon: 'Cpu'
  },
  {
    id: 'link-8',
    title: 'Alldatasheet - Electronic Component Datasheet Archive',
    category: 'Datasheets',
    description: 'Search and download millions of semiconductor datasheets, IC pinout diagrams, and manufacturer application notes.',
    url: 'https://www.alldatasheet.com',
    badge: 'Component Lookup',
    icon: 'FileSpreadsheet'
  }
];

export const ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: 'Mid-Term Lab Examination Schedule Released',
    date: '2026-02-24',
    type: 'Exam',
    urgency: 'high',
    content: 'The mid-semester practical examinations for Semesters 3, 5, and 7 will commence from March 5th. Please check subject lab manuals and submission deadlines.'
  },
  {
    id: 'ann-2',
    title: 'Free Access to Cadence Virtuoso & MATLAB Central Toolboxes',
    date: '2026-02-20',
    type: 'Academic',
    urgency: 'medium',
    content: 'Department students can now access licensed MATLAB 2025b and Cadence EDA suites via departmental campus intranet VPN.'
  },
  {
    id: 'ann-3',
    title: 'Call for Student Resource Contributors - Pixel Pioneers Hub',
    date: '2026-02-15',
    type: 'Community',
    urgency: 'low',
    content: 'Have high quality handwritten notes, lab code, or solved previous year question sets? Click "Add Resource" to contribute and help your batchmates!'
  }
];
