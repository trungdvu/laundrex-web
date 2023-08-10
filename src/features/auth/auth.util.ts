const mapping: {
  [k in string]: string;
} = {
  'user-not-found': 'Email or password is not valid',
};

const defaultMessage = 'Wrong credentials';

export function getAuthErrorMessage(errorCode: string) {
  return mapping[errorCode] || defaultMessage;
}
