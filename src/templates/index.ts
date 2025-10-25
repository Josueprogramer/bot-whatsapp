import { createFlow } from "@builderbot/bot"
import { anyMessageFlow, inactividadFlow, mainFlow } from "./mainFlow";
import { menuFlow, paginaWebFlow, serviciosFlow} from "./menuFlow";
import {construccionFlow, estructuralFlow, LevantamientoFlow, masFlow, planoFlow, servicioFlow, SunarpFlow } from "../services/servicioFlow"
import { iaFlow } from "./iaFlow";
import { dialogFlow } from "../services/dialogFlow";
import { fallbackDeepSeekFlow } from "./fallback";




export default createFlow([
  mainFlow,
  menuFlow,
  servicioFlow,
  serviciosFlow,
  paginaWebFlow,
  planoFlow,
  construccionFlow,
  estructuralFlow,
  LevantamientoFlow,
  SunarpFlow,
  masFlow,
  inactividadFlow,
  anyMessageFlow,
  iaFlow,
  dialogFlow,
  fallbackDeepSeekFlow,

  
  

]);