import instance from "../../api/axiosConfig";
export const GET_ALL_PAYMENT = "GET_ALL_PAYMENT";

export const getAllPayments = () => async(dispatch) =>{
    try {
        const response = await instance.get('/api/mp/allpayments')

        dispatch({
            type: GET_ALL_PAYMENT,
            payload: response.data.paymentsMp
        })
    } catch (error) {
        console.log(error)
    }
}