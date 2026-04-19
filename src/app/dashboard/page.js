'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    Link as LinkIcon, 
    Store, 
    Package, 
    BarChart3, 
    UserCircle, 
    LogOut,
    Plus,
    Search,
    Zap,
    Target
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import OnboardingWizard from '@/components/OnboardingWizard';

export default function Dashboard() {
    const [view, setView] = useState('overview');
    const [user, setUser] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [showWizard, setShowWizard] = useState(false);
    const [hunterActive, setHunterActive] = useState(false);
    const [products, setProducts] = useState([]);
    const [connectedServices, setConnectedServices] = useState(['Shopify']);
    const [stats, setStats] = useState({
        revenue: 12450.50,
        orders: 432,
        products: 0,
        visitors: 8900
    });
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const savedUser = localStorage.getItem('dropgenius_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            if (!localStorage.getItem('onboarded')) {
                setShowWizard(true);
            }
        } else {
            router.push('/');
        }
    }, [router]);

    if (!mounted || !user) return null;

    const navItems = [
        { id: 'overview', icon: <LayoutDashboard size={20} />, label: 'نظرة عامة' },
        { id: 'integrations', icon: <LinkIcon size={20} />, label: 'الربط والإعدادات' },
        { id: 'store', icon: <Store size={20} />, label: 'متجري' },
        { id: 'products', icon: <Package size={20} />, label: 'المنتجات' },
        { id: 'stats', icon: <BarChart3 size={20} />, label: 'الإحصائيات' },
    ];

    const onWizardComplete = () => {
        setShowWizard(false);
        localStorage.setItem('onboarded', 'true');
    };

    const toggleHunter = () => {
        setHunterActive(!hunterActive);
        if (!hunterActive) {
            // Simulate finding a product
            setTimeout(() => {
                const newProduct = {
                    id: Date.now(),
                    name: "مصحح وضعية الظهر الذكي",
                    price: 24.00,
                    img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=200",
                    status: "Ready"
                };
                setProducts(prev => [newProduct, ...prev]);
                setStats(prev => ({ ...prev, products: prev.products + 1 }));
            }, 3000);
        }
    };

    const handleConnect = (service) => {
        if (!connectedServices.includes(service)) {
            setConnectedServices(prev => [...prev, service]);
            setStats(prev => ({ ...prev, orders: prev.orders + 5 })); // Small boost for connection
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-mesh">
            {showWizard && <OnboardingWizard user={user} onComplete={onWizardComplete} />}
            
            {/* Sidebar */}
            <aside className="w-64 glass border-l border-white/5 flex flex-col p-6 gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                        <Zap className="text-black fill-black" size={18} />
                    </div>
                    <span className="font-bold text-lg tracking-tight gradient-text">DropGenius</span>
                </div>

                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                                view === item.id 
                                ? 'bg-primary/10 text-primary border border-primary/20' 
                                : 'text-text-muted hover:bg-white/5'
                            }`}
                        >
                            {item.icon}
                            <span className="text-sm font-medium">{item.label}</span>
                        </button>
                    ))}
                    <button
                        onClick={() => setView('hunter')}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                            view === 'hunter' 
                            ? 'bg-secondary/10 text-secondary border border-secondary/20' 
                            : 'text-text-muted hover:bg-white/5'
                        }`}
                    >
                        <Target size={20} />
                        <span className="text-sm font-medium">صياد المنتجات</span>
                    </button>
                </nav>

                <div className="mt-auto flex flex-col gap-2">
                    <button className="flex items-center gap-3 p-3 text-text-muted hover:text-white transition-colors">
                        <UserCircle size={20} />
                        <span className="text-sm">حسابي</span>
                    </button>
                    <button 
                        onClick={() => {
                            localStorage.removeItem('dropgenius_user');
                            router.push('/');
                        }}
                        className="flex items-center gap-3 p-3 text-red-400 hover:text-red-300 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="text-sm">خروج</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-10 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <img 
                            src={user?.picture || 'https://via.placeholder.com/150'} 
                            alt="Avatar" 
                            className="w-12 h-12 rounded-full border-2 border-primary"
                        />
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                مرحباً بك، <span className="gradient-text">{user?.name || 'مستخدم جديد'}</span> 👋
                            </h2>
                            <p className="text-text-muted text-sm">{user?.email}</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="btn btn-primary btn-sm py-2 px-4 flex items-center gap-2" onClick={() => setView('hunter')}>
                            <Zap size={18} />
                            تشغيل الأتمتة
                        </button>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={view}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {view === 'overview' && <OverviewView products={products} stats={stats} />}
                        {view === 'integrations' && <IntegrationsView connected={connectedServices} onConnect={handleConnect} />}
                        {view === 'hunter' && <HunterView active={hunterActive} onToggle={toggleHunter} foundProducts={products} />}
                        {view === 'products' && <ProductsView products={products} />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

function HunterView({ active, onToggle, foundProducts }) {
    return (
        <div className="flex flex-col gap-8">
            <div className="glass p-8 rounded-3xl border border-primary/20 flex justify-between items-center bg-primary/5">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Target className="text-primary" /> صياد المنتجات الرابحة (AI Hunter)
                    </h2>
                    <p className="text-text-muted mt-2">يقوم الذكاء الاصطناعي الآن بمسح الأسواق العالمية بحثاً عن منتجات رابحة.</p>
                </div>
                <button 
                    onClick={onToggle}
                    className={`btn ${active ? 'btn-outline border-primary/50 text-primary' : 'btn-primary'}`}
                >
                    {active ? 'إيقاف الصيد الآلي' : 'بدء الصيد الذكي'}
                </button>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
                <div className="glass p-6 rounded-2xl h-80 overflow-y-auto bg-black/20 font-mono text-[10px]">
                    <p className="text-text-muted opacity-50 mb-2">سجل العمليات الحية...</p>
                    {active && (
                        <div className="flex flex-col gap-2">
                            <p className="text-primary animate-pulse">🔎 جاري فحص تريندات AliExpress...</p>
                            <p className="text-white">{" > "} تم تحليل 1,420 منتج في قسم الإلكترونيات.</p>
                            <p className="text-secondary">{" > "} العثور على منتج يحل مشكلة: مصحح وضعية كل الملابس.</p>
                            {foundProducts.map((p, i) => (
                                <p key={i} className="text-green-400">{" > "} تم تحديد منتج رابح: {p.name}</p>
                            ))}
                        </div>
                    )}
                </div>
                <div className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center h-80 overflow-y-auto">
                    {!active && foundProducts.length === 0 ? (
                        <>
                            <Search className="text-text-muted mb-4 opacity-20" size={48} />
                            <p className="text-text-muted">فعل وضع الصياد للبدء في اكتشاف المنتجات</p>
                        </>
                    ) : (
                        <div className="w-full flex flex-col gap-4">
                             <div className="text-sm font-bold mb-2 flex justify-between px-2">
                                <span>النتائج المستخرجة</span>
                                <span className="text-primary">{foundProducts.length} منتج</span>
                             </div>
                             {foundProducts.map(product => (
                                 <div key={product.id} className="glass p-4 rounded-xl flex gap-4 text-right border border-white/5 bg-white/2">
                                    <div className="w-16 h-16 bg-white/5 rounded-lg shrink-0 overflow-hidden">
                                        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-xs">{product.name}</h4>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-primary font-bold text-sm">${product.price}</span>
                                            <button className="bg-primary text-black text-[10px] font-bold px-3 py-1 rounded-lg">رفع للمتجر</button>
                                        </div>
                                    </div>
                                 </div>
                             ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function OverviewView({ products, stats }) {
    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-4 gap-6">
                <StatCard label="إجمالي الأرباح" value={`$${stats.revenue.toLocaleString()}`} color="text-green-400" />
                <StatCard label="الطلبات الكلية" value={stats.orders.toLocaleString()} />
                <StatCard label="المنتجات النشطة" value={stats.products.toLocaleString()} color="text-primary" />
                <StatCard label="معدل التحويل" value="3.8%" />
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="glass p-8 rounded-3xl border border-white/5">
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                        <Zap size={18} className="text-primary" /> سجل العمليات الأخير
                    </h3>
                    <div className="flex flex-col gap-4">
                        {products.length > 0 ? products.slice(0, 3).map((p, i) => (
                            <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">New</div>
                                    <span className="text-xs">تمت إضافة {p.name} للمتجر</span>
                                </div>
                                <span className="text-[10px] text-text-muted">منذ قليل</span>
                            </div>
                        )) : (
                            <div className="text-center py-10 opacity-30">لا يوجد نشاط مسجل</div>
                        )}
                    </div>
                </div>
                <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col justify-center items-center text-center opacity-40">
                    <BarChart3 size={48} className="mb-4" />
                    <p className="text-sm">سيظهر الرسم البياني للأداء هنا عند زيادة المبيعات</p>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, color = "text-white" }) {
    return (
        <div className="glass p-6 rounded-2xl border border-white/5">
            <p className="text-text-muted text-xs mb-2">{label}</p>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
        </div>
    );
}

function IntegrationsView({ connected, onConnect }) {
    return (
        <div className="flex flex-col gap-10">
            <div className="text-right">
                <h2 className="text-3xl font-bold mb-2">مركز الربط الذكي</h2>
                <p className="text-text-muted text-sm">اربط متجرك ومورديك الآن لتبدأ الأتمتة الكاملة.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sales Platforms */}
                <div className="glass p-8 rounded-3xl border border-primary/20 bg-primary/5 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Store className="text-primary" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">منصات البيع</h3>
                            <p className="text-xs text-text-muted">حيث يتم عرض منتجاتك وإدارة المبيعات</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <IntegrationCard 
                            name="Shopify" 
                            desc="الخيار الأول للدروب شيبنج العالمي"
                            icon={<Zap className="text-[#95bf47]" />} 
                            status={connected.includes('Shopify') ? 'Connected' : 'Connect Now'} 
                            onConnect={() => onConnect('Shopify')}
                        />
                        <IntegrationCard 
                            name="WooCommerce" 
                            desc="تحكم كامل في متجرك الخاص"
                            icon={<Zap className="text-[#21759b]" />} 
                            status="Coming Soon" 
                            disabled 
                        />
                    </div>
                </div>

                {/* Suppliers */}
                <div className="glass p-8 rounded-3xl border border-secondary/20 bg-secondary/5 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                            <Package className="text-secondary" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">الموردين</h3>
                            <p className="text-xs text-text-muted">مصدر المنتجات والشحن التلقائي</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <IntegrationCard 
                            name="AliExpress" 
                            desc="أكبر تنوع للمنتجات في العالم"
                            icon={<Package className="text-orange-500" />} 
                            status={connected.includes('AliExpress') ? 'Connected' : 'Connect Now'} 
                            onConnect={() => onConnect('AliExpress')}
                        />
                        <IntegrationCard 
                            name="CJ Dropshipping" 
                            desc="أسرع شحن وأفضل جودة"
                            icon={<Package className="text-blue-500" />} 
                            status={connected.includes('CJ') ? 'Connected' : 'Connect Now'} 
                            onConnect={() => onConnect('CJ')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function IntegrationCard({ name, desc, icon, status, disabled, onConnect }) {
    return (
        <div className={`p-5 rounded-2xl border transition-all flex justify-between items-center ${
            disabled ? 'opacity-40 grayscale border-white/5 bg-white/2' : 'border-white/10 bg-white/5 hover:border-primary/40'
        }`}>
            <div className="flex items-center gap-4 text-right">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    {icon}
                </div>
                <div>
                    <h4 className="font-bold text-sm">{name}</h4>
                    <p className="text-[10px] text-text-muted">{desc}</p>
                </div>
            </div>
            
            <button 
                onClick={onConnect}
                disabled={disabled || status === 'Connected'}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                status === 'Connected' ? 'bg-green-500/20 text-green-400' : 
                status === 'Connect Now' ? 'bg-primary text-black hover:scale-105' : 'bg-white/10 text-text-muted'
            }`}>
                {status === 'Connected' ? 'متصل ✓' : status === 'Connect Now' ? 'اربط الآن' : 'قريباً'}
            </button>
        </div>
    );
}

function ProductsView({ products }) {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">مخزون المنتجات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => (
                    <div key={p.id} className="glass rounded-2xl border border-white/5 overflow-hidden flex flex-col group">
                        <div className="h-48 overflow-hidden">
                            <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        </div>
                        <div className="p-5 flex flex-col gap-4">
                            <h4 className="font-bold text-sm">{p.name}</h4>
                            <div className="flex justify-between items-center">
                                <span className="text-primary font-bold text-lg">${p.price}</span>
                                <span className="text-green-400 text-xs font-bold">جاهز للإدراج</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
