import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Cpu, CheckCircle2, Copy } from 'lucide-react';

const PINOUT_DATA = [
  {
    id: 'ic-555',
    name: 'NE555 Precision Timer IC (8-Pin DIP)',
    category: 'Analog / Timing',
    description: 'Standard timing IC used in monostable, astable multivibrators and PWM generation.',
    pins: [
      { num: 1, name: 'GND', desc: 'Ground reference (0V)' },
      { num: 2, name: 'TRIG', desc: 'Trigger input (activates when < 1/3 Vcc)' },
      { num: 3, name: 'OUT', desc: 'Output pin (can source/sink up to 200mA)' },
      { num: 4, name: 'RESET', desc: 'Active-low reset (connect to VCC if unused)' },
      { num: 5, name: 'CTRL', desc: 'Control voltage (connect 10nF to GND)' },
      { num: 6, name: 'THRES', desc: 'Threshold input (resets when > 2/3 Vcc)' },
      { num: 7, name: 'DISCH', desc: 'Open-collector discharge pin' },
      { num: 8, name: 'VCC', desc: 'Positive supply voltage (+4.5V to +16V)' }
    ]
  },
  {
    id: 'ic-741',
    name: 'LM741 Operational Amplifier (8-Pin DIP)',
    category: 'Linear Integrated Circuits',
    description: 'General purpose operational amplifier with internal frequency compensation and short-circuit protection.',
    pins: [
      { num: 1, name: 'OFFSET N1', desc: 'Offset null pin 1 (connect to 10k pot)' },
      { num: 2, name: 'IN-', desc: 'Inverting input terminal' },
      { num: 3, name: 'IN+', desc: 'Non-inverting input terminal' },
      { num: 4, name: 'V-', desc: 'Negative supply rail (-Vcc, e.g. -12V or GND)' },
      { num: 5, name: 'OFFSET N2', desc: 'Offset null pin 2' },
      { num: 6, name: 'OUT', desc: 'Amplified analog output' },
      { num: 7, name: 'V+', desc: 'Positive supply rail (+Vcc, e.g. +12V)' },
      { num: 8, name: 'NC', desc: 'No internal connection' }
    ]
  },
  {
    id: 'esp-32',
    name: 'ESP32 NodeMCU Dev Module (30-Pin GPIO)',
    category: 'Microcontrollers / IoT',
    description: 'Dual-core Tensilica Xtensa 32-bit MCU with built-in Wi-Fi 802.11 b/g/n and Bluetooth v4.2 BR/EDR & BLE.',
    pins: [
      { num: 'EN', name: 'ENABLE', desc: 'Reset chip (Pull LOW to restart)' },
      { num: 'VP', name: 'GPIO 36', desc: 'ADC1_CH0 (Input only)' },
      { num: 'VN', name: 'GPIO 39', desc: 'ADC1_CH3 (Input only)' },
      { num: 'D34', name: 'GPIO 34', desc: 'ADC1_CH6 (Input only)' },
      { num: 'D35', name: 'GPIO 35', desc: 'ADC1_CH7 (Input only)' },
      { num: 'D32', name: 'GPIO 32', desc: 'ADC1_CH4 / Touch 9' },
      { num: 'D33', name: 'GPIO 33', desc: 'ADC1_CH5 / Touch 8' },
      { num: 'D25', name: 'GPIO 25', desc: 'DAC1 / ADC2_CH8' },
      { num: 'D26', name: 'GPIO 26', desc: 'DAC2 / ADC2_CH9' },
      { num: 'D27', name: 'GPIO 27', desc: 'Touch 7 / ADC2_CH7' },
      { num: 'D21', name: 'GPIO 21', desc: 'I2C SDA' },
      { num: 'D22', name: 'GPIO 22', desc: 'I2C SCL' },
      { num: 'TX0', name: 'GPIO 1', desc: 'UART0 TX (Debug console)' },
      { num: 'RX0', name: 'GPIO 3', desc: 'UART0 RX (Debug console)' },
      { num: 'GND', name: 'GND', desc: 'Ground' },
      { num: 'VIN', name: '5V IN', desc: 'External 5V Power Supply Input' }
    ]
  },
  {
    id: 'ic-8086',
    name: 'Intel 8086 Microprocessor (40-Pin DIP)',
    category: 'Microprocessors',
    description: '16-bit HMOS microprocessor with 20-bit address bus capable of addressing 1 Megabyte of physical memory.',
    pins: [
      { num: 'AD0-AD15', name: 'AD0-AD15', desc: 'Time-multiplexed Address / Data bus' },
      { num: 'A16-A19/S3-S6', name: 'A16-A19', desc: 'High-order Address lines / Status bits' },
      { num: 'BHE#/S7', name: 'BHE#', desc: 'Bus High Enable (Active Low for high byte D8-D15)' },
      { num: 'RD#', name: 'RD#', desc: 'Read control strobe (Active Low)' },
      { num: 'READY', name: 'READY', desc: 'Synchronization input for slow memory wait states' },
      { num: 'INTR / NMI', name: 'INTR/NMI', desc: 'Maskable & Non-maskable hardware interrupt inputs' },
      { num: 'MN/MX#', name: 'MN/MX#', desc: 'Minimum mode (+5V) or Maximum mode (GND)' },
      { num: 'CLK', name: 'CLK', desc: 'Clock input (33% duty cycle from 8284 generator)' }
    ]
  }
];

export function PinoutViewer() {
  const [selectedId, setSelectedId] = useState('ic-555');
  const selectedChip = PINOUT_DATA.find((c) => c.id === selectedId) || PINOUT_DATA[0];

  return (
    <Card className="p-6 border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-500" />
            <span>Essential Hardware IC Pinout Reference</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Quick laboratory lookup for standard electronic chips and embedded dev boards
          </p>
        </div>

        {/* Chip switcher buttons */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
          {PINOUT_DATA.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setSelectedId(chip.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedId === chip.id
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {chip.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Chip Header Info */}
      <div className="p-4 rounded-xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-900/60 mb-5">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            {selectedChip.name}
          </h4>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300">
            {selectedChip.category}
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {selectedChip.description}
        </p>
      </div>

      {/* Pinout Grid Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {selectedChip.pins.map((pin, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 text-xs"
          >
            <span className="w-12 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white font-mono font-bold flex items-center justify-center text-[11px] shrink-0">
              {pin.num}
            </span>
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                {pin.name}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">
                {pin.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
