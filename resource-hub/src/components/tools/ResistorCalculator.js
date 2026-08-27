import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Zap, HelpCircle, RefreshCw } from 'lucide-react';

const COLOR_CODES = [
  { name: 'Black', hex: '#18181b', value: 0, mult: 1, tol: null, text: 'text-white' },
  { name: 'Brown', hex: '#854d0e', value: 1, mult: 10, tol: '±1%', text: 'text-white' },
  { name: 'Red', hex: '#dc2626', value: 2, mult: 100, tol: '±2%', text: 'text-white' },
  { name: 'Orange', hex: '#ea580c', value: 3, mult: 1000, tol: null, text: 'text-white' },
  { name: 'Yellow', hex: '#eab308', value: 4, mult: 10000, tol: null, text: 'text-slate-900' },
  { name: 'Green', hex: '#16a34a', value: 5, mult: 100000, tol: '±0.5%', text: 'text-white' },
  { name: 'Blue', hex: '#2563eb', value: 6, mult: 1000000, tol: '±0.25%', text: 'text-white' },
  { name: 'Violet', hex: '#7c3aed', value: 7, mult: 10000000, tol: '±0.1%', text: 'text-white' },
  { name: 'Gray', hex: '#4b5563', value: 8, mult: null, tol: '±0.05%', text: 'text-white' },
  { name: 'White', hex: '#f8fafc', value: 9, mult: null, tol: null, text: 'text-slate-900' },
  { name: 'Gold', hex: '#d97706', value: null, mult: 0.1, tol: '±5%', text: 'text-white' },
  { name: 'Silver', hex: '#94a3b8', value: null, mult: 0.01, tol: '±10%', text: 'text-slate-900' },
];

