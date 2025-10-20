import { SystemLog } from '@/types/superAdmin';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils';

interface LogsTableProps {
  logs: SystemLog[];
}

const getActionBadgeVariant = (action: string): 'default' | 'secondary' | 'destructive' => {
  if (action.includes('delete') || action.includes('suspend')) return 'destructive';
  if (action.includes('create') || action.includes('activate')) return 'default';
  return 'secondary';
};

export default function LogsTable({ logs }: LogsTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>User</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-mono text-sm">
                {formatDate(log.createdAt, 'MMM dd, yyyy HH:mm:ss')}
              </TableCell>
              <TableCell>
                <Badge variant={getActionBadgeVariant(log.action)}>
                  {log.action}
                </Badge>
              </TableCell>
              <TableCell>{log.userName || 'System'}</TableCell>
              <TableCell className="font-mono text-sm">
                {log.ipAddress || '-'}
              </TableCell>
              <TableCell className="max-w-xs truncate">
                {log.metadata ? JSON.stringify(log.metadata) : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
