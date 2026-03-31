import { useState, useMemo } from "react";

const CASE_STUDIES = [
  {
    id: 1, name: "McCulla", vertical: "Transport & Logistics", geo: "UK & Ireland",
    fleetSize: "Large (200–1,000)", fleetLabel: "100+ trucks, 152 trailers",
    challenges: ["Rising insurance costs", "Claims exposure"],
    outcomes: ["Cost savings", "Insurer co-funding"],
    headline: "£200K", headlineSuffix: "/yr saved",
    stats: [{ label: "Claims reduction", value: "49%" }, { label: "ROI timeline", value: "< 12 mo" }],
    quote: "Insurers agreed to part-fund the CameraMatics implementation, both hardware and monthly fees.",
    quotee: "Brian Beattie, McCulla",
    summary: "Major cold-chain operator achieved transformative insurance savings through proactive fleet risk management and insurer co-funding of the CameraMatics platform."
  },
  {
    id: 2, name: "Hendrick European", vertical: "Transport & Logistics", geo: "UK & Ireland",
    fleetSize: "Large (200–1,000)", fleetLabel: "100+ trucks, 250 trailers",
    challenges: ["Rising insurance costs", "Fraudulent / false claims"],
    outcomes: ["Driver exoneration", "Cost savings"],
    headline: "30%", headlineSuffix: " more exonerations",
    stats: [{ label: "eFNOL enabled", value: "Yes" }, { label: "In-cargo cameras", value: "Active" }],
    quote: "It's a fool proof decision for any fleet operator to go with CameraMatics.",
    quotee: "Paul Hendrick, Hendrick European",
    summary: "European freight provider eliminated 'big truck, small car' syndrome with 360° cameras, speeding up claims and dramatically improving driver exoneration rates."
  },
  {
    id: 3, name: "Flannery Plant Hire", vertical: "Construction & Plant", geo: "UK",
    fleetSize: "Enterprise (1,000+)", fleetLabel: "5,200 vehicles",
    challenges: ["Regulatory compliance", "Fraudulent / false claims"],
    outcomes: ["Compliance achieved", "Driver exoneration"],
    headline: "5,200", headlineSuffix: " vehicles compliant",
    stats: [{ label: "DVS 2024", value: "Achieved" }, { label: "Depots", value: "9 across UK/IE" }],
    quote: "Impressed by the flawless installation process and the system's impeccable performance.",
    quotee: "Flannery Plant Hire",
    summary: "One of the UK's largest plant hire companies deployed CameraMatics DVS-compliant systems across their entire fleet to meet 2024 Direct Vision Standard requirements."
  },
  {
    id: 4, name: "Maritime Transport", vertical: "Transport & Logistics", geo: "UK",
    fleetSize: "Enterprise (1,000+)", fleetLabel: "1,500+ trucks",
    challenges: ["Operational visibility gaps", "Driver behaviour & distraction"],
    outcomes: ["Accident reduction", "Driver behaviour improvement"],
    headline: "1,500+", headlineSuffix: " trucks connected",
    stats: [{ label: "Miles/year", value: "120M+" }],
    quote: "",
    quotee: "",
    summary: "The UK's largest privately-owned logistics company invested in fleet-wide safety and visibility with CameraMatics across their entire operation."
  },
  {
    id: 5, name: "Thorntons Recycling", vertical: "Waste & Recycling", geo: "UK & Ireland",
    fleetSize: "Mid (50–200)", fleetLabel: "175 vehicles",
    challenges: ["Fraudulent / false claims", "Consolidating disconnected systems"],
    outcomes: ["Driver exoneration", "Cost savings"],
    headline: "175", headlineSuffix: " vehicles, 5 cams each",
    stats: [{ label: "Using CameraMatics", value: "5+ years" }, { label: "Switched from", value: "Competitor" }],
    quote: "I have a great relationship with everyone in CameraMatics. They understand the business and my team's needs.",
    quotee: "Jagoda Moore, Transport Manager",
    summary: "Dublin-area waste operator consolidated from a split fleet (half on a competitor) to 100% CameraMatics, driven by superior customer support and faster claims handling."
  },
  {
    id: 6, name: "TexCrete", vertical: "Construction & Plant", geo: "US",
    fleetSize: "Mid (50–200)", fleetLabel: "70 mixers & haul trucks",
    challenges: ["Driver behaviour & distraction", "Operational visibility gaps"],
    outcomes: ["Driver behaviour improvement", "Productivity gains"],
    headline: "180°", headlineSuffix: " staff attitude shift",
    stats: [{ label: "Initial resistance", value: "90%" }, { label: "Phone use", value: "Dropped" }],
    quote: "Workers are spending less time on phones, stopping less between jobs — we can get more jobs done in one day.",
    quotee: "Eddie Alvarado, Operations Manager",
    summary: "Austin, TX concrete supplier transformed driver culture from 90% resistance to full buy-in, gaining measurable productivity improvements and expanded customer capacity."
  },
  {
    id: 7, name: "Mr. Binman", vertical: "Waste & Recycling", geo: "UK & Ireland",
    fleetSize: "Mid (50–200)", fleetLabel: "60 vehicles",
    challenges: ["Urban / VRU safety risk", "Operational visibility gaps"],
    outcomes: ["Accident reduction", "Driver exoneration"],
    headline: "24/7", headlineSuffix: " fleet visibility",
    stats: [{ label: "Camera setup", value: "4-cam per vehicle" }, { label: "Households served", value: "34,000+" }],
    quote: "CameraMatics is real-time, over air — we can see trucks from the minute they go out until they come back.",
    quotee: "William Flanagan, Owner",
    summary: "Irish waste management company operating in dense urban environments deployed 4-camera systems to protect crews, drivers, and pedestrians during household collection rounds."
  },
  {
    id: 8, name: "Zellwood", vertical: "Transport & Logistics", geo: "UK & Ireland",
    fleetSize: "Mid (50–200)", fleetLabel: "70 drivers, 3 depots",
    challenges: ["Fraudulent / false claims", "Rising insurance costs"],
    outcomes: ["Driver exoneration", "Cost savings"],
    headline: "100%", headlineSuffix: " crash-for-cash defended",
    stats: [{ label: "Using CameraMatics", value: "5+ years" }, { label: "Park mode", value: "Anti-theft" }],
    quote: "What happened is there in black and white. There are no ifs and buts.",
    quotee: "William Flanagan, Owner",
    summary: "Family-run refrigerated transport company defeated fraudulent crash-for-cash scams with video evidence, while using park mode to deter fuel and cargo theft."
  },
  {
    id: 9, name: "Flogas", vertical: "Energy & Utilities", geo: "UK & Ireland",
    fleetSize: "Mid (50–200)", fleetLabel: "Mixed rigid & artic fleet",
    challenges: ["Regulatory compliance", "Urban / VRU safety risk"],
    outcomes: ["Compliance achieved", "Accident reduction"],
    headline: "100%", headlineSuffix: " intrinsically safe",
    stats: [{ label: "Hazmat compliant", value: "Yes" }, { label: "Ports free for expansion", value: "5" }],
    quote: "CameraMatics provided exactly what Flogas wanted and exactly what Flogas needed.",
    quotee: "Mick Dalton, Transport & Ops Manager",
    summary: "Ireland's leading LPG provider required intrinsically safe, hardwired camera systems for hazardous-environment vehicles — CameraMatics delivered a Bluetooth-free solution meeting strict regulations."
  },
  {
    id: 10, name: "Martin Ryan & Sons", vertical: "Transport & Logistics", geo: "UK & Ireland",
    fleetSize: "Mid (50–200)", fleetLabel: "50+ years in operation",
    challenges: ["Fraudulent / false claims", "Rising insurance costs"],
    outcomes: ["Cost savings", "Driver exoneration"],
    headline: "15%", headlineSuffix: " overall cost savings",
    stats: [{ label: "Legal fees", value: "Eliminated" }, { label: "Remote access", value: "International" }],
    quote: "The biggest benefit is avoiding the hefty legal fees that go hand-in-hand with most claims.",
    quotee: "Brendan Ryan, Martin Ryan Haulage",
    summary: "Heritage Irish haulier eliminated legal costs from fraudulent claims and achieved 15% total cost reduction, with remote footage access supporting international transport operations."
  },
  {
    id: 11, name: "Martin's Coaches", vertical: "Passenger Transit", geo: "UK & Ireland",
    fleetSize: "Small (< 50)", fleetLabel: "Coach fleet",
    challenges: ["Urban / VRU safety risk", "Rising insurance costs"],
    outcomes: ["Accident reduction", "Driver behaviour improvement"],
    headline: "360°", headlineSuffix: " passenger protection",
    stats: [{ label: "Camera setup", value: "5-cam (incl. passenger)" }, { label: "Safeguarding", value: "Active" }],
    quote: "I see the cameras as 'a friend in the cab.'",
    quotee: "William Martin, Owner",
    summary: "Family-owned coach operator installed 360° systems including passenger cameras, protecting drivers, reducing insurance costs, and helping schools resolve passenger welfare issues."
  },
  {
    id: 12, name: "Dynes Motor Group", vertical: "Field Services", geo: "UK",
    fleetSize: "Mid (50–200)", fleetLabel: "Specialist breakdown fleet",
    challenges: ["Rising insurance costs", "Driver behaviour & distraction"],
    outcomes: ["Cost savings", "Driver behaviour improvement"],
    headline: "24/7", headlineSuffix: " remote fleet access",
    stats: [{ label: "Award", value: "Brake Fleet Safety 2018" }, { label: "Non-compliance", value: "Reduced" }],
    quote: "Tangible benefits to our bottom-line in excess of the expenditure we made in the camera systems.",
    quotee: "Adam Drury, General Manager",
    summary: "Breakdown and recovery specialist reduced claims costs and non-compliance issues, winning the Brake Fleet Safety Partnership Award for their CameraMatics implementation."
  },
  {
    id: 13, name: "CLS Insulation", vertical: "Field Services", geo: "US",
    fleetSize: "Mid (50–200)", fleetLabel: "150 vehicles",
    challenges: ["Consolidating disconnected systems", "Operational visibility gaps"],
    outcomes: ["Productivity gains", "Accident reduction"],
    headline: "5–6", headlineSuffix: " providers evaluated",
    stats: [{ label: "Chosen over", value: "5–6 competitors" }],
    quote: "",
    quotee: "",
    summary: "US insulation contractor evaluated 5–6 video telematics providers before selecting CameraMatics for its adaptability, scalability, and partnership approach across 150 field service vehicles."
  },
  {
    id: 14, name: "Honer Transport", vertical: "Transport & Logistics", geo: "US",
    fleetSize: "Mid (50–200)", fleetLabel: "Growing fleet",
    challenges: ["Fraudulent / false claims", "Consolidating disconnected systems"],
    outcomes: ["Driver exoneration", "Productivity gains"],
    headline: "100%", headlineSuffix: " trucks protected",
    stats: [{ label: "Evaluated", value: "4 other providers" }, { label: "ELD + Video", value: "Integrated" }],
    quote: "I won't allow a single truck out of my yard unless it is protected by this technology.",
    quotee: "Alan Honer, Managing Director",
    summary: "US trucking company chose CameraMatics over 4 competitors, citing VP-level support access and video-verified evidence that eliminates false accusations that could shut down the business."
  },
  {
    id: 15, name: "N-Virocycle", vertical: "Waste & Recycling", geo: "UK",
    fleetSize: "Small (< 50)", fleetLabel: "30+ specialist vehicles",
    challenges: ["Regulatory compliance", "Consolidating disconnected systems"],
    outcomes: ["Compliance achieved", "Accident reduction"],
    headline: "DVS", headlineSuffix: " compliance restored",
    stats: [{ label: "Previous provider", value: "Failed inspection" }, { label: "London compliant", value: "Yes" }],
    quote: "We need cameras on our vehicles — to protect drivers from fraudulent claims and comply with DVS legislation.",
    quotee: "Martin Mua, Fleet Director",
    summary: "Waste recycling specialist switched to CameraMatics after their previous camera provider failed a roadside DVS inspection — restoring compliance and adding integrated telematics."
  },
  {
    id: 16, name: "C.W. Wright", vertical: "Energy & Utilities", geo: "US",
    fleetSize: "Mid (50–200)", fleetLabel: "Utility fleet",
    challenges: ["Operational visibility gaps", "Rising insurance costs"],
    outcomes: ["Productivity gains", "Accident reduction"],
    headline: "★", headlineSuffix: " strategic partner",
    stats: [{ label: "Key factor", value: "Adaptability" }],
    quote: "",
    quotee: "",
    summary: "US energy and utilities fleet operator selected CameraMatics as a strategic partner for adaptability, scalability, and the quality of the ongoing customer relationship."
  },
  {
    id: 17, name: "Conard Transportation", vertical: "Transport & Logistics", geo: "US",
    fleetSize: "Mid (50–200)", fleetLabel: "US trucking",
    challenges: ["Fraudulent / false claims", "Driver behaviour & distraction"],
    outcomes: ["Driver exoneration", "Driver behaviour improvement"],
    headline: "", headlineSuffix: "",
    stats: [],
    quote: "",
    quotee: "",
    summary: "US transportation company partnered with CameraMatics for video-based fleet safety and driver protection."
  },
  {
    id: 18, name: "Great North Air Ambulance", vertical: "Emergency Services", geo: "UK",
    fleetSize: "Small (< 50)", fleetLabel: "20 ground vehicles, 2 helicopters",
    challenges: ["Operational visibility gaps", "Rising insurance costs"],
    outcomes: ["Driver exoneration", "Accident reduction", "Productivity gains"],
    headline: "30,000+", headlineSuffix: " incidents responded to",
    stats: [{ label: "Coverage", value: "8,000 sq mi" }, { label: "Claims defended", value: "2 with video" }],
    quote: "CameraMatics gives us confidence that our crews and vehicles are protected, even when they're responding to high-pressure, high-risk calls.",
    quotee: "Araminta Hartley, PR Officer, GNAAS",
    summary: "Charity-funded air ambulance service deployed GeniePro dashcams and 360° multi-camera systems across 20 rapid response and service vehicles. CameraMatics provides real-time GPS tracking, predictive maintenance alerts, and video evidence — already defending the charity in two insurance claims and ensuring life-saving vehicles stay on the road."
  },
];

