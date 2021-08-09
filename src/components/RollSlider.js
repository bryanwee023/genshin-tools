import { ORANGE } from '../utilities/colors'
import { Slider, Input, withStyles, makeStyles, withTheme } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      width: 250,
    },
    input: {
        width: 42,
        color: "white",
        fontFamily: "HYWeiHan",
        '&::before': { content: 'none' },
        '&::after':  { borderBottom: '2px solid white'}
    },
});

const StyledSlider = withStyles({
    root: {
        color: ORANGE,
        height: 8,
    },
    thumb: {
      height: 22,
      width: 22,
      backgroundColor: "rgb(101, 98, 108)",
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
})(Slider);

const RollSlider = ({ value, setValue }) => {

    const classes = useStyles();

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) setValue(0);
        else if (value > 89) setValue(89);
    };

    return (
        <div style={{width:'50%', color:"rgb(221,221,221)"}}>
            <b>PITY BUILT: &nbsp;</b>
            <Input
                className={classes.input}
                value={value}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                    min: 0,
                    max: 89,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
            />

            <StyledSlider
                value={value}
                max= {89}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
            />
        </div>
    )
}

export default RollSlider;