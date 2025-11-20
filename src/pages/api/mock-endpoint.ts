import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, url }) => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const testMode = url.searchParams.get('test');
  
  if (testMode === 'error') {
    return new Response(JSON.stringify({ error: 'Test error - simulated error for testing purposes' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({ success: true, message: 'Form submitted successfully' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

