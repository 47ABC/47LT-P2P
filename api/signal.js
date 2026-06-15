export default async function handler(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  if (!id) return new Response(JSON.stringify({error: 'need id'}), {status: 400});

  if (url.pathname === '/api/register') {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    return new Response(JSON.stringify({ok: true, id, ip}));
  }

  if (url.pathname === '/api/find') {
    return new Response(JSON.stringify({msg: 'find endpoint'}));
  }

  return new Response(JSON.stringify({ok: true, msg: 'signal server running'}));
}

export const config = {
  runtime: 'edge',
};