const CASE_STUDY_URLS = {
  1: "https://www.cameramatics.com/resources/customer-stories-how-mcculla-saves-200000-p-a-with-cameramatics/",
  2: "https://www.cameramatics.com/resources/hendrick-european/",
  3: "https://www.cameramatics.com/resources/flannery-plant-hire/",
  4: "https://www.cameramatics.com/us/resources/maritime-invests-in-fleet-safety-and-visibility-with-cameramatics/",
  5: "https://www.cameramatics.com/us/resources/thorntons/",
  6: "https://www.cameramatics.com/us/resources/texcrete/",
  7: "https://www.cameramatics.com/resources/customer-stories-mr-binman/",
  8: "https://www.cameramatics.com/resources/customer-stories-zellwood/",
  9: "https://www.cameramatics.com/resources/flogas/",
  10: "https://www.cameramatics.com/case-study-martin-ryan-sons-transport/",
  11: "https://www.cameramatics.com/us/resources/customer-stories-martins-coaches-protecting-precious-cargo-with-video-safety/",
  12: "https://www.cameramatics.com/resources/customer-stories-dynes-motor-group/",
  13: "https://www.cameramatics.com/resources/cls-insulation/",
  14: "https://www.cameramatics.com/resources/honer-transport/",
  15: "https://www.cameramatics.com/resources/n-virocycle-waste-recycling/",
  16: "https://www.cameramatics.com/us/resources/customer-stories-cw-wright/",
  17: "https://www.cameramatics.com/us/resources/conard-transportation/",
  18: "https://www.cameramatics.com/us/resources/great-north-air-ambulance-service/",
};

