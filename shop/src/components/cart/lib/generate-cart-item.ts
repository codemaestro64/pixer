export function generateCartItem(itemType: string, item: any) {
  if (itemType === 'product') {
    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      unit: item.unit,
      image: item.image?.thumbnail,
      stock: item.quantity,
      price: Number(item.sale_price ? item.sale_price : item.price),
      shop: {
        slug: item.shop.slug,
        name: item.shop.name,
      },
      language: item.language,
    };
  } else {
    return {
      id: item.id,
      name: `${item.gig.title} - ${item.title}: ${item.name}`,
      slug: `@@@-${item.gig.id}`,
      unit: 1,
      image: item.gig.attachments[0].thumbnail.replace(
        'localhost',
        'localhost:8000'
      ),
      stock: 1,
      price: Number(item.price) ?? 0,
      shop: {
        slug: item.gig.customer.id,
        name: item.gig.customer.name,
      },
      language: 'en',
    };
  }
}
