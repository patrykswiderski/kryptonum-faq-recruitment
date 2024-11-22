import { NextResponse } from 'next/server';
import { getPaginatedQuestions } from '@/sanity-config/lib/questions/getQuestions';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    const { questions, total } = await getPaginatedQuestions(page, pageSize);

    return NextResponse.json({ questions, total });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