// Regulation tagging — only tagged where evidenced or strongly implied from case study content
const REGULATION_MAP = {
  1:  ["Operator's Licence"],                      // McCulla — UK/IE haulier, insurer-driven compliance
  2:  ["Operator's Licence"],                      // Hendrick — EU freight, insurer compliance
  3:  ["DVS", "FORS", "CLOCS"],                    // Flannery — explicitly DVS 2024, construction = FORS/CLOCS
  4:  ["FORS", "DVS"],                             // Maritime — UK's largest private fleet, London operations
  5:  [],                                          // Thorntons — waste, no specific regulation cited
  6:  [],                                          // TexCrete — US concrete, no specific regulation
  7:  [],                                          // Mr. Binman — Irish waste, no specific regulation cited
  8:  [],                                          // Zellwood — Irish refrigerated, no specific regulation
  9:  ["ADR / Hazmat"],                            // Flogas — explicitly intrinsically safe, hazardous environment
  10: ["Operator's Licence"],                      // Martin Ryan — IE haulier
  11: [],                                          // Martin's Coaches — passenger transit
  12: ["FORS"],                                    // Dynes — UK breakdown/recovery specialist
  13: [],                                          // CLS Insulation — US field services
  14: ["ELD"],                                     // Honer — explicitly ELD + video integration
  15: ["DVS"],                                     // N-Virocycle — explicitly DVS, London operations
  16: [],                                          // C.W. Wright — US utilities
  17: ["ELD"],                                     // Conard — US trucking
  18: [],                                          // GNAAS — charity air ambulance, no specific regulation cited
};

