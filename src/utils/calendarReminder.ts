export function generateIcsCalendar(printerModel: string): void {
  const modelName = printerModel || '喷墨打印机';
  const title = `🖨️ ${modelName} · 定期防堵打印维护`;
  const description = `提醒：请打开测试工具打印一张防堵色带，激活CMYK全部喷嘴，防止喷孔干涸结皮。\\n打印只需10秒，节省数百元换头换墨费用！`;
  
  // Start from tomorrow at 10:00 AM
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0, 0);
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 15, 0);

  const formatIcsDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Inkjet Maintenance//Anti-Clog Tool//ZH',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `DTSTART:${formatIcsDate(startDate)}`,
    `DTEND:${formatIcsDate(endDate)}`,
    'RRULE:FREQ=WEEKLY;INTERVAL=1',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:喷墨打印机每周防堵提醒',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', '喷墨打印机每周防堵提醒.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
