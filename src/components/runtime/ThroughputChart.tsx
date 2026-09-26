import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ThroughputPoint } from '../../types/platform';

interface ThroughputChartProps {
  data: ThroughputPoint[];
}

export function ThroughputChart({ data }: ThroughputChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="#E4EAF0" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#8491A1' }} dy={8} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#8491A1' }} width={48} />
          <Tooltip
            cursor={{ stroke: '#9FD7D2', strokeWidth: 1 }}
            contentStyle={{ borderRadius: 10, border: '1px solid #E4EAF0', fontSize: 12, boxShadow: '0 8px 24px -8px rgba(6,26,69,0.2)' }}
            formatter={(v) => [`${v} studies`, 'Ingested']} />
          
          <Area type="monotone" dataKey="studies" stroke="#0B7672" strokeWidth={2} fill="#0E8A86" fillOpacity={0.1} animationDuration={300} />
        </AreaChart>
      </ResponsiveContainer>
    </div>);

}