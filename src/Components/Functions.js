function extractDomainFromUrl(url) {
  const domainMatch = url.match(
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im
  );

  if (domainMatch && domainMatch[1]) {
    return domainMatch[1];
  } else {
    return null;
  }
}
export async function checkImage(url) {
  const res = await fetch(url);
  const buff = await res.blob();
  return buff.type.startsWith("image/");
}
export function getFavicon(url) {
  const domain = extractDomainFromUrl(url);
  const faviconURL = `https://${domain}/favicon.ico`;
  return faviconURL;
}
