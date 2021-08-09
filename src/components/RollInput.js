import { useState } from 'react'
import RollSlider from './RollSlider'

const RollInput = ({ Calculate, SetRates }) => {

    const [rolls, setRolls] = useState(0);
    const [offBanner, setOffBanner] = useState(false);
    const [queryRolls, setQueryRolls] = useState(0);

    const onSubmit = (e) => {
        if (!rolls) setRolls(0);
        setQueryRolls(0);

        SetRates(Calculate(parseInt(rolls), offBanner, parseInt(queryRolls)));
    }

    return (
        <div className="Window" style={{display:'flex', width:'75%', justifyContent: 'space-between'}}>
            <RollSlider
                value={rolls}
                setValue={setRolls}
            />
            <div>
                <label className="check-label">
                    <input type="checkbox" className="check-input"
                        onChange={(e) => {setOffBanner(e.target.checked)}} />
                    <div className="check-design"></div>
                    <div className="check-text">Rolled<br/>Off-Banner</div>
                </label>  

                <input className='calculate-button' type='button' onClick={onSubmit} value="Calculate"/>     
            </div>
        </div>
    )
}

export default RollInput;
