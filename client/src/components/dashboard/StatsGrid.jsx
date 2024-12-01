import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import * as LucideIcons from 'lucide-react';
import { STATS_CARDS } from '@/constants/dashboardData';

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {STATS_CARDS.map((card, index) => {
        const Icon = LucideIcons[card.icon];
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate pr-2">{card.title}</CardTitle>
              <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${card.color} flex-shrink-0`} />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{card.value}</div>
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                <span className={`text-[10px] sm:text-xs ${
                  card.change.type === "increase" ? "text-green-500" : 
                  card.change.type === "decrease" ? "text-red-500" : 
                  "text-blue-500"
                } whitespace-nowrap`}>
                  {card.change.type === "increase" ? "↑" : 
                   card.change.type === "decrease" ? "↓" : ""} 
                  {card.change.value}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">
                  {card.change.type === "new" ? "new categories" : "from last month"}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsGrid;