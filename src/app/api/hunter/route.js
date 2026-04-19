import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Fetch real data from DummyJSON (used to simulate a Dropshipping API)
        const response = await fetch('https://dummyjson.com/products?limit=10&skip=' + Math.floor(Math.random() * 50));
        
        if (!response.ok) {
            throw new Error('Failed to fetch from real API');
        }

        const data = await response.json();
        const usdToEgp = 50; // Approximated exchange rate mapping if needed for UI later
        const dropShippingMarkup = 1.25; // 25% markup
        
        const mappedProducts = data.products.map(product => {
            // Calculate new pricing
            const originalPrice = product.price;
            const finalPrice = Number((originalPrice * dropShippingMarkup).toFixed(2));
            const estimatedEgyptPrice = Number((finalPrice * usdToEgp).toFixed(0));

            // Basic localization rules to simulate intelligent Arabic AI sourcing
            let arabicName = product.title;
            if (product.category === 'smartphones') arabicName = `هاتف محمول - ${product.title}`;
            if (product.category === 'laptops') arabicName = `لابتوب - ${product.title}`;
            if (product.category === 'skincare') arabicName = `عناية بالبشرة - ${product.title}`;

            return {
                id: product.id,
                name: arabicName,
                englishName: product.title,
                originalPrice: originalPrice,
                price: finalPrice, // Marked up dropshipping price
                priceEgp: estimatedEgyptPrice,
                img: product.thumbnail,
                status: 'Ready',
                category: product.category,
                description: product.description,
                rating: product.rating
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
