import roundToTwo from './roundToTwoDecPlaces';

const convertToMph = (kmh) => roundToTwo(kmh / 1.609);

export default convertToMph;