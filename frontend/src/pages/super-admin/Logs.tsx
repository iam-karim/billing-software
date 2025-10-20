import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { superAdminService } from '@/services/superAdminService';
import LogsTable from '@/components/super-admin/LogsTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SuperAdminLogs() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['super-admin-logs', page, search],
    queryFn: () => superAdminService.getSystemLogs({ page }),
    refetchInterval: 10000, // Auto-refresh every 10 seconds
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">System Logs</h2>
          <p className="text-muted-foreground">Monitor system activity and user actions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Logs Table */}
      {isLoading ? (
        <Skeleton className="h-[600px]" />
      ) : data?.logs ? (
        <LogsTable logs={data.logs} />
      ) : null}
    </div>
  );
}
