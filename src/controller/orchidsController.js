import { getAllOrchids } from "../services/OrchidService"

export const OrchidsPage = async (req, res) => {
    let arrOrchids = await getAllOrchids();
    console.log('check: ', arrOrchids);
    return res.render('OrchidHomePage.ejs', { arrOrchids });
}