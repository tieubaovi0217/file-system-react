import * as moment from 'moment';
import { Image, DatePicker } from 'antd';

import { DATE_FORMAT } from 'common/constants';

const { RangePicker } = DatePicker;

const CardImage = ({ thumbnailUrl, startTime, endTime }) => {
  return (
    <>
      <Image
        style={{
          width: '100%',
          height: '180px',
        }}
        src={thumbnailUrl}
        alt="Conference Preview"
      />
      <RangePicker
        ranges={{
          Today: [moment(), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
        }}
        defaultValue={[moment(startTime), moment(endTime)]}
        showTime
        format={DATE_FORMAT}
        style={{
          marginTop: '16px',
        }}
        disabled
      />
    </>
  );
};

export default CardImage;
