import successCallBack from './successCallBack';
import errorCallBack from './errorCallBack';

const fetchUserLocation = () => {
  navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
};

export default fetchUserLocation;