const REGULATIONS = ["All", "DVS", "FORS", "CLOCS", "ELD", "Operator's Licence", "ADR / Hazmat"];

// Helper to get regulations for a case study
const getRegulations = (id) => REGULATION_MAP[id] || [];

const CHALLENGES = [
  "Rising insurance costs", "Regulatory compliance", "Fraudulent / false claims",
  "Driver behaviour & distraction", "Urban / VRU safety risk",
  "Operational visibility gaps", "Consolidating disconnected systems"
];

const CHALLENGE_ICONS = {
  "Rising insurance costs": "£",
  "Regulatory compliance": "§",
  "Fraudulent / false claims": "⚖",
  "Driver behaviour & distraction": "◉",
  "Urban / VRU safety risk": "⚠",
  "Operational visibility gaps": "◎",
  "Consolidating disconnected systems": "⧉",
};

const VERTICALS = ["All", "Transport & Logistics", "Construction & Plant", "Waste & Recycling", "Energy & Utilities", "Passenger Transit", "Field Services", "Emergency Services"];
const GEOS = ["All", "UK & Ireland", "UK", "US"];
const FLEET_SIZES = ["All", "Small (< 50)", "Mid (50–200)", "Large (200–1,000)", "Enterprise (1,000+)"];
const OUTCOMES = ["All", "Cost savings", "Accident reduction", "Driver exoneration", "Compliance achieved", "Driver behaviour improvement", "Productivity gains", "Insurer co-funding"];

