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
import QuickAddRoom from './Home/BuildingManagement/QuickAddRoom';
import EditRoomInformation from './Home/BuildingManagement/EditRoomInformation';
import EditHouseInformation from './Home/BuildingManagement/EditHouseInformation';
//----------- ServiceManager
import ServiceManager from './Home/ServiceManagement/ServiceManager';
import Service from './Home/ServiceManagement/Service';
import AddService from './Home/ServiceManagement/AddService';
import ServiceDetail from './Home/ServiceManagement/ServiceDetail';
//----------- UtilitiesManager
import UtilitiesManager from './Home/UtilitiesManagement/UtilitiesManager';
import Utilities from './Home/UtilitiesManagement/Utilities';
import AmenityDetail from './Home/UtilitiesManagement/AmenityDetail';
import AddUtilities from './Home/UtilitiesManagement/AddUtilities';
//----------- ContractManagement
import ContractManagement from './Home/ContractManagement/ContractManagement';
import CreateContract from './Home/ContractManagement/CreateContract';
import ContractDetail from './Home/ContractManagement/ContractDetail';
import DetailedContractTerms from './Home/ContractManagement/DetailedContractTerms';
import CreateContractFromRoom from './Home/ContractManagement/CreateContractFromRoom';
import EditContract from './Home/ContractManagement/EditContract';
//----------- PaymentManagement
import PaymentManagement from './Home/PaymentManagement/PaymentManagement';
import AddPayment from './Home/PaymentManagement/AddPayment';
import PaymentDetail from './Home/PaymentManagement/PaymentDetail';
import ListPaymentSelect from './Home/PaymentManagement/ListPaymentSelect';
//----------- InvoiceManagement
import InvoiceManagement from './Home/BillManagement/InvoiceManagement';
import CreateInvoice from './Home/BillManagement/CreateInvoice';
import InvoiceDetail from './Home/BillManagement/InvoiceDetail';
import InvoiceUnpaidDetail from './Home/BillManagement/InvoiceUnpaidDetail';
import InvoicePaidDetail from './Home/BillManagement/InvoicePaidDetail';
//----------- UserManager
import UserManager from './Home/UserManagement/UserManager';
import ManagerList from './Home/UserManagement/ManagerList';
import AddNewManager from './Home/UserManagement/AddNewManager';
import ManagerDetail from './Home/UserManagement/ManagerDetail';
//----------- TenantManager
import TenantManager from './Home/TenantManagement/TenantManager';
import TenantDetail from './Home/TenantManagement/TenantDetail';
import TenantList from './Home/TenantManagement/TenantList';
import AddNewTenant from './Home/TenantManagement/AddNewTenant';
//----------- WaterAndElectricityManager
import WaterAndElectricityManager from './Home/WaterAndElectricityManagement/WaterAndElectricityManager';
import ConfirmWaterAndElectricity from './Home/WaterAndElectricityManagement/ConfirmWaterAndElectricity';
// WorkScreen -----------------------------------------------------------------
import WorkScreen from './Work/WorkScreen';
import IssueInformation from './Work/IssueInformation';
import MarkTheIssue from './Work/MarkTheIssue';
import AddExtraFee from './Work/AddExtraFee';
// StatisticScreen -----------------------------------------------------------------
import StatisticScreen from './Statistic/StatisticScreen';
// MessageScreen -----------------------------------------------------------------
import MessageScreen from './Message/MessageScreen';
//----------- ChatScreen
import ChatScreen from './Message/ChatScreen';
// AccountScreen -----------------------------------------------------------------
import AccountScreen from './Account/AccountScreen';
import EditAccount from './Account/EditAccount';
import ChangePassword from './Account/ChangePassword';

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
  QuickAddRoom,
  EditRoomInformation,
  EditHouseInformation,
  //-- ContractManagement
  ContractManagement,
  CreateContract,
  ContractDetail,
  DetailedContractTerms,
  CreateContractFromRoom,
  EditContract,
  //-- InvoiceManagement
  InvoiceManagement,
  CreateInvoice,
  InvoiceDetail,
  InvoiceUnpaidDetail,
  InvoicePaidDetail,
  //-- PaymentManagement
  PaymentManagement,
  AddPayment,
  PaymentDetail,
  ListPaymentSelect,
  //-- ServiceManager
  ServiceManager,
  Service,
  AddService,
  ServiceDetail,
  //-- UtilitiesManager
  UtilitiesManager,
  Utilities,
  AmenityDetail,
  AddUtilities,
  //-- UserManager
  UserManager,
  ManagerList,
  AddNewManager,
  ManagerDetail,
  //-- TenantManager
  TenantManager,
  TenantList,
  AddNewTenant,
  TenantDetail,
  // Work ------------------------------------------
  WorkScreen,
  IssueInformation,
  MarkTheIssue,
  AddExtraFee,
  // WaterAndElectricityManager ------------------------------------------
  WaterAndElectricityManager,
  ConfirmWaterAndElectricity,
  // StatisticScreen ------------------------------------------
  StatisticScreen,
  // MessageScreen ------------------------------------------
  MessageScreen,
  ChatScreen,
  // AccountScreen ------------------------------------------
  AccountScreen,
  EditAccount,
  ChangePassword,
};
