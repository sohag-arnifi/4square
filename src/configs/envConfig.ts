const envConfig = {
  environment: process.env.ENVIRONMENT || "development",
  node_env: process.env.NODE_ENV,
  bycrypt_salt_rounds: Number(process.env.BYCRYPT_SALT_ROUND) || 10,
  secrect_token_key: process.env.SECTECT_TOKEN_KEY,
  expires_in: process.env.EXPIRES_IN,
  refreshToken_expires: process.env.REFRESHTOKEN_EXPIRES,
  db_uri: process.env.DB_URI,
  sms_url: process.env.SMS_URL,
  sms_api_key: process.env.SMS_API_KEY,
  sms_sender_id: process.env.SMS_SENDER_ID,
};

export default envConfig;
