export function formatPhoneNumber(phoneNumber: string) {
  if (!phoneNumber) return '';

  const digitsOnly = phoneNumber.replace(/\D/g, '');

  if (digitsOnly.startsWith('0')) {
    return '254' + digitsOnly.substring(1);
  }

  if (digitsOnly.startsWith('254')) {
    return digitsOnly;
  }

  if (digitsOnly.length === 9) {
    return '254' + digitsOnly;
  }

  return digitsOnly;
}

export function isValidKenyanPhone(phoneNumber: string) {
  const formatted = formatPhoneNumber(phoneNumber);
  return formatted.length === 12 && formatted.startsWith('254');
}
