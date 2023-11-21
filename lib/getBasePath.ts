const getBasePath = () => {
  let base_url =
    process.env.ENVIRONMENT === "development"
      ? "http://localhost:3000"
      : `https://${process.env.VERCEL_URL}`;

  return base_url;
};

export default getBasePath;
