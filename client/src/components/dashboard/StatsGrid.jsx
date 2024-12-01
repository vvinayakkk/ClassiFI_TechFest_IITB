import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import * as LucideIcons from 'lucide-react';
import { STATS_CARDS } from '@/constants/dashboardData';

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {STATS_CARDS.map((card, index) => {
        const Icon = LucideIcons[card.icon];
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs ${
                  card.change.type === "increase" ? "text-green-500" : 
                  card.change.type === "decrease" ? "text-red-500" : 
                  "text-blue-500"
                }`}>
                  {card.change.type === "increase" ? "↑" : 
                   card.change.type === "decrease" ? "↓" : ""} 
                  {card.change.value}
                </span>
                <span className="text-xs text-gray-500">
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