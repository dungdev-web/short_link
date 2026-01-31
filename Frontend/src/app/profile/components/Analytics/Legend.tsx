import React from "react";

interface LegendProps {
  minValue: number;
  maxValue: number;
  colorScale: (value: number) => string;
  maxSteps?: number; 
  fixedWidth?: number; 
}

const roundToStep = (value: number, step: number, up = true) => {
  return up
    ? Math.ceil(value / step) * step
    : Math.floor(value / step) * step;
};

const selectStep = (range: number): number => {
  if (range <= 200) return 25;
  if (range <= 1000) return 50;
  if (range <= 5000) return 250;
  if (range <= 20000) return 500;
  return 1000;
};

const Legend: React.FC<LegendProps> = ({
  minValue,
  maxValue,
  colorScale,
  maxSteps = 10,
  fixedWidth = 300,
}) => {
  if (maxValue <= minValue) {
    return <div>Không có dữ liệu hợp lệ để hiển thị legend</div>;
  }

  const range = maxValue - minValue;
  const step = selectStep(range);

  const minRound = roundToStep(minValue, step, false);
  const maxRound = roundToStep(maxValue, step, true);

  let values = [];
  for (let val = minRound; val <= maxRound; val += step) {
    values.push(val);
  }

  while (values.length > maxSteps) {
    values = values.filter((_, i) => i % 2 === 0);
  }

  const cellWidth = fixedWidth / values.length;

  const formatValue = (v: number) => v.toLocaleString();

  return (
    <div
      className="absolute bottom-[15px] left-1/2 -translate-x-1/2 bg-white shadow-md px-2 py-2 rounded-md flex flex-col items-center z-10"
      style={{ pointerEvents: "none", width: fixedWidth }}
      aria-label="Color scale legend"
      role="img"
    >
      <div className="flex" style={{ width: "100%", justifyContent: "space-between" }}>
        {values.map((v, i) => {
          // Tính bo góc cho ô đầu và cuối
          const borderRadius =
            i === 0
              ? "6px 0 0 6px" // bo tròn góc trái ô đầu
              : i === values.length - 1
              ? "0 6px 6px 0" // bo tròn góc phải ô cuối
              : "0"; // giữa không bo tròn

          return (
            <div
              key={i}
              className="flex flex-col items-center"
              style={{ width: cellWidth, minWidth: 0 }}
            >
              <div
                className="rounded-sm"
                style={{
                  backgroundColor: colorScale(v),
                  border: "1px solid #ccc",
                  width: "100%",
                  height: 16,
                  borderRadius,
                }}
                title={formatValue(v)}
              />
              <span
                className="text-xs text-gray-700 mt-1 select-none"
                style={{ textAlign: "center", whiteSpace: "nowrap" }}
              >
                {formatValue(v)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Legend;