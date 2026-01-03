import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Dashboard({ metrics }) {
  const data = [
    { name: 'Practiced', value: Math.round(metrics.accPracticed), fill: '#6366f1' },
    { name: 'Unseen', value: Math.round(metrics.accUnseen), fill: '#10b981' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-center">
        <span className="text-slate-500 text-sm font-medium">Overfit Score (Gap)</span>
        <h2 className="text-5xl font-black mt-2" style={{ color: metrics.color }}>{Math.round(metrics.gap)}%</h2>
        <div className="mt-4 px-3 py-1 rounded-full text-xs font-bold inline-block w-fit" style={{ backgroundColor: `${metrics.color}20`, color: metrics.color }}>
          {metrics.status}
        </div>
      </div>

      <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-64">
        <h3 className="text-slate-800 font-bold mb-4">Accuracy Comparison</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis dataKey="name" type="category" tick={{fontSize: 12, fontWeight: 600}} />
            <Tooltip cursor={{fill: 'transparent'}} />
            <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={35}>
              {data.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}