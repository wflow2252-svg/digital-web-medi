'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function OnboardingWizard({ user, onComplete }) {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);

    const steps = [
        { msg: `البدء في بناء النظام البيئي لـ ${user.name}...`, delay: 1000 },
        { msg: `تجهيز البريد الإلكتروني ${user.email} للربط السحابي...`, delay: 1200 },
        { msg: `إنشاء حساب Shopify Partner تلقائياً...`, delay: 2000 },
        { msg: `استخراج API Keys من AliExpress للتزامن اللحظي...`, delay: 1500 },
        { msg: `تجهيز بيئة عمل CJ Dropshipping والربط بـ Shopify...`, delay: 1800 },
        { msg: `إنشاء متجر تطوير (Development Store) باسم "${user.name}'s Boutique"...`, delay: 2500 },
        { msg: `تم إعداد كل شيء بنجاح! متجرك وأدواتك جاهزة الآن.`, delay: 1000 }
    ];

    useEffect(() => {
        let currentStep = 0;
        let cumulativeDelay = 0;

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass w-full max-w-2xl p-10 md:p-16 rounded-3xl text-center border border-primary/20"
            >
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 mx-auto mb-8 flex items-center justify-center"
                >
                    <Cpu className="text-primary" size={60} />
                </motion.div>

                <h2 className="text-3xl font-bold mb-4">جاري ربط إمبراطوريتك الرقمية...</h2>
                <p className="text-text-muted mb-8">يقوم الذكاء الاصطناعي الآن بإنشاء حساباتك وضبط الإعدادات التقنية في الخلفية.</p>

                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-8 border border-white/5">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-primary shadow-[0_0_15px_var(--primary)]"
                    />
                </div>

                <div className="bg-black/30 rounded-2xl p-6 h-48 overflow-y-auto text-right font-mono text-xs flex flex-col gap-2">
                    {logs.map((log, idx) => (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={idx} 
                            className="flex items-start gap-2"
                        >
                            <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                            <span>{log}</span>
                        </motion.div>
                    ))}
                    <div className="animate-pulse">_</div>
                </div>
            </motion.div>
        </div>
    );
}
