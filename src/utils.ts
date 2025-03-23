import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

export const fullFormatDate = (date: Date): string => {
    dayjs.extend(localizedFormat);
    const newDate = dayjs(date);
    return newDate.format('LLLL');
}

export const dayFormatDate = (date: Date): string => {
    dayjs.extend(localizedFormat);
    const newDate = dayjs(date);
    return newDate.format('l');
}

export const hourFormatDate = (date: Date): string => {
    dayjs.extend(localizedFormat);
    const newDate = dayjs(date);
    return newDate.format('LT');
}

export const localStorageToken = 'jwt'
export const localStorageProjectKey = 'lastProjectOpened'