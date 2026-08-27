export function validateEthiopianPhone(phone: string): boolean {
  // Strip spaces, dashes, parentheses
  const cleanPhone = phone.replace(/[\s\-()]/g, '');

  // Valid formats:
  // +251911234567
  // +251711234567
  // 0911234567
  // 0711234567
  // 251911234567
  // 251711234567
  const regex = /^(?:\+251|251|0)[97]\d{8}$/;
  
  return regex.test(cleanPhone);
}

export function formatEthiopianPhone(phone: string): string {
  const cleanPhone = phone.replace(/[\s\-()]/g, '');
  
  if (cleanPhone.startsWith('0')) {
    return '+251' + cleanPhone.substring(1);
  }
  if (cleanPhone.startsWith('251')) {
    return '+' + cleanPhone;
  }
  if (cleanPhone.startsWith('+251')) {
    return cleanPhone;
  }
  
  // If it doesn't match standard prefixes but is 9 digits and starts with 9/7
  if (/^[97]\d{8}$/.test(cleanPhone)) {
    return '+251' + cleanPhone;
  }

  return cleanPhone; // Return as is if format is unknown
}
