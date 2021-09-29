import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Calendar as CustomCalendar,
  DateCallbackHandler,
  LocaleConfig
} from 'react-native-calendars';
import { ptBR } from './localeConfig';
// import { generateInterval } from './generateInterval';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export function Calendar(){
  const theme = useTheme();
  return (
    <CustomCalendar 
      renderArrow={( direction ) => 
        <Feather 
          size={24}
          color={theme.colors.text}
          name={direction == 'left' ? 'chevron-left' : 'chevron-right'}
        />
      }
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15
        }  
      }}
      firstDay={1}
      minDate={new Date()}
    />
  )
}