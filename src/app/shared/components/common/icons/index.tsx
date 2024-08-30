'use client';

import React, { SVGProps } from 'react';
import lookingGlass from './lookingGlass.svg';
import filters from './filters.svg';
import star from './star.svg';
import arrowForward from './arrowForward.svg';
import arrowBackward from './arrowBackward.svg';
import googleOutlined from './googleIcon.svg';
import appleFilled from './appleIcon.svg';
import infoCircleOutlined from './infoIcon.svg';
import cavagoIcon from './cavagoIcon.svg';
import back from './back.svg';
import applePay from './applePay.svg';
import alert from './alert.svg';
import creditCard from './creditCard.svg';
import applePayDark from './applePayDark.svg';
import backArrow from './backArrow.svg';
import funnel from './funnel.svg';
import heart from './heart.svg';
import calendarCheck from './calendarCheck.svg';
import chatCentered from './chatCentered.svg';
import user from './user.svg';
import userLight from './userLight.svg';
import userDark from './userDark.svg';
import houseSimple from './houseSimple.svg';
import share from './share.svg';
import images from './images.svg';
import groups from './groups.svg';
import beginner from './beginner.svg';
import arrowDown from './arrowDown.svg';
import arrowUp from './arrowUp.svg';
import caretLeft from './caretLeft.svg';
import camera from './camera.svg';
import info from './info.svg';
import outlinedStar from './outlinedStar.svg';
import plus from './plus.svg';
import minus from './minus.svg';
import debitCard from './debitCard.svg';
import yellowStar from './yellowStar.svg';
import apple from './appleFilled.svg';
import dropLoc from './dropLoc.svg';
import goldenStar from './goldenStar.svg';
import stack from './stack.svg';
import securityLock from './securityLock.svg';
import lockSimple from './lockSimple.svg';
import caretRight from './caretRight.svg';
import check from './check.svg';
import magnifyingGlass from './magnifyingGlass.svg';
import arrowNext from './arrowNext.svg';
import activity from './activity.svg';
import location from './location.svg';
import message from './message.svg';
import cross from './cross.svg';
import trash from './trash.svg';
import pencil from './PencilSimple.svg';
import xCircle from './xCircle.svg';
import host from './host.svg';
import heartfilled from './Heartfilled.svg';
import chats from './chats.svg';
import cavagoIconNoBackground from './cavagoIconNoBackground.svg';
import paperClip from './paperClip.svg';
import vector from './vector.svg';
import type1 from './type.svg';
import list from './list.svg';
import chart from './chart.svg';
import clock from './clock.svg';
import applePayCard from './applePayCard.svg';
import creditCardPay from './creditCardPay.svg';
import creditCardCry from './creditCardCry.svg';
import creditCardCryMobile from './creditCardCryMobile.svg';
import calendarBank from './calendarBank.svg';
import handCoins from './handCoins.svg';
import exportIcon from './exportIcon.svg';
import userCheck from './userCheck.svg';
import calendarDots from './calendarDots.svg';
import session from './session.svg';
import frame from './frame.svg';
import cavagoMobile from './cavagoMobile.svg';
import passwordUpdate from './passwordUpdate.svg';

const svgs = {
  chart,
  clock,
  type1,
  list,
  message,
  arrowNext,
  check,
  heartfilled,
  pencil,
  trash,
  cross,
  magnifyingGlass,
  caretRight,
  lockSimple,
  stack,
  apple,
  appleFilled,
  camera,
  info,
  heart,
  caretLeft,
  calendarCheck,
  chatCentered,
  user,
  userLight,
  userDark,
  securityLock,
  houseSimple,
  lookingGlass,
  filters,
  star,
  arrowForward,
  arrowBackward,
  googleOutlined,
  infoCircleOutlined,
  cavagoIcon,
  back,
  applePay,
  alert,
  creditCard,
  applePayDark,
  backArrow,
  funnel,
  share,
  images,
  groups,
  beginner,
  arrowDown,
  arrowUp,
  outlinedStar,
  plus,
  minus,
  debitCard,
  yellowStar,
  xCircle,
  location,
  host,
  activity,
  dropLoc,
  goldenStar,
  chats,
  cavagoIconNoBackground,
  paperClip,
  vector,
  applePayCard,
  creditCardPay,
  creditCardCry,
  creditCardCryMobile,
  calendarBank,
  handCoins,
  exportIcon,
  userCheck,
  calendarDots,
  session,
  frame,
  cavagoMobile,
  passwordUpdate,
};

export type IconType = keyof typeof svgs;

export default function Icon(
  {
    name, width = 20, height = 20, ...rest
  }: { name: IconType } & SVGProps<SVGElement>,
) {
  const Image = svgs[name];

  return (
    <Image
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      {...rest}
    />
  );
}
