import { Organization } from '@/types/superAdmin';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Ban, CheckCircle } from 'lucide-react';
import { formatDate, formatCurrency, getStatusBadgeVariant } from '@/lib/utils/formatters';

interface OrganizationTableProps {
  organizations: Organization[];
  onEdit: (id: string) => void;
  onSuspend: (id: string) => void;
  onActivate: (id: string) => void;
}

export default function OrganizationTable({ 
  organizations, 
  onEdit, 
  onSuspend, 
  onActivate 
}: OrganizationTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Users</TableHead>
            <TableHead>Invoices</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.map((org) => (
            <TableRow key={org.id}>
              <TableCell className="font-medium">{org.name}</TableCell>
              <TableCell>{org.planName}</TableCell>
              <TableCell>{org.userCount}</TableCell>
              <TableCell>{org.invoiceCount}</TableCell>
              <TableCell>{formatCurrency(org.totalRevenue)}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(org.status)}>
                  {org.status}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(org.createdAt)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(org.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Details
                    </DropdownMenuItem>
                    {org.status === 'active' ? (
                      <DropdownMenuItem onClick={() => onSuspend(org.id)}>
                        <Ban className="mr-2 h-4 w-4" />
                        Suspend
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onActivate(org.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Activate
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
