'use client';

import GoogleSignIn from '@/components/GoogleSignIn';
import { Sparkles, ArrowRight, Zap, Target, ShieldCheck } from 'lucide-react';

export default function Home() {
    const GOOGLE_CLIENT_ID = "949180865508-md5ums00hoj22qgpmkd6hca2o06722lj.apps.googleusercontent.com";

    return (
        <div className="w-full">
            {/* Navbar */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, padding: '24px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 50
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '40px', height: '40px', background: '#00f2ff',
                        borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Zap style={{ color: '#000', fill: '#000' }} size={24} />
                    </div>
                    <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.05em' }}>
                        DropGenius <span style={{ color: '#00f2ff', fontStyle: 'italic' }}>AI</span>
                    </span>
                </div>
                <div style={{ display: 'none', gap: '32px', fontSize: '14px', fontWeight: 500, color: '#a0a0a0' }}
                    className="nav-links">
                    <a href="#features" style={{ color: '#a0a0a0', textDecoration: 'none', transition: 'color 0.2s' }}>المميزات</a>
                    <a href="#" style={{ color: '#a0a0a0', textDecoration: 'none', transition: 'color 0.2s' }}>الأسعار</a>
                    <a href="#" style={{ color: '#a0a0a0', textDecoration: 'none', transition: 'color 0.2s' }}>المجتمع</a>
                </div>
            </nav>

            {/* Hero Section */}
            <div style={{
                maxWidth: '1152px', width: '100%', textAlign: 'center',
                padding: '80px 24px', marginTop: '80px', animation: 'fadeInUp 0.8s ease'
            }}>
                <div className="glass" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '8px 16px', borderRadius: '9999px',
                    border: '1px solid rgba(0, 242, 255, 0.2)', color: '#00f2ff',
                    fontSize: '12px', fontWeight: 700, marginBottom: '32px'
                }}>
                    <Sparkles size={14} />
                    <span>ثورة الدروب شيبنج القائمة على الذكاء الاصطناعي</span>
                </div>

                <h1 style={{
                    fontSize: 'clamp(42px, 7vw, 72px)', fontWeight: 800,
                    marginBottom: '24px', lineHeight: 1.15
                }}>
                    ابنِ إمبراطوريتك <br />
                    <span className="gradient-text">بضغطة زر واحدة</span>
                </h1>

                <p style={{
                    color: '#a0a0a0', fontSize: 'clamp(16px, 2vw, 20px)',
                    maxWidth: '672px', margin: '0 auto 40px', lineHeight: 1.7
                }}>
                    أتمتة كاملة لاختيار المنتجات، إنشاء المتاجر، والربط بالموردين. نحن لا نساعدك فقط، بل نبني لك مستقبلك.
                </p>

                <GoogleSignIn clientId={GOOGLE_CLIENT_ID} />

                <p style={{ marginTop: '24px', fontSize: '14px', color: '#a0a0a0', opacity: 0.5 }}>
                    سجل دخولك الآن للبدء في رحلة الـ 10,000$ شهرياً
                </p>
            </div>

            {/* Features Preview */}
            <div id="features" style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px', maxWidth: '1152px', width: '100%', marginTop: '80px', padding: '0 24px'
            }}>
                <FeatureCard
                    icon={<Target style={{ color: '#00f2ff' }} />}
                    title="سحب ذكي"
                    desc="نظام DropLens المتطور لسحب أفضل المنتجات مبيعاً"
                />
                <FeatureCard
                    icon={<ShieldCheck style={{ color: '#00f2ff' }} />}
                    title="ربط آمن"
                    desc="اتصال مباشر بـ Shopify و AliExpress بمعايير عالمية"
                />
                <FeatureCard
                    icon={<Zap style={{ color: '#00f2ff' }} />}
                    title="أتمتة 100%"
                    desc="الذكاء الاصطناعي يدير الطلبات ويقوم بالتحديثات تلقائياً"
                />
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="glass" style={{
            padding: '32px', borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.05)',
            transition: 'border-color 0.3s, transform 0.3s'
        }}>
            <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', marginBottom: '24px'
            }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>{title}</h3>
            <p style={{ fontSize: '14px', color: '#a0a0a0', lineHeight: 1.6 }}>{desc}</p>
        </div>
    );
}
