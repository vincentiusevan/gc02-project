import Image from 'next/image';
import { products } from '@/data/product';

export default function Home() {
  return (
    <div>
      <section>
        <h1>VKEA Home Living</h1>
        <p>Furniture sederhana untuk membuat rumah terasa lebih nyaman.</p>
      </section>

      <section>
        <h2>Featured Products</h2>

        <div>
          {products.map((product) => {
            return (
              <div key={product.slug}>
                <Image src={product.thumbnail} alt={product.name} width={200} height={200} />
                <h3>{product.name}</h3>
                <p>{product.excerpt}</p>
                <p>Rp {product.price}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
