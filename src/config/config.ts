const region = process.env.AWS_REGION;
const poolId = process.env.AWS_POOL_ID;
export const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region,
  poolId,
  authority: `https://cognito-idp.${region}.amazonaws.com/${poolId}`,
};
