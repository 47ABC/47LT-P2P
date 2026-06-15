export const config = { runtime: 'edge' };

const store = new Map();

export default async function handler(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  if (!id) return new Response(JSON.stringify({error: 'need id'}), {status: 400});

  if (url.pathname === '/api/register') {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    store.set(id, { ip: ip.split(',')[0].trim(), time: Date.now() });
    return new Response(JSON.stringify({ok: true, id}));
  }

  if (url.pathname === '/api/find') {
    const peer = store.get(id);
    if (!peer) return new Response(JSON.stringify({error: 'not found'}), {status: 404});
    if (Date.now() - peer.time > 5 * 60 * 1000) {
      store.delete(id);
      return new Response(JSON.stringify({error: 'offline'}), {status: 404});
    }
    return new Response(JSON.stringify(peer));
  }

  if (url.pathname === '/api/heartbeat') {
    const peer = store.get(id);
    if (peer) peer.time = Date.now();
    return new Response(JSON.stringify({ok: true}));
  }

  return new Response(JSON.stringify({ok: true, msg: 'signal server running'}));
}