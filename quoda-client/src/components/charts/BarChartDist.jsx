import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BarChartDist = ({ data }) => {
  if (!data || data.length === 0) return <div className="flex items-center justify-center h-full text-gray-400">Sem dados</div>;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
        <Tooltip
          cursor={{ fill: '#f3f4f6' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        />
        <Bar dataKey="empresas" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} animationDuration={1000} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartDist;