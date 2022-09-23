const getIpfsUrl = (url: string) => {
  if (url.includes("ipfs://"))
    return "https://ipfs.io/ipfs/" + url.split("ipfs://")[1];
  else return url;
};

export default getIpfsUrl;
