export const DELETE_SUCCESS = 'Deleted Successfully';
export const UPDATE_SUCCESS = 'Update Success';
export const EVENT_SUCCESS = 'Event has been successfully created';
export const TRANSACTION_LOG_SUCCESS = 'Transaction log successfully created';
export const FETCHED_SUCCESSFULLY = 'Fetched successfully';
export const CREATE_EVENT_API_DESCRIPTION =
  "Create the event with given format and return with created event details list of acceptable event names ['user logged in', 'user logged out', 'user starts to play the game', 'user stops to play the game', 'user initiated a purchase', 'user purchased the item successfully']";
export const GET_ALL_EVENT_DESCRIPTION =
  'Get all the events details with the pagination';
export const GET_ALL_EVENT_USER_DESCRIPTION =
  'Get all the event details based on the user with the pagination';
export const GET_CURRENT_USER_DESCRIPTION =
  'Get the current user registration information from the SSO Token';
export const GET_USER_IP_ADDRESS_DESCRIPTION =
  'Get the user IP information from the request';
export const GET_USER_BY_ID_DESCRIPTION =
  'Get the user deatils by passing the user id';
export const CREATE_TRANSACTION_LOG_DESCRIPTION =
  'Using this api you can create the transaction happened in application';
export const GET_ALL_TRANSACTION_LOG_DESCRIPTION =
  'Get all the transactions happened in the application with pagination';
export const GET_ALL_TRANSACTION_LOG_USER_DESCRIPTION =
  'Get all the transactions based on the user with pagination';
export const GET_CURRENT_GAME_USERS_COUNT =
  'Get current game users count for the game id with from and to date condition';
export const GET_GAME_USERS_COUNT =
  'Get game users count for the game id with from and to date condition';
export const UPDATE_GAME_CURRENT_USER_TTL =
  'Will be used to update the Time to live for the current user in game if exist else will create the heartbeat record';
export const USER_TYPE_UPDATE_FAILED = 'User type update failed';
export const USER_TYPE_UPDATE_SUCCESS = 'User type update success';
export const AFFILIATE_RULE_NOT_FOUND = 'Affiliate Rule not found or Invalid';
export const PROMOTIONAL_RULE_NOT_FOUND =
  'Promotional Rule not found or Invalid';
export const GET_CURRENT_USER_COUNT_PLATFORM =
  'Get the current users users count by game platform, platform is enum (MAC: Mac, WINDOWS: Windows)';
export const GET_USER_COUNT_BY_PLATFORM =
  'Get the users count by game platform, Platform is a  enum type (MAC: Mac, WINDOWS: Windows)';
export const GET_GAME_CURRENT_USER_COUNT_PLATFORM =
  'Get the game current users count by gameId and platform. Platform is a enum type (MAC: Mac, WINDOWS: Windows)';
export const GET_GAME_USER_COUNT_BY_PLATFORM =
  'Get the users count by gameId and game platform, Platform is a  enum type (MAC: Mac, WINDOWS: Windows)';
export const GET_TRANSACTION_LOG_BY_ID =
  'Get the particular transaction by passing the transaction Uuid as param.';
export const GET_GAMES_BY_SEARCH =
  'This API is used to get the list of games and collections ids filter the games by searching game name, by default pageNo = 1 and perPage = 10.';
export const GET_GAMES_BY_GAMEID =
  'This API is used to get the game details in our platform by passing the game uuid.';
export const GET_GAMES_DOWNLOAD =
  'This API is used to get the game download link from game sites.';
export const GET_ALL_GAMES =
  'This API is used to get the list of games and collections ids by default pageNo = 1 and perPage = 10';
export const GET_ALL_THE_INFLUENCERS = 'Get all the influencers details with their collections by default pageNo = 1 and perPage = 10';
export const GET_INFLUENCER_DETAIL_BY_ID = 'Get the influencer details with collections by influencer uuid';
export const GET_ALL_THE_INFLUENCERS_SEARCH =
  'Get all the influencers details with their collection ids filter the influencers by searching influencer name by default pageNo = 1 and perPage = 10.';
export const CREATE_NEW_PAYMENT =
  "Create a new payment transaction with given details. The body should pass either 'adaAmount' or 'fiatAmount'. Don't pass both values.  Depending on the denominator, the payment can be either USD (FIAT) or ADA. In response, you will get the converted ADA value for the respective FIAT and vice versa.";
export const CREATE_GAME_NEW_PAYMENT =
  'Create a new game payment transaction with given details. The body should pass ada value or fiat value as amount based on the currency type, if currency type is ada need to pass ada value as amount';
export const ONE_USD_TO_ADA = 3.45;
export const ONE_ADA_TO_USD = 0.29;
export const FORGOT_PASSWORD_MAIL = 'Reset Password link sent to your registered email successfully!';
export const RESET_PWD_SUCCESS = 'Reset password success';
export const PAYMENT_RENEW_SUBJECT = 'Subscription Renewal';
export const SEND_WELCOME_MAIL = 'Welcome Mail send to your registered email.';
export const IN_GAME_PURCHASE_DESC = 'Game Purchase - This API will give the details of the transaction and payment URL for the purchase.';
export const SEND_MAIL_SUCCESS = 'Mail Sent Successfully';
export const MINIMUM_ADA_CRON_SUCCESS =
  'ADA volatile schedule job runned successfully';
