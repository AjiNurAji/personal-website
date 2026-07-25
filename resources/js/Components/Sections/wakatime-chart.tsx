"use client";

import { useTheme } from "@/hooks/use-theme";
import { useMemo } from "react";

/* ───────────────────────────────────────────────
   Data types
   ─────────────────────────────────────────────── */

export interface DailyData {
    date: string;
    text: string;
    grand_total: {
        hours: number;
        minutes: number;
        total_seconds: number;
        digital: string;
        decimal: number;
        text: string;
    };
    percent?: number;
}

export interface ActivityDay {
    date: string;
    total: number;
    categories: { name: string; total: number }[];
}

/** Which chart type to render */
export type ChartKind = "time-series" | "category" | "heatmap";

/* ───────────────────────────────────────────────
   Normalizers
   ─────────────────────────────────────────────── */

/** Coding Activity (time‑series) or Languages/Editors/OS (category) */
export function normalizeWakaData(raw: any[]): DailyData[] {
    return raw.map((item) => {
        if (item.grand_total) {
            return {
                ...item,
                grand_total: {
                    hours: item.grand_total.hours ?? 0,
                    minutes: item.grand_total.minutes ?? 0,
                    total_seconds: item.grand_total.total_seconds ?? 0,
                    digital: item.grand_total.digital || "0:00",
                    decimal: Number(item.grand_total.decimal) || 0,
                    text: item.grand_total.text || "0 secs",
                },
            } as DailyData;
        }
        const seconds = item.total_seconds ?? 0;
        return {
            date: item.name || item.date || "Unknown",
            text: item.text || "0 secs",
            percent: item.percent ?? 0,
            grand_total: {
                hours: item.hours ?? Math.floor(seconds / 3600),
                minutes: item.minutes ?? Math.floor((seconds % 3600) / 60),
                total_seconds: seconds,
                digital: item.digital || "0:00",
                decimal: item.decimal ?? 0,
                text: item.text || "0 secs",
            },
        };
    });
}

/** Activity Table (heatmap) — wrapper object: { days: [...], range: "last_year" } */
export function parseActivityTable(raw: any): {
    days: ActivityDay[];
    range: string;
    isUpToDate: boolean;
} {
    const days: ActivityDay[] = (raw.days || []).map((d: any) => ({
        date: d.date || "",
        total: d.total ?? 0,
        categories: (d.categories || []).map((c: any) => ({
            name: c.name || "",
            total: c.total ?? 0,
        })),
    }));
    return {
        days,
        range: raw.range || "last_7_days",
        isUpToDate: raw.is_up_to_date ?? true,
    };
}

export interface WakaTimeChartProps {
    data: DailyData[] | ActivityDay[];
    label: string;
    kind: ChartKind;
}

/* ───────────────────────────────────────────────
   Time‑Series (Coding Activity)
   ─────────────────────────────────────────────── */

function TimeSeriesChart({ data, colors }: { data: DailyData[]; colors: ReturnType<typeof makeColors> }) {
    const { maxSeconds, days, tickValues } = useMemo(() => {
        const max = Math.max(...data.map((d) => d.grand_total.total_seconds), 1);
        const niceMax = Math.ceil(max / 3600) * 3600;
        const numTicks = 4;
        const step = Math.ceil(niceMax / numTicks / 900) * 900;
        const ticks: { seconds: number; label: string }[] = [];
        for (let s = 0; s <= niceMax; s += step) {
            const h = Math.floor(s / 3600);
            const m = Math.floor((s % 3600) / 60);
            ticks.push({ seconds: s, label: h > 0 ? `${h}h ${m}m` : `${m}m` });
        }
        const daysShort = data.map((d) => ({
            ...d,
            dayLabel: new Date(d.date).toLocaleDateString("en-US", { weekday: "short" }),
            dateLabel: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        }));
        return { maxSeconds: niceMax || 3600, days: daysShort, tickValues: ticks };
    }, [data]);
    if (!data.length) return null;

    const padX = 48, padTop = 16, padBottom = 48;
    const chartW = Math.max(data.length * 64 + padX + 16, 320);
    const chartH = 200;
    const innerW = chartW - padX - 16;
    const innerH = chartH - padTop - padBottom;
    const barW = Math.min(innerW / data.length - 12, 44);

    return (
        <svg viewBox={`0 0 ${chartW} ${chartH}`} width={chartW} height={chartH} className="mx-auto" role="img">
            {tickValues.map((tick) => {
                const y = padTop + innerH - (tick.seconds / maxSeconds) * innerH;
                return (
                    <g key={tick.seconds}>
                        <line x1={padX} x2={chartW - 12} y1={y} y2={y} stroke={colors.grid} strokeWidth={0.5} strokeDasharray="3 3" />
                        <text x={padX - 6} y={y + 4} textAnchor="end" fontSize={11} fill={colors.text} fontFamily="system-ui, sans-serif">{tick.label}</text>
                    </g>
                );
            })}
            {days.map((day, i) => {
                const x = padX + i * (innerW / days.length) + (innerW / days.length - barW) / 2;
                const h = maxSeconds > 0 ? (day.grand_total.total_seconds / maxSeconds) * innerH : 0;
                const y = padTop + innerH - h;
                const barH = Math.max(h, 0);
                return (
                    <g key={day.date}>
                        <title>{`${day.dateLabel}: ${day.grand_total.text}`}</title>
                        <rect x={x} y={padTop} width={barW} height={innerH} rx={4} fill={colors.barBg} />
                        <rect x={x} y={y} width={barW} height={barH} rx={4} fill={colors.bar} />
                        <text x={x + barW / 2} y={chartH - 24} textAnchor="middle" fontSize={12} fontWeight={600} fill={colors.text} fontFamily="system-ui, sans-serif">{day.dayLabel}</text>
                        <text x={x + barW / 2} y={chartH - 10} textAnchor="middle" fontSize={10} fill={colors.textDim} fontFamily="system-ui, sans-serif">{day.dateLabel}</text>
                        {barH > 20 && <text x={x + barW / 2} y={y - 6} textAnchor="middle" fontSize={10} fontWeight={600} fill={colors.accent} fontFamily="system-ui, sans-serif">{day.grand_total.digital}</text>}
                    </g>
                );
            })}
            <line x1={padX} x2={chartW - 12} y1={padTop + innerH} y2={padTop + innerH} stroke={colors.grid} strokeWidth={1} />
        </svg>
    );
}

