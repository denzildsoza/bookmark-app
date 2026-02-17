const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL)
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

  if (process.env.NEXT_PUBLIC_VERCEL_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  return "http://localhost:3000";
};
export default getBaseUrl;
