import { useState, useMemo, useEffect } from "react";

const CASE_STUDIES = [
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
    fleetSize: "Mid (50–200)", fleetLabel: "40+ semi trucks, 48-state coverage",
    challenges: ["Fraudulent / false claims", "Operational visibility gaps", "Consolidating disconnected systems"],
    outcomes: ["Driver exoneration", "Accident reduction", "Productivity gains"],
    headline: "15 min", headlineSuffix: " to exonerate a driver",
    stats: [{ label: "Founded", value: "2005" }, { label: "Radius", value: "700 mi from Nashville" }],
    quote: "The product offers not just the ability to do an autopsy on an accident, but it also helps to prevent one.",
    quotee: "Dale Conard, CEO",
    summary: "Tennessee-based family trucking company chose CameraMatics over multiple competitors for its fully integrated camera system (side, rear, pedestrian monitoring, blind spot detection) and standout personal service. In a rear-end collision with no witnesses, Conard pulled rear-camera footage in 15 minutes to prove the other driver was at fault — saving the company from a costly lawsuit."
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
  17: "https://www.cameramatics.com/us/resources/conard-transportation-2/",
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
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!cs) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [cs, onClose]);
  useEffect(() => { setCopied(false); }, [cs]);
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
            navigator.clipboard.writeText(text).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }).catch(() => {});
          }} style={{
            background: copied ? "rgba(100,200,140,0.12)" : "rgba(255,255,255,0.06)",
            border: copied ? "1px solid rgba(100,200,140,0.3)" : "1px solid rgba(255,255,255,0.12)",
            color: copied ? "rgba(100,200,140,0.9)" : "rgba(255,255,255,0.6)",
            fontWeight: 600, fontSize: 14,
            padding: "12px 20px", borderRadius: 10, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease",
          }}>{copied ? "Copied ✓" : "Copy for sales ⎘"}</button>
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
        <div style={{ marginBottom: 24 }}>
          <svg width="150" height="32" viewBox="0 0 187 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.7 }}>
            <path d="M50.9974 24.4063C46.7728 24.4063 43.6562 21.0812 43.6562 16.8566C43.6562 12.6732 46.7517 9.26345 51.0597 9.26345C52.1208 9.23154 53.1769 9.42169 54.1602 9.82169C55.1435 10.2217 56.0324 10.8227 56.77 11.5863L55.6403 12.7983C55.0492 12.1696 54.3366 11.6675 53.5457 11.3225C52.7548 10.9775 51.902 10.7969 51.0391 10.7915C47.7968 10.7915 45.3711 13.4057 45.3711 16.8143C45.3711 20.2229 47.818 22.8783 51.0391 22.8783C53.046 22.8783 54.3643 22.1057 55.7648 20.7675L56.8505 21.8337C56.1187 22.6608 55.216 23.319 54.2048 23.763C53.1936 24.207 52.0981 24.4261 50.994 24.4052" fill="white"/>
            <path d="M59.8848 15.4126L59.4037 14.0983C60.6287 13.5028 61.9736 13.1951 63.3357 13.1989C66.2848 13.1989 67.9368 14.7035 67.9368 17.5497V24.1555H66.3894V22.5235C65.9327 23.1226 65.3396 23.6042 64.6594 23.9282C63.9792 24.2522 63.2316 24.4092 62.4786 24.3863C60.4706 24.3863 58.4414 23.2566 58.4414 20.9977C58.4414 18.696 60.3271 17.484 63.0643 17.484C64.189 17.473 65.3093 17.627 66.3894 17.9412V17.5657C66.3894 15.6195 65.1974 14.6149 63.1683 14.6149C62.0275 14.6279 60.9047 14.8996 59.8843 15.4097L59.8848 15.4126ZM60.0728 20.9326C60.0728 22.3132 61.33 23.104 62.7917 23.104C64.7786 23.104 66.4094 21.8926 66.4094 20.1783V19.1366C65.3777 18.8316 64.3075 18.6763 63.2317 18.6755C61.2026 18.6755 60.0728 19.5537 60.0728 20.9343" fill="white"/>
            <path d="M83.538 13.1114C86.0271 13.1114 87.554 14.7845 87.554 17.4611V24.1548H85.9431V17.8394C85.9431 15.748 84.8974 14.5771 83.1431 14.5771C81.5123 14.5771 80.1528 15.7903 80.1528 17.9234V24.1548H78.5608V17.7971C78.5608 15.768 77.494 14.5771 75.7785 14.5771C74.0631 14.5771 72.7671 15.9983 72.7671 17.9857V24.1571H71.1562V13.34H72.7671V15.1594C73.4791 14.096 74.4408 13.1114 76.2603 13.1114C76.9871 13.0865 77.7051 13.278 78.3231 13.6615C78.941 14.045 79.4313 14.6033 79.7317 15.2657C80.1162 14.5996 80.6719 14.0486 81.3412 13.6698C82.0105 13.2909 82.769 13.0982 83.538 13.1114Z" fill="white"/>
            <path d="M95.6007 23.0057C96.2452 23.0116 96.8834 22.8784 97.4716 22.6151C98.0599 22.3518 98.5844 21.9646 99.0093 21.48L100.013 22.3777C99.4731 23.0326 98.7911 23.5557 98.0187 23.9071C97.2463 24.2586 96.4039 24.4291 95.5556 24.4057C92.5842 24.4057 90.1602 22.1263 90.1602 18.7612C90.163 15.6223 92.3584 13.1115 95.3499 13.1115C98.5499 13.1115 100.39 15.6629 100.39 18.844C100.393 19.0113 100.386 19.1787 100.369 19.3452H91.7939C92.0224 21.688 93.6979 23.0023 95.6013 23.0023L95.6007 23.0057ZM98.759 18.1492C98.5916 16.1846 97.4619 14.4703 95.3076 14.4703C93.4259 14.4703 92.0036 16.0377 91.7939 18.1492H98.759Z" fill="white"/>
            <path d="M104.615 24.1565H103.004V13.3428H104.615V16.1657C105.41 14.3674 106.978 13.0702 109.028 13.1542V14.8897H108.902C106.539 14.8897 104.616 16.584 104.616 19.8468L104.615 24.1565Z" fill="white"/>
            <path d="M111.366 15.4126L110.886 14.0983C112.111 13.5026 113.456 13.195 114.818 13.1989C117.767 13.1989 119.42 14.7035 119.42 17.5497V24.1555H117.87V22.5235C117.413 23.1227 116.82 23.6043 116.14 23.9283C115.46 24.2523 114.712 24.4093 113.959 24.3863C111.951 24.3863 109.922 23.2566 109.922 20.9977C109.922 18.696 111.808 17.484 114.545 17.484C115.67 17.473 116.79 17.6271 117.87 17.9412V17.5657C117.87 15.6195 116.678 14.6149 114.649 14.6149C113.508 14.6279 112.385 14.8996 111.365 15.4097L111.366 15.4126ZM111.553 20.9326C111.553 22.3132 112.81 23.104 114.272 23.104C116.26 23.104 117.89 21.8926 117.89 20.1783V19.1366C116.858 18.8315 115.788 18.6762 114.712 18.6755C112.683 18.6755 111.553 19.5537 111.553 20.9343" fill="white"/>
            <path d="M122.723 9.5166H125.466L129.923 16.4383L134.376 9.5166H137.119V24.156H134.548V13.6566L129.927 20.5577H129.843L125.263 13.7006V24.1577H122.732L122.723 9.5166Z" fill="white"/>
            <path d="M147.126 24.1548V22.7954C146.69 23.3148 146.141 23.7279 145.521 24.0034C144.901 24.2788 144.226 24.4094 143.549 24.3851C141.458 24.3851 139.617 23.1931 139.617 20.9765V20.9354C139.617 18.488 141.52 17.3165 144.093 17.3165C145.129 17.298 146.162 17.4525 147.147 17.7737V17.5651C147.147 16.0382 146.184 15.2011 144.428 15.2011C143.338 15.2061 142.261 15.4429 141.269 15.896L140.579 13.8668C141.891 13.2416 143.33 12.9269 144.783 12.9468C148.045 12.9468 149.635 14.6611 149.635 17.6114V24.1548H147.126ZM147.188 19.5325C146.378 19.236 145.521 19.087 144.658 19.0925C143.067 19.0925 142.127 19.7422 142.127 20.8068V20.848C142.127 21.8948 143.067 22.48 144.261 22.48C145.934 22.48 147.189 21.5388 147.189 20.1582L147.188 19.5325Z" fill="white"/>
            <path d="M152.855 21.1023V15.2875H151.453V13.1132H152.855V9.5166H155.384V13.1132H158.355V15.2875H155.384V20.704C155.355 20.8902 155.369 21.0807 155.427 21.2602C155.484 21.4396 155.583 21.6031 155.716 21.7375C155.848 21.8718 156.01 21.9733 156.188 22.0338C156.367 22.0943 156.557 22.1121 156.743 22.0857C157.289 22.0876 157.827 21.9583 158.313 21.7086V23.7783C157.618 24.1693 156.83 24.3648 156.033 24.344C154.171 24.344 152.855 23.528 152.855 21.1029" fill="white"/>
            <path d="M160.742 9.3811H163.461V11.7862H160.742V9.3811ZM160.846 13.1108H163.376V24.1554H160.846V13.1108Z" fill="white"/>
            <path d="M165.865 18.6966V18.6543C165.855 17.8971 165.996 17.1455 166.28 16.4434C166.564 15.7414 166.985 15.103 167.518 14.5656C168.052 14.0281 168.687 13.6025 169.387 13.3136C170.087 13.0247 170.837 12.8783 171.595 12.8829C172.426 12.8468 173.256 12.9993 174.02 13.329C174.785 13.6588 175.464 14.1571 176.009 14.7869L174.44 16.4812C174.094 16.0531 173.658 15.7072 173.162 15.4685C172.666 15.2297 172.124 15.1041 171.574 15.1006C169.734 15.1006 168.395 16.6903 168.395 18.6143V18.6554C168.395 20.6212 169.754 22.2103 171.7 22.2103C172.248 22.1954 172.787 22.0648 173.281 21.8268C173.775 21.5889 174.213 21.2491 174.566 20.8297L176.092 22.3354C175.333 23.2418 174.315 23.8942 173.175 24.2049C172.034 24.5157 170.826 24.47 169.712 24.0739C168.599 23.6779 167.633 22.9504 166.945 21.9893C166.257 21.0283 165.879 19.8796 165.863 18.6977" fill="white"/>
            <path d="M177.302 22.7125L178.432 20.9982C179.463 21.8246 180.731 22.3004 182.051 22.3565C183.137 22.3565 183.765 21.8954 183.765 21.1645V21.1234C183.765 20.2662 182.594 19.9725 181.298 19.5754C179.666 19.1182 177.847 18.4468 177.847 16.3342V16.2931C177.847 14.2017 179.582 12.9257 181.778 12.9257C183.222 12.9533 184.629 13.3892 185.836 14.1828L184.832 15.9799C183.901 15.3677 182.827 15.0079 181.716 14.9359C180.732 14.9359 180.168 15.3931 180.168 16.0445V16.0857C180.168 16.8805 181.36 17.2154 182.657 17.6337C184.268 18.1359 186.085 18.8668 186.085 20.8531V20.8954C186.085 23.2182 184.286 24.3679 181.986 24.3679C180.286 24.3461 178.639 23.7656 177.301 22.7159" fill="white"/>
            <path d="M13.9617 16.5611C13.9616 16.0366 14.117 15.5239 14.4084 15.0877C14.6997 14.6515 15.1138 14.3115 15.5983 14.1107C16.0829 13.9098 16.6161 13.8572 17.1305 13.9594C17.645 14.0616 18.1176 14.3141 18.4886 14.6849C18.8595 15.0557 19.1122 15.5282 19.2147 16.0426C19.3171 16.557 19.2647 17.0903 19.0641 17.5749C18.8635 18.0596 18.5236 18.4738 18.0876 18.7653C17.6515 19.0568 17.1388 19.2125 16.6143 19.2126C15.9112 19.212 15.237 18.9325 14.7397 18.4354C14.2424 17.9383 13.9626 17.2643 13.9617 16.5611ZM11.7846 16.5611C11.7847 17.5162 12.068 18.4498 12.5987 19.2439C13.1294 20.0379 13.8836 20.6568 14.766 21.0222C15.6483 21.3877 16.6193 21.4832 17.556 21.2969C18.4927 21.1105 19.3531 20.6506 20.0284 19.9753C20.7038 19.3 21.1637 18.4395 21.35 17.5028C21.5364 16.5661 21.4408 15.5952 21.0754 14.7128C20.7099 13.8304 20.0911 13.0762 19.297 12.5455C18.503 12.0148 17.5694 11.7315 16.6143 11.7314C15.3338 11.7329 14.1063 12.2423 13.2008 13.1477C12.2954 14.0531 11.7861 15.2807 11.7846 16.5611ZM6.88687 27.0457C4.82217 25.1074 3.37563 22.6026 2.7286 19.8455C2.08157 17.0884 2.26285 14.2017 3.24971 11.5472C4.23658 8.89267 5.9851 6.58857 8.27607 4.92374C10.567 3.2589 13.2985 2.30741 16.128 2.18857C16.3257 2.18057 16.5212 2.17657 16.7172 2.17657C19.8648 2.18463 22.9237 3.22028 25.4289 5.12606C27.934 7.03183 29.7483 9.7035 30.596 12.7349H27.84C27.5763 12.738 27.317 12.6661 27.0925 12.5278C26.8679 12.3894 26.6872 12.1901 26.5714 11.9531C25.5508 9.77266 23.8348 7.99295 21.693 6.89351C19.5512 5.79406 17.1048 5.43717 14.7382 5.87887C12.3715 6.32058 10.2186 7.53586 8.61754 9.33386C7.01649 11.1319 6.05799 13.4107 5.89258 15.8126C5.78519 17.3002 5.9878 18.794 6.48757 20.1993C6.98735 21.6046 7.77341 22.8908 8.79601 23.9766C10.0057 25.2737 11.5148 26.2547 13.1913 26.8337C14.8677 27.4128 16.6605 27.5724 18.4129 27.2984C20.1653 27.0245 21.8239 26.3254 23.2436 25.2623C24.6634 24.1992 25.801 22.8044 26.5572 21.2C26.6734 20.9563 26.8562 20.7505 27.0846 20.6065C27.313 20.4625 27.5775 20.3861 27.8474 20.3863H30.5903C29.7358 23.237 28.0766 25.7805 25.812 27.7114L16.612 36.9114L6.88687 27.0457ZM16.0394 0.0148571C12.7835 0.151337 9.64014 1.24539 7.00306 3.16C4.36598 5.07462 2.35238 7.7247 1.21441 10.7784C0.07644 13.8321 -0.135315 17.1536 0.605663 20.3271C1.34664 23.5005 3.00741 26.3849 5.38001 28.6189L16.6 40L17.3743 39.2257L27.272 29.3269C30.2477 26.7925 32.2776 23.3251 33.0309 19.4897L33.2594 18.2091H27.8474C27.1659 18.2104 26.4985 18.4042 25.9223 18.7681C25.346 19.1321 24.8843 19.6514 24.5903 20.2663C23.9863 21.5496 23.0769 22.6654 21.9418 23.5159C20.8068 24.3664 19.4805 24.9257 18.0792 25.1449C16.6779 25.3642 15.2441 25.2366 13.9035 24.7734C12.5629 24.3102 11.3563 23.5255 10.3892 22.488C9.57083 21.6202 8.94174 20.5918 8.54178 19.468C8.14182 18.3443 7.97971 17.1497 8.06572 15.96C8.19823 14.0396 8.96497 12.2175 10.2455 10.7802C11.526 9.34283 13.2477 8.37159 15.1402 8.01905C17.0326 7.66651 18.9886 7.95265 20.7008 8.83251C22.4129 9.71236 23.7843 11.1361 24.5994 12.88C24.892 13.4908 25.3518 14.0061 25.9253 14.3661C26.4989 14.7262 27.1628 14.9162 27.84 14.9143H33.26L33.0314 13.6337C32.3327 9.81273 30.3181 6.35705 27.3372 3.86658C24.3563 1.3761 20.5975 0.0080768 16.7132 0C16.4903 0 16.2634 0.00514286 16.0394 0.0148571Z" fill="white"/>
          </svg>
        </div>
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

      {/* Footer */}
      <div style={{
        padding: "32px 32px 40px", maxWidth: 1200, margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        fontSize: 13, fontFamily: "'DM Sans', sans-serif",
        color: "rgba(255,255,255,0.25)",
      }}>
        <span>Built by Alex Blanes</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <a href="https://alexblanes.com" target="_blank" rel="noopener noreferrer" style={{
          color: "rgba(255,255,255,0.4)", textDecoration: "none",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          transition: "color 0.2s ease, border-color 0.2s ease",
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "rgba(212,168,67,0.7)"; e.currentTarget.style.borderColor = "rgba(212,168,67,0.3)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
        >alexblanes.com</a>
      </div>
    </div>
  );
}
