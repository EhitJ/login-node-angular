const path = require("path");

export const DEFAULT = {
  shopifyAuth: config => {

    return {
        apiKey: process.env.SHOPIFY_API_KEY || '88888889',
        apiSecret: process.env.SHOPIFY_API_SECRET || 'hhkkkhhgggf',
        scopes: 'read_products',
        ignoredDirectories: ["static"] //array of ignored directories (top level only)
    };
  }
};