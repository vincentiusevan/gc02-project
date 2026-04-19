import Product from '@/server/models/Product';

interface ICtx {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, ctx: ICtx) {
  const { slug } = await ctx.params;

  const product = await Product.getProductBySlug(slug);

  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 404 });
  }

  return Response.json(product, { status: 200 });
}
