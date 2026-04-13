interface IProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage(props: IProps) {
  const { slug } = await props.params;

  return (
    <div>
      <h1>ProductDetailPage</h1>
      <p>Slug: {slug}</p>
    </div>
  );
}