/* ───────────────────────────────────────────────
   Category (Languages / Editors / OS)
   ─────────────────────────────────────────────── */

function CategoryChart({ data, label, colors }: { data: DailyData[]; label: string; colors: ReturnType<typeof makeColors> }) {
    const top5 = useMemo(() => data.slice(0, 5), [data]);
    const others = useMemo(() => data.slice(5), [data]);
    const othersTotal = useMemo(() => others.reduce((s, d) => s + d.grand_total.total_seconds, 0), [others]);
    const othersPercent = useMemo(() => others.reduce((s, d) => s + (d.percent ?? 0), 0), [others]);
    const items = useMemo(() => {
        const list = [...top5];
        if (others.length > 0) {
            list.push({
                date: "Others",
                text: "",
                percent: othersPercent,
                grand_total: {
                    hours: Math.floor(othersTotal / 3600),
                    minutes: Math.floor((othersTotal % 3600) / 60),
                    total_seconds: othersTotal,
                    digital: othersTotal > 0 ? `${Math.floor(othersTotal / 3600)}:${String(Math.floor((othersTotal % 3600) / 60)).padStart(2, "0")}` : "0:00",
                    decimal: 0,
                    text: "",
                },
            });
        }
        return list;
    }, [top5, others, othersTotal, othersPercent]);
    const maxPercent = useMemo(() => Math.max(...items.map((d) => d.percent ?? 0), 1), [items]);

    const labelW = 72, padRight = 60, rowH = 28, gap = 4, topPad = 8;
    const chartW = 400;
    const chartH = topPad + items.length * (rowH + gap) + 4;
    const barAreaW = chartW - labelW - padRight;
    const barH = rowH - 4;

    return (
        <svg viewBox={`0 0 ${chartW} ${chartH}`} width={chartW} height={chartH} className="mx-auto" role="img">
            {items.map((item, i) => {
                const y = topPad + i * (rowH + gap);
                const pct = item.percent ?? 0;
                const barW = (pct / maxPercent) * barAreaW;
                const barWClamped = Math.max(barW, pct > 0 ? 2 : 0);
                return (
                    <g key={item.date}>
                        <text x={labelW - 6} y={y + rowH / 2 + 5} textAnchor="end" fontSize={12} fontWeight={500} fill={colors.text} fontFamily="system-ui, sans-serif">
                            {item.date.length > 10 ? item.date.slice(0, 10) + "…" : item.date}
                        </text>
                        <rect x={labelW} y={y + 2} width={barAreaW} height={barH} rx={4} fill={colors.barBg} />
                        {barWClamped > 0 && (
                            <rect x={labelW} y={y + 2} width={barWClamped} height={barH} rx={4} fill={colors.bar} />
                        )}
                        <text x={labelW + (barWClamped > 0 ? barWClamped + 8 : 4)} y={y + rowH / 2 + 5} fontSize={11} fill={colors.textDim} fontFamily="system-ui, sans-serif">
                            {Math.round(pct)}%
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

/* ───────────────────────────────────────────────
   Heatmap (Activity Table)
   ─────────────────────────────────────────────── */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

function getHeatLevel(total: number): number {
    if (total <= 0) return 0;
    if (total < 900) return 1;    // <15 min
    if (total < 3600) return 2;   // <1 hr
    if (total < 7200) return 3;   // <2 hr
    return 4;
}

function HeatmapChart({ data, colors }: { data: ActivityDay[]; colors: ReturnType<typeof makeColors> }) {
    const { weeks, monthLabels } = useMemo(() => {
        if (!data.length) return { weeks: [], monthLabels: [] as { label: string; x: number }[] };

        // Sort by date, pad to full weeks starting from the earliest day
        const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));
        const first = new Date(sorted[0].date);
        // Adjust to start on Sunday
        const startDay = first.getDay();
        const paddedStart = new Date(first);
        paddedStart.setDate(paddedStart.getDate() - startDay);

        // Build weeks: each week is 7 days (Sun–Sat)
        const weeks: ActivityDay[][] = [];
        const monthMap: { label: string; weekIdx: number }[] = [];
        let cursor = new Date(paddedStart);
        let weekIdx = 0;

        while (cursor <= new Date(sorted[sorted.length - 1].date) || weeks.length === 0 || weeks[weeks.length - 1].length < 7) {
            const dateStr = cursor.toISOString().slice(0, 10);
            const found = sorted.find((d) => d.date === dateStr);
            if (!weeks[weekIdx]) weeks[weekIdx] = [];
            weeks[weekIdx].push(found ?? { date: dateStr, total: 0, categories: [] });

            // Track month labels (first occurrence of each month)
            const month = MONTHS[cursor.getMonth()];
            if (!monthMap.find((m) => m.label === month)) {
                monthMap.push({ label: month, weekIdx });
            }

            cursor.setDate(cursor.getDate() + 1);
            if (cursor.getDay() === 0) weekIdx++;
        }

        // Compute x positions for month labels
        const cellSize = 12, cellGap = 3, cellStep = cellSize + cellGap;
        const monthLabelsPos = monthMap.map((m) => ({ label: m.label, x: m.weekIdx * cellStep }));

        return { weeks, monthLabels: monthLabelsPos };
    }, [data]);

    if (!weeks.length) return null;

    const cellSize = 12, cellGap = 3, cellStep = cellSize + cellGap;
    const topPad = 20, leftPad = 32;
    const chartW = leftPad + weeks.length * cellStep + 12;
    const chartH = topPad + 7 * cellStep + 8;

    const heatGreen = colors.heatGreen;

    return (
        <svg viewBox={`0 0 ${chartW} ${chartH}`} width={chartW} height={chartH} className="mx-auto" role="img">
            {/* Month labels */}
            {monthLabels.map((m, i) => (
                <text key={i} x={leftPad + m.x} y={topPad - 6} fontSize={10} fill={colors.textDim} fontFamily="system-ui, sans-serif">
                    {m.label}
                </text>
            ))}

            {/* Day labels */}
            {DAYS.map((label, i) =>
                label ? (
                    <text key={i} x={leftPad - 6} y={topPad + i * cellStep + cellSize - 2} textAnchor="end" fontSize={9} fill={colors.textDim} fontFamily="system-ui, sans-serif">
                        {label}
                    </text>
                ) : null,
            )}

            {/* Cells */}
            {weeks.map((week, wi) =>
                week.map((day, di) => {
                    const level = getHeatLevel(day.total);
                    const x = leftPad + wi * cellStep;
                    const y = topPad + di * cellStep;
                    return (
                        <rect
                            key={`${wi}-${di}`}
                            x={x}
                            y={y}
                            width={cellSize}
                            height={cellSize}
                            rx={2}
                            fill={heatGreen[level]}
                        >
                            <title>{`${day.date}: ${Math.round(day.total / 60)} min`}</title>
                        </rect>
                    );
                }),
            )}
        </svg>
    );
}

/* ───────────────────────────────────────────────
   Helpers
   ─────────────────────────────────────────────── */

function makeColors(isDark: boolean) {
    return {
        bar: isDark ? "#22c55e" : "#16a34a",
        barBg: isDark ? "#27272a" : "#e4e4e7",
        text: isDark ? "#a1a1aa" : "#71717a",
        textDim: isDark ? "#52525b" : "#a1a1aa",
        grid: isDark ? "#3f3f46" : "#d4d4d8",
        accent: isDark ? "#22c55e" : "#16a34a",
        heatGreen: isDark
            ? ["#27272a", "#0e4429", "#006d32", "#26a641", "#39d353"]
            : ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    };
}

/* ───────────────────────────────────────────────
   Main
   ─────────────────────────────────────────────── */

export default function WakaTimeChart({ data, label, kind }: WakaTimeChartProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const colors = useMemo(() => makeColors(isDark), [isDark]);

    if (!data.length) return null;

    return (
        <div className="w-full overflow-x-auto pb-1">
            {kind === "time-series" && <TimeSeriesChart data={data as DailyData[]} colors={colors} />}
            {kind === "category" && <CategoryChart data={data as DailyData[]} label={label} colors={colors} />}
            {kind === "heatmap" && <HeatmapChart data={data as ActivityDay[]} colors={colors} />}
        </div>
    );
}
