import roundToTwo from './roundToTwoDecPlaces';

const convertToF = (celsius) => roundToTwo(celsius * (9 / 5) + 32);

export default convertToF;