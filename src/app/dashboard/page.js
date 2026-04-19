'use client';

import { useState, useEffect } from 'react';
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
            setStats(prev => ({ ...prev, orders: prev.orders + 5 }));
        }
    };

    const sidebarStyle = {
        width: '256px', minWidth: '256px',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', flexDirection: 'column',
        padding: '24px', gap: '32px', height: '100vh'
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#050505' }}>
            {showWizard && <OnboardingWizard user={user} onComplete={onWizardComplete} />}
            
            {/* Sidebar */}
            <aside style={sidebarStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '32px', height: '32px', background: '#00f2ff',
                        borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Zap style={{ color: '#000', fill: '#000' }} size={18} />
                    </div>
                    <span className="gradient-text" style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.03em' }}>DropGenius</span>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '12px', borderRadius: '12px', border: 'none',
                                cursor: 'pointer', width: '100%', textAlign: 'right',
                                transition: 'all 0.2s',
                                background: view === item.id ? 'rgba(0,242,255,0.1)' : 'transparent',
                                color: view === item.id ? '#00f2ff' : '#a0a0a0',
                                borderWidth: view === item.id ? '1px' : '0',
                                borderStyle: 'solid',
                                borderColor: view === item.id ? 'rgba(0,242,255,0.2)' : 'transparent',
                            }}
                        >
                            {item.icon}
                            <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.label}</span>
                        </button>
                    ))}
                    <button
                        onClick={() => setView('hunter')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            padding: '12px', borderRadius: '12px', border: 'none',
                            cursor: 'pointer', width: '100%', textAlign: 'right',
                            transition: 'all 0.2s',
                            background: view === 'hunter' ? 'rgba(112,0,255,0.1)' : 'transparent',
                            color: view === 'hunter' ? '#7000ff' : '#a0a0a0',
                            borderWidth: view === 'hunter' ? '1px' : '0',
                            borderStyle: 'solid',
                            borderColor: view === 'hunter' ? 'rgba(112,0,255,0.2)' : 'transparent',
                        }}
                    >
                        <Target size={20} />
                        <span style={{ fontSize: '14px', fontWeight: 500 }}>صياد المنتجات</span>
                    </button>
                </nav>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px', color: '#a0a0a0', background: 'none', border: 'none',
                        cursor: 'pointer', width: '100%', transition: 'color 0.2s'
                    }}>
                        <UserCircle size={20} />
                        <span style={{ fontSize: '14px' }}>حسابي</span>
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem('dropgenius_user');
                            router.push('/');
                        }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            padding: '12px', color: '#f87171', background: 'none', border: 'none',
                            cursor: 'pointer', width: '100%', transition: 'color 0.2s'
                        }}
                    >
                        <LogOut size={20} />
                        <span style={{ fontSize: '14px' }}>خروج</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img
                            src={user?.picture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name || 'U') + '&background=00f2ff&color=000'}
                            alt="Avatar"
                            style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #00f2ff' }}
                        />
                        <div>
                            <h2 style={{ fontSize: '24px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                مرحباً بك، <span className="gradient-text">{user?.name || 'مستخدم جديد'}</span> 👋
                            </h2>
                            <p style={{ color: '#a0a0a0', fontSize: '14px' }}>{user?.email}</p>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setView('hunter')}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Zap size={18} />
                        تشغيل الأتمتة
                    </button>
                </header>

                <div key={view} style={{ animation: 'fadeInUp 0.3s ease' }}>
                    {view === 'overview' && <OverviewView products={products} stats={stats} />}
                    {view === 'integrations' && <IntegrationsView connected={connectedServices} onConnect={handleConnect} />}
                    {view === 'hunter' && <HunterView active={hunterActive} onToggle={toggleHunter} foundProducts={products} />}
                    {view === 'products' && <ProductsView products={products} />}
                </div>
            </div>
        </div>
    );
}

