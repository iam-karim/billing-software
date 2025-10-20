import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLocale } from '@/contexts/LocaleContext';
import { paymentService } from '@/services/paymentService';
import { SubscriptionPlan } from '@/types/superAdmin';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface PlanPurchaseDialogProps {
  plan: SubscriptionPlan | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function PlanPurchaseDialog({
  plan,
  open,
  onOpenChange,
  onSuccess,
}: PlanPurchaseDialogProps) {
  const { currency, formatCurrency, calculateTotal, taxConfig } = useLocale();
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const purchaseMutation = useMutation({
    mutationFn: async () => {
      if (!plan) throw new Error('No plan selected');
      
      setPaymentProcessing(true);
      
      // Create payment intent
      const paymentIntent = await paymentService.createPaymentIntent({
        planId: plan.id,
        currency,
        amount: plan.price,
        billingPeriod: plan.billingPeriod,
        paymentGateway: 'stripe', // This will be dynamic based on region
      });

      // In production, this would redirect to payment gateway
      // For now, simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return paymentIntent;
    },
    onSuccess: () => {
      toast.success('Payment successful! Your plan has been activated.');
      setPaymentProcessing(false);
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Payment failed. Please try again.');
      setPaymentProcessing(false);
    },
  });

  if (!plan) return null;

  const subtotal = plan.price;
  const taxAmount = (subtotal * taxConfig.rate) / 100;
  const total = subtotal + taxAmount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Purchase {plan.name} Plan</DialogTitle>
          <DialogDescription>
            Complete your purchase to upgrade your account
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Plan Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{plan.name}</span>
                <Badge>{plan.billingPeriod}</Badge>
              </CardTitle>
              <CardDescription>
                {plan.features.length} features included
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Price Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Price Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{taxConfig.name} ({taxConfig.rate}%)</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Billed {plan.billingPeriod}. Cancel anytime.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => purchaseMutation.mutate()}
                disabled={paymentProcessing}
              >
                {paymentProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay {formatCurrency(total)}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <p className="text-xs text-center text-muted-foreground">
            Secure payment powered by Stripe, Razorpay, and other trusted payment providers
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
