import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { PublicNavbar } from '@/components/PublicNavbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Users, 
  BarChart3, 
  Globe, 
  Shield, 
  Zap,
  Check
} from 'lucide-react';

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: FileText,
      title: 'Professional Invoices',
      description: 'Create beautiful, GST/VAT-compliant invoices in seconds',
    },
    {
      icon: Users,
      title: 'Client Management',
      description: 'Organize and track all your clients in one place',
    },
    {
      icon: BarChart3,
      title: 'Advanced Reports',
      description: 'Get insights with detailed analytics and reports',
    },
    {
      icon: Globe,
      title: 'Multi-Currency',
      description: 'Support for international clients and currencies',
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Bank-level security with tax compliance built-in',
    },
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'Automate recurring invoices and payment reminders',
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        'Up to 5 invoices/month',
        'Basic client management',
        'Email support',
        'Watermark on invoices',
      ],
    },
    {
      name: 'Starter',
      price: '$10',
      description: 'For freelancers and small businesses',
      features: [
        'Unlimited invoices',
        'Advanced client management',
        'Payment integration',
        'Custom branding',
        'Priority support',
      ],
      popular: true,
    },
    {
      name: 'Business',
      price: '$25',
      description: 'For growing businesses',
      features: [
        'Everything in Starter',
        'Multi-user access',
        'Advanced reports',
        'API access',
        'White-label option',
        '24/7 support',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Smart Billing.<br />Simple Growth.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional invoicing software that helps small businesses get paid faster 
            and manage their finances with confidence.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Button size="lg" variant="outline">View Demo</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything you need to manage invoices
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Simple, transparent pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={plan.popular ? 'border-primary shadow-lg' : ''}
              >
                <CardHeader>
                  {plan.popular && (
                    <div className="text-xs font-semibold text-primary mb-2">
                      MOST POPULAR
                    </div>
                  )}
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== '$0' && <span className="text-muted-foreground">/month</span>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup">
                    <Button 
                      className="w-full mt-6" 
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 InvoicePro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
