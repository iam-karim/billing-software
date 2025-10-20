import { useQuery } from '@tanstack/react-query';
import { superAdminService } from '@/services/superAdminService';
import AnalyticsCharts from '@/components/super-admin/AnalyticsCharts';
import StatsCard from '@/components/super-admin/StatsCard';
import { TrendingUp, Users, DollarSign, FileText } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils/formatters';
import { Skeleton } from '@/components/ui/skeleton';

export default function SuperAdminAnalytics() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['super-admin-stats'],
    queryFn: () => superAdminService.getSystemStats(),
  });

  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ['super-admin-revenue'],
    queryFn: () => superAdminService.getRevenueChart('12m'),
  });

  const { data: planDistribution, isLoading: planLoading } = useQuery({
    queryKey: ['super-admin-plans-distribution'],
    queryFn: () => superAdminService.getPlanDistribution(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Analytics</h2>
        <p className="text-muted-foreground">Detailed system analytics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </>
        ) : stats ? (
          <>
            <StatsCard
              title="Total Revenue"
              value={formatCurrency(stats.monthlyRevenue * 12)}
              icon={DollarSign}
              variant="success"
            />
            <StatsCard
              title="Monthly Active Users"
              value={formatNumber(stats.activeUsers)}
              icon={Users}
              variant="default"
            />
            <StatsCard
              title="Total Invoices"
              value={formatNumber(stats.totalInvoices)}
              icon={FileText}
              variant="default"
            />
            <StatsCard
              title="Growth Rate"
              value="23%"
              icon={TrendingUp}
              variant="success"
            />
          </>
        ) : null}
      </div>

      {/* Charts */}
      {revenueLoading || planLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[400px] col-span-2" />
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
      ) : revenueData && planDistribution ? (
        <AnalyticsCharts
          revenueData={revenueData}
          planDistribution={planDistribution}
        />
      ) : null}
    </div>
  );
}
