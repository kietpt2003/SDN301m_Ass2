import { getHomeData } from "../services/getHomeData"

export const getHomePage = async (req, res) => {
    let testString = await getHomeData();
    return res.render('home.ejs', { testString });
}