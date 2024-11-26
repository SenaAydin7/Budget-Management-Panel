import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// dayjs eklentilerini aktif et
dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);

// Örnek: Güncel tarihi biçimlendirerek kullanma
const currentDate = dayjs().format('YYYY-MM-DD'); // '2024-11-22'

export default dayjs;
