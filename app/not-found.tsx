import NotFound from '@/components/404';

export const metadata = {
  title: 'Not-Found',
  description: 'Not-Found'
};

export default function page() {
  return (
    <main>
      <NotFound />
    </main>
  );
}
