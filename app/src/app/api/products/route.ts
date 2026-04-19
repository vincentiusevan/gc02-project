import Product from '@/server/models/Product';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get('search') || undefined;
  const page = searchParams.get('page') || undefined;

  const products = await Product.getProducts(search, page);

  return Response.json(products, { status: 200 });
}
