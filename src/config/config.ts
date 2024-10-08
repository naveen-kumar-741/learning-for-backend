const region = 'ap-south-1';
const poolId = 'ap-south-1_5TSYChk2m';
export const config = {
  region,
  poolId,
  authority: `https://cognito-idp.${region}.amazonaws.com/${poolId}`,
};
