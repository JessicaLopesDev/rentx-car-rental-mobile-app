import { addDays } from 'date-fns';
import { Platform } from 'react-native';

export function getPlatformDate(date: Date) {
  if(Platform.OS === 'ios' || Platform.OS === 'android') {
    return addDays(date, 1);
  } else {
    return date;
  }
}
