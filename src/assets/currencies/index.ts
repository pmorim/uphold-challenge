import AED from './AED.png';
import ARS from './ARS.png';
import AUD from './AUD.png';
import BAT from './BAT.png';
import BCH from './BCH.png';
import BRL from './BRL.png';
import BTC from './BTC.png';
import BTG from './BTG.png';
import CAD from './CAD.png';
import CHF from './CHF.png';
import CNY from './CNY.png';
import Crypto from './Crypto.png';
import DASH from './DASH.png';
import DKK from './DKK.png';
import ETH from './ETH.png';
import EUR from './EUR.png';
import GBP from './GBP.png';
import HKD from './HKD.png';
import ILS from './ILS.png';
import INR from './INR.png';
import JPY from './JPY.png';
import KES from './KES.png';
import LTC from './LTC.png';
import MXN from './MXN.png';
import NOK from './NOK.png';
import NZD from './NZD.png';
import PHP from './PHP.png';
import PLN from './PLN.png';
import RVR from './RVR.png';
import SEK from './SEK.png';
import SGD from './SGD.png';
import UAE from './UAE.png';
import USD from './USD.png';
import VOX from './VOX.png';
import XAG from './XAG.png';
import XAU from './XAU.png';
import XPD from './XPD.png';
import XPT from './XPT.png';
import XRP from './XRP.png';

export const iconMap: Record<string, string> = Object.freeze({
  AED: AED,
  ARS: ARS,
  AUD: AUD,
  BAT: BAT,
  BCH: BCH,
  BRL: BRL,
  BTC: BTC,
  BTG: BTG,
  CAD: CAD,
  CHF: CHF,
  CNY: CNY,
  Crypto: Crypto,
  DASH: DASH,
  DKK: DKK,
  ETH: ETH,
  EUR: EUR,
  GBP: GBP,
  HKD: HKD,
  ILS: ILS,
  INR: INR,
  JPY: JPY,
  KES: KES,
  LTC: LTC,
  MXN: MXN,
  NOK: NOK,
  NZD: NZD,
  PHP: PHP,
  PLN: PLN,
  RVR: RVR,
  SEK: SEK,
  SGD: SGD,
  UAE: UAE,
  USD: USD,
  VOX: VOX,
  XAG: XAG,
  XAU: XAU,
  XPD: XPD,
  XPT: XPT,
  XRP: XRP,
});

export const supportedCurrencies = new Set<string>(Object.keys(iconMap));
