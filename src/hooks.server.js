export async function handle({ event, resolve }) {
  // no SSR for any page
  return resolve(event, { ssr: false });
}
