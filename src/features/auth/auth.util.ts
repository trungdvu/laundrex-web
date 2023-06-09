const mapMessage: {
  [k in string]: string;
} = {
  'user-not-found': 'Email or password is not valid',
};

const defaultMessage = 'Wrong credentials';

export function getAuthErrorMessage(errorCode: string) {
  return mapMessage[errorCode] || defaultMessage;
}
