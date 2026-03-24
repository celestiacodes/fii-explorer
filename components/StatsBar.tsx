import { Users, Filter, Target, BarChart3 } from 'lucide-react';

interface StatsBarProps {
  totalAttendees: number;
  filteredCount: number;
  topTargetsCount: number;
}

export default function StatsBar({ totalAttendees, filteredCount, topTargetsCount }: StatsBarProps) {
  const percentage = totalAttendees > 0 ? Math.round((filteredCount / totalAttendees) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total Attendees */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">Total Attendees</p>
            <p className="text-2xl font-bold text-white">{totalAttendees.toLocaleString()}</p>
          </div>
          <div className="p-2 bg-blue-900/30 rounded-lg">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Filtered Count */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">Currently Showing</p>
            <p className="text-2xl font-bold text-white">{filteredCount.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">{percentage}% of total</p>
          </div>
          <div className="p-2 bg-purple-900/30 rounded-lg">
            <Filter className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Top Targets */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">Top Targets</p>
            <p className="text-2xl font-bold text-yellow-400">{topTargetsCount.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">
              {totalAttendees > 0 ? Math.round((topTargetsCount / totalAttendees) * 100) : 0}% of attendees
            </p>
          </div>
          <div className="p-2 bg-yellow-900/30 rounded-lg">
            <Target className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">Coverage</p>
            <p className="text-2xl font-bold text-white">
              {totalAttendees > 0 ? Math.round((topTargetsCount / 50) * 100) : 0}%
            </p>
            <p className="text-xs text-gray-500 mt-1">of top 50 target list</p>
          </div>
          <div className="p-2 bg-emerald-900/30 rounded-lg">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </div>
    </div>
  );
}