export function ResistorCalculator() {
  const [bandCount, setBandCount] = useState(4); // 4 or 5 bands
  const [band1, setBand1] = useState(1); // Brown
  const [band2, setBand2] = useState(0); // Black
  const [band3, setBand3] = useState(2); // Red (as 3rd digit in 5-band, or mult in 4-band)
  const [multiplier, setMultiplier] = useState(2); // Red = 100
  const [tolerance, setTolerance] = useState(10); // Gold = 5%

  // Calculate resistance value
  let baseDigits = 0;
  let multValue = 1;
  let tolString = '±5%';

  if (bandCount === 4) {
    const d1 = COLOR_CODES[band1]?.value ?? 0;
    const d2 = COLOR_CODES[band2]?.value ?? 0;
    baseDigits = d1 * 10 + d2;
    multValue = COLOR_CODES[multiplier]?.mult ?? 1;
    tolString = COLOR_CODES[tolerance]?.tol ?? '±5%';
  } else {
    const d1 = COLOR_CODES[band1]?.value ?? 0;
    const d2 = COLOR_CODES[band2]?.value ?? 0;
    const d3 = COLOR_CODES[band3]?.value ?? 0;
    baseDigits = d1 * 100 + d2 * 10 + d3;
    multValue = COLOR_CODES[multiplier]?.mult ?? 1;
    tolString = COLOR_CODES[tolerance]?.tol ?? '±1%';
  }

  const rawOhms = baseDigits * multValue;

  const formatResistance = (val) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(val % 1000000 === 0 ? 0 : 2)} MΩ`;
    }
    if (val >= 1000) {
      return `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 2)} kΩ`;
    }
    return `${val.toFixed(val % 1 === 0 ? 0 : 2)} Ω`;
  };

  return (
    <Card className="p-6 border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <span>Interactive Resistor Color Code Calculator</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Determine resistor resistance value and tolerance for 4-band and 5-band resistors
          </p>
        </div>

        {/* Band count switch */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
          <button
            onClick={() => setBandCount(4)}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              bandCount === 4
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            4-Band Resistor
          </button>
          <button
            onClick={() => setBandCount(5)}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              bandCount === 5
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            5-Band Resistor
          </button>
        </div>
      </div>

      {/* Visual Resistor Graphic */}
      <div className="my-6 p-6 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center">
        {/* Graphic */}
        <div className="flex items-center w-full max-w-md my-4">
          <div className="resistor-lead flex-1 rounded-l-full" />
          <div className="relative w-72 h-20 resistor-body flex items-center justify-around px-4">
            {/* Band 1 */}
            <div
              className="w-4 h-full resistor-band"
              style={{ backgroundColor: COLOR_CODES[band1].hex }}
              title={`Band 1: ${COLOR_CODES[band1].name}`}
            />
            {/* Band 2 */}
            <div
              className="w-4 h-full resistor-band"
              style={{ backgroundColor: COLOR_CODES[band2].hex }}
              title={`Band 2: ${COLOR_CODES[band2].name}`}
            />
            {/* Band 3 (if 5-band) */}
            {bandCount === 5 && (
              <div
                className="w-4 h-full resistor-band"
                style={{ backgroundColor: COLOR_CODES[band3].hex }}
                title={`Band 3: ${COLOR_CODES[band3].name}`}
              />
            )}
            {/* Multiplier */}
            <div
              className="w-4 h-full resistor-band"
              style={{ backgroundColor: COLOR_CODES[multiplier].hex }}
              title={`Multiplier: ${COLOR_CODES[multiplier].name}`}
            />
            {/* Gap */}
            <div className="w-6" />
            {/* Tolerance */}
            <div
              className="w-4 h-full resistor-band"
              style={{ backgroundColor: COLOR_CODES[tolerance].hex }}
              title={`Tolerance: ${COLOR_CODES[tolerance].name}`}
            />
          </div>
          <div className="resistor-lead flex-1 rounded-r-full" />
        </div>

        {/* Calculated Output Value Banner */}
        <div className="text-center mt-3">
          <span className="text-3xl font-extrabold text-brand-600 dark:text-brand-400 tracking-tight">
            {formatResistance(rawOhms)}
          </span>
          <span className="text-base font-bold text-slate-500 dark:text-slate-400 ml-2">
            {tolString}
          </span>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-mono">
            ({rawOhms.toLocaleString()} Ω {tolString})
          </p>
        </div>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 text-xs">
        {/* Band 1 */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            1st Band (Digit)
          </label>
          <select
            value={band1}
            onChange={(e) => setBand1(Number(e.target.value))}
            className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          >
            {COLOR_CODES.filter((c) => c.value !== null && c.value > 0).map((c, i) => {
              const idx = COLOR_CODES.indexOf(c);
              return (
                <option key={idx} value={idx}>
                  {c.name} ({c.value})
                </option>
              );
            })}
          </select>
        </div>

        {/* Band 2 */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            2nd Band (Digit)
          </label>
          <select
            value={band2}
            onChange={(e) => setBand2(Number(e.target.value))}
            className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          >
            {COLOR_CODES.filter((c) => c.value !== null).map((c, i) => {
              const idx = COLOR_CODES.indexOf(c);
              return (
                <option key={idx} value={idx}>
                  {c.name} ({c.value})
                </option>
              );
            })}
          </select>
        </div>

        {/* Band 3 (Only 5-Band) */}
        {bandCount === 5 && (
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              3rd Band (Digit)
            </label>
            <select
              value={band3}
              onChange={(e) => setBand3(Number(e.target.value))}
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              {COLOR_CODES.filter((c) => c.value !== null).map((c, i) => {
                const idx = COLOR_CODES.indexOf(c);
                return (
                  <option key={idx} value={idx}>
                    {c.name} ({c.value})
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {/* Multiplier */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Multiplier
          </label>
          <select
            value={multiplier}
            onChange={(e) => setMultiplier(Number(e.target.value))}
            className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          >
            {COLOR_CODES.filter((c) => c.mult !== null).map((c, i) => {
              const idx = COLOR_CODES.indexOf(c);
              return (
                <option key={idx} value={idx}>
                  {c.name} (×{c.mult})
                </option>
              );
            })}
          </select>
        </div>

        {/* Tolerance */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Tolerance
          </label>
          <select
            value={tolerance}
            onChange={(e) => setTolerance(Number(e.target.value))}
            className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          >
            {COLOR_CODES.filter((c) => c.tol !== null).map((c, i) => {
              const idx = COLOR_CODES.indexOf(c);
              return (
                <option key={idx} value={idx}>
                  {c.name} ({c.tol})
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </Card>
  );
}
