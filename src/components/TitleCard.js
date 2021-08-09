import emblem from '../assets/images/hutao_ghost.png'

const TitleCard = () => {
    return (
        <h1 style={{display:'flex', alignItems:'center'}}>
            <img src={emblem} alt="" style={{height: '2em'}}/>
            Wangsheng Roll Calculator
        </h1>
    )
}

export default TitleCard;