function HunterView({ active, onToggle, foundProducts }) {
    const cardStyle = {
        background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)',
        borderRadius: '24px', border: '1px solid rgba(0,242,255,0.2)',
        background: 'rgba(0,242,255,0.05)', padding: '32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={cardStyle}>
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Target style={{ color: '#00f2ff' }} /> صياد المنتجات الرابحة (AI Hunter)
                    </h2>
                    <p style={{ color: '#a0a0a0', marginTop: '8px' }}>يقوم الذكاء الاصطناعي الآن بمسح الأسواق العالمية بحثاً عن منتجات رابحة.</p>
                </div>
                <button
                    onClick={onToggle}
                    className={active ? 'btn btn-outline' : 'btn btn-primary'}
                    style={{ border: active ? '1px solid rgba(0,242,255,0.5)' : 'none', color: active ? '#00f2ff' : '#000' }}
                >
                    {active ? 'إيقاف الصيد الآلي' : 'بدء الصيد الذكي'}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div style={{
                    background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px',
                    padding: '24px', height: '320px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '10px'
                }}>
                    <p style={{ color: '#a0a0a0', marginBottom: '8px', opacity: 0.5 }}>سجل العمليات الحية...</p>
                    {active && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <p style={{ color: '#00f2ff', animation: 'pulse 2s infinite' }}>🔎 جاري فحص تريندات AliExpress...</p>
                            <p style={{ color: '#fff' }}>{"> "} تم تحليل 1,420 منتج في قسم الإلكترونيات.</p>
                            <p style={{ color: '#7000ff' }}>{"> "} العثور على منتج يحل مشكلة: مصحح وضعية كل الملابس.</p>
                            {foundProducts.map((p, i) => (
                                <p key={i} style={{ color: '#4ade80' }}>{"> "} تم تحديد منتج رابح: {p.name}</p>
                            ))}
                        </div>
                    )}
                </div>
                <div style={{
                    background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px',
                    padding: '24px', height: '320px', overflowY: 'auto',
                    display: 'flex', flexDirection: 'column', alignItems: foundProducts.length === 0 ? 'center' : 'stretch', justifyContent: foundProducts.length === 0 ? 'center' : 'flex-start', textAlign: foundProducts.length === 0 ? 'center' : 'right'
                }}>
                    {!active && foundProducts.length === 0 ? (
                        <>
                            <Search style={{ color: '#a0a0a0', marginBottom: '16px', opacity: 0.2 }} size={48} />
                            <p style={{ color: '#a0a0a0' }}>فعل وضع الصياد للبدء في اكتشاف المنتجات</p>
                        </>
                    ) : (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', display: 'flex', justifyContent: 'space-between', padding: '0 8px' }}>
                                <span>النتائج المستخرجة</span>
                                <span style={{ color: '#00f2ff' }}>{foundProducts.length} منتج</span>
                            </div>
                            {foundProducts.map(product => (
                                <div key={product.id} style={{
                                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                                    borderRadius: '12px', padding: '16px', display: 'flex', gap: '16px', textAlign: 'right'
                                }}>
                                    <div style={{
                                        width: '64px', height: '64px', background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '8px', flexShrink: 0, overflow: 'hidden'
                                    }}>
                                        <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontWeight: 700, fontSize: '12px' }}>{product.name}</h4>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                                            <span style={{ color: '#00f2ff', fontWeight: 700, fontSize: '14px' }}>${product.price}</span>
                                            <button style={{
                                                background: '#00f2ff', color: '#000', fontSize: '10px',
                                                fontWeight: 700, padding: '4px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer'
                                            }}>رفع للمتجر</button>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                <StatCard label="إجمالي الأرباح" value={`$${stats.revenue.toLocaleString()}`} color="#4ade80" />
                <StatCard label="الطلبات الكلية" value={stats.orders.toLocaleString()} />
                <StatCard label="المنتجات النشطة" value={stats.products.toLocaleString()} color="#00f2ff" />
                <StatCard label="معدل التحويل" value="3.8%" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div style={{
                    background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)',
                    borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', padding: '32px'
                }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={18} style={{ color: '#00f2ff' }} /> سجل العمليات الأخير
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {products.length > 0 ? products.slice(0, 3).map((p, i) => (
                            <div key={i} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '6px',
                                        background: 'rgba(0,242,255,0.2)', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', color: '#00f2ff', fontSize: '10px', fontWeight: 700
                                    }}>New</div>
                                    <span style={{ fontSize: '12px' }}>تمت إضافة {p.name} للمتجر</span>
                                </div>
                                <span style={{ fontSize: '10px', color: '#a0a0a0' }}>منذ قليل</span>
                            </div>
                        )) : (
                            <div style={{ textAlign: 'center', padding: '40px 0', opacity: 0.3 }}>لا يوجد نشاط مسجل</div>
                        )}
                    </div>
                </div>
                <div style={{
                    background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)',
                    borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    alignItems: 'center', textAlign: 'center', opacity: 0.4, padding: '32px'
                }}>
                    <BarChart3 size={48} style={{ marginBottom: '16px' }} />
                    <p style={{ fontSize: '14px' }}>سيظهر الرسم البياني للأداء هنا عند زيادة المبيعات</p>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, color = '#ffffff' }) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)',
            borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', padding: '24px'
        }}>
            <p style={{ color: '#a0a0a0', fontSize: '12px', marginBottom: '8px' }}>{label}</p>
            <p style={{ fontSize: '20px', fontWeight: 700, color }}>{value}</p>
        </div>
    );
}

