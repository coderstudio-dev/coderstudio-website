"use client";

import { useEffect, useRef, useState } from "react";
import { LOG_POOL } from "@/lib/content";
import { formatClock } from "@/lib/util";

export function StatusPanel() {
  const counterRef = useRef(0);

  const makeLine = () => {
    const item = LOG_POOL[counterRef.current % LOG_POOL.length];
    counterRef.current += 1;
    return { id: counterRef.current, time: formatClock(new Date()), ...item };
  };

  const [logLines, setLogLines] = useState<
    { id: number; time: string; tag: string; color: string; msg: string }[]
  >([]);
  const [clock, setClock] = useState("");

  useEffect(() => {
    setLogLines(Array.from({ length: 6 }, makeLine));
    setClock(formatClock(new Date()));

    const clockTimer = setInterval(() => setClock(formatClock(new Date())), 1000);
    const logTimer = setInterval(() => {
      setLogLines((prev) => [...prev.slice(1), makeLine()]);
    }, 2600);

    return () => {
      clearInterval(clockTimer);
      clearInterval(logTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border border-white/10 bg-gradient-to-b from-[#0E1114] to-[#0A0C0E] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#5dd0ff] animate-pulse-glow" />
          <span className="font-mono text-[11.5px] tracking-wide uppercase text-[#C3C9CF]">
            All systems operational
          </span>
        </div>
        <span className="font-mono text-[11.5px] text-[#6C7278]">{clock} UTC</span>
      </div>
      <div className="p-4 font-mono text-xs leading-loose min-h-[176px]">
        {logLines.map((line) => (
          <div key={line.id} className="flex gap-3 whitespace-nowrap overflow-hidden">
            <span className="text-[#565B61]">{line.time}</span>
            <span style={{ color: line.color }}>{line.tag}</span>
            <span className="text-[#9AA0A6] overflow-hidden text-ellipsis">{line.msg}</span>
          </div>
        ))}
        <div className="flex gap-2 text-[#565B61]">
          <span>&gt;</span>
          <span className="w-2 h-[15px] bg-[#5dd0ff] animate-blink" />
        </div>
      </div>
      <div className="grid grid-cols-3 border-t border-white/[0.08]">
        <div className="px-4 py-3.5 border-r border-white/[0.08]">
          <div className="font-mono text-xl text-[#ECEBE2]">
            99.98<span className="text-[#5dd0ff] text-sm">%</span>
          </div>
          <div className="font-mono text-[10px] text-[#6C7278] tracking-wide mt-0.5">UPTIME</div>
        </div>
        <div className="px-4 py-3.5 border-r border-white/[0.08]">
          <div className="font-mono text-xl text-[#ECEBE2]">
            &lt;15<span className="text-[#5dd0ff] text-sm">m</span>
          </div>
          <div className="font-mono text-[10px] text-[#6C7278] tracking-wide mt-0.5">RESPONSE</div>
        </div>
        <div className="px-4 py-3.5">
          <div className="font-mono text-xl text-[#ECEBE2]">
            24<span className="text-[#5dd0ff] text-sm">/7</span>
          </div>
          <div className="font-mono text-[10px] text-[#6C7278] tracking-wide mt-0.5">HUMANS ON CALL</div>
        </div>
      </div>
    </div>
  );
}
