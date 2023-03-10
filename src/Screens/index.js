// SplashScreen
import SplashScreen from './SplashScreen';
// NotificationScreen
import NotificationScreen from './Notification/NotificationScreen';
import DetailNotification from './Notification/DetailNotification';
// LoginScreen
import LoginScreen from './Login/LoginScreen';
import RegisterScreen from './Login/RegisterScreen';
import VerifyOTPScreen from './Login/VerifyOTPScreen';
import ConfirmScreen from './Login/ConfirmScreen';
// HomeScreen -----------------------------------------------------------------
import HomeScreen from './Home/HomeSreen';
//----------- BuildingManager
import BuildingManager from './Home/BuildingManagement/BuildingManager';
import BuildingInformation from './Home/BuildingManagement/BuildingInformation';
import AddBuildings from './Home/BuildingManagement/AddBuildings';
import AddBuildingsStep2 from './Home/BuildingManagement/AddBuildingsStep2';
import AddBuildingsStep3 from './Home/BuildingManagement/AddBuildingsStep3';
import RoomInformation from './Home/BuildingManagement/RoomInformation';
import FloorInformation from './Home/BuildingManagement/FloorInformation';
import AddRoom from './Home/BuildingManagement/AddRoom';
//----------- ServiceManager
import ServiceManager from './Home/ServiceManagement/ServiceManager';
import Service from './Home/ServiceManagement/Service';
import AddService from './Home/ServiceManagement/AddService';
import ServiceDetail from './Home/ServiceManagement/ServiceDetail';
//----------- UtilitiesManager
import UtilitiesManager from './Home/UtilitiesManagement/UtilitiesManager';
import Utilities from './Home/UtilitiesManagement/Utilities';
import AddUtilities from './Home/UtilitiesManagement/AddUtilities';
//----------- WaterAndElectricityManagement
import WaterAndElectricityManagement from './Home/WaterAndElectricityManagement/WaterAndElectricityManager';
import WaterAndElectricityInfor from './Home/WaterAndElectricityManagement/WaterAndElectricityInfor';
import RequestResend from './Home/WaterAndElectricityManagement/RequestResend';
//----------- ContractManagement
import ContractManagement from './Home/ContractManagement/ContractManagement';
import CreateContract from './Home/ContractManagement/CreateContract';
//----------- BillManagement
import BillManagement from './Home/BillManagement/BillManagement';
//----------- TenantManager
import TenantManager from './Home/TenantManagement/TenantManager';
import TenantList from './Home/TenantManagement/TenantList';
import AddNewTenant from './Home/TenantManagement/AddNewTenant';
// WorkScreen -----------------------------------------------------------------
import WorkScreen from './Work/WorkScreen';
import IssueInformation from './Work/IssueInformation';
import MarkTheIssue from './Work/MarkTheIssue';
import BillOfIssue from './Work/BillOfIssue';
import AddExtraFee from './Work/AddExtraFee';
// StatisticScreen -----------------------------------------------------------------
import StatisticScreen from './Statistic/StatisticScreen';
// MessageScreen -----------------------------------------------------------------
import MessageScreen from './Message/MessageScreen';
//----------- ChatScreen
import ChatScreen from './Message/ChatScreen';
// AccountScreen -----------------------------------------------------------------
import AccountScreen from './Account/AccountScreen';

export {
  // SplashScreen
  SplashScreen,
  // NotificationScreen
  NotificationScreen,
  DetailNotification,
  // LoginScreen
  LoginScreen,
  RegisterScreen,
  VerifyOTPScreen,
  ConfirmScreen,
  // HomeScreen ------------------------------------------
  HomeScreen,
  //-- BuildingManager
  BuildingManager,
  BuildingInformation,
  FloorInformation,
  RoomInformation,
  AddBuildings,
  AddBuildingsStep2,
  AddBuildingsStep3,
  AddRoom,
  //-- ContractManagement
  ContractManagement,
  CreateContract,
  //-- BillManagement
  BillManagement,
  //-- ServiceManager
  ServiceManager,
  Service,
  AddService,
  ServiceDetail,
  //-- UtilitiesManager
  UtilitiesManager,
  Utilities,
  AddUtilities,
  //-- WaterAndElectricityManagement
  WaterAndElectricityManagement,
  WaterAndElectricityInfor,
  RequestResend,
  //-- TenantManager
  TenantManager,
  TenantList,
  AddNewTenant,
  // Work ------------------------------------------
  WorkScreen,
  IssueInformation,
  MarkTheIssue,
  BillOfIssue,
  AddExtraFee,
  // StatisticScreen ------------------------------------------
  StatisticScreen,
  // MessageScreen ------------------------------------------
  MessageScreen,
  ChatScreen,
  // AccountScreen ------------------------------------------
  AccountScreen,
};
