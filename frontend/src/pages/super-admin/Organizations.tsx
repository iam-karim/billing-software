import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { superAdminService } from '@/services/superAdminService';
import OrganizationTable from '@/components/super-admin/OrganizationTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function SuperAdminOrganizations() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['super-admin-organizations', page, search],
    queryFn: () => superAdminService.getAllOrganizations({ page, search }),
  });

  const suspendMutation = useMutation({
    mutationFn: (id: string) => superAdminService.suspendOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['super-admin-organizations'] });
      toast.success('Organization suspended successfully');
    },
    onError: () => {
      toast.error('Failed to suspend organization');
    },
  });

  const activateMutation = useMutation({
    mutationFn: (id: string) => superAdminService.activateOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['super-admin-organizations'] });
      toast.success('Organization activated successfully');
    },
    onError: () => {
      toast.error('Failed to activate organization');
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Organizations</h2>
          <p className="text-muted-foreground">Manage all organizations and their subscriptions</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Organizations
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search organizations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Organizations Table */}
      {isLoading ? (
        <Skeleton className="h-[600px]" />
      ) : data?.organizations ? (
        <OrganizationTable
          organizations={data.organizations}
          onEdit={(id) => toast.info('Edit feature coming soon')}
          onSuspend={(id) => suspendMutation.mutate(id)}
          onActivate={(id) => activateMutation.mutate(id)}
        />
      ) : null}
    </div>
  );
}
