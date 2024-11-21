import type { Metadata } from 'next';
import QuestionsView from '@/components/QuestionsView';

export const metadata: Metadata = {
  title: 'Faq',
  description: 'Kryptonum Faq',
};

export default function FaqPage() {
  return <QuestionsView />;
}
