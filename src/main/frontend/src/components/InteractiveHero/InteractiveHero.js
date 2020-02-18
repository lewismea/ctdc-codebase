import React from 'react';
import { withStyles } from '@material-ui/core';
import icon from '../../assets/icons/Icon-CaseDetail.svg';
import HorseShoe from './HorseShoe';
import casesActive from '../../assets/landing/animation/casesActiveIcon.png';
import casesInActive from '../../assets/landing/animation/casesInActiveIcon.png';
import filesActive from '../../assets/landing/animation/filesActive.png';
import filesInActive from '../../assets/landing/animation/filesInActive.png';
import trialsActive from '../../assets/landing/animation/trialsActive.png';
import trialsInActive from '../../assets/landing/animation/trialsInActive.png';


const dialSize = 180;
const dialLineWidth = 12;

const CircularIcon = ({ isActive, regularImage, activeImage }) => (
  <>
    <img alt="icon" src={isActive ? activeImage : regularImage} />
  </>
);


const InteractiveHero = ({ classes }) => {
  const [activeState, setActiveState] = React.useState({
    isActive: 'cases',
    transformAngle: 225,
  });

  return (
    <>
      <div className={classes.logo1} onMouseEnter={() => { setActiveState({ isActive: 'cases', transformAngle: 225 }); }}>
        <CircularIcon isActive={activeState.isActive === 'cases'} regularImage={casesInActive} activeImage={casesActive} />
      </div>
      <HorseShoe transformAngle={activeState.transformAngle} />

      <div className={classes.logo2} onMouseEnter={() => { setActiveState({ isActive: 'trails', transformAngle: 315 }); }}>
        <CircularIcon isActive={activeState.isActive === 'trails'} regularImage={trialsInActive} activeImage={trialsActive} />

      </div>
      <div className={classes.logo3} onMouseEnter={() => { setActiveState({ isActive: 'files', transformAngle: 45 }); }}>
        <CircularIcon isActive={activeState.isActive === 'files'} regularImage={filesInActive} activeImage={filesActive} />
      </div>
    </>
  );
};

const styles = (theme) => ({
  radialWrapper: {
    position: 'absolute',
    width: dialSize,
    height: dialSize,
    marginTop: '180px',
    left: `calc(50% - ${dialSize}px)`,
    // padding: `calc((${theme.upCustom.header.heightLg} - 20px) / 2) 16px`,

    transform: 'rotateZ(225deg)',
    // Inner content
    '&:after': {
      content: '""',
      background: `url(${icon})`,
      borderRadius: '50%',
      width: dialSize - (dialLineWidth * 2),
      height: dialSize - (dialLineWidth * 2),
      position: 'absolute',
      top: dialLineWidth,
      left: dialLineWidth,
      transform: 'rotateZ(-225deg)',
    },
  },
  radialSection: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    overflow: 'hidden',
    width: dialSize / 2,
  },
  wedge: {
    background: theme.palette.primary.main,
    height: dialSize,
    width: dialSize / 2,
    transition: 'all 1s linear',
  },
  radialLeftSection: {
    left: '0',
    '& $wedge': {
      borderRadius: `${dialSize}px 0 0 ${dialSize}px`,
      transform: 'rotateZ(0deg)',
      transformOrigin: `${dialSize / 2} ${dialSize / 2}`,
    },
  },
  radialRightSection: {
    left: dialSize / 2,
    '& $wedge': {
      borderRadius: `0 ${dialSize}px ${dialSize}px 0`,
      left: '0',
      transform: 'rotateZ(-90deg)',
      transformOrigin: '0 50%',
    },
  },
  logo1: {
    left: `calc(50% - ${dialSize}px)`,
    position: 'absolute',
    float: 'left',
    marginTop: '-2px',
    width: '100px',
  },
  logo2: {
    left: `calc(70% - ${dialSize}px)`,
    position: 'absolute',
    float: 'left',
    marginTop: '180px',
    width: '100px',
  },
  logo3: {
    marginTop: '450px',
    left: `calc(50% - ${dialSize}px)`,
    position: 'absolute',
    float: 'left',
    width: '100px',
  },
});


export default withStyles(styles)(InteractiveHero);
