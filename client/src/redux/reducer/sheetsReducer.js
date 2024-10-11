// sheetsReducer.js
import {
  FETCH_SHEETS,
  ADD_SHEET_ROW,
  UPDATE_SHEET_ROW,
  DELETE_SHEET_ROW,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  CLEAR_IMAGES,
  CLEAR_FILTER,
  CLEAR_COLOR,
  FILTER_CATEGORY,
  GET_CATEGORIES,
  SET_CONDITION,
  GET_CASH_FLOW,
  ADD_CASH_FLOW_ENTRY,
  FETCH_PRODUCT_SHEET_BY_ID,
  GET_COLORS,
  FILTER_COLOR,
  SET_VARIABLE,
  SEARCH_PRODUCT,
  CLEAN_SEARCH_PRODUCT,
  GET_DASHBOARD_CATEGORIES
} from "../actions/productActions";

const initialState = {
  sheetsData: [],
  product: {},
  loading: false,
  error: null,
  rCondition: "allProducts",
  images: [],
  filterProducts: [],
  categories: [],
  dashboardCategories:[],
  cashFlow: [],
  colors: [],
  filterColors: [],
  searchedProducts: [],
  filterVar: null,
};

const sheetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHEETS:
      return {
        ...state,
        sheetsData: action.payload,
        loading: false,
      };
    case FETCH_PRODUCT_SHEET_BY_ID:
      return {
        ...state,
        product: action.payload,
      };
    case ADD_SHEET_ROW:
      return {
        ...state,
        sheetsData: [...state.sheetsData, action.payload],
      };
    case UPDATE_SHEET_ROW:
      return {
        ...state,
        sheetsData: state.sheetsData.map((row) =>
          row[0] === action.payload[0] ? action.payload : row
        ),
      };
    case DELETE_SHEET_ROW:
      return {
        ...state,
        sheetsData: state.sheetsData.filter(
          (row) => row[0] !== action.payload // Utiliza el ID para filtrar
        ),
      };
    case UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        images: [...state.images, action.payload],
        error: null,
      };
    case UPLOAD_IMAGES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_IMAGES: // Caso para limpiar imágenes
      return {
        ...state,
        images: [],
      };

    case SET_CONDITION:
      return { ...state, rCondition: action.payload };

    case SET_VARIABLE:
      return { ...state, filterVar: action.payload };  

    case FILTER_CATEGORY: // Productos filtrados por categoria
      return {
        ...state,
        filterProducts: action.payload,
      };

    case CLEAR_COLOR: // Limpiar filtro de colores
      return {
        ...state,
        filterColors: [],
      };  

    case CLEAR_FILTER:
      return { ...state, filterProducts: [] };

    case GET_CATEGORIES: // Obtener todas las categorias
      return {
        ...state,
        categories: action.payload,
      };

      case GET_DASHBOARD_CATEGORIES:
        return {
          ...state,
          dashboardCategories: action.payload
        };  

    case GET_COLORS:
      return {
        ...state,
        colors: action.payload,
      };
    case FILTER_COLOR:
      return {
        ...state,
        filterColors: action.payload,
      };
      case SEARCH_PRODUCT:
  const searchTerm = action.payload.toLowerCase();

  // Verifica que item.nombre exista y no sea undefined
  const searchedProducts = state.sheetsData.filter(item =>
    item.nombre && item.nombre.toLowerCase().includes(searchTerm)
  );

  return {
    ...state,
    searchedProducts
  };
    case CLEAN_SEARCH_PRODUCT:
      return {
        ...state,
        searchedProducts: []
      }    

    case GET_CASH_FLOW:
      return {
        ...state,
        cashFlow: action.payload,
      };

    case ADD_CASH_FLOW_ENTRY:
      return {
        ...state,
        cashFlow: [...state.cashFlow, action.payload],
      };
    default:
      return state;
  }
};

export default sheetsReducer;
