import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Fetch real clothing data
        // We randomly pick between mens-shirts, womens-dresses, or mens-shoes
        const categories = ['mens-shirts', 'womens-dresses', 'mens-shoes', 'womens-shoes'];
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        
        const response = await fetch(`https://dummyjson.com/products/category/${randomCat}?limit=5`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch from real API');
        }

        const data = await response.json();
        const usdToEgp = 50; 
        const dropShippingMarkup = 1.25; 
        
        const mappedProducts = data.products.map(product => {
            const originalPrice = product.price;
            const finalPrice = Number((originalPrice * dropShippingMarkup).toFixed(2));
            const estimatedEgyptPrice = Number((finalPrice * usdToEgp).toFixed(0));

            // Generate a realistic AliExpress search URL based on the title
            const aliExpressSearchUrl = `https://best.aliexpress.com/?SearchText=${encodeURIComponent(product.title.split(' ').slice(0, 3).join(' '))}`;

            let arabicName = product.title;
            if (product.category === 'mens-shirts') arabicName = `قميص رجالي قطن - ${product.title}`;
            if (product.category === 'womens-dresses') arabicName = `فستان حريمي أنيق - ${product.title}`;
            if (product.category === 'mens-shoes') arabicName = `حذاء رجالي عصري - ${product.title}`;
            if (product.category === 'womens-shoes') arabicName = `حذاء حريمي كاجوال - ${product.title}`;

            return {
                id: product.id,
                name: arabicName,
                englishName: product.title,
                originalPrice: originalPrice,
                price: finalPrice, 
                priceEgp: estimatedEgyptPrice,
                img: product.thumbnail,
                status: 'Ready',
                category: product.category,
                description: product.description,
                rating: product.rating,
                aliExpressUrl: aliExpressSearchUrl
            };
        });

        return NextResponse.json({
            success: true,
            products: mappedProducts
        });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { success: false, message: 'Failed to find real products.' },
            { status: 500 }
        );
    }
}
