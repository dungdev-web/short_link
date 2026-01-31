"use client";
import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import countries from "i18n-iso-countries";
import defaultLocationData, { LocationData } from "@/mocks/locationData";
import Legend from "./Legend";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// Tính toán min/max từ dữ liệu
const values = defaultLocationData.map((d) => d.value);
const minValue = Math.min(...values);
const maxValue = Math.max(...values);

const colorScale = scaleLinear<string, string>()
  .domain([minValue, maxValue])
  .range(["#e0f7fa", "#00acc1"])
  .clamp(true);

export default function WorldClicksMap() {
  const [locationData, setLocationData] = useState<LocationData[]>(defaultLocationData);
  const [geoData, setGeoData] = useState<any | null>(null);
  const [tooltip, setTooltip] = useState<{ name: string; value: number; x: number; y: number } | null>(null);
  const [isLoadingGeo, setIsLoadingGeo] = useState(true);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const res = await fetch(geoUrl);
        if (!res.ok) throw new Error("Không tải được file GeoJSON");
        const data = await res.json();
        setGeoData(data);
      } catch (error) {
        setGeoError("Lỗi tải dữ liệu bản đồ");
        console.error(error);
      } finally {
        setIsLoadingGeo(false);
      }
    };
    fetchGeoData();
  }, []);

  if (isLoadingGeo) return <div>Đang tải bản đồ...</div>;
  if (geoError) return <div>{geoError}</div>;
  if (!geoData) return <div>Không có dữ liệu bản đồ để hiển thị.</div>;
  if (locationData.length === 0) return <div>Không có dữ liệu vị trí để hiển thị bản đồ.</div>;

  return (
    <div className="relative w-full h-[500px] bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow">
      <ComposableMap projectionConfig={{ scale: 140 }} style={{ width: "100%", height: "100%" }}>
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name || "Unknown";
                const isoCode = countries.getAlpha3Code(countryName, "en") || "UNKNOWN";
                const country = locationData.find((c) => c.id === isoCode);

                const fillColor = country ? colorScale(country.value) : "#EEE";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#DDD"
                    strokeWidth={0.5}
                    onMouseEnter={(event) => {
                      setTooltip({
                        name: countryName,
                        value: country?.value || 0,
                        x: event.clientX,
                        y: event.clientY,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: { outline: "none", cursor: "pointer" },
                      hover: { fill: "#0288d1", outline: "none", cursor: "pointer" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {tooltip && (
        <div
          className="absolute bg-white text-sm text-gray-800 px-3 py-1 shadow-md rounded pointer-events-none"
          style={{
            top: tooltip.y - 200,
            left: tooltip.x - 300,
            zIndex: 20,
          }}
        >
          <strong>{tooltip.name}</strong>
          <div>Lượt click: {tooltip.value.toLocaleString()}</div>
        </div>
      )}

      <div className="mt-4">
        <Legend colorScale={colorScale} minValue={minValue} maxValue={maxValue} />
      </div>
    </div>
  );
}
