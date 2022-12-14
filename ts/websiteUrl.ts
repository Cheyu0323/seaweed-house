const prod = process.env.NODE_ENV === "production";
const websiteUrl = prod ? "/seaweed-house" : ""
export default websiteUrl