function ChallengePill({ label, active, onClick, count }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "10px 18px", borderRadius: 100,
      border: active ? "2px solid #d4a843" : "2px solid rgba(255,255,255,0.12)",
      background: active ? "rgba(212,168,67,0.12)" : "rgba(255,255,255,0.04)",
      color: active ? "#f0d078" : "rgba(255,255,255,0.6)",
      cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans', sans-serif",
      fontWeight: active ? 600 : 400, transition: "all 0.2s ease",
      whiteSpace: "nowrap",
    }}>
      <span style={{ fontSize: 16, opacity: 0.7 }}>{CHALLENGE_ICONS[label]}</span>
      <span>{label}</span>
      <span style={{
        background: active ? "rgba(212,168,67,0.25)" : "rgba(255,255,255,0.08)",
        borderRadius: 100, padding: "2px 8px", fontSize: 12, fontWeight: 600,
        color: active ? "#f0d078" : "rgba(255,255,255,0.4)",
      }}>{count}</span>
    </button>
  );
}

function DropdownFilter({ label, options, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase",
        letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)",
        fontFamily: "'DM Sans', sans-serif",
      }}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 8, padding: "8px 12px", color: "rgba(255,255,255,0.8)",
        fontSize: 13, fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
        outline: "none", appearance: "auto",
      }}>
        {options.map(o => <option key={o} value={o} style={{ background: "#1a1f2e" }}>{o}</option>)}
      </select>
    </div>
  );
}

