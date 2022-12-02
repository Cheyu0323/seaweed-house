const prod = process.env.NODE_ENV === "production";
export const websiteUrl = prod ? "/seaweed-house" : ""