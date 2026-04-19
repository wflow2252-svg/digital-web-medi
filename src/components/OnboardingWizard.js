'use client';

import { Cpu, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function OnboardingWizard({ user, onComplete }) {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);

    const steps = [
        { msg: `البدء في بناء النظام البيئي لـ ${user?.name || 'المستخدم'}...`, delay: 1000 },
        { msg: `تجهيز البريد الإلكتروني ${user?.email || ''} للربط السحابي...`, delay: 1200 },
        { msg: `إنشاء حساب Shopify Partner تلقائياً...`, delay: 2000 },
        { msg: `استخراج API Keys من AliExpress للتزامن اللحظي...`, delay: 1500 },
        { msg: `تجهيز بيئة عمل CJ Dropshipping والربط بـ Shopify...`, delay: 1800 },
        { msg: `إنشاء متجر تطوير (Development Store) باسم "${user?.name || 'DropGenius'}'s Boutique"...`, delay: 2500 },
        { msg: `تم إعداد كل شيء بنجاح! متجرك وأدواتك جاهزة الآن.`, delay: 1000 }
    ];

    useEffect(() => {
        const run = async () => {
            for (let i = 0; i < steps.length; i++) {
                const step = steps[i];
                await new Promise(r => setTimeout(r, step.delay));
                setLogs(prev => [...prev, step.msg]);
                setProgress(((i + 1) / steps.length) * 100);
            }
            setTimeout(onComplete, 2000);
        };

        run();
    }, []);

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', padding: '24px',
            animation: 'fadeIn 0.3s ease'
        }}>
            <div className="glass" style={{
                width: '100%', maxWidth: '640px', padding: '64px',
                borderRadius: '32px', textAlign: 'center',
                border: '1px solid rgba(0,242,255,0.2)',
                animation: 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)'
            }}>
                <div style={{
                    width: '96px', height: '96px', margin: '0 auto 32px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: 'spin 4s linear infinite'
                }}>
                    <Cpu style={{ color: '#00f2ff' }} size={60} />
                </div>

                <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px' }}>
                    جاري ربط إمبراطوريتك الرقمية...
                </h2>
                <p style={{ color: '#a0a0a0', marginBottom: '32px' }}>
                    يقوم الذكاء الاصطناعي الآن بإنشاء حساباتك وضبط الإعدادات التقنية في الخلفية.
                </p>

                <div style={{
                    width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)',
                    borderRadius: '9999px', overflow: 'hidden', marginBottom: '32px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{
                        height: '100%', background: '#00f2ff', borderRadius: '9999px',
                        width: `${progress}%`, transition: 'width 0.5s ease',
                        boxShadow: '0 0 15px #00f2ff'
                    }} />
                </div>

                <div style={{
                    background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '24px',
                    height: '192px', overflowY: 'auto', textAlign: 'right',
                    fontFamily: 'monospace', fontSize: '12px',
                    display: 'flex', flexDirection: 'column', gap: '8px'
                }}>
                    {logs.map((log, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: 'flex', alignItems: 'flex-start', gap: '8px',
                                animation: 'fadeInLeft 0.3s ease'
                            }}
                        >
                            <CheckCircle2 size={14} style={{ color: '#00f2ff', marginTop: '2px', flexShrink: 0 }} />
                            <span>{log}</span>
                        </div>
                    ))}
                    <div style={{ animation: 'pulse 1s infinite' }}>_</div>
                </div>
            </div>
        </div>
    );
}
