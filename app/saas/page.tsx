'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Rocket, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Shield, 
  Code2, 
  BarChart3, 
  Users2, 
  Cloud,
  Star,
  Play,
  Video,
  Globe,
  Share2
} from 'lucide-react';

const MaterialIcon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined leading-none ${className}`} aria-hidden="true">
    {name}
  </span>
);

export default function SaaSLandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFAF6]">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BB8E2C] to-[#FCCC03] flex items-center justify-center shadow-md">
                <MaterialIcon name="rocket_launch" className="text-[24px] text-white" />
              </div>
              <span className="text-xl font-bold text-[#121110]">FlowSaaS</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-[#62615F] hover:text-[#BB8E2C] font-medium transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-[#62615F] hover:text-[#BB8E2C] font-medium transition-colors">
                Pricing
              </a>
              <a href="#testimonials" className="text-[#62615F] hover:text-[#BB8E2C] font-medium transition-colors">
                Testimonials
              </a>
              <Link
                href="/saas/dashboard"
                className="px-6 py-2 bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] font-bold rounded-xl transition-all shadow-md hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#FCCC03]/20 blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#BB8E2C]/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E8DFD3] rounded-full px-5 py-2 mb-6 shadow-sm">
            <MaterialIcon name="auto_awesome" className="text-[20px] text-[#BB8E2C]" />
            <span className="font-bold text-sm text-[#121110]">Trusted by 10,000+ teams worldwide</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-[#121110] mb-6 leading-tight">
            Build faster with
            <br />
            <span className="bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] bg-clip-text text-transparent">
              modern tools
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#62615F] max-w-3xl mx-auto mb-10 leading-relaxed">
            The all-in-one platform to streamline your workflow, collaborate seamlessly, and ship products faster than ever.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              href="/saas/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] font-bold rounded-2xl transition-all shadow-lg hover:shadow-2xl inline-flex items-center justify-center gap-2"
            >
              <MaterialIcon name="play_arrow" className="text-[24px]" />
              <span>Start Free Trial</span>
            </Link>

            <Link
              href="#demo"
              className="px-8 py-4 bg-white text-[#121110] font-bold rounded-2xl transition-all shadow-md hover:shadow-xl inline-flex items-center justify-center gap-2 border border-[#E8DFD3]"
            >
              <MaterialIcon name="videocam" className="text-[24px]" />
              <span>Watch Demo</span>
            </Link>
          </div>

          
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-[#E8DFD3] p-4">
              <div className="aspect-video bg-gradient-to-br from-[#F6F2E6] to-[#EEEDE4] rounded-2xl flex items-center justify-center">
                <MaterialIcon name="dashboard" className="text-[120px] text-[#BB8E2C]/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-[#F6F2E6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="10K+" label="Active Users" icon="group" />
            <StatCard number="99.9%" label="Uptime" icon="verified" />
            <StatCard number="50M+" label="API Calls" icon="api" />
            <StatCard number="24/7" label="Support" icon="support_agent" />
          </div>
        </div>
      </section>

      
      <section id="features" className="py-20 bg-[#FBFAF6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#121110] mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-[#62615F] max-w-2xl mx-auto">
              Powerful features designed to help your team collaborate and deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="speed"
              title="Lightning Fast"
              description="Built for performance with optimized code and global CDN delivery for instant loading times."
            />
            <FeatureCard
              icon="security"
              title="Enterprise Security"
              description="Bank-level encryption, SOC 2 compliance, and advanced security features to protect your data."
            />
            <FeatureCard
              icon="integration_instructions"
              title="Easy Integration"
              description="Connect with your favorite tools through our extensive API and pre-built integrations."
            />
            <FeatureCard
              icon="analytics"
              title="Advanced Analytics"
              description="Real-time insights and detailed reports to track performance and make data-driven decisions."
            />
            <FeatureCard
              icon="groups"
              title="Team Collaboration"
              description="Work together seamlessly with real-time updates, comments, and shared workspaces."
            />
            <FeatureCard
              icon="cloud_sync"
              title="Auto Sync"
              description="Your data is automatically synced across all devices with instant cloud backup."
            />
          </div>
        </div>
      </section>

      
      <section id="pricing" className="py-20 bg-[#F6F2E6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#121110] mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-[#62615F]">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard
              name="Starter"
              price="$29"
              period="per month"
              features={[
                'Up to 10 team members',
                '100 GB storage',
                'Basic analytics',
                'Email support',
                'API access',
              ]}
              icon="rocket"
            />
            <PricingCard
              name="Professional"
              price="$99"
              period="per month"
              features={[
                'Up to 50 team members',
                '1 TB storage',
                'Advanced analytics',
                'Priority support',
                'Custom integrations',
              ]}
              icon="business_center"
              featured
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              period="contact us"
              features={[
                'Unlimited team members',
                'Unlimited storage',
                'Custom analytics',
                '24/7 phone support',
                'Dedicated account manager',
              ]}
              icon="apartment"
            />
          </div>
        </div>
      </section>

      
      <section id="testimonials" className="py-20 bg-[#FBFAF6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#121110] mb-4">
              Loved by teams everywhere
            </h2>
            <p className="text-xl text-[#62615F]">See what our customers have to say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="FlowSaaS transformed how our team works. We're shipping features 3x faster now."
              author="Sarah Johnson"
              role="CTO at TechCorp"
              rating={5}
            />
            <TestimonialCard
              quote="The best investment we've made. The ROI was clear within the first month."
              author="Michael Chen"
              role="Product Manager at StartupXYZ"
              rating={5}
            />
            <TestimonialCard
              quote="Incredible support team and a product that just works. Highly recommended!"
              author="Emily Rodriguez"
              role="CEO at DesignStudio"
              rating={5}
            />
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#121110] mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-[#121110]/80 mb-10">
            Join thousands of teams already using FlowSaaS to build better products.
          </p>
          <Link
            href="/saas/dashboard"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#121110] text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-2xl hover:bg-black"
          >
            <MaterialIcon name="arrow_forward" className="text-[24px]" />
            <span>Start Your Free Trial</span>
          </Link>
        </div>
      </section>

      
      <footer className="bg-[#F6F2E6] border-t border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BB8E2C] to-[#FCCC03] flex items-center justify-center">
                  <MaterialIcon name="rocket_launch" className="text-[24px] text-white" />
                </div>
                <span className="text-xl font-bold text-[#121110]">FlowSaaS</span>
              </div>
              <p className="text-[#62615F] text-sm">
                The modern platform for building exceptional products.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#121110] mb-4">Product</h3>
              <ul className="space-y-2 text-[#62615F] text-sm">
                <li><a href="#" className="hover:text-[#BB8E2C] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#BB8E2C] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#BB8E2C] transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-[#BB8E2C] transition-colors">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#121110] mb-4">Company</h3>
              <ul className="space-y-2 text-[#62615F] text-sm">
                <li><a href="#" className="hover:text-[#BB8E2C] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#BB8E2C] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#BB8E2C] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#BB8E2C] transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#121110] mb-4">Legal</h3>
              <ul className="space-y-2 text-[#62615F] text-sm">
                <li><a href="#" className="hover:text-[#BB8E2C] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#BB8E2C] transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-[#BB8E2C] transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#E8DFD3] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#62615F] text-sm">
              © 2024 FlowSaaS. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[#62615F] hover:text-[#BB8E2C] transition-colors">
                <MaterialIcon name="language" className="text-[24px]" />
              </a>
              <a href="#" className="text-[#62615F] hover:text-[#BB8E2C] transition-colors">
                <MaterialIcon name="share" className="text-[24px]" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ number, label, icon }: { number: string; label: string; icon: string }) {
  return (
    <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-[#E8DFD3]">
      <div className="w-14 h-14 rounded-2xl bg-[#F6F2E6] border border-[#E8DFD3] mx-auto mb-4 flex items-center justify-center">
        <MaterialIcon name={icon} className="text-[28px] text-[#BB8E2C]" />
      </div>
      <div className="text-4xl font-extrabold text-[#121110] mb-2">{number}</div>
      <div className="text-[#62615F] font-semibold">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-[#E8DFD3] group">
      <div className="w-14 h-14 rounded-2xl bg-[#F6F2E6] border border-[#E8DFD3] flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-[#BB8E2C] group-hover:to-[#FCCC03] transition-all">
        <MaterialIcon name={icon} className="text-[28px] text-[#BB8E2C] group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-xl font-extrabold text-[#121110] mb-3">{title}</h3>
      <p className="text-[#62615F] leading-relaxed">{description}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  period,
  features,
  icon,
  featured = false,
}: {
  name: string;
  price: string;
  period: string;
  features: string[];
  icon: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border ${
        featured ? 'border-[#BB8E2C] ring-2 ring-[#BB8E2C]/20 scale-105' : 'border-[#E8DFD3]'
      }`}
    >
      {featured && (
        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-[#BB8E2C] to-[#FCCC03] text-[#121110] text-xs font-bold px-3 py-1 rounded-full mb-4">
          <MaterialIcon name="star" className="text-[16px]" />
          <span>Most Popular</span>
        </div>
      )}

      <div className="w-14 h-14 rounded-2xl bg-[#F6F2E6] border border-[#E8DFD3] flex items-center justify-center mb-4">
        <MaterialIcon name={icon} className="text-[28px] text-[#BB8E2C]" />
      </div>

      <h3 className="text-2xl font-extrabold text-[#121110] mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-extrabold text-[#121110]">{price}</span>
        <span className="text-[#62615F] ml-2">{period}</span>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-[#62615F]">
            <MaterialIcon name="check_circle" className="text-[20px] text-[#BB8E2C] flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/saas/dashboard"
        className={`block text-center px-6 py-3 rounded-xl font-bold transition-all ${
          featured
            ? 'bg-gradient-to-r from-[#BB8E2C] via-[#D6AE45] to-[#FCCC03] text-[#121110] shadow-md hover:shadow-xl'
            : 'bg-[#F6F2E6] text-[#121110] hover:bg-[#EEEDE4]'
        }`}
      >
        Get Started
      </Link>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  rating,
}: {
  quote: string;
  author: string;
  role: string;
  rating: number;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-[#E8DFD3]">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <MaterialIcon key={i} name="star" className="text-[20px] text-[#FCCC03]" />
        ))}
      </div>
      <p className="text-[#3A3937] leading-relaxed mb-6 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#BB8E2C] to-[#FCCC03] flex items-center justify-center">
          <MaterialIcon name="person" className="text-[24px] text-white" />
        </div>
        <div>
          <div className="font-bold text-[#121110]">{author}</div>
          <div className="text-sm text-[#62615F]">{role}</div>
        </div>
      </div>
    </div>
  );
}
