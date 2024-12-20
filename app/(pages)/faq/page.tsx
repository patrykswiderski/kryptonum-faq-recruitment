import type { Metadata } from 'next';
import QuestionsView from '@/components/QuestionsView';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Kryptonum FAQ',
};

export default function FaqPage() {
  return <QuestionsView />;
}