function IntegrationsView({ connected, onConnect }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ textAlign: 'right' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>مركز الربط الذكي</h2>
                <p style={{ color: '#a0a0a0', fontSize: '14px' }}>اربط متجرك ومورديك الآن لتبدأ الأتمتة الكاملة.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                {/* Sales Platforms */}
                <div style={{
                    background: 'rgba(0,242,255,0.05)', backdropFilter: 'blur(12px)',
                    borderRadius: '24px', border: '1px solid rgba(0,242,255,0.2)',
                    padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '48px', height: '48px', background: 'rgba(0,242,255,0.1)',
                            borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Store style={{ color: '#00f2ff' }} size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: 700 }}>منصات البيع</h3>
                            <p style={{ fontSize: '12px', color: '#a0a0a0' }}>حيث يتم عرض منتجاتك وإدارة المبيعات</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <IntegrationCard
                            name="Shopify"
                            desc="الخيار الأول للدروب شيبنج العالمي"
                            icon={<Zap style={{ color: '#95bf47' }} />}
                            status={connected.includes('Shopify') ? 'Connected' : 'Connect Now'}
                            onConnect={() => onConnect('Shopify')}
                        />
                        <IntegrationCard
                            name="WooCommerce"
                            desc="تحكم كامل في متجرك الخاص"
                            icon={<Zap style={{ color: '#21759b' }} />}
                            status="Coming Soon"
                            disabled
                        />
                    </div>
                </div>

                {/* Suppliers */}
                <div style={{
                    background: 'rgba(112,0,255,0.05)', backdropFilter: 'blur(12px)',
                    borderRadius: '24px', border: '1px solid rgba(112,0,255,0.2)',
                    padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '48px', height: '48px', background: 'rgba(112,0,255,0.1)',
                            borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Package style={{ color: '#7000ff' }} size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '20px', fontWeight: 700 }}>الموردين</h3>
                            <p style={{ fontSize: '12px', color: '#a0a0a0' }}>مصدر المنتجات والشحن التلقائي</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <IntegrationCard
                            name="AliExpress"
                            desc="أكبر تنوع للمنتجات في العالم"
                            icon={<Package style={{ color: '#f97316' }} />}
                            status={connected.includes('AliExpress') ? 'Connected' : 'Connect Now'}
                            onConnect={() => onConnect('AliExpress')}
                        />
                        <IntegrationCard
                            name="CJ Dropshipping"
                            desc="أسرع شحن وأفضل جودة"
                            icon={<Package style={{ color: '#3b82f6' }} />}
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
        <div style={{
            padding: '20px', borderRadius: '16px',
            border: `1px solid ${disabled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)'}`,
            background: disabled ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.05)',
            opacity: disabled ? 0.4 : 1, filter: disabled ? 'grayscale(1)' : 'none',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            transition: 'border-color 0.2s'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'right' }}>
                <div style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    {icon}
                </div>
                <div>
                    <h4 style={{ fontWeight: 700, fontSize: '14px' }}>{name}</h4>
                    <p style={{ fontSize: '10px', color: '#a0a0a0' }}>{desc}</p>
                </div>
            </div>

            <button
                onClick={onConnect}
                disabled={disabled || status === 'Connected'}
                style={{
                    padding: '6px 16px', borderRadius: '8px', fontSize: '10px', fontWeight: 700,
                    border: 'none', cursor: disabled || status === 'Connected' ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                    background: status === 'Connected' ? 'rgba(74,222,128,0.2)' : status === 'Connect Now' ? '#00f2ff' : 'rgba(255,255,255,0.1)',
                    color: status === 'Connected' ? '#4ade80' : status === 'Connect Now' ? '#000' : '#a0a0a0',
                }}
            >
                {status === 'Connected' ? 'متصل ✓' : status === 'Connect Now' ? 'اربط الآن' : 'قريباً'}
            </button>
        </div>
    );
}

function ProductsView({ products }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700 }}>مخزون المنتجات</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
                {products.map(p => (
                    <div key={p.id} style={{
                        background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)',
                        borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)',
                        overflow: 'hidden', display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{ height: '192px', overflow: 'hidden' }}>
                            <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                        </div>
                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <h4 style={{ fontWeight: 700, fontSize: '14px' }}>{p.name}</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#00f2ff', fontWeight: 700, fontSize: '18px' }}>${p.price}</span>
                                <span style={{ color: '#4ade80', fontSize: '12px', fontWeight: 700 }}>جاهز للإدراج</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