function CaseCard({ cs, onClick }) {
  const hasHeadline = cs.headline && cs.headline.length > 0;
  return (
    <div onClick={onClick} style={{
      background: "linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
      border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
      padding: 0, cursor: "pointer", transition: "all 0.25s ease",
      display: "flex", flexDirection: "column", overflow: "hidden",
      position: "relative",
    }}
    onMouseEnter={e => { e.currentTarget.style.border = "1px solid rgba(212,168,67,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={e => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.06em", color: "rgba(212,168,67,0.7)",
              fontFamily: "'DM Sans', sans-serif", marginBottom: 4,
            }}>{cs.vertical}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff",
              fontFamily: "'Fraunces', serif",
            }}>{cs.name}</div>
          </div>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <span style={{
              fontSize: 11, padding: "3px 8px", borderRadius: 100,
              background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)",
              fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
            }}>{cs.geo}</span>
          </div>
        </div>

        {cs.fleetLabel && (
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 12,
            fontFamily: "'DM Sans', sans-serif",
          }}>⬡ {cs.fleetLabel}</div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
          {cs.challenges.map(c => (
            <span key={c} style={{
              fontSize: 11, padding: "3px 8px", borderRadius: 6,
              background: "rgba(212,168,67,0.08)", color: "rgba(212,168,67,0.7)",
              fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(212,168,67,0.12)",
            }}>{c}</span>
          ))}
          {getRegulations(cs.id).map(r => (
            <span key={r} style={{
              fontSize: 11, padding: "3px 8px", borderRadius: 6,
              background: "rgba(130,160,255,0.08)", color: "rgba(130,160,255,0.8)",
              fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(130,160,255,0.12)",
            }}>§ {r}</span>
          ))}
        </div>
      </div>

      {hasHeadline && (
        <div style={{
          background: "rgba(212,168,67,0.06)",
          borderTop: "1px solid rgba(212,168,67,0.1)",
          padding: "16px 20px", marginTop: "auto",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{
              fontSize: 32, fontWeight: 800, color: "#f0d078",
              fontFamily: "'Fraunces', serif", lineHeight: 1,
            }}>{cs.headline}</span>
            <span style={{
              fontSize: 14, color: "rgba(212,168,67,0.7)",
              fontFamily: "'DM Sans', sans-serif",
            }}>{cs.headlineSuffix}</span>
          </div>
          {cs.stats.length > 0 && (
            <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
              {cs.stats.map((s, i) => (
                <div key={i} style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}: </span>
                  <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>{s.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DetailModal({ cs, onClose }) {
  if (!cs) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(8px)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 1000, padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(170deg, #1e2436 0%, #151926 100%)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20,
        maxWidth: 640, width: "100%", maxHeight: "85vh", overflow: "auto",
        padding: 32, position: "relative",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.08)",
          border: "none", color: "rgba(255,255,255,0.5)", borderRadius: 100,
          width: 32, height: 32, cursor: "pointer", fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>✕</button>

        <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.08em", color: "rgba(212,168,67,0.7)",
          fontFamily: "'DM Sans', sans-serif", marginBottom: 6,
        }}>{cs.vertical} · {cs.geo}</div>

        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff",
          fontFamily: "'Fraunces', serif", margin: "0 0 6px",
        }}>{cs.name}</h2>

        {cs.fleetLabel && (
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 20,
            fontFamily: "'DM Sans', sans-serif",
          }}>⬡ {cs.fleetLabel} · {cs.fleetSize}</div>
        )}

        {cs.headline && (
          <div style={{
            background: "rgba(212,168,67,0.08)", borderRadius: 12,
            padding: 20, marginBottom: 20,
            border: "1px solid rgba(212,168,67,0.12)",
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 40, fontWeight: 800, color: "#f0d078",
                fontFamily: "'Fraunces', serif", lineHeight: 1,
              }}>{cs.headline}</span>
              <span style={{ fontSize: 16, color: "rgba(212,168,67,0.8)",
                fontFamily: "'DM Sans', sans-serif",
              }}>{cs.headlineSuffix}</span>
            </div>
            {cs.stats.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 4 }}>
                {cs.stats.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)",
                      fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em",
                    }}>{s.label}</div>
                    <div style={{ fontSize: 16, color: "#fff", fontWeight: 700,
                      fontFamily: "'DM Sans', sans-serif",
                    }}>{s.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {cs.challenges.map(c => (
            <span key={c} style={{
              fontSize: 12, padding: "4px 10px", borderRadius: 6,
              background: "rgba(212,168,67,0.08)", color: "rgba(212,168,67,0.8)",
              fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(212,168,67,0.15)",
            }}>{CHALLENGE_ICONS[c]} {c}</span>
          ))}
          {cs.outcomes.map(o => (
            <span key={o} style={{
              fontSize: 12, padding: "4px 10px", borderRadius: 6,
              background: "rgba(100,200,140,0.08)", color: "rgba(100,200,140,0.8)",
              fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(100,200,140,0.15)",
            }}>✓ {o}</span>
          ))}
          {getRegulations(cs.id).map(r => (
            <span key={r} style={{
              fontSize: 12, padding: "4px 10px", borderRadius: 6,
              background: "rgba(130,160,255,0.08)", color: "rgba(130,160,255,0.8)",
              fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(130,160,255,0.15)",
            }}>§ {r}</span>
          ))}
        </div>

        <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.7)",
          fontFamily: "'DM Sans', sans-serif", margin: "0 0 20px",
        }}>{cs.summary}</p>

        {cs.quote && (
          <blockquote style={{
            margin: 0, padding: "16px 20px",
            borderLeft: "3px solid rgba(212,168,67,0.4)",
            background: "rgba(255,255,255,0.03)", borderRadius: "0 10px 10px 0",
          }}>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.6)",
              fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", margin: "0 0 8px",
            }}>"{cs.quote}"</p>
            {cs.quotee && (
              <cite style={{ fontSize: 12, color: "rgba(212,168,67,0.6)",
                fontFamily: "'DM Sans', sans-serif", fontStyle: "normal", fontWeight: 600,
              }}>— {cs.quotee}</cite>
            )}
          </blockquote>
        )}

        <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
          <a href={CASE_STUDY_URLS[cs.id] || "#"} target="_blank" rel="noopener noreferrer" style={{
            background: "linear-gradient(135deg, #d4a843, #b8912e)",
            border: "none", color: "#111", fontWeight: 700, fontSize: 14,
            padding: "12px 24px", borderRadius: 10, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", textDecoration: "none",
            display: "inline-block",
          }}>Read full story →</a>
          <button onClick={() => {
            const regs = getRegulations(cs.id);
            const text = `${cs.name} (${cs.vertical}, ${cs.geo}) — ${cs.fleetLabel}${regs.length ? `\nRegulations: ${regs.join(", ")}` : ""}\nHeadline: ${cs.headline}${cs.headlineSuffix}\n${cs.summary}\n${cs.quote ? `"${cs.quote}" — ${cs.quotee}` : ""}`;
            navigator.clipboard.writeText(text).catch(() => {});
          }} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: 14,
            padding: "12px 20px", borderRadius: 10, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}>Copy for sales ⎘</button>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudyExplorer() {
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [vertical, setVertical] = useState("All");
  const [geo, setGeo] = useState("All");
  const [fleetSize, setFleetSize] = useState("All");
  const [outcome, setOutcome] = useState("All");
  const [regulation, setRegulation] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const toggleChallenge = (c) => {
    setActiveChallenges(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  };

  const filtered = useMemo(() => {
    return CASE_STUDIES.filter(cs => {
      if (activeChallenges.length > 0 && !activeChallenges.some(c => cs.challenges.includes(c))) return false;
      if (vertical !== "All" && cs.vertical !== vertical) return false;
      if (geo !== "All" && cs.geo !== geo) return false;
      if (fleetSize !== "All" && cs.fleetSize !== fleetSize) return false;
      if (outcome !== "All" && !cs.outcomes.includes(outcome)) return false;
      if (regulation !== "All" && !getRegulations(cs.id).includes(regulation)) return false;
      if (search && !cs.name.toLowerCase().includes(search.toLowerCase()) &&
          !cs.summary.toLowerCase().includes(search.toLowerCase()) &&
          !cs.vertical.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [activeChallenges, vertical, geo, fleetSize, outcome, regulation, search]);

  const challengeCounts = useMemo(() => {
    const base = CASE_STUDIES.filter(cs => {
      if (vertical !== "All" && cs.vertical !== vertical) return false;
      if (geo !== "All" && cs.geo !== geo) return false;
      if (fleetSize !== "All" && cs.fleetSize !== fleetSize) return false;
      if (outcome !== "All" && !cs.outcomes.includes(outcome)) return false;
      if (regulation !== "All" && !getRegulations(cs.id).includes(regulation)) return false;
      return true;
    });
    return CHALLENGES.reduce((acc, c) => {
      acc[c] = base.filter(cs => cs.challenges.includes(c)).length;
      return acc;
    }, {});
  }, [vertical, geo, fleetSize, outcome, regulation]);

  const clearAll = () => {
    setActiveChallenges([]); setVertical("All"); setGeo("All");
    setFleetSize("All"); setOutcome("All"); setRegulation("All"); setSearch("");
  };

  const hasFilters = activeChallenges.length > 0 || vertical !== "All" || geo !== "All" || fleetSize !== "All" || outcome !== "All" || regulation !== "All" || search;

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(180deg, #111520 0%, #0d1018 100%)",
      fontFamily: "'DM Sans', sans-serif", color: "#fff",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600;9..144,700;9..144,800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "40px 32px 0", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.12em", color: "rgba(212,168,67,0.6)", marginBottom: 8,
            }}>Customer evidence</div>
            <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0,
              fontFamily: "'Fraunces', serif", lineHeight: 1.1,
              background: "linear-gradient(135deg, #fff 60%, rgba(212,168,67,0.8))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Find the story that wins your deal</h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginTop: 8, maxWidth: 520, lineHeight: 1.5 }}>
              Start with the challenge your prospect faces. Every story is tagged by industry, outcomes, and fleet profile.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <input
              type="text" placeholder="Search customers..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "10px 16px", color: "#fff", fontSize: 14,
                fontFamily: "'DM Sans', sans-serif", outline: "none", width: 220,
              }}
            />
            <div style={{
              background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)",
              borderRadius: 10, padding: "10px 16px", fontSize: 22, fontWeight: 800,
              color: "#f0d078", fontFamily: "'Fraunces', serif", lineHeight: 1,
              textAlign: "center", minWidth: 48,
            }}>{filtered.length}</div>
          </div>
        </div>
      </div>

      {/* Challenge pills - primary filter */}
      <div style={{
        padding: "24px 32px 20px", maxWidth: 1200, margin: "0 auto",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginBottom: 10,
        }}>What challenge are you solving?</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CHALLENGES.map(c => (
            <ChallengePill
              key={c} label={c}
              active={activeChallenges.includes(c)}
              onClick={() => toggleChallenge(c)}
              count={challengeCounts[c]}
            />
          ))}
        </div>
      </div>

      {/* Secondary filters */}
      <div style={{
        padding: "16px 32px", maxWidth: 1200, margin: "0 auto",
        display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <DropdownFilter label="Industry" options={VERTICALS} value={vertical} onChange={setVertical} />
        <DropdownFilter label="Geography" options={GEOS} value={geo} onChange={setGeo} />
        <DropdownFilter label="Fleet size" options={FLEET_SIZES} value={fleetSize} onChange={setFleetSize} />
        <DropdownFilter label="Outcome" options={OUTCOMES} value={outcome} onChange={setOutcome} />
        <DropdownFilter label="Regulation" options={REGULATIONS} value={regulation} onChange={setRegulation} />
        {hasFilters && (
          <button onClick={clearAll} style={{
            background: "none", border: "none", color: "rgba(212,168,67,0.6)",
            cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600, padding: "8px 0", textDecoration: "underline",
            textUnderlineOffset: 3,
          }}>Clear all filters</button>
        )}
      </div>

      {/* Results grid */}
      <div style={{ padding: "24px 32px 60px", maxWidth: 1200, margin: "0 auto" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(255,255,255,0.3)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>∅</div>
            <div style={{ fontSize: 16, fontFamily: "'DM Sans', sans-serif" }}>
              No case studies match these filters.
            </div>
            <button onClick={clearAll} style={{
              marginTop: 16, background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
              padding: "8px 20px", color: "rgba(255,255,255,0.6)", cursor: "pointer",
              fontSize: 14, fontFamily: "'DM Sans', sans-serif",
            }}>Reset filters</button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340, 1fr))",
            gap: 16,
          }}>
            <style>{`
              @media (min-width: 1100px) {
                .case-grid { grid-template-columns: repeat(3, 1fr) !important; }
              }
              @media (min-width: 750px) and (max-width: 1099px) {
                .case-grid { grid-template-columns: repeat(2, 1fr) !important; }
              }
              @media (max-width: 749px) {
                .case-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
            <div className="case-grid" style={{ display: "grid", gap: 16 }}>
              {filtered.map(cs => (
                <CaseCard key={cs.id} cs={cs} onClick={() => setSelected(cs)} />
              ))}
            </div>
          </div>
        )}
      </div>

      <DetailModal cs={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
