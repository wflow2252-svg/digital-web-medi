'use client';

import { motion } from 'framer-motion';
import GoogleSignIn from '@/components/GoogleSignIn';
import { Sparkles, ArrowRight, Zap, Target, ShieldCheck } from 'lucide-react';

export default function Home() {
    const GOOGLE_CLIENT_ID = "949180865508-md5ums00hoj22qgpmkd6hca2o06722lj.apps.googleusercontent.com";

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Zap className="text-black fill-black" size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tighter">DropGenius <span className="text-primary italic">AI</span></span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-text-muted">
                    <a href="#features" className="hover:text-primary transition-colors">المميزات</a>
                    <a href="#" className="hover:text-primary transition-colors">الأسعار</a>
                    <a href="#" className="hover:text-primary transition-colors">المجتمع</a>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-6xl w-full text-center py-20 relative">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-primary text-xs font-bold mb-8">
                        <Sparkles size={14} />
                        <span>ثورة الدروب شيبنج القائمة على الذكاء الاصطناعي</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                        ابنِ إمبراطوريتك <br/>
                        <span className="gradient-text">بضغطة زر واحدة</span>
                    </h1>

                    <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        أتمتة كاملة لاختيار المنتجات، إنشاء المتاجر، والربط بالموردين. نحن لا نساعدك فقط، بل نبني لك مستقبلك.
                    </p>

                    <GoogleSignIn clientId={GOOGLE_CLIENT_ID} />

                    <p className="mt-6 text-sm text-text-muted opacity-50">
                        سجل دخولك الآن للبدء في رحلة الـ 10,000$ شهرياً
                    </p>
                </motion.div>
            </div>

            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full mt-20">
                <FeatureCard 
                    icon={<Target className="text-primary" />} 
                    title="سحب ذكي" 
                    desc="نظام DropLens المتطور لسحب أفضل المنتجات مبيعاً" 
                />
                <FeatureCard 
                    icon={<ShieldCheck className="text-primary" />} 
                    title="ربط آمن" 
                    desc="اتصال مباشر بـ Shopify و AliExpress بمعايير عالمية" 
                />
                <FeatureCard 
                    icon={<Zap className="text-primary" />} 
                    title="أتمتة 100%" 
                    desc="الذكاء الاصطناعي يدير الطلبات ويقوم بالتحديثات تلقائياً" 
                />
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="glass p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
        </div>
    );
}
