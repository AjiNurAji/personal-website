"use client";

import { useTheme } from "@/hooks/use-theme";
import { useMemo } from "react";

export interface DailyData {
    /** Day date (Coding Activity) or item name (Languages/Editors) */
    date: string;
    /** Human-readable time text */
    text: string;
    grand_total: {
        hours: number;
        minutes: number;
        total_seconds: number;
        digital: string;
        decimal: number;
        text: string;
    };
    /** Percent (0–100), only present in category charts (Languages/Editors/OS) */
    percent?: number;
}

/** Which chart type to render */
export type ChartKind = "time-series" | "category";

/**
 * Normalize WakaTime JSON response to DailyData[].
 *
 * WakaTime has two response shapes:
 *   1. Coding Activity: { grand_total: { total_seconds, ... }, date: "2025-07-20" }[]
 *   2. Languages / Editors / OS: { total_seconds, name, percent, ... }[]
 *
 * This normalizes both to a common DailyData shape. Caller decides chart kind:
 *   - time-series for Coding Activity (vertical bars with dates)
 *   - category for Languages / Editors / OS (horizontal bars with names + %)
 */
export function normalizeWakaData(raw: any[]): DailyData[] {
    return raw.map((item) => {
        if (item.grand_total) {
            // Coding Activity format — pass through
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

        // Languages / Editors / OS format — wrap flat fields into grand_total
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

interface WakaTimeChartProps {
    data: DailyData[];
    label: string;
    kind: ChartKind;
}

/* ───────────── Time‑Series (Coding Activity) ───────────── */

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

    const padX = 48;
    const padTop = 16;
    const padBottom = 48;
    const chartW = Math.max(data.length * 64 + padX + 16, 320);
    const chartH = 200;
    const innerW = chartW - padX - 16;
    const innerH = chartH - padTop - padBottom;
    const barW = Math.min(innerW / data.length - 12, 44);

    return (
        <svg
            viewBox={`0 0 ${chartW} ${chartH}`}
            width={chartW}
            height={chartH}
            className="mx-auto"
            role="img"
            aria-label={`WakaTime chart: Coding Activity`}
        >
            {/* Grid lines */}
            {tickValues.map((tick) => {
                const y = padTop + innerH - (tick.seconds / maxSeconds) * innerH;
                return (
                    <g key={tick.seconds}>
                        <line
                            x1={padX} x2={chartW - 12} y1={y} y2={y}
                            stroke={colors.grid} strokeWidth={0.5} strokeDasharray="3 3"
                        />
                        <text x={padX - 6} y={y + 4} textAnchor="end" fontSize={11}
                            fill={colors.text} fontFamily="system-ui, sans-serif">
                            {tick.label}
                        </text>
                    </g>
                );
            })}

            {/* Bars */}
            {days.map((day, i) => {
                const x = padX + i * (innerW / days.length) + (innerW / days.length - barW) / 2;
                const h = maxSeconds > 0 ? (day.grand_total.total_seconds / maxSeconds) * innerH : 0;
                const y = padTop + innerH - h;
                const barH = Math.max(h, 0);

                return (
                    <g key={day.date} className="group">
                        <title>{`${day.dateLabel}: ${day.grand_total.text}`}</title>
                        <rect x={x} y={padTop} width={barW} height={innerH} rx={4} fill={colors.barBg} />
                        <rect x={x} y={y} width={barW} height={barH} rx={4} fill={colors.bar} className="transition-all duration-200" />
                        <text x={x + barW / 2} y={chartH - 24} textAnchor="middle" fontSize={12}
                            fontWeight={600} fill={colors.text} fontFamily="system-ui, sans-serif">
                            {day.dayLabel}
                        </text>
                        <text x={x + barW / 2} y={chartH - 10} textAnchor="middle" fontSize={10}
                            fill={colors.textDim} fontFamily="system-ui, sans-serif">
                            {day.dateLabel}
                        </text>
                        {barH > 20 && (
                            <text x={x + barW / 2} y={y - 6} textAnchor="middle" fontSize={10}
                                fontWeight={600} fill={colors.accent} fontFamily="system-ui, sans-serif">
                                {day.grand_total.digital}
                            </text>
                        )}
                    </g>
                );
            })}

            {/* Bottom axis line */}
            <line x1={padX} x2={chartW - 12} y1={padTop + innerH} y2={padTop + innerH}
                stroke={colors.grid} strokeWidth={1} />
        </svg>
    );
}

/* ───────────── Category (Languages / Editors / OS) ───────────── */

function CategoryChart({ data, label, colors }: { data: DailyData[]; label: string; colors: ReturnType<typeof makeColors> }) {
    // Use percent from WakaTime directly (always available for category charts).
    // Fallback to total_seconds ratio if percent is missing.
    const maxPercent = useMemo(() => Math.max(...data.map((d) => d.percent ?? 0), 1), [data]);

    if (!data.length) return null;

    const labelW = 72;
    const padRight = 60;
    const rowH = 32;
    const gap = 6;
    const topPad = 4;
    const chartW = 400;
    const chartH = topPad + data.length * (rowH + gap) + 4;
    const barAreaW = chartW - labelW - padRight;
    const barH = rowH - 4;

    return (
        <svg
            viewBox={`0 0 ${chartW} ${chartH}`}
            width={chartW}
            height={chartH}
            className="mx-auto"
            role="img"
            aria-label={`WakaTime chart: ${label}`}
        >
            {data.map((item, i) => {
                const y = topPad + i * (rowH + gap);
                const pct = item.percent ?? (maxPercent > 0 ? (item.grand_total.total_seconds / data.reduce((s, d) => s + d.grand_total.total_seconds, 0)) * 100 : 0);
                const barW = (pct / maxPercent) * barAreaW;
                const barWClamped = Math.max(barW, pct > 0 ? 4 : 0);

                return (
                    <g key={item.date}>
                        {/* Name label */}
                        <text
                            x={labelW - 6}
                            y={y + rowH / 2 + 4}
                            textAnchor="end"
                            fontSize={11}
                            fontWeight={600}
                            fill={colors.text}
                            fontFamily="system-ui, sans-serif"
                        >
                            {item.date.length > 10 ? item.date.slice(0, 10) + "…" : item.date}
                        </text>

                        {/* Background track */}
                        <rect
                            x={labelW}
                            y={y + 2}
                            width={barAreaW}
                            height={barH}
                            rx={3}
                            fill={colors.barBg}
                        />

                        {/* Active bar */}
                        {barWClamped > 0 && (
                            <rect
                                x={labelW}
                                y={y + 2}
                                width={barWClamped}
                                height={barH}
                                rx={3}
                                fill={colors.bar}
                            />
                        )}

                        {/* Duration + percent text */}
                        <text
                            x={labelW + (barWClamped > 0 ? barWClamped + 8 : 4)}
                            y={y + rowH / 2 + 4}
                            fontSize={10}
                            fill={colors.textDim}
                            fontFamily="system-ui, sans-serif"
                        >
                            {item.grand_total.digital} ({Math.round(pct)}%)
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

/* ───────────── Helpers ───────────── */

function makeColors(isDark: boolean) {
    return {
        bar: isDark ? "#22c55e" : "#16a34a",
        barBg: isDark ? "#27272a" : "#e4e4e7",
        text: isDark ? "#a1a1aa" : "#71717a",
        textDim: isDark ? "#52525b" : "#a1a1aa",
        grid: isDark ? "#3f3f46" : "#d4d4d8",
        accent: isDark ? "#22c55e" : "#16a34a",
    };
}

/* ───────────── Main ───────────── */

export default function WakaTimeChart({ data, label, kind }: WakaTimeChartProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const colors = useMemo(() => makeColors(isDark), [isDark]);

    if (!data.length) return null;

    return (
        <div className="w-full overflow-x-auto pb-1">
            {kind === "time-series" ? (
                <TimeSeriesChart data={data} colors={colors} />
            ) : (
                <CategoryChart data={data} label={label} colors={colors} />
            )}
        </div>
    );
}
