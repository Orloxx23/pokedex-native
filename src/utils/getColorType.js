import { POKEMON_TYPE_COLORS } from "./constants";

const getColorType = (type) => POKEMON_TYPE_COLORS[type.toLowerCase()];

export default getColorType;