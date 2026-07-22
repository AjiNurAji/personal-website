"use client";

import { useTheme } from "@/hooks/use-theme";
import { useMemo } from "react";

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
}

interface WakaTimeChartProps {
    data: DailyData[];
    label: string;
}

export default function WakaTimeChart({ data, label }: WakaTimeChartProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { maxSeconds, days, tickValues } = useMemo(() => {
        const max = Math.max(...data.map((d) => d.grand_total.total_seconds), 1);
        // Round up to nearest nice number
        const niceMax = Math.ceil(max / 3600) * 3600;
        const numTicks = 4;
        const step = Math.ceil(niceMax / numTicks / 900) * 900; // round to 15min steps

        const ticks: { seconds: number; label: string }[] = [];
        for (let s = 0; s <= niceMax; s += step) {
            const h = Math.floor(s / 3600);
            const m = Math.floor((s % 3600) / 60);
            ticks.push({
                seconds: s,
                label: h > 0 ? `${h}h ${m}m` : `${m}m`,
            });
        }

        // Short day labels (e.g. "Mon", "Tue")
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

    const colors = {
        bg: isDark ? "#18181b" : "#fafafa",
        bar: isDark ? "#22c55e" : "#16a34a",
        barHover: isDark ? "#4ade80" : "#22c55e",
        barBg: isDark ? "#27272a" : "#e4e4e7",
        text: isDark ? "#a1a1aa" : "#71717a",
        textDim: isDark ? "#52525b" : "#a1a1aa",
        grid: isDark ? "#3f3f46" : "#d4d4d8",
        accent: isDark ? "#22c55e" : "#16a34a",
    };

    return (
        <div className="w-full overflow-x-auto pb-1">
            <svg
                viewBox={`0 0 ${chartW} ${chartH}`}
                width={chartW}
                height={chartH}
                className="mx-auto"
                role="img"
                aria-label={`WakaTime chart: ${label}`}
            >
                {/* Grid lines */}
                {tickValues.map((tick) => {
                    const y = padTop + innerH - (tick.seconds / maxSeconds) * innerH;
                    return (
                        <g key={tick.seconds}>
                            <line
                                x1={padX}
                                x2={chartW - 12}
                                y1={y}
                                y2={y}
                                stroke={colors.grid}
                                strokeWidth={0.5}
                                strokeDasharray="3 3"
                            />
                            <text
                                x={padX - 6}
                                y={y + 4}
                                textAnchor="end"
                                fontSize={11}
                                fill={colors.text}
                                fontFamily="system-ui, sans-serif"
                            >
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
                            {/* Tooltip on hover */}
                            <title>
                                {`${day.dateLabel}: ${day.grand_total.text}`}
                            </title>

                            {/* Background bar */}
                            <rect
                                x={x}
                                y={padTop}
                                width={barW}
                                height={innerH}
                                rx={4}
                                fill={colors.barBg}
                            />

                            {/* Active bar */}
                            <rect
                                x={x}
                                y={y}
                                width={barW}
                                height={barH}
                                rx={4}
                                fill={colors.bar}
                                className="transition-all duration-200"
                            />

                            {/* Day label — weekday */}
                            <text
                                x={x + barW / 2}
                                y={chartH - 24}
                                textAnchor="middle"
                                fontSize={12}
                                fontWeight={600}
                                fill={colors.text}
                                fontFamily="system-ui, sans-serif"
                            >
                                {day.dayLabel}
                            </text>

                            {/* Day label — date number */}
                            <text
                                x={x + barW / 2}
                                y={chartH - 10}
                                textAnchor="middle"
                                fontSize={10}
                                fill={colors.textDim}
                                fontFamily="system-ui, sans-serif"
                            >
                                {day.dateLabel}
                            </text>

                            {/* Time label above bar */}
                            {barH > 20 && (
                                <text
                                    x={x + barW / 2}
                                    y={y - 6}
                                    textAnchor="middle"
                                    fontSize={10}
                                    fontWeight={600}
                                    fill={colors.accent}
                                    fontFamily="system-ui, sans-serif"
                                >
                                    {day.grand_total.digital}
                                </text>
                            )}
                        </g>
                    );
                })}

                {/* Bottom axis line */}
                <line
                    x1={padX}
                    x2={chartW - 12}
                    y1={padTop + innerH}
                    y2={padTop + innerH}
                    stroke={colors.grid}
                    strokeWidth={1}
                />
            </svg>
        </div>
    );
}
