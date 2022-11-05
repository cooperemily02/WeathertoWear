import React, {useState} from "react";
import Outfit from "../component/Outfit";

export const HomeDashboard = (props) => {
    let zipcode = 1;
    let [outfit, setOutfit] = useState({top: 'Nike tank top', bottom: 'blue lulu shorts', shoes: 'adidas sneakers', outerwear: 'denim jacket'});
    console.log(outfit);
    return (<Outfit zipcode={zipcode} userId={props.userId} />);
};

export default HomeDashboard;
