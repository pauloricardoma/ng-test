type IFormatFilterByDate = 'begin' | 'end';

export function formatFilterByDate(date: string, type: IFormatFilterByDate) {
  if (type === 'begin') {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    return startOfDay;
  }
  if (type === 'end') {
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);
    return endOfDay;
  }
}
