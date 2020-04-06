import * as sensitive from '../../../../jsons/sensitive.json';

export const awsConfig = {
  accessKey: sensitive.ACCESS_KEY,
  secretKey: sensitive.SECRET_KEY,
  bucket: sensitive.BUCKET,
  keyPrefix: sensitive.keyPrefix,
  keyPrefixAvatar: sensitive.keyPrefixAvatar,
  region: sensitive.region,
};
