import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { superAdminService } from '@/services/superAdminService';
import StatsCard from '@/components/super-admin/StatsCard';
import AnalyticsCharts from '@/components/super-admin/AnalyticsCharts';
import { Users, Building2, FileText, DollarSign, UserCheck, Clock } from 'lucide-react';
import { formatNumber } from '@/lib/utils/formatters';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function SuperAdminDashboard() {
  const { t } = useTranslation();
  const { formatCurrency } = useLocale();
  
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
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

  if (statsError) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load dashboard data. Please check your backend connection.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">{t('superAdmin.dashboard')}</h2>
        <p className="text-muted-foreground">{t('dashboard.overview')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statsLoading ? (
          <>
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </>
        ) : stats ? (
          <>
            <StatsCard
              title={t('superAdmin.totalUsers')}
              value={formatNumber(stats.totalUsers)}
              icon={Users}
              variant="default"
            />
            <StatsCard
              title={t('superAdmin.totalOrganizations')}
              value={formatNumber(stats.totalOrganizations)}
              icon={Building2}
              variant="success"
            />
            <StatsCard
              title={t('superAdmin.totalInvoices')}
              value={formatNumber(stats.totalInvoices)}
              icon={FileText}
              variant="default"
            />
            <StatsCard
              title={t('superAdmin.monthlyRevenue')}
              value={formatCurrency(stats.monthlyRevenue)}
              icon={DollarSign}
              variant="success"
            />
            <StatsCard
              title={t('superAdmin.activeUsers')}
              value={formatNumber(stats.activeUsers)}
              icon={UserCheck}
              variant="default"
            />
            <StatsCard
              title="Pending Payments"
              value={formatCurrency(stats.pendingPayments)}
              icon={Clock}
              variant="warning"
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
